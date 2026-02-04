import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    if (!supabaseAdmin) {
      console.error("Supabase Admin client not initialized. Check SUPABASE_SERVICE_ROLE_KEY.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const email = normalizeEmail(String(body?.email ?? ""));

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("launch_waitlist")
      .insert({ email, source: "launch-soon" });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Unable to join the waitlist right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to join the waitlist right now." },
      { status: 500 }
    );
  }
}
