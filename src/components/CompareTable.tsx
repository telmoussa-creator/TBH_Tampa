import { Check, X } from "lucide-react";

const ROWS = [
  { label: "Cash offer in 24 hours", us: true, opendoor: true, agent: false },
  { label: "Close in as little as 7 days", us: true, opendoor: false, agent: false },
  { label: "Zero service fees", us: true, opendoor: false, agent: false },
  { label: "Zero agent commissions (6%)", us: true, opendoor: true, agent: false },
  { label: "No repairs required", us: true, opendoor: true, agent: false },
  { label: "Buys distressed / inherited / probate", us: true, opendoor: false, agent: true },
  { label: "Local Tampa-based buyer", us: true, opendoor: false, agent: true },
  { label: "AI-powered valuation w/ explanation", us: true, opendoor: false, agent: false },
];

export function CompareTable() {
  return (
    <section className="bg-gray-50">
      <div className="section py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">Compare</div>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Us vs Opendoor vs your agent
          </h2>
          <p className="mt-3 text-ink-soft">
            Different sellers have different needs. Here's the honest breakdown.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-100">
          <div className="grid grid-cols-4 bg-gray-50 text-sm font-semibold text-ink-soft">
            <div className="p-4">&nbsp;</div>
            <div className="p-4 text-center text-brand-700">Tarek Buys Houses</div>
            <div className="p-4 text-center">Opendoor</div>
            <div className="p-4 text-center">Agent / MLS</div>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-4 border-t border-gray-100 text-sm ${i % 2 ? "bg-gray-50/40" : ""}`}
            >
              <div className="p-4 text-ink-soft">{r.label}</div>
              <Cell yes={r.us} />
              <Cell yes={r.opendoor} />
              <Cell yes={r.agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ yes }: { yes: boolean }) {
  return (
    <div className="grid place-items-center p-4">
      {yes ? (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Check size={16} />
        </span>
      ) : (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <X size={16} />
        </span>
      )}
    </div>
  );
}
