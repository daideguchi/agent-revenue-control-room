# Alibaba Function Compute Backend

This folder contains tiny backends intended for Alibaba Cloud Function Compute.

Use `app.py` first if the console is set to the default `python3 app.py` custom runtime.
Use `server.mjs` if a Node.js runtime is selected.

It exposes two routes:

- `GET /healthz` - safe health proof for screenshots and deployment checks
- `POST /api/qwen-brief` - bounded Qwen Cloud review packet generation

## Required Environment Variables

```text
DASHSCOPE_API_KEY=your Qwen Cloud key
QWEN_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
QWEN_MODEL=qwen-plus
PORT=9000
```

The raw key must be entered only through a provider secret or environment-variable UI.
Do not paste it into Cloud Shell, screenshots, README, Devpost, or Git.

## Local Safe Smoke

```bash
npm run backend:smoke:offline
QWEN_OFFLINE_MODE=1 python3 backend/alibaba-function-compute/app.py
```

This uses `QWEN_OFFLINE_MODE=1` and does not call Qwen.

## Live Smoke Boundary

Use at most one tiny live call when validating the real Qwen route.
Do not run retry loops.
Do not enable paid add-ons.
Do not claim durable Alibaba deployment until Function Compute has a verified public endpoint.
