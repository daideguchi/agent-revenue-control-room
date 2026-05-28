import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import fs from 'fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png'
};

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

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
await page.addInitScript(() => localStorage.setItem('arrc_lang', 'en'));
await page.goto(`http://127.0.0.1:${port}/`);
await page.waitForSelector('text=Agent Revenue Control Room');

const cards = await page.locator('.run-card').count();
if (cards < 5) throw new Error(`expected 5 run cards, got ${cards}`);

await page.click('#draftBtn');
await page.waitForFunction(() => document.querySelector('#qwenOutput')?.textContent?.includes('Offline preview packet'));
await page.click('#proofBtn');

const bodyEn = await page.locator('body').innerText();
for (const required of ['Solo builders', 'Cost guard', 'Evidence ledger', 'Qwen review packet', 'Proof requested']) {
  if (!bodyEn.includes(required)) throw new Error(`missing English marker: ${required}`);
}

await page.screenshot({ path: path.join(root, 'media', 'agent-revenue-control-room-full.png'), fullPage: true });

await page.click('#langJa');
await page.waitForSelector('text=AI収益管制室');
await page.click('#draftBtn');
await page.waitForFunction(() => document.querySelector('#qwenOutput')?.textContent?.includes('ローカル確認パック'));
const bodyJa = await page.locator('body').innerText();
for (const required of ['誰のため', '費用ガード', '証拠台帳', 'Qwen確認パック', '証拠を依頼']) {
  if (!bodyJa.includes(required)) throw new Error(`missing Japanese marker: ${required}`);
}
for (const leaked of ['Proof requested', 'What the human decided', 'Cost guard']) {
  if (bodyJa.includes(leaked)) throw new Error(`Japanese UI leaked English marker: ${leaked}`);
}
await page.screenshot({ path: path.join(root, 'media', 'agent-revenue-control-room-ja.png'), fullPage: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 1200 } });
await mobile.addInitScript(() => localStorage.setItem('arrc_lang', 'en'));
await mobile.goto(`http://127.0.0.1:${port}/`);
await mobile.waitForSelector('text=Agent Revenue Control Room');
await mobile.screenshot({ path: path.join(root, 'media', 'agent-revenue-control-room-mobile.png'), fullPage: true });

await browser.close();
server.close();

console.log('agent_revenue_control_room_verify_ok');
console.log(`run_cards=${cards}`);
console.log('english_ui_ok');
console.log('japanese_ui_ok');
console.log('screenshots=media/agent-revenue-control-room-full.png,media/agent-revenue-control-room-ja.png,media/agent-revenue-control-room-mobile.png');
