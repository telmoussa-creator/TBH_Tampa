"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { OfferWizard } from "./OfferWizard";

function Inner() {
  const params = useSearchParams();
  return <OfferWizard initialAddress={params.get("address") ?? ""} />;
}

export function OfferWizardWithParams() {
  return (
    <Suspense fallback={<div className="card mx-auto max-w-2xl">Loading…</div>}>
      <Inner />
    </Suspense>
  );
}
