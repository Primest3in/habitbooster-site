// Local preview that resolves URLs like GitHub Pages:
// /x → x.html, /x/ → x/index.html, unknown → 404.html.
//   node _src/serve.mjs   then open http://localhost:4000
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 4000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
const isFile = (p) => stat(p).then((s) => s.isFile(), () => false);
const isDir = (p) => stat(p).then((s) => s.isDirectory(), () => false);

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (path.split('/').some((seg) => seg.startsWith('_') || seg.startsWith('.'))) return send(res, 404, join(ROOT, '404.html'));
  const base = join(ROOT, path);
  if (path.endsWith('/') && (await isFile(join(base, 'index.html')))) return send(res, 200, join(base, 'index.html'));
  if (!path.endsWith('/') && (await isFile(base))) return send(res, 200, base);
  if (!path.endsWith('/') && (await isFile(base + '.html'))) return send(res, 200, base + '.html');
  if (!path.endsWith('/') && (await isDir(base))) { res.writeHead(301, { Location: path + '/' }); return res.end(); }
  send(res, 404, join(ROOT, '404.html'));
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}`));

async function send(res, status, file) {
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
}
