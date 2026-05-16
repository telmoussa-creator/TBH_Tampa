import { IS_DEMO } from "@/lib/demo";

export function DemoBanner() {
  if (!IS_DEMO) return null;
  return (
    <div className="bg-ink text-center text-xs text-white">
      <div className="section py-2">
        <span className="font-semibold">Staging demo</span> — UI is live; AI responses are mocked
        client-side. Real Claude AVM, vision, and concierge run in the production build.
      </div>
    </div>
  );
}
