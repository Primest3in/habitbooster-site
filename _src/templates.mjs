// Shared page templates. No app-specific details belong here: everything
// about an app comes from its entry in apps.mjs.

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const TODO_RE = /\[\[TODO:\s*([\s\S]*?)\]\]/g;

const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const cssVars = (theme) =>
  Object.entries(theme)
    .filter(([k]) => !['scheme', 'fontHref', 'legalInk'].includes(k))
    .map(([k, v]) => `--${kebab(k)}:${v}`)
    .join(';');

const longDate = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

// Legal text: allows inline HTML, {email} and [[TODO: ...]] markers.
const rich = (html, app) =>
  String(html)
    .replace(/\{email\}/g, `<a href="mailto:${esc(app.email)}">${esc(app.email)}</a>`)
    .replace(TODO_RE, (_, t) => `<mark class="todo"><strong>To confirm:</strong> ${t}</mark>`);

// ── Pieces ───────────────────────────────────────────────────────────────────

export function appIcon(app, size) {
  if (app.iconUrl) {
    return `<img class="app-icon" src="${esc(app.iconUrl)}" width="${size}" height="${size}" alt="" decoding="async">`;
  }
  // No icon file yet: a lettermark in the app's colors.
  return `<svg class="app-icon" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="${esc(app.theme.accent)}"/><text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="700" fill="${esc(app.theme.onAccent)}">${esc(app.name[0])}</text></svg>`;
}

function storeButton(app) {
  return app.appStoreUrl
    ? `<a class="button" href="${esc(app.appStoreUrl)}">Download on the App Store</a>`
    : `<span class="badge">Coming soon to the App Store</span>`;
}

function nav(site) {
  return `<nav class="nav wrap" aria-label="Main">
      <a class="brand" href="/">${esc(site.developer)}</a>
      <div class="nav-links"><a href="/#apps">Apps</a><a href="/contact">Contact</a></div>
    </nav>`;
}

function footer(site, apps) {
  const links = [
    `<a href="/">Home</a>`,
    ...apps.map((a) => `<a href="/${a.slug}/">${esc(a.name)}</a>`),
    `<a href="/contact">Contact</a>`,
  ].join('<span aria-hidden="true"> · </span>');
  return `<footer class="site-footer">
    <nav aria-label="Footer"><p>${links}</p></nav>
    <p>© ${new Date().getFullYear()} ${esc(site.developer)}. All rights reserved.</p>
  </footer>`;
}

// ── Layout ───────────────────────────────────────────────────────────────────

function layout(ctx, { title, description, path, canonicalPath = path, bodyClass, theme, top, main, icon, head = '' }) {
  const { site, apps } = ctx;
  const url = site.domain + canonicalPath;
  const iconTags = icon
    ? `<link rel="icon" href="${esc(icon)}"><link rel="apple-touch-icon" href="${esc(icon)}"><meta property="og:image" content="${esc(site.domain + icon)}">`
    : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(url)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(url)}">
  <meta name="theme-color" content="${esc(theme.bg)}">
  <meta name="color-scheme" content="${theme.scheme === 'light' ? 'light' : 'dark'}">
  ${iconTags}
  <link rel="stylesheet" href="/styles.css">
  ${head}
  <style>:root{${cssVars(theme)}}</style>
</head>
<body class="${bodyClass}">
  <header class="top">
    ${nav(site)}
    ${top}
  </header>
  <main id="main">
${main}
  </main>
  ${footer(site, apps)}
</body>
</html>
`;
}

// ── Pages ────────────────────────────────────────────────────────────────────

export function homePage(ctx) {
  const { site, apps } = ctx;
  const cards = apps
    .map(
      (a) => `      <article class="app-card" style="--card-accent:${esc(a.theme.accent)};--card-on-accent:${esc(a.theme.onAccent)};--card-heading:${esc(a.theme.heading)}">
        <a class="card-head" href="/${a.slug}/">
          ${appIcon(a, 64)}
          <div><h3>${esc(a.name)}</h3><p class="card-tagline">${esc(a.tagline)}</p></div>
        </a>
        <div class="card-actions">
          ${storeButton(a)}
          <a class="text-link" href="/${a.slug}/">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </article>`
    )
    .join('\n');
  return layout(ctx, {
    title: site.home.title,
    description: site.home.description,
    path: '/',
    bodyClass: 'page-home',
    theme: { scheme: 'dark', ink: site.theme.accent, ...site.theme },
    top: `<section class="hero wrap">
      <p class="eyebrow">${esc(site.home.eyebrow)}</p>
      <h1>${esc(site.home.headline)}</h1>
      <p class="lead">${esc(site.home.intro)}</p>
    </section>`,
    main: `    <section class="wrap section" id="apps" aria-labelledby="apps-title">
      <h2 id="apps-title">Apps</h2>
      <div class="app-grid">
