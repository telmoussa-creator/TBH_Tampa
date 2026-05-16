import { HowItWorks } from "@/components/HowItWorks";
import { CompareTable } from "@/components/CompareTable";
import { CTA } from "@/components/CTA";

export const metadata = { title: "How it works" };

export default function Page() {
  return (
    <>
      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="section py-16 text-center">
          <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
            From "what's it worth?" to "you've been paid" in 7 days.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
            Here's exactly how it works, what we look at, and why our offer is usually higher than what
            sellers expect from a cash buyer.
          </p>
        </div>
      </div>
      <HowItWorks />
      <CompareTable />
      <CTA />
    </>
  );
}
