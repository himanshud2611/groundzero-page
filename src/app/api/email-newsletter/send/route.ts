import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminServerClient } from '@/lib/admin-auth';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template - accepts HTML content from rich text editor
function generateEmailHtml(title: string, subtitle: string, content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Email-safe styles */
    body { margin: 0; padding: 0; background-color: #f5f5f5; }
    a { color: #bf635c; text-decoration: underline; }
    h1, h2, h3 { color: #1a1a1a; font-weight: 600; }
    h1 { font-size: 24px; margin: 0 0 16px 0; }
    h2 { font-size: 20px; margin: 24px 0 12px 0; }
    h3 { font-size: 18px; margin: 20px 0 10px 0; }
    p { margin: 0 0 16px 0; }
    ul, ol { padding-left: 24px; margin: 0 0 16px 0; }
    li { margin-bottom: 8px; }
    blockquote {
      border-left: 3px solid #bf635c;
      padding-left: 16px;
      margin: 16px 0;
      color: #666;
      font-style: italic;
    }
    hr { border: none; border-top: 1px solid #ddd; margin: 24px 0; }
    img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif;">
    <div style="padding: 40px 24px; background: #faf9f7;">
      <!-- Title -->
      <h1 style="color: #1a1a1a; font-size: 28px; margin: 0 0 8px 0; font-weight: 500; line-height: 1.3;">
        ${title}
      </h1>

      <!-- Subtitle -->
      ${subtitle ? `<p style="color: #666; font-size: 16px; margin: 0 0 28px 0; font-style: italic;">${subtitle}</p>` : '<div style="margin-bottom: 28px;"></div>'}

      <!-- Content -->
      <div style="color: #333; font-size: 17px; line-height: 1.75;">
        ${content}
      </div>

      <!-- Footer -->
      <hr style="border: none; border-top: 1px solid #ddd; margin: 40px 0 24px 0;" />

      <div style="text-align: center;">
        <p style="color: #888; font-size: 13px; font-family: 'Courier New', monospace; margin: 0 0 8px 0;">
          Ground Zero — Shaping the Frontier
        </p>
        <p style="color: #888; font-size: 12px; font-family: 'Courier New', monospace; margin: 0;">
          <a href="https://x.com/groundzero_twt" style="color: #bf635c; text-decoration: underline;">Follow us on X/Twitter</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { title, subtitle, content, testEmail } = await request.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const supabase = createAdminServerClient();

    // If testEmail is provided, send only to that email
    if (testEmail) {
      try {
        // Create campaign record for test send
        const { data: campaign, error: campaignError } = await supabase
          .from('newsletter_campaigns')
          .insert({
            title,
            subtitle: subtitle || null,
            content,
            subject: `[TEST] ${title}`,
            is_test: true,
            test_email: testEmail,
            total_recipients: 1,
          })
          .select()
          .single();

        if (campaignError) throw campaignError;

        await resend.emails.send({
          from: 'Ground Zero <newsletter@groundzeroai.in>',
          to: testEmail,
          subject: `[TEST] ${title}`,
          html: generateEmailHtml(title, subtitle || '', content),
        });

        // Record the send
        await supabase.from('newsletter_sends').insert({
          campaign_id: campaign.id,
          email: testEmail,
          status: 'success',
        });

        // Update campaign stats
        await supabase
          .from('newsletter_campaigns')
          .update({ successful_sends: 1 })
          .eq('id', campaign.id);

        return NextResponse.json({ message: `Test email sent to ${testEmail}` });
      } catch (err) {
        console.error('Failed to send test email:', err);
        return NextResponse.json(
          { error: 'Failed to send test email. Check Resend dashboard for details.' },
          { status: 500 }
        );
      }
    }

    // Fetch active subscribers for bulk send
    const { data: subscribers, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('email, id')
      .eq('is_active', true);

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 400 }
      );
    }

    // Create campaign record
    const { data: campaign, error: campaignError } = await supabase
      .from('newsletter_campaigns')
      .insert({
        title,
        subtitle: subtitle || null,
        content,
        subject: title,
        is_test: false,
        total_recipients: subscribers.length,
      })
      .select()
      .single();

    if (campaignError) {
      console.error('Failed to create campaign:', campaignError);
      return NextResponse.json(
        { error: 'Failed to create campaign record' },
        { status: 500 }
      );
    }

    // Send emails in batches
    const batchSize = 10;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const promises = batch.map(async (subscriber) => {
        try {
          await resend.emails.send({
            from: 'Ground Zero <newsletter@groundzeroai.in>',
            to: subscriber.email,
            subject: title,
            html: generateEmailHtml(title, subtitle || '', content),
          });

          // Record successful send
          await supabase.from('newsletter_sends').insert({
            campaign_id: campaign.id,
            subscriber_id: subscriber.id,
            email: subscriber.email,
            status: 'success',
          });

          return { success: true };
        } catch (err) {
          console.error(`Failed to send to ${subscriber.email}:`, err);

          // Record failed send
          await supabase.from('newsletter_sends').insert({
            campaign_id: campaign.id,
            subscriber_id: subscriber.id,
            email: subscriber.email,
            status: 'failed',
            error_message: err instanceof Error ? err.message : 'Unknown error',
          });

          return { success: false };
        }
      });

      const results = await Promise.all(promises);
      successCount += results.filter(r => r.success).length;
      errorCount += results.filter(r => !r.success).length;

      // Small delay between batches to avoid rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update campaign stats
    await supabase
      .from('newsletter_campaigns')
      .update({
        successful_sends: successCount,
        failed_sends: errorCount,
      })
      .eq('id', campaign.id);

    return NextResponse.json({
      message: `Newsletter sent! ${successCount} delivered, ${errorCount} failed.`,
      success: successCount,
      failed: errorCount,
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}
