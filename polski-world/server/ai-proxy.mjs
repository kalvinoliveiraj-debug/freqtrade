/**
 * Minimal AI proxy for the Polski World conversation partner.
 *
 * The mobile app must never embed an Anthropic API key (anyone can extract it
 * from a shipped binary). Instead the app points `@anthropic-ai/sdk` at this
 * proxy via EXPO_PUBLIC_AI_PROXY_URL; the proxy injects the real key from the
 * server environment and forwards to api.anthropic.com.
 *
 * Run:
 *   ANTHROPIC_API_KEY=sk-ant-... node server/ai-proxy.mjs
 *   # then in the app's environment:
 *   EXPO_PUBLIC_AI_PROXY_URL=http://<your-lan-ip>:8787
 *
 * This is a reference implementation — deploy it as a small server / serverless
 * function in production, and add auth + rate limiting before going live.
 */
import http from 'node:http';

const PORT = process.env.PORT ?? 8787;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const UPSTREAM = 'https://api.anthropic.com';

if (!API_KEY) {
  console.error('Set ANTHROPIC_API_KEY in the environment before starting.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // CORS for Expo web / dev.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();

  if (req.method !== 'POST' || !req.url?.startsWith('/v1/')) {
    return res.writeHead(404).end('Not found');
  }

  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', async () => {
    try {
      const upstream = await fetch(UPSTREAM + req.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': API_KEY, // injected server-side; the client never sees it
          'anthropic-version': '2023-06-01',
        },
        body: Buffer.concat(chunks),
      });
      const body = await upstream.text();
      res.writeHead(upstream.status, { 'content-type': 'application/json' });
      res.end(body);
    } catch (err) {
      res.writeHead(502, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: String(err) }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Polski World AI proxy → ${UPSTREAM} listening on :${PORT}`);
});
