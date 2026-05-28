const BACKEND_URL = 'https://agent-rrol-room-qaoqbueeak.ap-northeast-1.fcapp.run';

const runs = [
  {
    id: 'devpost-finalizer',
    lane: 'Hackathon submission',
    title: {
      en: 'Devpost finalizer agent',
      ja: 'Devpost提出仕上げAI'
    },
    plain: {
      en: 'An agent is preparing the final hackathon packet. It can save time, but it must not submit without a human check.',
      ja: 'AIがハッカソン提出物をまとめています。時短になりますが、人間の確認なしで提出してはいけません。'
    },
    status: 'approval',
    owner: 'Human approval',
    budget: 2.5,
    spent: 0.42,
    minutesSaved: 18,
    stopRule: {
      en: 'Stop if the agent edits Devpost, payment, or credentials.',
      ja: 'Devpost、支払い、認証情報をAIが触る場合は停止。'
    },
    decision: {
      en: 'Approve only after README, demo video, repository, and claim boundaries match.',
      ja: 'README、デモ動画、リポジトリ、主張の範囲が一致してから承認します。'
    },
    evidence: [
      ['Repo', 'README and license exist'],
      ['Video', '3-minute demo script drafted'],
      ['Proof', 'Qwen smoke test recorded'],
      ['Risk', 'Submission button still requires human approval']
    ]
  },
  {
    id: 'qwen-cost-guard',
    lane: 'Qwen Cloud',
    title: {
      en: 'Qwen cost guard agent',
      ja: 'Qwenコスト監視AI'
    },
    plain: {
      en: 'An agent is allowed to call Qwen, but only inside a small token budget with no retry loop.',
      ja: 'AIはQwenを呼べますが、小さなトークン予算内で、リトライ連発は禁止です。'
    },
    status: 'ready',
    owner: 'Autopilot allowed',
    budget: 1.2,
    spent: 0.07,
    minutesSaved: 11,
    stopRule: {
      en: 'Stop on paid activation, auto-recharge, or missing usage data.',
      ja: '有料化、自動チャージ、使用量不明なら停止。'
    },
    decision: {
      en: 'Ready for a bounded Qwen summary call. No key is shown in logs or browser terminals.',
      ja: '制限つきのQwen要約呼び出しは可能です。キーはログやブラウザ端末に出しません。'
    },
    evidence: [
      ['Smoke', 'qwen-plus returned HTTP 200'],
      ['Usage', '46 total tokens in proof call'],
      ['Billing', 'Observed cost stayed at zero after smoke'],
      ['Secret', 'Replacement key stored outside Git']
    ]
  },
  {
    id: 'youtube-operator',
    lane: 'Creator ops',
    title: {
      en: 'YouTube channel operator',
      ja: 'YouTube運用AI'
    },
    plain: {
      en: 'An agent can prepare titles, descriptions, and checks, but publishing needs a visible handoff.',
      ja: 'AIはタイトルや説明文を作れますが、公開前に見える引き継ぎが必要です。'
    },
    status: 'approval',
    owner: 'Publisher review',
    budget: 4.0,
    spent: 1.35,
    minutesSaved: 27,
    stopRule: {
      en: 'Stop if the agent cannot prove the target channel and upload asset.',
      ja: '対象チャンネルと素材を証明できなければ停止。'
    },
    decision: {
      en: 'Ask for proof before publish: channel, video file, title, thumbnail, and audience setting.',
      ja: '公開前に、チャンネル、動画、タイトル、サムネ、公開設定を確認します。'
    },
    evidence: [
      ['Channel', 'Pet AI channel selected'],
      ['Asset', 'Narration audio exists'],
      ['Copy', 'Plain Japanese description drafted'],
      ['Gap', 'Final publish click not delegated']
    ]
  },
  {
    id: 'lead-finder',
    lane: 'Revenue research',
    title: {
      en: 'Lead finder agent',
      ja: '見込み客リサーチAI'
    },
    plain: {
      en: 'An agent is finding potential buyers. The risk is sending weak outreach without proof.',
      ja: 'AIが見込み客を探しています。根拠の弱い営業文を送る危険があります。'
    },
    status: 'blocked',
    owner: 'Proof required',
    budget: 3.5,
    spent: 2.9,
    minutesSaved: 8,
    stopRule: {
      en: 'Stop when public source, fit reason, or opt-out wording is missing.',
      ja: '公開情報、相性の理由、配信停止文がなければ停止。'
    },
    decision: {
      en: 'Blocked until the agent attaches sources and a short reason for each lead.',
      ja: '各候補に根拠URLと短い理由が付くまで停止します。'
    },
    evidence: [
      ['List', '31 potential leads found'],
      ['Source', '17 leads have source links'],
      ['Fit', '9 leads have clear fit notes'],
      ['Gap', 'Opt-out sentence missing']
    ]
  },
  {
    id: 'cloud-deployer',
    lane: 'Alibaba Cloud',
    title: {
      en: 'Function Compute deployer',
      ja: 'Function Compute配置AI'
    },
    plain: {
      en: 'An agent deployed a tiny Alibaba backend, while keeping Qwen keys out of the public proof endpoint.',
      ja: 'AIが小さなAlibabaバックエンドを配置し、Qwenキーは公開証拠用エンドポイントの外に保ちました。'
    },
    status: 'ready',
    owner: 'Deployment proof',
    budget: 0.8,
    spent: 0.03,
    minutesSaved: 14,
    stopRule: {
      en: 'Stop before adding Qwen keys, paid storage, custom domains, or provisioned capacity.',
      ja: 'Qwenキー、ストレージ、独自ドメイン、常時課金を追加する前に停止。'
    },
    decision: {
      en: 'Public Function Compute endpoint is live in safe no-key mode. Qwen key stays outside the public proof endpoint.',
      ja: '公開Function Computeはキーなし安全モードで稼働中です。Qwenキーは公開証拠用エンドポイントには置きません。'
    },
    evidence: [
      ['Endpoint', 'Function Compute health returned HTTP 200'],
      ['Runtime', 'Python 3.10 custom runtime deployed'],
      ['Secret', 'No Qwen key configured on public endpoint'],
      ['Mode', 'Public endpoint returns safe offline packet']
    ]
  }
];

