"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ClaimOfferForm } from "./ClaimOfferForm";

function Inner() {
  const params = useSearchParams();
  return <ClaimOfferForm address={params.get("address") ?? ""} />;
}

export function ClaimWithParams() {
  return (
    <Suspense fallback={<div className="card mx-auto max-w-2xl">Loading…</div>}>
      <Inner />
    </Suspense>
  );
}
