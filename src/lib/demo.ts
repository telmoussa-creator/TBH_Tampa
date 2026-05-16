/**
 * Demo mode: when the static GitHub Pages build is running (no API routes),
 * client components fall back to these realistic mock AI responses so the
 * full funnel is clickable. In production, the real Claude calls run instead.
 */
import type { AVMResult, LeadScore, PhotoAssessment } from "@/types";

export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_STATIC === "true";

export function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export async function demoOffer(address: string): Promise<AVMResult> {
  await delay(1400);
  // Seed the numbers off the address length so different addresses get different ranges.
  const seed = address.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const arvBase = 380_000 + (seed % 90_000);
  const repairs = 8_000 + (seed % 22_000);
  const offerMid = arvBase * 0.75 - repairs - arvBase * 0.03;
  return {
    arv_low: Math.round(arvBase * 0.97),
    arv_high: Math.round(arvBase * 1.04),
    estimated_repairs: repairs,
    cash_offer_low: Math.round(offerMid * 0.92),
    cash_offer_high: Math.round(offerMid * 1.04),
    confidence: "medium",
    rationale: `Comps in this Tampa zip have trended +2.4% MoM over the last 90 days. Block construction and a sub-15-yr roof age were assumed; flood zone X. Light cosmetic refresh estimated at ~${formatK(repairs)}. Offer reflects a standard 25% spread for cash buyers in this market.`,
    key_risks: [
      "Roof age unverified — if >15 yrs, insurance impact reduces ARV ~3-5%.",
      "Comps in 33610/33612 are softer than core Tampa zips.",
    ],
    questions_to_ask_seller: [
      "What year was the roof last replaced?",
      "Any open permits or code violations?",
      "Is the AC under 10 years old?",
    ],
  };
}

export async function demoPhotoAssessment(): Promise<PhotoAssessment> {
  await delay(1700);
  return {
    overall_condition: 3,
    estimated_repair_cost_usd: 18_500,
    flags: [
      { area: "kitchen", severity: "moderate", note: "Cabinets and counters look original — likely a $7-9k cosmetic refresh." },
      { area: "roof", severity: "moderate", note: "Visible wear on shingles in the corner shot. Recommend roof report." },
      { area: "exterior", severity: "minor", note: "Some paint touch-up needed on south wall." },
    ],
    positives: ["Tile flooring throughout main living area", "Open floor plan", "Block construction visible"],
    summary:
      "Solid bones, dated finishes. Roof is the biggest uncertainty — order a roof report before locking the offer.",
  };
}

export async function demoLeadScore(reason?: string): Promise<LeadScore> {
  await delay(900);
  const r = (reason || "").toLowerCase();
  const distressed = /(inherit|probate|divorce|foreclos|tenant|landlord|relocat|tax|lien|behind|hoard|fire|flood)/.test(r);
  const motivation = distressed ? 9 : 6;
  const urgency = distressed ? 8 : 5;
  const deal = 7;
  const composite = Math.round((motivation * 0.4 + urgency * 0.4 + deal * 0.2) * 10) / 10;
  return {
    motivation,
    urgency,
    deal_quality: deal,
    composite,
    tier: composite >= 8 ? "hot" : composite >= 6 ? "warm" : "cool",
    signals_found: distressed ? ["distressed reason detected", "wants fast close"] : ["standard intake"],
    next_action: distressed
      ? "Call within the hour — high motivation + urgency."
      : "Text within 24h with date options.",
    suggested_follow_up: {
      channel: distressed ? "call" : "sms",
      timing: distressed ? "within 1 hour" : "tomorrow morning",
      draft_message:
        "Hey — Tarek's team here. Got your details on the property. Got a quick second to confirm a few things and lock in your cash offer? Reply with a good time today and we'll lock the close date you want. — Tarek's Team",
    },
  };
}

export const DEMO_CHAT_GREETING =
  "Hey, I'm the TBH concierge demo. The live version uses Claude in real time — for this static demo I'll respond with canned answers. What's the property address you're thinking about selling?";

export const DEMO_CHAT_REPLY = (userText: string) => {
  const t = userText.toLowerCase();
  if (/fee|cost|charge/.test(t))
    return "Zero. We don't charge a service fee or commission. The number we quote is what hits your account at closing — Tarek covers standard closing costs.";
  if (/how long|close|days|timeline/.test(t))
    return "As fast as 7 days, or as slow as 90+. You pick. Most Tampa closings we run land in 11 days.";
  if (/repair|fix|condition|old/.test(t))
    return "We buy as-is. Bad roof, dated kitchen, hoarder situation, code violations — none of it disqualifies you. Photos help us tighten the offer but we don't require any repairs.";
  if (/opendoor|other|compare/.test(t))
    return "Three differences: no 5% service fee, faster close (7 days vs 14-60), and we buy distressed houses they won't touch. Same instant-offer experience, better economics for you.";
  return "Got it. The fastest way to a real number is to start the offer flow at /offer — takes 30 seconds and the AI returns a range immediately. Want me to walk you through any specific concern first?";
};

function formatK(n: number) {
  return `$${Math.round(n / 1000)}k`;
}
