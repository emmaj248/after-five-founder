# After Five Founder

Source for [afterfivefounder.com](https://afterfivefounder.com). It runs as a Cloudflare Worker named `after-five-founder`, with static files and a D1 database.

This repo was rebuilt from what was live on 25 October 2026: the deployed Worker code and every file the site serves.

## Layout

| Path | What it is |
| --- | --- |
| `worker.js` | The Worker. It renders the blog, About and the `/admin` blog editor, handles `/api/*` (subscribe, login, articles), and serves everything else from `public/` |
| `chrome.js` | The shared header, email signup strip and footer. The Worker uses it directly; `scripts/sync-chrome.mjs` copies it into the static pages |
| `public/` | Static pages and images: home, Costing Suite, Shop, `robots.txt`, `assets/` (including `stack.js`, the Software Stack Calculator) |
| `tools.js` | The tool list behind `/tools` and each `/tools/<name>` page: how each calculator works, its assumptions and regional settings |
| `public/assets/site.css`, `site.js` | Shared colours, header, signup and footer styles, the mobile menu and the signup form. Every page loads them |
| `public/assets/admin.js` | The blog editor's browser code |
| `wrangler.jsonc` | Cloudflare config: static assets binding `ASSETS`, D1 database `afterfive-journal` as `DB` |
| `docs/after-five-website-evolution.md` | The website evolution plan and release notes |
| `migrations/` | D1 schema changes |
| `design/after-five-target/` | The homepage design pack (tokens, reference layout, QA rules) and the QA screenshots for the restyle. Not deployed |
| `archive/` | Earlier artifact versions of pages, kept for reference only. Not deployed |

## Writing blog posts

Go to [afterfivefounder.com/admin](https://afterfivefounder.com/admin) and sign in with the `ADMIN_PASSWORD` secret. From there you can write a post, see a live preview, save it as a draft, publish it, unpublish it or delete it. Posts are written in plain text with a few shortcuts: `**bold**`, `*italic*`, `## Heading`, `> Quote`, `- List item` and `[link](https://...)`.

Optional blocks for reviews and explainers: start a line with `::: summary`, `::: costs`, `::: for`, `::: skip`, `::: before`, `::: verdict`, `::: sources` or `::: disclosure`, write the content, then close with a line containing just `:::`. The renderer lives in `public/assets/md.js` and is shared by the live site and the editor preview.

The editor's **Label** and **Prices checked on** fields use the columns in `migrations/0001_editorial_fields.sql`. That change was applied to the live database on 24 Nov 2026; don't run it again.

**Publishing is a human step.** Anything that isn't live shows as "Needs review" at the top of the editor's list. Only someone signed in to `/admin` can make a post live, by pressing **Approve & publish** and confirming. Studio, n8n or any other tool that writes to the `articles` table should only ever save `status='draft'`. The editor records when each post was approved and when it was taken down, in the columns from `migrations/0002_approval_fields.sql`. Run that file once on the live database (the command is at the top of the file). Until you do, posts still save and publish, and the editor shows a reminder.

**RSS:** published posts are at `/feed.xml` (also `/rss.xml`, `/feed` and `/rss`), newest 20, with the full text. Pages link to it in their `<head>`, and the footer links to it.

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
