import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib import request as urlrequest
from urllib.error import HTTPError, URLError


PORT = int(os.environ.get("PORT", "9000"))
BASE_URL = os.environ.get("QWEN_BASE_URL", "https://dashscope-intl.aliyuncs.com/compatible-mode/v1")
MODEL = os.environ.get("QWEN_MODEL", "qwen-plus")
OFFLINE = os.environ.get("QWEN_OFFLINE_MODE") == "1"


def qwen_api_key():
    return os.environ.get("DASHSCOPE_API_KEY") or os.environ.get("QWEN_CLOUD_API_KEY") or os.environ.get("QWEN_API_KEY")


def effective_offline_mode():
    return OFFLINE or not qwen_api_key()


def packet(language, run):
    ja = language == "ja"
    title = (run.get("title") or {}).get(language) or (run.get("title") or {}).get("en") or "Selected run"
    plain = (run.get("plain") or {}).get(language) or (run.get("plain") or {}).get("en") or ""
    decision = (run.get("decision") or {}).get(language) or (run.get("decision") or {}).get("en") or ""
    stop_rule = (run.get("stopRule") or {}).get(language) or (run.get("stopRule") or {}).get("en") or ""
    if ja:
        return "\n".join([
            f"対象: {title}",
            f"要点: {plain}",
            f"判断: {decision}",
            f"停止ルール: {stop_rule}",
            "次の一手: 人間が証拠を見て、承認・証拠依頼・停止を選びます。",
        ])
    return "\n".join([
        f"Run: {title}",
        f"Plain meaning: {plain}",
        f"Decision: {decision}",
        f"Stop rule: {stop_rule}",
        "Next step: a human reviews the evidence and chooses approve, request proof, or stop.",
    ])


def qwen_packet(language, run):
    api_key = qwen_api_key()
    if effective_offline_mode():
        return {"mode": "offline", "packet": packet(language, run)}

    ja = language == "ja"
    system = (
        "あなたはAIエージェント運用の確認係です。費用、証拠、人間承認、停止条件だけを短く整理してください。秘密情報やAPIキーは絶対に出力しないでください。"
        if ja
        else "You are an AI-agent operations reviewer. Summarize cost, evidence, human approval, and stop conditions briefly. Never output secrets or API keys."
    )
    user = (
        "次のAI作業を、人間が30秒で判断できる確認パックにしてください。\n"
        if ja
        else "Turn this agent run into a 30-second human review packet.\n"
    ) + json.dumps(run, ensure_ascii=False)[:5500]

    body = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.2,
        "max_tokens": 220,
    }).encode("utf-8")

    req = urlrequest.Request(
        f"{BASE_URL}/chat/completions",
        data=body,
        headers={
            "authorization": f"Bearer {api_key}",
            "content-type": "application/json",
        },
        method="POST",
    )
    try:
        with urlrequest.urlopen(req, timeout=20) as res:
            data = json.loads(res.read().decode("utf-8"))
        content = (((data.get("choices") or [{}])[0].get("message") or {}).get("content") or "").strip()
        return {
            "mode": "qwen",
            "model": MODEL,
            "packet": content or packet(language, run),
            "usage": data.get("usage"),
            "response_id": data.get("id"),
        }
    except (HTTPError, URLError, TimeoutError, ValueError):
        return {"mode": "error", "packet": packet(language, run)}


class Handler(BaseHTTPRequestHandler):
    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("access-control-allow-origin", "*")
        self.send_header("access-control-allow-methods", "GET,POST,OPTIONS")
        self.send_header("access-control-allow-headers", "content-type")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_json(204, {})

    def do_GET(self):
        if self.path == "/healthz":
            self.send_json(200, {
                "ok": True,
                "service": "agent-revenue-control-room",
                "provider": "alibaba-function-compute-ready",
                "qwen_model": MODEL,
                "qwen_key_present": bool(qwen_api_key()),
                "offline_mode": effective_offline_mode(),
            })
            return
        self.send_json(404, {"ok": False, "error": "not_found"})

    def do_POST(self):
        if self.path != "/api/qwen-brief":
            self.send_json(404, {"ok": False, "error": "not_found"})
            return
        length = int(self.headers.get("content-length") or "0")
        raw = self.rfile.read(length).decode("utf-8") if length else "{}"
        try:
            payload = json.loads(raw)
        except ValueError:
            payload = {}
        language = "ja" if payload.get("language") == "ja" else "en"
        self.send_json(200, qwen_packet(language, payload.get("run") or {}))

    def log_message(self, fmt, *args):
        return


if __name__ == "__main__":
    HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
