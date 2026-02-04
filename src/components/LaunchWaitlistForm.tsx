"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error" | "duplicate";

export default function LaunchWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/launch-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("You are in. We will reach out soon.");
        setEmail("");
        return;
      }

      const data = await response.json().catch(() => ({}));
      if (response.status === 409) {
        setStatus("duplicate");
        setMessage(data?.error || "This email is already on the waitlist.");
        return;
      }

      setStatus("error");
      setMessage(data?.error || "Something went wrong. Try again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
          className="w-full md:flex-1 h-11 md:h-12 px-4 rounded-full bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-[#f4d37a] focus:ring-2 focus:ring-[#f4d37a]/30 transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center h-11 md:h-12 px-6 md:px-8 rounded-full bg-[#f4d37a] text-[#2b1b1b] font-mono font-semibold tracking-tight shadow-[0_10px_30px_rgba(244,211,122,0.35)] hover:shadow-[0_14px_40px_rgba(244,211,122,0.5)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Joining..." : "Join the Waitlist"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 text-sm font-mono ${
            status === "success"
              ? "text-[#f4d37a]"
              : status === "duplicate"
              ? "text-[#f4d37a]/80"
              : "text-red-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
