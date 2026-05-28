# Submission Asset Manifest

## Public Links

| Asset | URL |
|---|---|
| Live app | `https://daideguchi.github.io/agent-revenue-control-room/` |
| Source repo | `https://github.com/daideguchi/agent-revenue-control-room` |
| Devpost submission | `https://devpost.com/software/agent-revenue-control-room` |
| YouTube demo | `https://www.youtube.com/watch?v=f8BB_-8lBGs` |
| Demo video MP4 backup | `https://daideguchi.github.io/agent-revenue-control-room/media/demo-walkthrough.mp4` |
| Alibaba health proof | `https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/healthz` |
| Devpost field copy | `https://github.com/daideguchi/agent-revenue-control-room/blob/main/docs/devpost-submission-fields.md` |

## Local Media

| File | Use |
|---|---|
| `media/demo-walkthrough.mp4` | Public demo video asset, 22 seconds, silent with captions |
| `media/demo-thumbnail.png` | Demo thumbnail / Devpost cover candidate |
| `media/architecture.png` | Architecture diagram PNG for Devpost upload |
| `media/architecture.svg` | Editable architecture diagram |
| `media/agent-revenue-control-room-full.png` | English desktop screenshot |
| `media/agent-revenue-control-room-ja.png` | Japanese desktop screenshot |
| `media/agent-revenue-control-room-mobile.png` | Mobile screenshot |

## Evidence Files

| File | Meaning |
|---|---|
| `evidence/2026-05-28T014405Z_backend-qwen-live-smoke.json` | Product backend code reached Qwen Cloud once |
| `evidence/2026-05-28T021155Z_alibaba-function-compute-live-health.json` | Alibaba Function Compute public health/API proof |
| `../13_new_hackathon_wave/evidence/20260528T123836Z_qwen_final_submit_after.json` | Devpost final submission proof |
| `../13_new_hackathon_wave/evidence/20260528T123836Z_qwen_final_submit_after.png` | Devpost final submission screenshot |

## Verification Commands

```bash
npm run verify
curl -s https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run/healthz
curl -s 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=f8BB_-8lBGs'
```

Expected key markers:

```text
agent_revenue_control_room_verify_ok
japanese_ui_ok
secret_scan_ok
qwen_key_present=false
offline_mode=true
```

## Final Submission State

Submitted to Devpost on 2026-05-28 JST.

The Devpost video field uses the YouTube demo URL. The GitHub Pages MP4 remains available as a direct backup asset.
