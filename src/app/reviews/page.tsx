import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export const metadata = { title: "Reviews" };

export default function Page() {
  return (
    <>
      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="section py-16 text-center">
          <h1 className="font-display text-4xl text-ink">What Tampa families say</h1>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
            Every house we buy is someone's chapter ending. Here's how it went for them.
          </p>
        </div>
      </div>
      <Testimonials />
      <CTA />
    </>
  );
}
