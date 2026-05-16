"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Loader2, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    try {
      const sb = supabaseBrowser();
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-16">
      <div className="section max-w-md">
        <div className="card text-center">
          <Mail className="mx-auto text-brand-600" />
          <h1 className="mt-3 font-display text-2xl text-ink">Operator login</h1>
          <p className="mt-1 text-sm text-ink-muted">Magic link, no password.</p>

          {status === "sent" ? (
            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-900">
              Check <strong>{email}</strong>. Click the link to sign in.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3 text-left">
              <input
                type="email"
                required
                placeholder="you@tarekbuyshouses.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
              {err && <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}
              <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center">
                {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : "Send magic link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
