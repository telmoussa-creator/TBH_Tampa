"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { LeadScore } from "@/types";

type Status = "idle" | "submitting" | "ok" | "error";

export function ClaimOfferForm({ address }: { address: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [score, setScore] = useState<LeadScore | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address,
    reason: "",
    timeline: "asap" as "asap" | "30_days" | "60_days" | "90_plus" | "just_looking",
    notes: "",
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      setScore(data.score && !("error" in data.score) ? (data.score as LeadScore) : null);
      setStatus("ok");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="card mx-auto max-w-2xl text-center">
        <CheckCircle2 size={40} className="mx-auto text-brand-600" />
        <h2 className="mt-3 font-display text-2xl text-ink">You're locked in.</h2>
        <p className="mt-2 text-ink-soft">
          Tarek's team will text you at <strong>{form.phone}</strong> within an hour to confirm details.
        </p>
        {score?.tier === "hot" && (
          <p className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            Priority lead — expect a call shortly.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mx-auto max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Your name</label>
          <input className="input" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input
            className="input"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Email (optional)</label>
          <input className="input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Property address</label>
          <input className="input" required value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>
        <div>
          <label className="label">Timeline</label>
          <select
            className="input"
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value as typeof form.timeline)}
          >
            <option value="asap">ASAP (this week)</option>
            <option value="30_days">Within 30 days</option>
            <option value="60_days">30–60 days</option>
            <option value="90_plus">90+ days</option>
            <option value="just_looking">Just exploring</option>
          </select>
        </div>
        <div>
          <label className="label">Why selling? (helps a lot)</label>
          <input
            className="input"
            placeholder="e.g. relocating, inherited, tired landlord"
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Anything else?</label>
          <textarea
            className="input min-h-[80px]"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-ink-muted">
          By submitting you agree to be contacted about your property. No spam.
        </p>
        <button type="submit" disabled={status === "submitting"} className="btn-primary">
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Submitting…
            </>
          ) : (
            "Claim my offer"
          )}
        </button>
      </div>
    </form>
  );
}
