import { CTA } from "@/components/CTA";

export const metadata = { title: "FAQ" };

const FAQS = [
  {
    q: "How is your offer different from Opendoor's?",
    a: "Three things. First, we don't charge a service fee (Opendoor charges ~5%). Second, we close in as little as 7 days versus their 14–60. Third, we'll buy houses they won't — distressed, inherited, heavy repairs, code violations, behind on payments.",
  },
  {
    q: "How does the AI offer actually work?",
    a: "Our valuation engine pulls property data, looks at recent Tampa-area comps, factors in roof age, flood zone, construction type, and condition, then applies a standard cash-buyer formula (ARV × 0.75 − repairs − holding). If you upload photos, our vision AI re-estimates the repair number based on what it sees, which usually tightens or improves the offer.",
  },
  {
    q: "Are there any fees?",
    a: "No. No service fee, no commissions, no closing costs (we cover standard closing costs). The number we quote is the number you get at closing.",
  },
  {
    q: "What if my house needs major work?",
    a: "Perfect — that's our specialty. Old roof, dated kitchen, foundation issues, hoarder situations, fire/flood damage — we buy as-is. You leave behind anything you don't want.",
  },
  {
    q: "Do I need to be local or available for showings?",
    a: "No. We do one walkthrough (or a video walkthrough if you're out of state). No open houses, no agent showings, no buyer parade through your home.",
  },
  {
    q: "How long does closing take?",
    a: "As fast as 7 days, or as slow as 90+. You pick the date based on what you need.",
  },
  {
    q: "Is the AI offer the final offer?",
    a: "The AI gives you a range. The final number is locked after we verify the property (usually a 20-minute walkthrough or video tour). We don't do the Opendoor trick of dropping the offer $20k at the last second.",
  },
];

export default function Page() {
  return (
    <>
      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="section py-16 text-center">
          <h1 className="font-display text-4xl text-ink">Common questions</h1>
        </div>
      </div>
      <div className="section py-12">
        <dl className="mx-auto max-w-3xl divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-100">
          {FAQS.map((f) => (
            <div key={f.q} className="p-6">
              <dt className="font-semibold text-ink">{f.q}</dt>
              <dd className="mt-2 text-ink-soft">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
      <CTA />
    </>
  );
}
