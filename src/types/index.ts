export type PropertyType = "single_family" | "townhome" | "condo" | "multi_2_4" | "mobile" | "land";

export type PropertyFacts = {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  property_type?: PropertyType;
  beds?: number;
  baths?: number;
  sqft?: number;
  lot_sqft?: number;
  year_built?: number;
  condition?: 1 | 2 | 3 | 4 | 5; // 1 = teardown, 5 = move-in ready
  roof_age?: number;
  hvac_age?: number;
  has_pool?: boolean;
  flood_zone?: "X" | "AE" | "VE" | "unknown";
  construction?: "block" | "frame" | "other";
};

export type AVMResult = {
  arv_low: number;
  arv_high: number;
  estimated_repairs: number;
  cash_offer_low: number;
  cash_offer_high: number;
  confidence: "low" | "medium" | "high";
  rationale: string;
  key_risks: string[];
  questions_to_ask_seller: string[];
};

export type PhotoAssessment = {
  overall_condition: 1 | 2 | 3 | 4 | 5;
  estimated_repair_cost_usd: number;
  flags: { area: string; severity: "minor" | "moderate" | "major"; note: string }[];
  positives: string[];
  summary: string;
};

export type LeadIntake = {
  name?: string;
  email?: string;
  phone?: string;
  address: string;
  timeline?: "asap" | "30_days" | "60_days" | "90_plus" | "just_looking";
  reason?: string;
  condition_self_rating?: 1 | 2 | 3 | 4 | 5;
  mortgage_balance?: number;
  notes?: string;
};

export type LeadScore = {
  motivation: number;
  urgency: number;
  deal_quality: number;
  composite: number;
  tier: "hot" | "warm" | "cool" | "cold";
  signals_found: string[];
  next_action: string;
  suggested_follow_up: {
    channel: "sms" | "call" | "email";
    timing: string;
    draft_message: string;
  };
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
