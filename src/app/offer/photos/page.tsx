import { PhotoUpload } from "@/components/PhotoUpload";

export const metadata = { title: "Upload photos" };

export default function PhotosPage() {
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-12">
      <div className="section">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Step 2 of 3
          </div>
          <h1 className="mt-2 font-display text-4xl text-ink">Sharpen your offer</h1>
          <p className="mt-2 text-ink-soft">
            Upload a few photos. Our vision AI re-scores the property's condition and adjusts your number.
          </p>
        </header>
        <PhotoUpload />
      </div>
    </div>
  );
}