const copy = {
  en: {
    locator: 'Qwen Cloud Hackathon · Track 4 Autopilot Agent',
    title: 'Agent Revenue Control Room',
    tagline: 'A control room for solo builders who use AI agents to earn revenue, but still need cost limits, proof, approvals, and clean handoff logs.',
    qwenBadge: 'Alibaba + Qwen proof backend',
    whoLabel: 'Who',
    whoText: 'Solo builders running AI agents',
    painLabel: 'Pain',
    painText: 'Agents can act fast, spend money, and lose context',
    solveLabel: 'How',
    solveText: 'Turn each agent run into a reviewed, cost-bounded work packet',
    proofBackendLabel: 'Live backend',
    proofBackendText: 'Alibaba Function Compute returns HTTP 200',
    proofBackendNote: 'Public endpoint is safe no-key mode.',
    proofQwenLabel: 'Qwen proof',
    proofQwenText: 'Qwen Cloud smoke evidence is recorded',
    proofQwenNote: 'Model proof and public endpoint proof are separated.',
    proofHumanLabel: 'Human gate',
    proofHumanText: 'Approve, ask for proof, or stop',
    proofHumanNote: 'The decision becomes a handoff log.',
    mNeeds: 'Needs approval',
    mRisk: 'Cost/risk stops',
    mEvidence: 'Evidence items',
    mSaved: 'Review minutes saved',
    inboxKicker: 'Run inbox',
    inboxTitle: 'AI work waiting for human control',
    filterAll: 'All',
    filterApproval: 'Needs approval',
    filterBlocked: 'Blocked',
    filterReady: 'Ready',
    decisionKicker: 'Human gate',
    decisionTitle: 'No silent autopilot',
    approveBtn: 'Approve',
    proofBtn: 'Ask for proof',
    stopBtn: 'Stop',
    evidenceTitle: 'Evidence ledger',
    guardTitle: 'Cost guard',
    budgetLabel: 'Budget',
    spentLabel: 'Spent',
    riskLabel: 'Stop rule',
    qwenTitle: 'Qwen review packet',
    qwenNote: 'This button calls the live Alibaba Function Compute endpoint. The public endpoint is safe no-key mode; separate evidence proves Qwen Cloud live use.',
    draftBtn: 'Build packet',
    logKicker: 'Action log',
    logTitle: 'What the human decided',
    reviewKicker: '30-second judge path',
    path1: 'Pick an agent run',
    path2: 'Check cost and evidence',
    path3: 'Ask Qwen for a concise packet',
    path4: 'Approve, request proof, or stop',
    selectedRun: 'Selected run',
    noLog: 'No action yet. Decisions will appear here.',
    approved: 'Approved',
    proofAsked: 'Proof requested',
    stopped: 'Stopped',
    offlinePacket: 'Offline preview packet',
    backendPacket: 'Qwen Cloud packet',
    alibabaPacket: 'Alibaba Function Compute packet',
    qwenError: 'Live backend unavailable, showing local packet instead.',
    needsApproval: 'Needs approval',
    ready: 'Ready',
    blocked: 'Blocked',
    cost: 'cost',
    evidence: 'evidence',
    owner: 'owner'
  },
  ja: {
    locator: 'Qwen Cloud ハッカソン · Track 4 Autopilot Agent',
    title: 'AI収益管制室',
    tagline: 'AIエージェントで稼ぐ人のために、費用、証拠、承認、引き継ぎを一つにまとめる管制室です。',
    qwenBadge: 'Alibaba + Qwen 証拠バックエンド',
    whoLabel: '誰のため',
    whoText: 'AIエージェントで仕事を進める一人運営者',
    painLabel: '困りごと',
    painText: 'AIは速いが、お金を使い、文脈をなくし、勝手に進みすぎる',
    solveLabel: '解決方法',
    solveText: 'AIの作業を、証拠と費用つきの確認パックに変える',
    proofBackendLabel: '動くバックエンド',
    proofBackendText: 'Alibaba Function ComputeがHTTP 200を返します',
    proofBackendNote: '公開側はキーなし安全モードです。',
    proofQwenLabel: 'Qwen証拠',
    proofQwenText: 'Qwen Cloud接続証拠を記録済みです',
    proofQwenNote: 'モデル証拠と公開URL証拠を分けています。',
    proofHumanLabel: '人間の判断',
    proofHumanText: '承認、証拠依頼、停止を選べます',
    proofHumanNote: '判断は次の人やAIへのログになります。',
    mNeeds: '承認待ち',
    mRisk: '停止中',
    mEvidence: '証拠数',
    mSaved: '短縮できた分',
    inboxKicker: '作業一覧',
    inboxTitle: '人間の確認を待つAI作業',
    filterAll: 'すべて',
    filterApproval: '承認待ち',
    filterBlocked: '停止中',
    filterReady: '準備完了',
    decisionKicker: '人間の判断',
    decisionTitle: '勝手に進めない',
    approveBtn: '承認',
    proofBtn: '証拠を依頼',
    stopBtn: '停止',
    evidenceTitle: '証拠台帳',
    guardTitle: '費用ガード',
    budgetLabel: '予算',
    spentLabel: '使用済み',
    riskLabel: '停止ルール',
    qwenTitle: 'Qwen確認パック',
    qwenNote: 'このボタンは実際のAlibaba Function Computeを呼びます。公開側はキーなし安全モードで、Qwen実呼び出しは別の証拠に分けています。',
    draftBtn: 'パック作成',
    logKicker: '判断ログ',
    logTitle: '人間が決めたこと',
    reviewKicker: '30秒で見る流れ',
    path1: 'AI作業を選ぶ',
    path2: '費用と証拠を見る',
    path3: 'Qwenに短く整理させる',
    path4: '承認、証拠依頼、停止を選ぶ',
    selectedRun: '選択中の作業',
    noLog: 'まだ判断はありません。ここに決定が残ります。',
    approved: '承認しました',
    proofAsked: '証拠を依頼しました',
    stopped: '停止しました',
    offlinePacket: 'ローカル確認パック',
    backendPacket: 'Qwen Cloud確認パック',
    alibabaPacket: 'Alibaba Function Compute確認パック',
    qwenError: '公開バックエンド未接続のため、ローカル確認パックを表示します。',
    needsApproval: '承認待ち',
    ready: '準備完了',
    blocked: '停止中',
    cost: '費用',
    evidence: '証拠',
    owner: '担当'
  }
};

