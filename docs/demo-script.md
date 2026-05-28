# Demo Script

Target length: under 3 minutes.

## Opening

AI agents are becoming useful coworkers.
They can write, research, deploy, and publish.
But when an agent starts doing real revenue work, a solo builder needs one thing:
a control room.

Agent Revenue Control Room is that control room.

## Who, Problem, Solution

This is for solo builders and small teams using AI agents to earn revenue.

The problem is simple:
agents move fast, but cost, evidence, approvals, and handoffs get messy.

This app turns each agent run into a clear review packet.
The human can see what happened, what it may cost, what proof exists, and whether to approve, ask for proof, or stop.

## Product Walkthrough

First, pick an agent run from the inbox.

The center panel explains the work in plain language.
The evidence ledger shows what proof exists.
The cost guard shows the budget, spend, and stop rule.

Now click Build packet.
The app calls a live Alibaba Function Compute endpoint.
For public safety, this endpoint has no Qwen key configured.
It proves the backend deployment without exposing secrets.

The Qwen Cloud live model call is proven separately in the evidence file.
That keeps the demo honest: real Qwen proof, real Alibaba deployment proof, no leaked key.

Finally, the human chooses approve, ask for proof, or stop.
That decision goes into the action log so another human or AI can continue the work.

## Closing

The point is not to let agents run without control.
The point is to let humans work faster while keeping cost, proof, and responsibility visible.

If AI agents are the new workers, this is the manager console for revenue work.
