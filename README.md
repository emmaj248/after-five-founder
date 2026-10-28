# After Five Founder

Source for [afterfivefounder.com](https://afterfivefounder.com). It runs as a Cloudflare Worker named `after-five-founder`, with static files and a D1 database.

This repo was rebuilt from what was live on 25 October 2026: the deployed Worker code and every file the site serves.

## Layout

| Path | What it is |
| --- | --- |
| `worker.js` | The Worker. It renders the blog, About and the `/admin` blog editor, handles `/api/*` (subscribe, login, articles), and serves everything else from `public/` |
| `chrome.js` | The shared header, email signup strip and footer. The Worker uses it directly; `scripts/sync-chrome.mjs` copies it into the static pages |
| `public/` | Static pages and images: home, Costing Suite, Shop, `robots.txt`, `assets/` |
| `public/assets/site.css`, `site.js` | Shared colours, header, signup and footer styles, the mobile menu and the signup form. Every page loads them |
| `public/assets/admin.js` | The blog editor's browser code |
| `wrangler.jsonc` | Cloudflare config: static assets binding `ASSETS`, D1 database `afterfive-journal` as `DB` |
| `archive/` | Earlier artifact versions of pages, kept for reference only. Not deployed |

## Writing blog posts

Go to [afterfivefounder.com/admin](https://afterfivefounder.com/admin) and sign in with the `ADMIN_PASSWORD` secret. From there you can write a post, see a live preview, save it as a draft, publish it, unpublish it or delete it. Posts are written in plain text with a few shortcuts: `**bold**`, `*italic*`, `## Heading`, `> Quote`, `- List item` and `[link](https://...)`.

If you've forgotten the password, set a new one with `npx wrangler secret put ADMIN_PASSWORD`, or in the Cloudflare dashboard under Workers & Pages → after-five-founder → Settings → Variables and Secrets.

## Changing the header or footer

Edit `chrome.js`, then run `node scripts/sync-chrome.mjs` to copy the change into `public/index.html`, `public/costing-suite.html` and `public/shop.html`. The blog and About pages pick it up automatically.

## What's not in this repo

- **Blog posts and subscribers.** These live in the `afterfive-journal` D1 database, not in files.
- **Secrets.** `ADMIN_PASSWORD` and `SESSION_SECRET` are set on the Worker in Cloudflare. To set them again: `npx wrangler secret put ADMIN_PASSWORD`.
- **Custom domains.** These are managed in the Cloudflare dashboard.

## Deploy

```sh
npx wrangler deploy
```

Or connect this repo under Workers & Pages → after-five-founder → Settings → Builds, so every push to `main` deploys.

## Run locally

```sh
npx wrangler dev
```
