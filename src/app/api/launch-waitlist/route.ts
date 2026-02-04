import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : "unknown";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body?.email ?? ""));

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("launch_waitlist")
      .insert({ email, source: "launch-soon" });

    if (error) {
      console.error("Supabase error:", error); // Log the actual error
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      if (error.code === "PGRST205") {
        return NextResponse.json(
          {
            error:
              `Database error: ${error.message} (Code: ${error.code}). ` +
              `Check that the table exists in project: ${supabaseHost}`,
          },
          { status: 500 }
        );
      }
      // Return the actual error message for debugging (remove this later)
      return NextResponse.json(
        { error: `Database error: ${error.message} (Code: ${error.code})` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: `Server error: ${err?.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
