# Devpost Submission Fields

Paste-ready copy for the final submission form.

## Project Name

Agent Revenue Control Room

## Tagline

A human approval console for solo builders using AI agents to do revenue work.

## Built With

```text
Qwen Cloud, Alibaba Cloud Function Compute, Python, JavaScript, HTML, CSS, Playwright
```

## App Link

```text
https://daideguchi.github.io/agent-revenue-control-room/
```

## Source Code

```text
https://github.com/daideguchi/agent-revenue-control-room
```

## Submitted Devpost Project

```text
https://devpost.com/software/agent-revenue-control-room
```

## Demo Video

```text
https://www.youtube.com/watch?v=u6WNlAJ_F88
```

Direct MP4 backup:

```text
https://daideguchi.github.io/agent-revenue-control-room/media/demo-walkthrough.mp4
```

## Inspiration

AI agents are starting to work like real teammates. They can research, write, deploy, publish, and help with revenue work. That is powerful, but it creates a new problem for solo builders: the agent may move faster than the human can supervise.

I built Agent Revenue Control Room for that moment. The goal is not silent autopilot. The goal is faster human-AI work where cost, proof, approval, and handoff are always visible.

## What It Does

Agent Revenue Control Room turns an AI-agent run into a human-reviewable work packet.

A solo builder can:

- pick an agent run
- read a plain-language summary
- check the evidence ledger
- check the cost guard and stop rule
- build a review packet through the backend
- approve, ask for proof, or stop
- leave an action log for the next human or AI

The first screen shows the core answer: who it is for, what pain it solves, and which live proof exists.

## How We Built It

The frontend is a lightweight HTML/CSS/JavaScript app deployed on GitHub Pages.

The backend is a Python service deployed on Alibaba Cloud Function Compute. The public Function Compute endpoint is intentionally configured without a Qwen API key, so it can be safely used as a public proof endpoint without exposing secrets.

Qwen Cloud is used separately through a bounded live smoke test from the backend code. The repository keeps the proof split on purpose:

- Qwen Cloud live model proof
- Alibaba Function Compute live endpoint proof

This keeps the project honest and makes secret-handling risk visible instead of hiding it.

## How Qwen Is Used

Qwen is used for bounded review-packet generation: summarizing an agent run, restating evidence, cost, approval, and stop conditions.

Qwen does not approve work by itself. The human still chooses approve, ask for proof, or stop.

## How Alibaba Cloud Is Used

Alibaba Cloud Function Compute hosts the live backend proof endpoint:

```text
https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/healthz
```

The public endpoint returns HTTP 200 and proves that the backend is running on Alibaba Cloud. It intentionally returns safe no-key packets for public demos.

## Challenges

The hardest part was balancing real platform proof with safe secret handling.

For a hackathon, it is tempting to wire everything together and show one simple success path. But agent tools are dangerous if they hide cost or credential risk. I chose to separate Qwen model proof from the public Alibaba endpoint proof, so judges can see both the real integration and the safety boundary.

## Accomplishments

- built a bilingual English/Japanese operational console
- deployed a live Alibaba Function Compute backend
- verified the public UI calls the Alibaba endpoint
- recorded Qwen Cloud live smoke evidence
- added an evidence ledger, cost guard, human gate, and action log
- kept raw secrets out of Git, screenshots, logs, and the public endpoint
- created a public demo video, architecture diagram, and verification scripts

## What We Learned

The core problem of agentic software is not just making agents act. It is making agent work reviewable.

When AI agents can touch revenue, deployment, publishing, or customer workflows, the missing layer is not another chatbot. It is a control room that shows cost, proof, approval, and handoff.

## What's Next

- add a provider-secret deployment path for live Qwen calls from the public backend
- persist action logs
- import real agent run logs
- add team approval roles
- add more languages for global operators
- support exportable handoff packets for humans and AI agents

## Claim Boundary

Do not edit this out during final submission:

```text
The public Alibaba Function Compute endpoint is intentionally deployed without a Qwen API key.
Live Qwen model proof and Alibaba Cloud deployment proof are both present, but they are recorded separately.
```