${cards}
      </div>
    </section>`,
  });
}

export function appPage(ctx, app) {
  const shots = app.screenshotList.length
    ? `<div class="shots" style="--shots:${app.screenshotList.length}" role="list" aria-label="${esc(app.name)} screenshots">
        ${app.screenshotList
          .map((s, i) => `<img role="listitem" src="${esc(s.url)}" width="${s.width}" height="${s.height}" alt="${esc(s.alt)}" ${i > 1 ? 'loading="lazy"' : ''} decoding="async">`)
          .join('\n        ')}
      </div>`
    : `<div class="placeholder-device" aria-hidden="true">${appIcon(app, 96)}<strong>${esc(app.name)}</strong><span>${esc(app.tagline)}</span></div>`;

  const features = app.features
    .map((f) => `      <article class="feature"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></article>`)
    .join('\n');

  const fontHead = app.theme.fontHref
    ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${esc(app.theme.fontHref)}">`
    : '';

  return layout(ctx, {
    title: `${app.fullName}`,
    description: app.metaDescription,
    path: `/${app.slug}/`,
    bodyClass: `page-app app-${app.slug}`,
    theme: app.theme,
    icon: app.iconUrl,
    head: fontHead,
    top: `<section class="hero wrap">
      <div class="hero-text">
        <div class="app-id">${appIcon(app, 72)}<div><p class="eyebrow">${esc(app.eyebrow)}</p><p class="app-name">${esc(app.fullName)}</p></div></div>
        <h1>${esc(app.tagline)}</h1>
        <p class="lead">${esc(app.description)}</p>
        <div class="actions">${storeButton(app)}<a class="button secondary" href="/contact#${app.slug}">Contact Support</a></div>
      </div>
      ${shots}
    </section>`,
    main: `    <section class="wrap section" aria-label="Features">
      <div class="features">
${features}
      </div>
    </section>
    <section class="wrap section app-links" aria-label="Legal and support">
      <a href="/${app.slug}/privacy">Privacy Policy</a>
      <a href="/${app.slug}/terms">Terms of Use</a>
      <a href="/contact#${app.slug}">Support</a>
    </section>`,
  });
}

const LEGAL_THEME = {
  scheme: 'light',
  bg: '#ffffff',
  surface: '#f6f7f8',
  text: '#1f2328',
  muted: '#4b5563',
  line: '#e5e7eb',
  heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  hero: 'none',
};

export function legalPage(ctx, app, kind, canonicalPath) {
  const doc = app[kind];
  const label = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Use';
  const other = kind === 'privacy' ? ['terms', 'Terms of Use'] : ['privacy', 'Privacy Policy'];
  const body = doc.sections
    .map((s) => {
      const parts = s.body
        .map((b) => (typeof b === 'string' ? `<p>${rich(b, app)}</p>` : `<ul>${b.list.map((li) => `<li>${rich(li, app)}</li>`).join('')}</ul>`))
        .join('\n        ');
      return `      <section>
        <h2>${esc(s.heading)}</h2>
        ${parts}
      </section>`;
    })
    .join('\n');
  return layout(ctx, {
    title: `${label} | ${app.name}`,
    description: kind === 'privacy' ? `Privacy Policy for ${app.fullName}.` : `Terms of Use for ${app.fullName}.`,
    path: `/${app.slug}/${kind}`,
    canonicalPath: canonicalPath ?? `/${app.slug}/${kind}`,
    bodyClass: 'page-legal',
    theme: { ...LEGAL_THEME, accent: app.theme.legalInk, ink: app.theme.legalInk, onAccent: '#ffffff' },
    icon: app.iconUrl,
    top: `<div class="legal-head">
      <a class="legal-app" href="/${app.slug}/">${appIcon(app, 40)}<span>${esc(app.fullName)}</span></a>
      <h1>${label}</h1>
      <p class="updated">Last updated: <time datetime="${doc.updated}">${longDate(doc.updated)}</time></p>
    </div>`,
    main: `    <article class="legal">
${body}
      <p class="legal-more">See also: <a href="/${app.slug}/${other[0]}">${other[1]}</a> · <a href="/contact#${app.slug}">Contact</a></p>
    </article>`,
  });
}

export function contactPage(ctx) {
  const { site, apps } = ctx;
  const mail = (subject) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
  const rows = apps
    .map(
      (a) => `      <li class="contact-app" id="${a.slug}">
        ${appIcon(a, 48)}
        <div>
          <h3>${esc(a.name)}</h3>
          <p><a href="${esc(`mailto:${a.email}?subject=${encodeURIComponent(a.name + ' Support')}`)}">Email ${esc(a.name)} support</a> · <a href="/${a.slug}/privacy">Privacy Policy</a> · <a href="/${a.slug}/terms">Terms of Use</a></p>
        </div>
      </li>`
    )
    .join('\n');
  return layout(ctx, {
    title: `${site.contact.title} | ${site.developer}`,
    description: site.contact.description,
    path: '/contact',
    bodyClass: 'page-contact',
    theme: { scheme: 'dark', ink: site.theme.accent, ...site.theme },
    top: `<section class="hero wrap">
      <p class="eyebrow">Support</p>
      <h1>${esc(site.contact.title)}</h1>
      <p class="lead">${esc(site.contact.intro)}</p>
      <div class="actions"><a class="button" href="${esc(mail('Support'))}">${esc(site.email)}</a></div>
    </section>`,
    main: `    <section class="wrap section" aria-labelledby="by-app">
      <h2 id="by-app">Help with a specific app</h2>
      <ul class="contact-list">
${rows}
      </ul>
    </section>`,
  });
}

export function notFoundPage(ctx) {
  const { site, apps } = ctx;
  return layout(ctx, {
    title: `Page not found | ${site.developer}`,
    description: 'This page could not be found.',
    path: '/404',
    canonicalPath: '/',
    bodyClass: 'page-404',
    theme: { scheme: 'dark', ink: site.theme.accent, ...site.theme },
    top: `<section class="hero wrap">
      <p class="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p class="lead">The page you’re looking for doesn’t exist. Try one of these instead:</p>
      <div class="actions"><a class="button" href="/">Home</a>${apps.map((a) => `<a class="button secondary" href="/${a.slug}/">${esc(a.name)}</a>`).join('')}</div>
    </section>`,
    main: '',
  });
}
