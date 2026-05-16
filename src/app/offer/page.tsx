import { OfferWizardWithParams } from "@/components/OfferWizardWithParams";

export const metadata = { title: "Get your AI cash offer" };

export default function OfferPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-12">
      <div className="section">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Step 1 of 3
          </div>
          <h1 className="mt-2 font-display text-4xl text-ink">Your AI cash offer</h1>
          <p className="mt-2 text-ink-soft">
            Takes about 30 seconds. We'll show you a real number, not a "we'll call you" form.
          </p>
        </header>
        <OfferWizardWithParams />
      </div>
    </div>
  );
}