const savedLanguage = localStorage.getItem('arrc_lang');
let lang = savedLanguage || ((navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en');
let selectedId = 'cloud-deployer';
let actions = [];

const $ = (selector) => document.querySelector(selector);

const jaTerms = {
  'Hackathon submission': 'ハッカソン提出',
  'Qwen Cloud': 'Qwen Cloud',
  'Creator ops': 'クリエイター運用',
  'Revenue research': '収益リサーチ',
  'Alibaba Cloud': 'Alibaba Cloud',
  'Human approval': '人間の承認',
  'Autopilot allowed': '自動実行可',
  'Publisher review': '公開前確認',
  'Proof required': '証拠が必要',
  'Cost stop': '費用で停止',
  'Deployment proof': '配置証拠',
  'Repo': 'リポジトリ',
  'README and license exist': 'READMEとライセンスがあります',
  'Video': '動画',
  '3-minute demo script drafted': '3分デモ台本を作成済みです',
  'Proof': '証拠',
  'Qwen smoke test recorded': 'Qwen接続確認を記録済みです',
  'Risk': 'リスク',
  'Submission button still requires human approval': '提出ボタンは人間の承認が必要です',
  'Smoke': '接続確認',
  'qwen-plus returned HTTP 200': 'qwen-plus が HTTP 200 を返しました',
  'Usage': '使用量',
  '46 total tokens in proof call': '確認呼び出しは合計46トークンです',
  'Billing': '請求',
  'Observed cost stayed at zero after smoke': '確認後の表示費用はゼロでした',
  'Secret': '秘密情報',
  'Replacement key stored outside Git': '交換後のキーはGitの外に保存しています',
  'Channel': 'チャンネル',
  'Pet AI channel selected': 'Pet AIチャンネルを選択済みです',
  'Asset': '素材',
  'Narration audio exists': 'ナレーション音声があります',
  'Copy': '文面',
  'Plain Japanese description drafted': '平易な日本語説明文を作成済みです',
  'Gap': '不足',
  'Final publish click not delegated': '最終公開クリックはAIに任せません',
  'List': 'リスト',
  '31 potential leads found': '候補を31件見つけました',
  'Source': '情報源',
  '17 leads have source links': '17件に情報源リンクがあります',
  'Fit': '相性',
  '9 leads have clear fit notes': '9件に相性メモがあります',
  'Opt-out sentence missing': '配信停止文がありません',
  'Console': '管理画面',
  'Function Compute console opens': 'Function Compute管理画面が開きます',
  'Role': '権限',
  'Service-linked role approved': 'サービス連携ロールを承認済みです',
  'Runtime': '実行環境',
  'Cloud Shell VM starts for one hour': 'Cloud Shell VMは1時間起動します',
  'Durable backend not deployed yet': '継続利用できるバックエンドは未配置です',
  'Endpoint': '公開URL',
  'Function Compute health returned HTTP 200': 'Function ComputeのヘルスチェックがHTTP 200を返しました',
  'Python 3.10 custom runtime deployed': 'Python 3.10カスタム実行環境を配置済みです',
  'No Qwen key configured on public endpoint': '公開エンドポイントにQwenキーは設定していません',
  'Mode': 'モード',
  'Public endpoint returns safe offline packet': '公開エンドポイントは安全なキーなしパックを返します'
};

function t(key) {
  return copy[lang][key] || copy.en[key] || key;
}

function term(value) {
  return lang === 'ja' ? (jaTerms[value] || value) : value;
}

function statusLabel(status) {
  if (status === 'approval') return t('needsApproval');
  if (status === 'ready') return t('ready');
  return t('blocked');
}

function statusClass(status) {
  if (status === 'approval') return 'warn';
  if (status === 'ready') return 'good';
  return 'danger';
}

function currentRun() {
  return runs.find((run) => run.id === selectedId) || runs[0];
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });
  document.querySelectorAll('#filterSelect option').forEach((option) => {
    option.textContent = t(option.dataset.i18n);
  });
  $('#langEn').classList.toggle('active', lang === 'en');
  $('#langJa').classList.toggle('active', lang === 'ja');
}

