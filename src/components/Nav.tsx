import Link from "next/link";
import { Home } from "lucide-react";

const PHONE = process.env.NEXT_PUBLIC_PHONE || "(813) 555-0100";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="section flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Home size={18} />
          </span>
          <span>
            Tarek<span className="text-brand-600">Buys</span>Houses
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <Link href="/how-it-works" className="hover:text-ink">How it works</Link>
          <Link href="/about" className="hover:text-ink">About Tarek</Link>
          <Link href="/reviews" className="hover:text-ink">Reviews</Link>
          <Link href="/faq" className="hover:text-ink">FAQ</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="hidden text-sm font-medium text-ink-soft sm:inline">
            {PHONE}
          </a>
          <Link href="/offer" className="btn-primary">Get my offer</Link>
        </div>
      </div>
    </header>
  );
}
