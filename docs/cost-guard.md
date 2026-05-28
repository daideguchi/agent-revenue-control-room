# Cost Guard

This project exists because AI agents can save time and also create hidden risk.

## Rules

- No raw API keys in browser terminals, screenshots, Devpost, Git, or README.
- No paid activation without explicit human approval.
- No auto-recharge.
- No provisioned capacity unless explicitly approved.
- No storage add-ons, custom domains, or traffic-heavy demos during MVP validation.
- No retry loops for live model calls.

## Qwen Call Limit

For validation:

```text
max live calls per proof step: 1
max output tokens: 220
model: qwen-plus unless changed intentionally
```

## Estimated Time Saved

The UI metric is intentionally simple:

```text
review minutes saved = sum of sample run minutesSaved values
```

In a real workspace this would come from action logs:

```text
minutes saved = one-click reviewed actions * configured manual-review estimate
```

## Public Wording

Allowed:

```text
Qwen Cloud API route was live-tested.
The backend is designed for Alibaba Function Compute.
```

Not allowed until verified:

```text
The final app is deployed on Alibaba Cloud.
```