function renderMetrics() {
  const filteredEvidence = runs.reduce((sum, run) => sum + run.evidence.length, 0);
  $('#metricNeeds').textContent = runs.filter((run) => run.status === 'approval').length;
  $('#metricRisk').textContent = runs.filter((run) => run.status === 'blocked').length;
  $('#metricEvidence').textContent = filteredEvidence;
  $('#metricSaved').textContent = runs.reduce((sum, run) => sum + run.minutesSaved, 0);
}

function renderRunList() {
  const filter = $('#filterSelect').value;
  const visible = runs
    .filter((run) => filter === 'all' || run.status === filter)
    .sort((a, b) => {
      if (a.id === selectedId) return -1;
      if (b.id === selectedId) return 1;
      return 0;
    });
  $('#runList').innerHTML = visible.map((run) => `
    <button class="run-card ${run.id === selectedId ? 'active' : ''}" data-run-id="${run.id}" type="button">
      <h3>${run.title[lang]}</h3>
      <p>${run.plain[lang]}</p>
      <span class="mini-row">
        <span class="mini-pill">${statusLabel(run.status)}</span>
        <span class="mini-pill">${t('cost')} $${run.spent.toFixed(2)}</span>
        <span class="mini-pill">${run.evidence.length} ${t('evidence')}</span>
      </span>
    </button>
  `).join('');
  document.querySelectorAll('.run-card').forEach((button) => {
    button.addEventListener('click', () => {
      selectedId = button.dataset.runId;
      render();
    });
  });
}

