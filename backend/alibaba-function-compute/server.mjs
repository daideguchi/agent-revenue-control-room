import http from 'http';

const PORT = Number(process.env.PORT || 9000);
const BASE_URL = process.env.QWEN_BASE_URL || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';
const MODEL = process.env.QWEN_MODEL || 'qwen-plus';
const OFFLINE = process.env.QWEN_OFFLINE_MODE === '1';
const MAX_INPUT_CHARS = 5500;

function json(res, status, body) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type'
  });
  res.end(JSON.stringify(body));
}

function cleanRun(run) {
  const text = JSON.stringify(run || {});
  return text.slice(0, MAX_INPUT_CHARS);
}

function offlinePacket(language, run) {
  const ja = language === 'ja';
  const title = run?.title?.[language] || run?.title?.en || 'Selected run';
  const plain = run?.plain?.[language] || run?.plain?.en || '';
  const decision = run?.decision?.[language] || run?.decision?.en || '';
  const stopRule = run?.stopRule?.[language] || run?.stopRule?.en || '';

  if (ja) {
    return [
      `対象: ${title}`,
      `要点: ${plain}`,
      `判断: ${decision}`,
      `停止ルール: ${stopRule}`,
      '次の一手: 人間が証拠を見て、承認・証拠依頼・停止を選びます。'
    ].join('\n');
  }
  return [
    `Run: ${title}`,
    `Plain meaning: ${plain}`,
    `Decision: ${decision}`,
    `Stop rule: ${stopRule}`,
    'Next step: a human reviews the evidence and chooses approve, request proof, or stop.'
  ].join('\n');
}

async function qwenPacket(language, run) {
  const apiKey = process.env.DASHSCOPE_API_KEY || process.env.QWEN_CLOUD_API_KEY || process.env.QWEN_API_KEY;
  if (OFFLINE || !apiKey) {
    return { mode: 'offline', packet: offlinePacket(language, run) };
  }

  const ja = language === 'ja';
  const system = ja
    ? 'あなたはAIエージェント運用の確認係です。費用、証拠、人間承認、停止条件だけを短く整理してください。秘密情報やAPIキーは絶対に出力しないでください。'
    : 'You are an AI-agent operations reviewer. Summarize cost, evidence, human approval, and stop conditions briefly. Never output secrets or API keys.';
  const user = ja
    ? `次のAI作業を、人間が30秒で判断できる確認パックにしてください。\n${cleanRun(run)}`
    : `Turn this agent run into a 30-second human review packet.\n${cleanRun(run)}`;

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: 0.2,
      max_tokens: 220
    })
  });

  if (!response.ok) {
    return { mode: 'error', packet: offlinePacket(language, run), error: `qwen_http_${response.status}` };
  }

  const data = await response.json();
  const packet = data?.choices?.[0]?.message?.content?.trim();
  return {
    mode: 'qwen',
    model: MODEL,
    packet: packet || offlinePacket(language, run),
    usage: data?.usage || null,
    response_id: data?.id || null
  };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  const raw = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(raw || '{}');
}

async function handle(req, res) {
  if (req.method === 'OPTIONS') {
    json(res, 204, {});
    return;
  }

  if (req.method === 'GET' && req.url === '/healthz') {
    json(res, 200, {
      ok: true,
      service: 'agent-revenue-control-room',
      provider: 'alibaba-function-compute-ready',
      qwen_model: MODEL,
      qwen_key_present: Boolean(process.env.DASHSCOPE_API_KEY || process.env.QWEN_CLOUD_API_KEY || process.env.QWEN_API_KEY),
      offline_mode: OFFLINE
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/qwen-brief') {
    try {
      const body = await readBody(req);
      const result = await qwenPacket(body.language === 'ja' ? 'ja' : 'en', body.run || {});
      json(res, 200, result);
    } catch {
      json(res, 500, { mode: 'error', packet: 'Backend error. No secret was logged.' });
    }
    return;
  }

  json(res, 404, { ok: false, error: 'not_found' });
}

async function smoke() {
  const run = {
    title: { en: 'Smoke run', ja: '接続確認' },
    plain: { en: 'Backend smoke test', ja: 'バックエンド接続確認' },
    decision: { en: 'No deployment claim without proof', ja: '証拠なしに配置済みとは言わない' },
    stopRule: { en: 'No paid activation', ja: '有料化しない' }
  };
  const result = await qwenPacket('en', run);
  console.log(JSON.stringify({
    ok: true,
    mode: result.mode,
    model: result.model || MODEL,
    packet_present: Boolean(result.packet),
    usage_total_tokens: result.usage?.total_tokens || null,
    response_id: result.response_id || null
  }, null, 2));
}

if (process.argv.includes('--smoke')) {
  await smoke();
} else {
  http.createServer(handle).listen(PORT, '0.0.0.0', () => {
    console.log(`agent-revenue-control-room backend listening on ${PORT}`);
  });
}
