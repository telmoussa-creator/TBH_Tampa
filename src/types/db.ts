import type { AVMResult, LeadScore, PhotoAssessment, PropertyFacts } from "./index";

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string;
          email: string | null;
          address: string;
          reason: string | null;
          timeline: "asap" | "30_days" | "60_days" | "90_plus" | "just_looking" | null;
          notes: string | null;
          source: string | null;
          ai_score: LeadScore | null;
          tier: "hot" | "warm" | "cool" | "cold" | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone: string;
          email?: string | null;
          address: string;
          reason?: string | null;
          timeline?: "asap" | "30_days" | "60_days" | "90_plus" | "just_looking" | null;
          notes?: string | null;
          source?: string | null;
          ai_score?: LeadScore | null;
          tier?: "hot" | "warm" | "cool" | "cold" | null;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      offers: {
        Row: {
          id: string;
          created_at: string;
          lead_id: string | null;
          address: string;
          facts: PropertyFacts;
          avm: AVMResult;
          photo_assessment: PhotoAssessment | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          lead_id?: string | null;
          address: string;
          facts: PropertyFacts;
          avm: AVMResult;
          photo_assessment?: PhotoAssessment | null;
        };
        Update: Partial<Database["public"]["Tables"]["offers"]["Insert"]>;
        Relationships: [];
      };
      chat_sessions: {
        Row: {
          id: string;
          created_at: string;
          visitor_id: string | null;
          messages: Json;
          lead_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          visitor_id?: string | null;
          messages?: Json;
          lead_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["chat_sessions"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
