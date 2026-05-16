"use client";

import { useMemo, useState } from "react";
import { Flame, Phone, MessageSquareText, ChevronRight, Loader2 } from "lucide-react";
import { formatPhone } from "@/lib/utils";
import type { LeadRow } from "@/app/dashboard/page";

const COLUMNS: { key: string; label: string }[] = [
  { key: "new", label: "New" },
  { key: "walkthrough", label: "Walkthrough" },
  { key: "contract", label: "Contract" },
  { key: "closed", label: "Closed" },
  { key: "dead", label: "Dead" },
];

export function LeadsBoard({ initialLeads }: { initialLeads: LeadRow[] }) {
  const [leads, setLeads] = useState<LeadRow[]>(initialLeads);
  const [selected, setSelected] = useState<LeadRow | null>(null);

  const grouped = useMemo(() => {
    const g: Record<string, LeadRow[]> = {};
    for (const c of COLUMNS) g[c.key] = [];
    for (const l of leads) {
      const k = COLUMNS.find((c) => c.key === l.status) ? l.status : "new";
      g[k].push(l);
    }
    return g;
  }, [leads]);

  async function move(lead: LeadRow, status: string) {
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    setSelected((s) => (s?.id === lead.id ? { ...s, status } : s));
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lead.id, status }),
    });
  }

  if (leads.length === 0) {
    return (
      <div className="card text-center text-ink-muted">
        No leads yet. They'll show up here the moment a homeowner submits the offer form.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {COLUMNS.map((c) => (
          <div key={c.key} className="rounded-2xl bg-gray-50 p-3 ring-1 ring-gray-100">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{c.label}</div>
              <div className="rounded-full bg-white px-2 py-0.5 text-xs text-ink-muted ring-1 ring-gray-100">
                {grouped[c.key].length}
              </div>
            </div>
            <div className="space-y-2">
              {grouped[c.key].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelected(l)}
                  className={`w-full rounded-xl bg-white p-3 text-left text-sm shadow-card ring-1 ring-gray-100 transition hover:ring-brand-200 ${
                    selected?.id === l.id ? "ring-brand-400" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="truncate font-semibold text-ink">{l.name}</div>
                    {l.tier === "hot" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-700">
                        <Flame size={10} /> Hot
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-ink-muted">{l.address}</div>
                  <div className="mt-1 text-[11px] text-ink-muted">
                    {new Date(l.created_at).toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <LeadDetail
        lead={selected}
        onMove={(status) => selected && move(selected, status)}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function LeadDetail({
  lead,
  onMove,
  onClose,
}: {
  lead: LeadRow | null;
  onMove: (status: string) => void;
  onClose: () => void;
}) {
  const [sendingSms, setSendingSms] = useState(false);
  const [smsResult, setSmsResult] = useState<string>("");
  const [draft, setDraft] = useState("");

  // Reset draft when a new lead is opened
  const draftDefault = lead?.ai_score?.suggested_follow_up?.draft_message ?? "";
  const currentDraft = draft || draftDefault;

  if (!lead) {
    return (
      <div className="hidden h-fit rounded-2xl bg-gray-50 p-6 text-center text-sm text-ink-muted ring-1 ring-gray-100 lg:block">
        Select a lead to see the AI scoring and follow-up draft.
      </div>
    );
  }

  async function sendSms() {
    if (!lead) return;
    setSendingSms(true);
    setSmsResult("");
    try {
      const res = await fetch("/api/admin/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: lead.phone, body: currentDraft, leadId: lead.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "send failed");
      setSmsResult(`Sent (sid ${data.sid?.slice(0, 10) ?? "?"})`);
    } catch (e) {
      setSmsResult(e instanceof Error ? e.message : "send failed");
    } finally {
      setSendingSms(false);
    }
  }

  const s = lead.ai_score;
  return (
    <aside className="card sticky top-20 h-fit space-y-4">
      <header className="flex items-start justify-between">
        <div>
          <div className="font-display text-xl text-ink">{lead.name}</div>
          <div className="text-sm text-ink-muted">{lead.address}</div>
        </div>
        <button onClick={onClose} className="text-ink-muted hover:text-ink">
          <ChevronRight />
        </button>
      </header>

      <div className="flex flex-wrap gap-2 text-sm">
        <a href={`tel:${lead.phone.replace(/\D/g, "")}`} className="btn-secondary !py-2 text-xs">
          <Phone size={14} /> {formatPhone(lead.phone)}
        </a>
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="btn-ghost !py-2 text-xs">
            {lead.email}
          </a>
        )}
      </div>

      <div className="rounded-xl bg-gray-50 p-3 text-sm ring-1 ring-gray-100">
        <div className="grid grid-cols-2 gap-1 text-xs text-ink-muted">
          <div>Timeline</div>
          <div className="text-ink">{lead.timeline ?? "—"}</div>
          <div>Reason</div>
          <div className="text-ink">{lead.reason ?? "—"}</div>
          <div>Notes</div>
          <div className="text-ink">{lead.notes ?? "—"}</div>
        </div>
      </div>

      {s && (
        <div className="rounded-xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
          <div className="font-semibold">
            AI score · tier <span className="uppercase">{s.tier}</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <Metric label="Motivation" value={s.motivation} />
            <Metric label="Urgency" value={s.urgency} />
            <Metric label="Deal" value={s.deal_quality} />
          </div>
          {s.signals_found?.length > 0 && (
            <div className="mt-3 text-xs">
              <div className="font-semibold">Signals</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {s.signals_found.map((sig) => (
                  <span key={sig} className="rounded-full bg-white px-2 py-0.5 ring-1 ring-brand-200">
                    {sig}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3 text-xs">
            <div className="font-semibold">Next action</div>
            <div className="mt-1">{s.next_action}</div>
          </div>
        </div>
      )}

      <div>
        <label className="label inline-flex items-center gap-2">
          <MessageSquareText size={14} /> SMS draft
        </label>
        <textarea
          value={currentDraft}
          onChange={(e) => setDraft(e.target.value)}
          className="input min-h-[110px]"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-ink-muted">{smsResult}</div>
          <button onClick={sendSms} disabled={sendingSms || !currentDraft} className="btn-primary !py-2 text-xs">
            {sendingSms ? <Loader2 size={14} className="animate-spin" /> : "Send SMS"}
          </button>
        </div>
      </div>

      <div>
        <div className="label">Move to</div>
        <div className="flex flex-wrap gap-2">
          {COLUMNS.filter((c) => c.key !== lead.status).map((c) => (
            <button key={c.key} onClick={() => onMove(c.key)} className="btn-secondary !py-2 text-xs">
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-2 text-center ring-1 ring-brand-100">
      <div className="font-display text-lg text-ink">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-ink-muted">{label}</div>
    </div>
  );
}
