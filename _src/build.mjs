// Builds the static site from site.mjs + apps.mjs.
//   node _src/build.mjs            build (warns about [[TODO]] markers)
//   node _src/build.mjs --strict   build, but fail if any [[TODO]] remains
//   node _src/serve.mjs            preview locally the way GitHub Pages serves it

import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import site from './site.mjs';
import rawApps from './apps.mjs';
import { homePage, appPage, legalPage, contactPage, notFoundPage, TODO_RE } from './templates.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RESERVED = new Set(['contact', 'assets', 'privacy', 'privacy-policy', 'terms', '404', 'index', '_src', 'styles']);
const errors = [];
const warnings = [];

// Width/height of a PNG or JPEG, so images reserve space and don't shift layout.
function imageSize(file) {
  const b = readFileSync(file);
  if (b.toString('ascii', 1, 4) === 'PNG') return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

// ── Validate and enrich app entries ──────────────────────────────────────────
const required = ['slug', 'name', 'fullName', 'tagline', 'description', 'metaDescription', 'theme', 'features', 'privacy', 'terms'];
const seen = new Set();
const apps = rawApps.map((app) => {
  for (const k of required) if (app[k] == null) errors.push(`${app.slug ?? '(no slug)'}: missing "${k}"`);
  if (!/^[a-z0-9-]+$/.test(app.slug ?? '')) errors.push(`${app.slug}: slug must be lowercase letters, numbers and dashes`);
  if (RESERVED.has(app.slug)) errors.push(`${app.slug}: slug is reserved`);
  if (seen.has(app.slug)) errors.push(`${app.slug}: duplicate slug`);
  seen.add(app.slug);
  for (const k of ['privacy', 'terms']) {
    if (app[k] && !/^\d{4}-\d{2}-\d{2}$/.test(app[k].updated ?? '')) errors.push(`${app.slug}: ${k}.updated must be YYYY-MM-DD`);
  }

  const dir = `assets/apps/${app.slug}`;
  const iconFile = join(ROOT, dir, 'icon.png');
  const iconUrl = existsSync(iconFile) ? `/${dir}/icon.png` : null;
  if (!iconUrl) warnings.push(`${app.slug}: no ${dir}/icon.png yet, using a lettermark`);

  const screenshotList = (app.screenshots ?? []).flatMap((s) => {
    const file = join(ROOT, dir, s.file);
    if (!existsSync(file)) {
      warnings.push(`${app.slug}: screenshot ${dir}/${s.file} not found, skipped`);
      return [];
    }
    const size = imageSize(file) ?? { width: 1080, height: 2160 };
    return [{ url: `/${dir}/${s.file}`, alt: s.alt ?? `${app.name} screenshot`, ...size }];
  });

  const todos = JSON.stringify([app.privacy, app.terms, app.appStoreUrl]).replace(/\\"/g, '"').match(TODO_RE) ?? [];
  for (const t of todos) warnings.push(`${app.slug}: TODO ${t.replace(/^\[\[TODO:\s*|\]\]$/g, '').slice(0, 90)}`);
  if (!app.appStoreUrl) warnings.push(`${app.slug}: no appStoreUrl, showing "Coming soon"`);

  return { ...app, email: app.supportEmail ?? site.email, iconUrl, screenshotList, todoCount: todos.length };
});

if (errors.length) {
  console.error('Build failed:\n  ' + errors.join('\n  '));
  process.exit(1);
}

// ── Pages: URL path → [output file, render()] ────────────────────────────────
const ctx = { site, apps };
const routes = new Map();
routes.set('/', ['index.html', () => homePage(ctx)]);
routes.set('/contact', ['contact.html', () => contactPage(ctx)]);
for (const app of apps) {
  routes.set(`/${app.slug}/`, [`${app.slug}/index.html`, () => appPage(ctx, app)]);
  routes.set(`/${app.slug}/privacy`, [`${app.slug}/privacy.html`, (canon) => legalPage(ctx, app, 'privacy', canon)]);
  routes.set(`/${app.slug}/terms`, [`${app.slug}/terms.html`, (canon) => legalPage(ctx, app, 'terms', canon)]);
}

const outputs = new Map(); // file → html
for (const [path, [file, render]] of routes) outputs.set(file, render());
outputs.set('404.html', notFoundPage(ctx));

// Old URLs: a full copy of the new page, canonical pointing at the new URL.
for (const { file, copyOf } of site.legacy) {
  const route = routes.get(copyOf);
  if (!route) {
    console.error(`Build failed: legacy ${file} points at unknown page ${copyOf}`);
    process.exit(1);
  }
  if (outputs.has(file)) {
    console.error(`Build failed: legacy ${file} would overwrite a generated page`);
    process.exit(1);
  }
  outputs.set(file, route[1](copyOf));
}

// Sitemap (new URLs only) and robots.txt
const urls = [...routes.keys()].map((p) => `  <url><loc>${site.domain}${p}</loc></url>`).join('\n');
outputs.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
outputs.set('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`);

// ── Write, and remove pages left over from apps that were renamed or removed ──
const manifestFile = join(ROOT, '_src', '.generated.json');
const previous = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, 'utf8')) : [];
for (const old of previous) {
  if (!outputs.has(old) && existsSync(join(ROOT, old))) {
    rmSync(join(ROOT, old));
    console.log(`removed  ${old}`);
  }
}
for (const [file, html] of outputs) {
  mkdirSync(dirname(join(ROOT, file)), { recursive: true });
  writeFileSync(join(ROOT, file), html);
}
writeFileSync(manifestFile, JSON.stringify([...outputs.keys()].sort(), null, 2) + '\n');

console.log(`Built ${outputs.size} files for ${apps.length} apps: ${apps.map((a) => a.slug).join(', ')}`);
if (warnings.length) console.warn('\nWarnings:\n  ' + warnings.join('\n  '));
const todoTotal = apps.reduce((n, a) => n + a.todoCount, 0);
if (todoTotal && process.argv.includes('--strict')) {
  console.error(`\n--strict: ${todoTotal} [[TODO]] marker(s) remain. Not ready to publish.`);
  process.exit(1);
}
