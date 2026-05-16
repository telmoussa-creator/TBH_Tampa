import Link from "next/link";

const PHONE = process.env.NEXT_PUBLIC_PHONE || "(813) 555-0100";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="section grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="font-semibold">Tarek Buys Houses</div>
          <p className="mt-3 text-sm text-ink-muted">
            Tampa, Florida. Cash offers in 24 hours. Close in 7 days. No fees, no repairs, no agents.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Get an offer</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/offer">Start instant offer</Link></li>
            <li><a href={`tel:${PHONE.replace(/\D/g, "")}`}>Call {PHONE}</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/about">About Tarek</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Areas we buy</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>Tampa, St. Pete, Clearwater</li>
            <li>Brandon, Riverview, Plant City</li>
            <li>Wesley Chapel, Lakeland</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="section flex flex-col items-start justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row">
          <div>© {new Date().getFullYear()} Tarek Buys Houses, LLC. All rights reserved.</div>
          <div>Estimates are AI-generated and non-binding until a formal contract is signed.</div>
        </div>
      </div>
    </footer>
  );
}
