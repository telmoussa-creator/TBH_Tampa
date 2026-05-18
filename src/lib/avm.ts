import type Anthropic from "@anthropic-ai/sdk";
import { AVM_SYSTEM_PROMPT, MODELS, cachedSystem, claude } from "./claude";
import { safeJsonParse } from "./utils";
import type { AVMResult, PropertyFacts } from "@/types";

export async function generateOffer(facts: PropertyFacts): Promise<AVMResult> {
  const userPrompt = `Generate a cash-buyer offer range for this Tampa-area property.

PROPERTY FACTS:
${JSON.stringify(facts, null, 2)}

Return JSON only.`;

  const res = await claude().messages.create({
    model: MODELS.default,
    max_tokens: 1024,
    system: cachedSystem(AVM_SYSTEM_PROMPT),
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const parsed = safeJsonParse<AVMResult>(text);
  if (!parsed) {
    throw new Error("AVM did not return valid JSON: " + text.slice(0, 400));
  }
  return parsed;
}
