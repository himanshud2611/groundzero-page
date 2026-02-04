import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

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