function renderDetail() {
  const run = currentRun();
  $('#selectedLane').textContent = `${t('selectedRun')} · ${term(run.lane)}`;
  $('#runTitle').textContent = run.title[lang];
  $('#runPlain').textContent = run.plain[lang];
  $('#runStatus').textContent = statusLabel(run.status);
  $('#runStatus').className = `status-chip ${statusClass(run.status)}`;
  $('#runBudget').textContent = `$${run.spent.toFixed(2)} / $${run.budget.toFixed(2)}`;
  $('#runOwner').textContent = `${t('owner')}: ${term(run.owner)}`;
  $('#decisionText').textContent = run.decision[lang];
  $('#evidenceList').innerHTML = run.evidence.map(([label, value]) => `
    <div class="evidence-item">
      <strong>${term(label)}</strong>
      <span>${term(value)}</span>
    </div>
  `).join('');
  const percent = Math.min(100, Math.round((run.spent / run.budget) * 100));
  $('#guardFill').style.width = `${percent}%`;
  $('#budgetValue').textContent = `$${run.budget.toFixed(2)}`;
  $('#spentValue').textContent = `$${run.spent.toFixed(2)} (${percent}%)`;
  $('#stopRule').textContent = run.stopRule[lang];
}

function renderLog() {
  if (!actions.length) {
    $('#actionLog').innerHTML = `<div class="log-entry"><span>${t('noLog')}</span></div>`;
    return;
  }
  $('#actionLog').innerHTML = actions.slice(-6).reverse().map((entry) => {
    const run = runs.find((item) => item.id === entry.runId);
    const labels = {
      approve: t('approved'),
      proof: t('proofAsked'),
      stop: t('stopped')
    };
    return `
    <div class="log-entry">
      <strong>${labels[entry.kind]}</strong>
      <span>${run?.title?.[lang] || entry.runId} · ${entry.time}</span>
    </div>
  `;
  }).join('');
}

function localPacket(run, prefixKey = 'offlinePacket') {
  const facts = run.evidence.map(([label, value]) => `- ${term(label)}: ${term(value)}`).join('\n');
  if (lang === 'ja') {
    return `${t(prefixKey)}

対象: ${run.title.ja}
一言: ${run.plain.ja}
判断: ${run.decision.ja}
費用: $${run.spent.toFixed(2)} / $${run.budget.toFixed(2)}
停止ルール: ${run.stopRule.ja}

証拠:
${facts}

次の一手: 人間が承認、証拠依頼、停止のどれかを選びます。`;
  }
  return `${t(prefixKey)}

Run: ${run.title.en}
Plain meaning: ${run.plain.en}
Decision: ${run.decision.en}
Cost: $${run.spent.toFixed(2)} / $${run.budget.toFixed(2)}
Stop rule: ${run.stopRule.en}

Evidence:
${facts}

Next step: the human chooses approve, request proof, or stop.`;
}

async function buildPacket() {
  const run = currentRun();
  $('#qwenOutput').textContent = lang === 'ja' ? '作成中です...' : 'Building...';
  try {
    const response = await fetch(`${BACKEND_URL}/api/qwen-brief`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ language: lang, run })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const packetLabel = data.mode === 'qwen' ? t('backendPacket') : t('alibabaPacket');
    $('#qwenOutput').textContent = `${packetLabel}\n${BACKEND_URL}\n\n${data.packet}`;
  } catch {
    $('#qwenOutput').textContent = `${t('qwenError')}\n\n${localPacket(run)}`;
  }
}

function pushAction(kind) {
  const run = currentRun();
  const labels = {
    approve: t('approved'),
    proof: t('proofAsked'),
    stop: t('stopped')
  };
  actions.push({
    kind,
    runId: run.id,
    action: labels[kind],
    title: run.title[lang],
    time: new Date().toLocaleTimeString(lang === 'ja' ? 'ja-JP' : 'en-US', { hour: '2-digit', minute: '2-digit' })
  });
  renderLog();
}

function render() {
  applyLanguage();
  renderMetrics();
  renderRunList();
  renderDetail();
  renderLog();
}

$('#langEn').addEventListener('click', () => {
  lang = 'en';
  localStorage.setItem('arrc_lang', lang);
  render();
});

$('#langJa').addEventListener('click', () => {
  lang = 'ja';
  localStorage.setItem('arrc_lang', lang);
  render();
});

$('#filterSelect').addEventListener('change', renderRunList);
$('#approveBtn').addEventListener('click', () => pushAction('approve'));
$('#proofBtn').addEventListener('click', () => pushAction('proof'));
$('#stopBtn').addEventListener('click', () => pushAction('stop'));
$('#draftBtn').addEventListener('click', buildPacket);

render();
