// Site-wide settings. App details live in apps.mjs, not here.

export default {
  domain: 'https://habitbooster.app',
  developer: 'Mahbubul Hasan',
  email: 'support@habitbooster.app',

  home: {
    title: 'Mahbubul Hasan · Independent App Developer',
    description:
      'Mahbubul Hasan is an independent developer making focused, well-crafted apps for iPhone, including DailyKit and Bookify.',
    eyebrow: 'Independent app developer',
    headline: 'Hi, I’m Mahbubul Hasan.',
    intro:
      'I design and build small, focused apps for iPhone. Each one does one job and tries to do it beautifully.',
  },

  contact: {
    title: 'Contact & Support',
    description: 'Get help with DailyKit, Bookify and other apps by Mahbubul Hasan.',
    intro:
      'Need help with one of my apps? Send an email and include the app name, your device model, iOS version, and a short description of the issue.',
  },

  // Look of the homepage, contact page and 404 page (app pages use their own theme).
  theme: {
    bg: '#070914',
    surface: '#111625',
    text: '#f7fbff',
    muted: 'rgba(247, 251, 255, 0.72)',
    line: 'rgba(255, 255, 255, 0.12)',
    accent: '#16c8f5',
    onAccent: '#03131d',
    heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    hero:
      'radial-gradient(circle at top right, rgba(22, 200, 245, 0.24), transparent 34rem), linear-gradient(160deg, #08364a 0%, #071626 45%, #070914 100%)',
  },

  // Old URLs that must keep working. GitHub Pages cannot send 301 redirects,
  // so each one is published as a full copy of its new page, with a
  // <link rel="canonical"> pointing at the new URL.
  //   file   = file written at the site root (GitHub Pages serves /x for x.html)
  //   copyOf = the new URL whose page is copied there
  legacy: [
    { file: 'privacy-policy.html', copyOf: '/dailykit/privacy' }, // App Store privacy link + in-app link
    { file: 'terms.html', copyOf: '/dailykit/terms' },             // in-app link
    { file: 'privacy.html', copyOf: '/dailykit/privacy' },         // App Store description link (was a 404)
  ],
};
