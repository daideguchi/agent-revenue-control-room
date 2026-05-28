# Claude Opus Final UI/UX Prompt

Use this prompt for the final UI/UX pass.

```text
You are the final UI/UX specialist for a serious hackathon submission.

Project:
Agent Revenue Control Room

Repository path:
/Users/dd/000_AI組織/__hackason/agent-revenue-control-room-public

Live app:
https://daideguchi.github.io/agent-revenue-control-room/

GitHub:
https://github.com/daideguchi/agent-revenue-control-room

Hackathon:
Global AI Hackathon Series with Qwen Cloud
Track 4: Autopilot Agent

Product thesis:
AI agents can do real revenue work, but solo builders need a control room.
This product turns each AI-agent run into a human-reviewable packet with cost, evidence, approval, and handoff logs.

One-sentence explanation:
Agent Revenue Control Room helps solo builders using AI agents turn fast agent work into clear, cost-bounded, evidence-backed review packets before anything gets approved, published, or handed off.

Target user:
Solo builders and very small teams using AI agents for hackathon submissions, cloud deployment, creator operations, lead research, and sales/customer work.

Main pain:
AI agents move fast, but humans lose track of:
- what the agent did
- what it cost
- what proof exists
- what needs human approval
- what another human or AI should do next

Core demo flow:
1. Open the dashboard.
2. Start from the Function Compute deployer run.
3. Show the evidence ledger.
4. Show the cost guard and stop rule.
5. Click Build packet.
6. Show that the UI calls the live Alibaba Function Compute endpoint.
7. Choose approve, ask for proof, or stop.
8. Show the action log as the handoff record.

Current proof that must not be broken:
- Public UI is already live on GitHub Pages.
- `Build packet` calls this Alibaba Function Compute endpoint:
  https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/api/qwen-brief
- Public health proof:
  https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/healthz
- The public Alibaba endpoint intentionally has no Qwen API key.
- The endpoint should show safe no-key behavior.
- Qwen Cloud live use is proven separately by:
  evidence/2026-05-28T014405Z_backend-qwen-live-smoke.json
- Alibaba Function Compute deployment proof is:
  evidence/2026-05-28T021155Z_alibaba-function-compute-live-health.json

Critical claim boundary:
Do not claim that the public Alibaba endpoint calls Qwen directly.
It does not.
It is a safe no-key proof endpoint.
The app separates:
1. Qwen Cloud live smoke proof
2. Alibaba Function Compute live endpoint proof

This boundary is intentional and should be presented as responsible agent governance, not as a weakness.

Existing verification command:
npm run verify

It must pass after your work.

No-secret rule:
Do not add, print, paste, or request API keys.
Do not change private credential paths.
Do not add screenshots or text that reveal keys.
Do not edit evidence files to overclaim.

Allowed work:
- Improve visual hierarchy.
- Improve spacing, typography, contrast, responsive layout, and polish.
- Make the first 30 seconds clearer for judges.
- Improve Japanese and English UI wording if it stays accurate.
- Improve README presentation if useful.
- Update screenshots by running `npm run verify`.
- Improve the captioned demo script or recording helper if needed.
- Add small UI affordances that explain the live backend proof, cost guard, evidence ledger, and human gate.

Not allowed:
- Do not remove Japanese support.
- Do not remove the language switcher.
- Do not remove the evidence ledger, cost guard, human gate, Qwen packet panel, or action log.
- Do not change the Alibaba endpoint unless you verify the new endpoint live.
- Do not claim final Devpost submission.
- Do not submit to Devpost.
- Do not turn this into a generic landing page.
- Do not add decorative bloat, marketing hero fluff, fake charts, fake numbers, or mock-only claims.
- Do not hide the safety boundary around the public no-key endpoint.
- Do not add dependencies unless there is a strong reason.

Design direction:
This should feel like an operational console, not a marketing site.
The judge should immediately understand:
- who it is for
- what problem it solves
- what is live and real
- where Qwen is used
- where Alibaba Cloud is used
- how the human stays in control

Preferred style:
- calm, polished, serious
- dense but readable
- clear status badges
- strong first viewport
- no nested cards
- no giant hero illustration
- no gradients as the main design idea
- no fake analytics
- no text overlap on mobile
- Japanese must remain natural and readable

Recommended final checks:
1. Run `npm run verify`.
2. Confirm desktop screenshot looks coherent.
3. Confirm Japanese screenshot has no broken button text or awkward wrapping.
4. Confirm mobile screenshot is readable.
5. Confirm public `/healthz` still returns HTTP 200.
6. Confirm `Build packet` still shows an Alibaba Function Compute packet.
7. Confirm README still links:
   - architecture image
   - demo video
   - evidence files
   - Devpost draft
8. Leave a short handoff note describing exactly what changed and what remains.

Deliverable:
Make only focused UI/UX and copy polish changes.
Then report:
- changed files
- why the changes improve judge comprehension
- verification results
- remaining risks before final Devpost submission
```
