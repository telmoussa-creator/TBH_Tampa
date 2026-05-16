# Tarek Buys Houses — TBH Tampa

An AI-first iBuyer platform for **www.tarekbuyshouses.com**. Built to do what Opendoor does — instant cash offers, photo-driven inspections, lead intake — but Tampa-focused, with Claude wired into every step, and without the 5% service fee.

## What's in here

```
src/
├── app/
│   ├── page.tsx                  # Landing
│   ├── how-it-works, about,      # Marketing
│   │   reviews, faq/
│   ├── offer/
│   │   ├── page.tsx              # Address + facts → AI offer
│   │   ├── photos/page.tsx       # Photo upload → vision AI condition
│   │   └── result/page.tsx       # Claim form → lead capture + score
│   ├── dashboard/page.tsx        # Operator view (skeleton)
│   └── api/
│       ├── chat/route.ts         # Streaming Claude concierge
│       ├── avm/route.ts          # AI valuation
│       ├── photo-analysis/route.ts
│       ├── lead-score/route.ts
│       └── lead/route.ts         # Capture + score
├── components/                   # UI
├── lib/
│   ├── claude.ts                 # Anthropic SDK + brand/AVM/photo/lead system prompts (cached)
│   ├── avm.ts                    # AVM engine
│   ├── lead-score.ts             # Motivation scoring
│   ├── photo-analysis.ts         # Vision condition AI
│   ├── supabase.ts
│   └── utils.ts
└── types/index.ts
supabase/schema.sql               # DB schema
```

## AI features (all powered by Claude)

| Feature | Where | Model | How |
| --- | --- | --- | --- |
| **Instant AVM** | `lib/avm.ts` | Sonnet 4.6 | Cash-buyer formula (ARV × 0.75 − repairs) with Tampa market context. Returns a structured JSON offer range + rationale + risk flags. |
| **Vision condition AI** | `lib/photo-analysis.ts` | Sonnet 4.6 | Multi-image input → condition rating (1–5), repair $, severity-tagged flags. |
| **Concierge chat** | `lib/claude.ts` + `api/chat` | Sonnet 4.6 (streamed) | 24/7 seller intake with brand voice, never invents prices, always ends with a next step. |
| **Lead scoring + follow-up draft** | `lib/lead-score.ts` | Haiku 4.5 | Motivation × urgency × deal quality → tier + ready-to-send follow-up message. |

All system prompts use `cache_control: ephemeral` so the static brand/AVM context is cached across requests (~90% savings on input tokens).

## Run locally

```bash
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY at minimum.

npm install
npm run dev
```

Open http://localhost:3000.

## Required env

- `ANTHROPIC_API_KEY` — required for everything AI.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — required when you wire lead persistence in `api/lead/route.ts`.

Optional: RentCast / ATTOM (property data enrichment), Google Maps (address autocomplete), Twilio (SMS follow-up).

## How this beats Opendoor

1. **AI that explains itself.** Every offer comes with a plain-English rationale + risk flags. Opendoor's offer is a black box.
2. **No service fee.** Opendoor charges 4–6%. We charge $0.
3. **Buys distressed.** Opendoor cherry-picks pristine homes. We buy probate, code violations, hoarders, roof problems.
4. **Local + 24/7 AI concierge.** Claude answers questions instantly; Tarek's team handles the closing.
5. **Faster.** 7-day close vs Opendoor's 14–60.

## Operator dashboard

`/dashboard` is gated behind Supabase magic-link auth + an email allowlist
(`DASHBOARD_ADMIN_EMAILS`). Operators get:

- Stat tiles (hot leads in 24h, walkthroughs, in-contract, closed)
- Kanban (new → walkthrough → contract → closed → dead)
- Lead detail with AI scoring breakdown + drafted SMS
- One-click "Send SMS" via Twilio (logs the message back onto the lead)
- One-click status moves

Hot leads auto-fire an ops SMS to `OPS_NOTIFY_NUMBER` the moment they're scored.

## Done in this push

- [x] Supabase persistence for leads + offers
- [x] Magic-link auth + admin allowlist gating `/dashboard`
- [x] RentCast property enrichment merged into the AVM
- [x] Google Maps Places autocomplete in `<AddressSearch />`
- [x] Twilio outbound SMS (ops alerts + operator-triggered replies)
- [x] Operator dashboard with Kanban + AI signal panel

## TODO (next)

- [ ] Chat session persistence (Supabase `chat_sessions` table)
- [ ] Inbound SMS replies via Twilio webhook → conversation thread per lead
- [ ] Comp-pull layer (ATTOM or county records) so the AVM uses real recent sales
- [ ] CRON job: every morning, score follow-ups for cool/cold leads sitting > N days
- [ ] Domain + DNS for `tarekbuyshouses.com` (Vercel deploy)
