# After Five Founder

Source for [afterfivefounder.com](https://afterfivefounder.com). It runs as a Cloudflare Worker named `after-five-founder`, with static files and a D1 database.

This repo was rebuilt from what was live on 25 October 2026: the deployed Worker code and every file the site serves.

## Layout

| Path | What it is |
| --- | --- |
| `worker.js` | The Worker. It renders the blog, series pages, About and the `/admin` editor, handles `/api/*` (subscribe, login, articles), and serves everything else from `public/` |
| `public/` | Static pages and images: home, Costing Suite, Shop, The Small Business Project, `robots.txt`, `assets/` |
| `wrangler.jsonc` | Cloudflare config: static assets binding `ASSETS`, D1 database `afterfive-journal` as `DB` |
| `archive/` | Earlier artifact versions of pages, kept for reference only. Not deployed |

## What's not in this repo

- **Blog posts, series and subscribers.** These live in the `afterfive-journal` D1 database, not in files.
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
