import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const origin = (process.argv[2] || 'https://trolink-tek.com').replace(/\/$/, '');
const ignored = new Set(['.git', '.next', 'dist', 'node_modules', 'public', 'temp']);
const sourceExtensions = new Set(['.html', '.js', '.mjs', '.css', '.json', '.md']);
const assetPattern = /\/?assets\/[A-Za-z0-9_./%()@+\-]+\.(?:png|jpe?g|webp|avif|gif|svg|ico|pdf)/gi;

async function walk(directory, output = []) {
  for (const name of await readdir(directory)) {
    if (ignored.has(name) || name.startsWith('.qa-')) continue;
    const absolute = join(directory, name);
    const info = await stat(absolute);
    if (info.isDirectory()) await walk(absolute, output);
    else if (sourceExtensions.has(extname(name).toLowerCase())) output.push(absolute);
  }
  return output;
}

const references = new Set();
for (const file of await walk(root)) {
  if (relative(root, file).replaceAll('\\', '/') === 'assets/products/manifest.json') continue;
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(assetPattern)) {
    references.add(`/${decodeURIComponent(match[0].replace(/^\//, '').split('?')[0])}`);
  }
}

const queue = [...references].sort();
const failures = [];
let cursor = 0;

async function worker() {
  while (cursor < queue.length) {
    const path = queue[cursor++];
    try {
      const response = await fetch(`${origin}${path}`, { method: 'HEAD', redirect: 'follow' });
      if (!response.ok) failures.push({ path, status: response.status, type: response.headers.get('content-type') });
    } catch (error) {
      failures.push({ path, error: error instanceof Error ? error.message : String(error) });
    }
  }
}

await Promise.all(Array.from({ length: 12 }, worker));
console.log(JSON.stringify({ origin, checked: queue.length, failures }, null, 2));
