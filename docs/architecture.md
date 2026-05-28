# Architecture

## One-Sentence Product

Agent Revenue Control Room helps a solo builder use AI agents for revenue work without losing control of cost, evidence, approvals, and handoffs.

## User

The user is a solo operator or small team that lets AI agents do real work:

- hackathon submission preparation
- creator channel operations
- lead research
- cloud deployment
- customer support drafts

## Problem

AI agents can work quickly, but they also create four risks:

- cost can grow without the human noticing
- evidence can be missing
- credentials or payment screens can be mishandled
- the next human or AI cannot understand what happened

## System Shape

```text
AI agent run
  -> Control Room inbox
  -> Evidence ledger
  -> Cost guard
  -> Human approval gate
  -> Qwen review packet
  -> Action log
```

Architecture diagram:

```text
media/architecture.svg
```

## Qwen Use

Qwen is used only for a bounded review packet:

- summarize the selected run
- identify what evidence exists
- restate the cost boundary
- state the human approval choice

Qwen does not approve the work by itself.

## Alibaba Cloud Use

The backend is deployed on Alibaba Function Compute.
The current proof is:

- public `/healthz` route
- public `/api/qwen-brief` route
- public endpoint: `https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/healthz`
- evidence file: `evidence/2026-05-28T021155Z_alibaba-function-compute-live-health.json`
- source code in this repository

## Claim Boundary

Current local app:

- static UI works
- the Qwen packet button calls the live Alibaba Function Compute endpoint
- backend code exists
- offline backend smoke works
- one local live backend smoke reached Qwen Cloud
- the public Alibaba endpoint is deployed without a Qwen API key and returns safe offline packets

Do not claim the public Alibaba endpoint calls Qwen until a provider-secret path is configured and verified.
