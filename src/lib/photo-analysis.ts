import type Anthropic from "@anthropic-ai/sdk";
import { MODELS, PHOTO_SYSTEM_PROMPT, cachedSystem, claude } from "./claude";
import { safeJsonParse } from "./utils";
import type { PhotoAssessment } from "@/types";

type PhotoInput =
  | { type: "url"; url: string }
  | { type: "base64"; media_type: "image/jpeg" | "image/png" | "image/webp" | "image/gif"; data: string };

export async function analyzePhotos(photos: PhotoInput[]): Promise<PhotoAssessment> {
  if (photos.length === 0) throw new Error("No photos provided");
  if (photos.length > 12) photos = photos.slice(0, 12);

  const imageBlocks: Anthropic.ImageBlockParam[] = photos.map((p) =>
    p.type === "url"
      ? { type: "image", source: { type: "url", url: p.url } }
      : { type: "image", source: { type: "base64", media_type: p.media_type, data: p.data } }
  );

  const res = await claude().messages.create({
    model: MODELS.vision,
    max_tokens: 1500,
    system: cachedSystem(PHOTO_SYSTEM_PROMPT),
    messages: [
      {
        role: "user",
        content: [
          ...imageBlocks,
          {
            type: "text",
            text: "Assess this property's condition for a cash-buyer offer. Return JSON only.",
          },
        ],
      },
    ],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const parsed = safeJsonParse<PhotoAssessment>(text);
  if (!parsed) {
    throw new Error("Photo analyzer did not return valid JSON: " + text.slice(0, 400));
  }
  return parsed;
}
