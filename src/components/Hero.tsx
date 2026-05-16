import { AddressSearch } from "./AddressSearch";
import { Shield, Zap, BadgeCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="section grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200">
            <Zap size={14} /> AI-powered cash offer in under 24 hours
          </div>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
            Sell your Tampa home <span className="text-brand-600">in 7 days.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            Skip the listings, repairs, showings, and commissions. Get a real cash offer from a local
            Tampa buyer — powered by AI, backed by real humans.
          </p>

          <div className="mt-7 max-w-xl">
            <AddressSearch />
          </div>

          <ul className="mt-6 flex flex-wrap gap-4 text-sm text-ink-soft">
            <li className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-brand-600" /> No fees, no commissions</li>
            <li className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-brand-600" /> No repairs required</li>
            <li className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-brand-600" /> You pick the close date</li>
          </ul>
        </div>

        <div className="relative">
          <div className="card relative">
            <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
              <Shield size={14} className="text-brand-600" /> Live offer preview · 2412 W Cleveland St, Tampa
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <div className="font-display text-5xl font-semibold text-ink">$412k</div>
              <div className="text-ink-muted">– $438k</div>
            </div>
            <div className="mt-1 text-sm text-ink-muted">Estimated cash offer range</div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <Stat label="Close in" value="7 days" />
              <Stat label="Fees" value="$0" />
              <Stat label="Repairs" value="None" />
            </div>

            <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-900">
              <strong>AI rationale:</strong> Block construction, 2018 roof, X flood zone, recent comps in
              33606 trending +3% MoM. Light cosmetic refresh estimated at $14k.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 text-center ring-1 ring-gray-100">
      <div className="font-semibold text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-ink-muted">{label}</div>
    </div>
  );
}
