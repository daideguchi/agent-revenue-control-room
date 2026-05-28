# Devpost Draft

## Project Name

Agent Revenue Control Room

## Tagline

A human approval console for solo builders using AI agents to do revenue work.

## One-Sentence Pitch

Agent Revenue Control Room helps solo builders turn fast AI-agent work into clear, cost-bounded, evidence-backed review packets before anything gets approved, published, or handed off.

## Who It Is For

This is for solo builders and small teams who use AI agents to do real work:

- prepare hackathon submissions
- deploy small cloud services
- run creator operations
- research leads
- draft customer or sales work

These people want the speed of AI, but they still need control.

## The Problem

AI agents can move faster than a human can comfortably supervise.

That creates a very practical problem:

- What did the agent actually do?
- How much did it cost?
- What proof exists?
- Is a human approval needed?
- What should the next human or AI do?

Without a control room, the work becomes messy. The agent may save time, but the human loses confidence.

## What It Does

Agent Revenue Control Room gives every AI-agent run a simple review workflow:

1. Pick an agent run from the inbox.
2. Read the plain-language summary.
3. Check the evidence ledger.
4. Check the cost guard and stop rule.
5. Build a review packet through the backend.
6. Approve, ask for proof, or stop.
7. Save the decision in the action log.

The goal is not silent autopilot.
The goal is faster work with visible human control.

## How Qwen Is Used

Qwen is used where it is useful and safe: making a short review packet from a bounded agent-run summary.

Qwen does not approve the work.
Qwen does not touch payment screens.
Qwen does not receive raw secrets.

The human still makes the final decision.

## Alibaba Cloud Proof

The project includes a deployed Alibaba Function Compute backend:

```text
https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/healthz
```

The public endpoint is intentionally safe:

- it returns HTTP 200
- it proves the backend is running on Alibaba Cloud
- it has no Qwen API key configured
- it returns safe offline packets for the public demo route

Live Qwen model proof is recorded separately in the repository evidence file.
This keeps the submission honest: real Qwen proof, real Alibaba deployment proof, no exposed key.

## Why This Matters

The next wave of software will not be one human clicking every button manually.
It will be humans and AI agents working together.

But if agents are going to help with revenue work, humans need a place to review cost, proof, approval, and handoff.

That is what this project is.
It is a control room for human-AI revenue work.

## Built With

- Qwen Cloud API
- Alibaba Cloud Function Compute
- HTML, CSS, and JavaScript
- Python backend for the Function Compute route
- Playwright verification and demo recording

## What Is Working Now

- public GitHub Pages app
- English and Japanese UI
- evidence ledger
- cost guard
- human approval actions
- action log
- live Alibaba Function Compute endpoint
- local backend live smoke test against Qwen Cloud
- architecture diagram
- captioned demo video asset
- no-secret verification

## Claim Boundary

This project does not claim that the public Alibaba endpoint calls Qwen directly.
The public endpoint is deliberately deployed without a Qwen key.

The repository separates the proof:

- Qwen Cloud live smoke evidence
- Alibaba Function Compute live endpoint evidence

This boundary is intentional because agent tools should not hide cost or secret-handling risk.

## Next Steps

- Add a provider-secret deployment path for the public backend.
- Add persistent action logs.
- Add workspace import from real agent logs.
- Add team roles for approval workflows.
- Add more language modes for global operators.
