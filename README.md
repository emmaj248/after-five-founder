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

Go to [afterfivefounder.com/admin](https://afterfivefounder.com/admin) and sign in (see [Signing in to the editor](#signing-in-to-the-editor)). From there you can write a post, see a live preview, save it as a draft, publish it, unpublish it or delete it. Posts are written in plain text with a few shortcuts: `**bold**`, `*italic*`, `## Heading`, `> Quote`, `- List item` and `[link](https://...)`.

Optional blocks for reviews and explainers: start a line with `::: summary`, `::: costs`, `::: for`, `::: skip`, `::: before`, `::: verdict`, `::: sources` or `::: disclosure`, write the content, then close with a line containing just `:::`. The renderer lives in `public/assets/md.js` and is shared by the live site and the editor preview.

The editor's **Label** and **Prices checked on** fields use the columns in `migrations/0001_editorial_fields.sql`. That change was applied to the live database on 24 Nov 2026; don't run it again.

**Publishing is a human step.** Anything that isn't live shows as "Needs review" at the top of the editor's list. Only someone signed in to `/admin` can make a post live, by pressing **Approve & publish** and confirming. Studio, n8n or any other tool that writes to the `articles` table should only ever save `status='draft'`. The editor records when each post was approved and when it was taken down, in the columns from `migrations/0002_approval_fields.sql`. Run that file once on the live database (the command is at the top of the file). Until you do, posts still save and publish, and the editor shows a reminder.

**RSS:** published posts are at `/feed.xml` (also `/rss.xml`, `/feed` and `/rss`), newest 20, with the full text. Pages link to it in their `<head>`, and the footer links to it.

## Signing in to the editor

The editor has two sign-in modes. The Worker picks one from its settings.

**Email code (Cloudflare Access).** When `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` are set on the Worker, Cloudflare asks for your email at `/admin` and sends you a one-time code. The Worker checks Cloudflare's signed token on every editor request (signature, application, expiry and, if `ADMIN_EMAILS` is set, the address). The password form is switched off and **Sign out** ends the Access session.

Setting it up, once, in the Cloudflare dashboard:

1. **Zero Trust team.** Open Zero Trust from the dashboard sidebar. The first time, pick a team name (for example `afterfive`, giving `afterfive.cloudflareaccess.com`) and the **Free** plan. It may ask for a card; the free plan isn't charged.
2. **Login method.** Zero Trust → Settings → Authentication → Login methods. Check **One-time PIN** is listed. Add it if not.
3. **Access application.** Zero Trust → Access → Applications → Add an application → **Self-hosted**. Name it `Blog editor`. Add two public hostnames: `afterfivefounder.com` with path `admin`, and `afterfivefounder.com` with path `api/articles` (this also covers `/api/articles/123`). Pick a session length you're happy with, such as 1 week. Under login methods tick only One-time PIN, and turn on instant auth.
4. **Policy.** Add a policy named `Just me`: action **Allow**, include **Emails** → your email address. Save the application.
5. **Audience tag.** Open the application again and copy its **Application Audience (AUD) Tag**.
6. **Worker settings.** Workers & Pages → after-five-founder → Settings → Variables and Secrets → Add. Choose type **Secret** for each so deploys don't remove them:
   - `ACCESS_TEAM_DOMAIN`: your team name, such as `afterfive`
   - `ACCESS_AUD`: the tag from step 5
   - `ADMIN_EMAILS` (optional, recommended): your email address. A second lock in the Worker in case the Access policy is ever widened
7. **Check it.** In a private window go to `/admin`. You should get Cloudflare's email prompt, then the editor with your address beside **Sign out**.
8. **Tidy up.** Once that works, delete the `ADMIN_PASSWORD` and `SESSION_SECRET` secrets. They're no longer used.

Do steps 1 to 5 before step 6: once step 6 is saved the Worker only accepts Access sign-ins.

**Password (the fallback).** Without those settings, the editor uses the `ADMIN_PASSWORD` secret. To set a new one: `npx wrangler secret put ADMIN_PASSWORD`, or the dashboard under Workers & Pages → after-five-founder → Settings → Variables and Secrets. Preview URLs have neither, so nobody can sign in there.

## Changing the header or footer

Edit `chrome.js`, then run `node scripts/sync-chrome.mjs` to copy the change into `public/index.html`, `public/costing-suite.html` and `public/shop.html`. The blog and About pages pick it up automatically.

## What's not in this repo

- **Blog posts and subscribers.** These live in the `afterfive-journal` D1 database, not in files.
- **Secrets.** Set on the Worker in Cloudflare, never committed: `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD` and `ADMIN_EMAILS` for email sign-in, or `ADMIN_PASSWORD` and `SESSION_SECRET` for the password fallback.
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
