import { MapPin, Brain, Handshake, Banknote } from "lucide-react";

const STEPS = [
  {
    icon: MapPin,
    title: "Tell us about your house",
    body: "Enter your address. We pull the property data instantly — beds, baths, year built, lot size, comps.",
  },
  {
    icon: Brain,
    title: "AI generates your offer",
    body: "Our Claude-powered valuation engine analyzes 40+ signals — including photos, if you upload them — and gives you a real cash offer range in under 24 hours.",
  },
  {
    icon: Handshake,
    title: "You pick the close date",
    body: "Want to close in 7 days? Done. Need 60 to figure out movers? Also done. You're in charge.",
  },
  {
    icon: Banknote,
    title: "Get paid",
    body: "Sign at a local title company. We wire the funds. No fees, no commissions, no repairs.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="section py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">How it works</div>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Four steps. No surprises.
          </h2>
          <p className="mt-3 text-ink-soft">
            We rebuilt the iBuyer playbook from scratch. Faster, smarter, and you keep more of the money
            because we don't charge a 5% service fee.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <s.icon size={20} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
