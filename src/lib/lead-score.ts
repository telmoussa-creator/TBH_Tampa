import type Anthropic from "@anthropic-ai/sdk";
import { LEAD_SCORE_SYSTEM_PROMPT, MODELS, cachedSystem, claude } from "./claude";
import { safeJsonParse } from "./utils";
import type { LeadIntake, LeadScore } from "@/types";

export async function scoreLead(lead: LeadIntake): Promise<LeadScore> {
  const userPrompt = `Score this Tampa-area seller lead. Look at every field — the "reason", "notes", and "timeline" carry the strongest signal.

LEAD:
${JSON.stringify(lead, null, 2)}

Return JSON only.`;

  const res = await claude().messages.create({
    model: MODELS.fast,
    max_tokens: 800,
    system: cachedSystem(LEAD_SCORE_SYSTEM_PROMPT),
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const parsed = safeJsonParse<LeadScore>(text);
  if (!parsed) {
    throw new Error("Lead scorer did not return valid JSON: " + text.slice(0, 400));
  }
  return parsed;
}
