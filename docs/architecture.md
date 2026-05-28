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

## Qwen Use

Qwen is used only for a bounded review packet:

- summarize the selected run
- identify what evidence exists
- restate the cost boundary
- state the human approval choice

Qwen does not approve the work by itself.

## Alibaba Cloud Use

The backend is designed for Alibaba Function Compute.
The minimum deployment proof is:

- public `/healthz` route
- public `/api/qwen-brief` route
- screenshot or video showing the Function Compute endpoint
- source code in this repository

## Claim Boundary

Current local app:

- static UI works
- local deterministic Qwen packet preview works
- backend code exists
- offline backend smoke works
- one local live backend smoke reached Qwen Cloud

Do not claim final Alibaba Cloud deployment until a Function Compute endpoint is live and verified.
