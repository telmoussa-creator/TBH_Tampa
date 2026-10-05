# Seller Caller A/B test

Built Oct 5 2026. Test only. Do not point a published number at these prompts.

## Lines
- Caller A (control): Bon Jovi script as-is + shared gold. Put only on a dead test DID (562-378-5736 if it is still unpublished and disabled).
- Caller B (treatment): V10 intake joined to v43 negotiation, rewired to read Tarek's numbers from lookup on this call. Second dead DID only.
- Do not replace v63 on 860-483-9005. That number stays untouched until a winner exists.
- No callbacks fire.

## Shared (both callers)
- Most-tested engine. Do not change the engine for this test.
- Aug 6 break-even line.
- Lock rule.
- Tuning picks from the audit page.
- Four gold pieces (below). 5% meet-in-the-middle is banned.

## Gold
1. Live recalc when the seller says new roof, remodel, or similar. Uses the existing recalculate button. Before anyone says deal, check the seller's number against Tarek's locked offer. The agent never speaks a dollar.
2. Tone match. Grief: softer and slower. Anger: shorter, quicker to the numbers. Investor: straight numbers. Laugh when funny, pause when heavy.
3. Report card on every call: repeated questions, talk-overs, longest dead air.
4. Second ask if they dodge the number: "Totally fine. Even a rough range or guess helps Tarek review the file." Then wait. Do not hang up. Do not ask a third time.

## Banned
- Meeting them in the middle if they are within 5%.
- Any spoken offer, range, or split that is not already Tarek's locked number read back by a human.
- Callbacks.
- Publishing either DID.

## Pass
Twenty scenarios in eval-20.md must pass before either number is dialed. Fail if the agent states a dollar, offers the 5% meet, talks over a pause, hangs up after one dodge, or books a callback.
