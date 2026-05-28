#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {"node_modules", ".git"}
RAW_SECRET_PATTERNS = [
    re.compile(r"sk-[A-Za-z0-9_-]{20,}"),
    re.compile(r"DASHSCOPE_API_KEY\s*=\s*sk-[A-Za-z0-9_-]{20,}"),
    re.compile(r"QWEN_CLOUD_API_KEY\s*=\s*sk-[A-Za-z0-9_-]{20,}"),
]

bad = []
for path in ROOT.rglob("*"):
    if path.is_dir():
      continue
    if any(part in SKIP_DIRS for part in path.parts):
      continue
    if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".webm"}:
      continue
    try:
      text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
      continue
    for pattern in RAW_SECRET_PATTERNS:
      if pattern.search(text):
        bad.append(str(path.relative_to(ROOT)))

if bad:
    print("secret_scan_failed")
    for item in bad:
      print(item)
    sys.exit(1)

print("secret_scan_ok")
