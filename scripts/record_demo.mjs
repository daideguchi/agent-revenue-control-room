import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import fs from 'fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaDir = path.join(root, 'media');
const videoDir = path.join(mediaDir, 'demo-recording');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const relative = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(root, relative));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }
  try {
    const body = await fs.readFile(filePath);
    res.writeHead(200, { 'content-type': contentTypes[path.extname(filePath)] || 'text/plain; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await fs.rm(videoDir, { recursive: true, force: true });
await fs.mkdir(videoDir, { recursive: true });

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } }
});
const page = await context.newPage();
await page.addInitScript(() => localStorage.setItem('arrc_lang', 'en'));
await page.goto(`http://127.0.0.1:${port}/`);
await page.waitForSelector('text=Agent Revenue Control Room');

await page.addStyleTag({
  content: `
    .demo-caption {
      position: fixed;
      left: 28px;
      right: 28px;
      bottom: 24px;
      z-index: 9999;
      padding: 18px 22px;
      border: 1px solid rgba(255,255,255,.24);
      border-radius: 10px;
      background: rgba(15, 28, 30, .94);
      color: #f7fbf8;
      font: 800 24px/1.35 Inter, Arial, sans-serif;
      box-shadow: 0 18px 46px rgba(0,0,0,.22);
    }
    .demo-focus {
      outline: 4px solid #f0b36d !important;
      outline-offset: 4px !important;
    }
  `
});

async function caption(text) {
  await page.evaluate((value) => {
    let node = document.querySelector('.demo-caption');
    if (!node) {
      node = document.createElement('div');
      node.className = 'demo-caption';
      document.body.appendChild(node);
    }
    node.textContent = value;
  }, text);
}

async function focus(selector) {
  await page.evaluate((sel) => document.querySelectorAll('.demo-focus').forEach((node) => node.classList.remove('demo-focus')), selector);
  await page.locator(selector).first().evaluate((node) => node.classList.add('demo-focus'));
}

await caption('AI agents can work fast. This control room keeps cost, proof, approval, and handoff visible.');
await delay(2600);

await focus('[data-run-id="cloud-deployer"]');
await page.locator('[data-run-id="cloud-deployer"]').click();
await caption('Pick a real agent run: the Alibaba Function Compute deployer.');
await delay(2200);

await focus('.guard-facts');
await caption('The human sees the budget, spent amount, and the exact stop rule before approving anything.');
await delay(2400);

await focus('#evidenceList');
await caption('The evidence ledger shows what is proven: HTTP 200, Python runtime, no public Qwen key, safe offline mode.');
await delay(2700);

await focus('#draftBtn');
await page.click('#draftBtn');
await page.waitForFunction(() => {
  const text = document.querySelector('#qwenOutput')?.textContent || '';
  return text.includes('Alibaba Function Compute packet') || text.includes('Qwen Cloud packet') || text.includes('Offline preview packet');
});
await caption('Build packet calls the live Alibaba Function Compute endpoint. Qwen live proof is kept separately, without leaking secrets.');
await delay(3300);

await focus('#proofBtn');
await page.click('#proofBtn');
await caption('The human chooses approve, ask for proof, or stop. The decision is logged for the next human or AI.');
await delay(2600);

await page.click('#langJa');
await page.waitForSelector('text=AI収益管制室');
await caption('The same workflow is readable in Japanese, because real operators are global.');
await delay(2600);

await page.evaluate(() => document.querySelectorAll('.demo-focus').forEach((node) => node.classList.remove('demo-focus')));
await caption('Agent Revenue Control Room: faster AI work, with human control.');
await delay(2800);

await context.close();
await browser.close();
server.close();

const files = await fs.readdir(videoDir);
const video = files.find((file) => file.endsWith('.webm'));
if (!video) throw new Error('recorded video not found');
const source = path.join(videoDir, video);
const target = path.join(mediaDir, 'demo-walkthrough.webm');
await fs.copyFile(source, target);
console.log(`demo_video=${target}`);
