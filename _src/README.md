# habitbooster.app

Static site for Mahbubul Hasan's apps, published by GitHub Pages from the
`main` branch of this repo. Every page is plain HTML with no JavaScript.

## Files

| Path | What it is |
|---|---|
| `_src/apps.mjs` | All app details, including privacy and terms text. |
| `_src/site.mjs` | Developer name, contact email, homepage text, old URLs to keep. |
| `_src/templates.mjs` | Shared page templates. No app details live here. |
| `_src/build.mjs` | Generates every page from the two data files. |
| `_src/serve.mjs` | Local preview that resolves URLs like GitHub Pages. |
| `assets/apps/<slug>/` | Each app's `icon.png` and screenshots. |
| `styles.css` | Shared stylesheet. |

Everything else at the root (`index.html`, `contact.html`, `<slug>/…`,
`privacy-policy.html`, `terms.html`, `privacy.html`, `404.html`,
`sitemap.xml`, `robots.txt`) is generated. Do not edit it by hand.
Jekyll does not publish the `_src` folder.

## Add an app

1. Copy an entry in `_src/apps.mjs` and fill it in.
2. Add `assets/apps/<slug>/icon.png`, plus any screenshots you listed.
3. Run `node _src/build.mjs --strict`, preview, then commit and push.

## Preview

    node _src/build.mjs
    node _src/serve.mjs      # http://localhost:4000

## Old URLs

GitHub Pages cannot send 301 redirects. Old URLs are kept as full copies of
their new pages, with a canonical link to the new URL. They are listed in
`legacy` in `_src/site.mjs`. Never remove one that an App Store listing or a
shipped app version still links to.
