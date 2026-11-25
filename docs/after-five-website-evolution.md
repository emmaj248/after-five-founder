# After Five Founder: website evolution plan

Status: Releases 1 and 2 are live (merged 25 Nov 2026). Release 3 is in review. Release 4 is a proposal.

Guiding rule: **Human first. Technology second.** About 70% preservation, 30% evolution.

> Note on references: the brief mentions a homepage mockup, but it wasn't in the repo or the project files. This plan and Release 1 work from the written brief and the live site as it is in this repo.

---

## 0. What the site is today (audit)

| Area | What exists |
| --- | --- |
| Framework | One Cloudflare Worker (`worker.js`) plus static files in `public/`. No build step, no npm dependencies. |
| Hosting | Cloudflare Workers with a static assets binding (`ASSETS`) and a D1 database `afterfive-journal` (`DB`). Deploy is `npx wrangler deploy`. |
| Routes | `/` (static `index.html`), `/costing-suite.html`, `/shop.html` (static); `/about`, `/blog`, `/blog/<slug>` (server-rendered by the Worker); `/admin` (blog editor); `/api/latest`, `/api/subscribe`, `/api/login`, `/api/logout`, `/api/articles*`. Legacy redirects: `/journal*` → blog, `/post-<slug>.html` → article, `/series*` and `/small-business-project*` → 301. |
| Shared chrome | `chrome.js` holds the header, the "Follow along" signup strip and the footer. The Worker uses it directly; `scripts/sync-chrome.mjs` copies it into the three static pages between `<!-- site:… -->` markers. |
| Design tokens | `public/assets/site.css` `:root`: ink `#1A1512`, warm white `#FAF8F4`, cream `#F2ECE1`, blush `#EDE6D9`, line `#E6DCCD`, gold `#B0894E` (shapes, large text), gold-ink `#7A5C2E` (small text, AA on cream), muted `#6B625A`. Each page repeats a local copy of the same values. |
| Typography | Jost (headings, body, UI) with Bodoni Moda italic for emphasised words (`<em>`), Caveat for the handwritten hero notes. Loaded from Google Fonts. |
| Logo | `public/assets/logo-wm.png` (header), `logo-full.png` (footer), `favicon.png`, `apple-touch-icon.png`. **Unchanged by this work.** |
| Photography | `emma-hero.jpg` (hero portrait), `emma-about.jpg` (About), `emma-apps.jpg` (app-icon grid illustration), `og.jpg` (social card). All real assets, all kept. |
| Hero illustration | Built in HTML/CSS, not an image: spreadsheet card, app grid, AI chat card, caption pills ("There has to be a better way.", "Wait… I'm paying for all of these?", "Okay, but what can AI actually do?") and Caveat notes ("Spreadsheets for everything?", "So many apps!", "Helpful (not hypey)"). Scaled to fit by a small script. |
| Articles | D1 table `articles` (slug, title, excerpt, body_md, body_html, tag, cover_url, status draft/published, read_minutes, published_at, updated_at). Written in `/admin`, rendered server-side. Only `status='published'` is public. Read time = words ÷ 200. `cover_url` exists in the table but the editor doesn't set it yet. |
| Homepage posts | Fetched in the browser from `/api/latest` (not in the HTML, so not visible to crawlers that skip JavaScript). |
| Calculators | `costing-suite.html`, six tabs: Start-up costs, Bill of materials, Monthly operating, New employee, Going digital, Can I go full-time? Live totals, `localStorage` saving, CSV export ("Export to Excel"), deep links via `#startup` etc. Money is formatted `en-NZ`, export headers say NZD, and New employee uses NZ defaults (KiwiSaver 3%, ACC 0.67%, holiday 8%) with a disclaimer. |
| Shop | `shop.html`, five products, all marked Coming soon, prices in US$ (Free, 19, 12, 15, 39 bundle). Every button goes to the signup strip. No payment provider. |
| Newsletter | `/api/subscribe` stores emails in D1 (`subscribers`) with a source tag. There is no sending platform in this repo, so it's a waitlist, not yet a newsletter. |
| Analytics | Cloudflare Web Analytics beacon. |
| SEO | Titles, descriptions, Open Graph and Twitter tags on every page; one shared `og.jpg`. No canonical tags, sitemap, RSS or structured data. `robots.txt` is Cloudflare's content-signals file. |
| Scout / Studio | Nothing in this repo connects to them. The site's only content source is the D1 `articles` table via `/admin`. |

## 1. What gives the site its personality

- The tagline **Small business. Big tech. Without the big budget.** and the Bodoni italic "Without".
- The hero collage: real founder portrait plus the playful spreadsheet / app-pile / AI-chat story and handwritten notes.
- The long, first-person "Hi, I'm Emma / Welcome to After Five" letter, signed "— Emma".
- "Who is this for? The small business owners wearing all the hats."
- The four thread cards ("Is AI the unlock?", "Death to spreadsheets.", "The right apps.", "What actually grows.").
- "The honest version." as the blog's voice; "Follow along." as the signup voice.
- The Costing Suite's plain-English panes ("What it costs to open the doors.").

## 2. What must not change

Logo files and their use; Jost + Bodoni Moda + Caveat; the bronze/cream/taupe/warm-white palette; the founder photos; every existing sentence of founder copy; calculator formulas, saving and export; shop prices, terms and coming-soon status; subscribe behaviour; all existing URLs and redirects; the admin editor and the D1 schema.

## 3. What can improve without a redesign

- Homepage order: posts sit at the very bottom today, below four other sections. Readers should see what's new near the top.
- The founder letter has no photo and no link to About.
- The calculators, the most useful thing on the site, aren't on the homepage at all.
- The shop isn't on the homepage, and its covers use emoji on pastel gradients (one pink) that sit outside the palette.
- Hero CTAs both lead away from discovery; nothing says "start here".
- Header button says "Follow →" while everywhere else says "Follow along".
- No visible keyboard focus style in the shared chrome, and no reduced-motion handling.
- Footer has no route to individual tools or to the signup.

## 4. Information hierarchy (homepage, Release 1)

1. Hero (refined, same illustration) → CTAs "Explore what I'm discovering" and "Follow along"
2. **The latest from After Five.** Featured post plus up to three more, from real published posts only
3. Hi, I'm Emma (same letter, now with the real About photo and a link to the full story)
4. Who is this for? (unchanged copy)
5. **Better decisions start with better numbers.** Live preview of the Bill of materials pricing calculator plus question-led links to all six tools
6. What I'm testing (the four thread cards)
7. **Building in public.** Shows posts tagged "Building in public" when they exist; an honest "first build log is on its way" state until then
8. From the shop (same five products, prices and coming-soon labels)
9. Follow along (existing signup) and footer

Navigation stays simple: About, Blog, Resources (calculator dropdown), Shop, Follow along. Renaming "Blog" to "Insights" was considered; the content today is first-person and journal-like, so "Blog" stays for now. It's a one-line change in `chrome.js` if wanted later. URLs stay the same either way.

## 5. New editorial components: which are needed

| Component | Needed now? | Notes |
| --- | --- | --- |
| Latest-posts editorial block (featured + list, empty/limited states) | **Yes, Release 1** | Reads `/api/latest`. Uses `cover_url` when a post has one, otherwise a typographic tile. Never fills gaps with fake posts. |
| Toolkit preview | **Yes, Release 1** | Mirrors the suite's BOM formula exactly (see §7). |
| Building-in-public block | **Yes, Release 1** | Needs a tag filter on `/api/latest` (added, optional `tag` param) and a "Building in public" topic in the editor (added). |
| 60-second version, What it costs, Who it's for / skip it, Before you buy, After Five Verdict | Release 2 | Optional markdown blocks in the editor, not a forced template. |
| Content classification (Hands-on tested, Researched, First look, In practice, Founder journal, Comparison, Building in public) | Release 2 | New `kind` column; shown as a label beside the topic. Scout-sourced research must default to "Researched". |
| Verified/updated date, sources list | Release 2 | `updated_at` already exists; add an explicit `verified_at` and a sources field. |
| The After Five Brief identity | Release 4 | Only once emails are actually being sent. Until then the site keeps "Follow along" and says nothing about a newsletter format. |

## 6. Authentic imagery: what's needed

Have: founder hero portrait, About portrait, app-grid illustration, logo set, OG card, HTML hero collage.

Missing (please supply when ready; nothing has been generated to stand in for them):
- Real screenshots for building-in-public (GobyGO, any Minnow Byte IT work you want to show, automations, spreadsheets).
- Cover images for posts (screenshots, diagrams). The editor needs a "Cover image" field; the column already exists.
- Real previews of each shop product once its contents exist (Release 1 uses typographic covers that don't pretend to show contents).
- Per-article Open Graph images (Release 2).

## 7. Technical dependencies and risks

- **Homepage posts are client-rendered.** Fine for readers, weak for SEO. Release 2: inject the latest posts into `index.html` in the Worker with `HTMLRewriter` (no new dependencies).
- **Duplicated chrome.** Static pages hold a copy of header/footer. Always run `node scripts/sync-chrome.mjs` after editing `chrome.js` (done in this release).
- **Duplicated formula.** The homepage BOM preview repeats the suite's formula (`unit = materials + minutes/60 × rate + overhead`, `price = unit ÷ (1 − margin)`, margin capped at 94.9%). If the suite formula changes, change both. Release 3 should move calculator maths into one shared `calculators.js`.
- **Duplicated shop data.** Homepage shop teaser repeats product names and prices from `shop.html`. Change both, or move products to one data file in Release 4.
- **Currency and region.** Suite formats money as NZ and labels exports NZD; the shop is US$. New employee uses NZ on-costs. Release 1 adds a plain note to the suite intro. Real regional settings (US, NZ, AU, UK) are Release 3 and need verified figures before any are published.
- **No privacy page.** The footer should link to one, and the site collects emails. Writing legal text is outside what should be drafted without you; please supply or approve one.
- **Tag taxonomy.** Editor topics are free text (Journal, AI, Tools, Systems, Strategy, Mindset, plus Building in public). Scout's six areas (AI & Agents, Business Software, Automation & Workflows, Marketing & Customer Technology, Money/Banking & Accounting, Free Business Resources) should become the topic list once there are enough posts per area; category pages come with that.
- Scout, Studio and n8n were not touched. Nothing here publishes automatically or calls paid APIs.

## 8. Implementation sequence

### Release 1: Preserve and elevate (this branch)
- Shared: visible `:focus-visible` rings, `prefers-reduced-motion` handling, "Follow along" button label, footer gains a Tools column and a Follow link.
- Homepage: section order above; refined hero spacing and CTAs; latest-posts block; founder letter with photo and About link; toolkit preview; building-in-public block; shop teaser; gentle reveal animation (off under reduced motion).
- API: optional `tag` filter on `/api/latest`; "Building in public" added to the editor's topic suggestions.
- Costing Suite: regional-assumptions note in the intro. No formula changes.
- Shop: consistent palette-based typographic covers replace the emoji/pastel covers. Copy, prices and status unchanged.

### Release 2: Editorial experience
Blog index with featured post and topic filter; article components (§5); classification label; author box linking to About; sources and verified dates; related posts and related tools; canonical URLs, `Article`/`Person` JSON-LD, `sitemap.xml`, per-post OG images; server-rendered homepage posts.

### Release 3: Interactive resources
Shared calculator module; per-calculator landing pages (`/tools/<name>`, keeping `/costing-suite.html#…` working) explaining the decision, inputs, method, included/excluded assumptions and limits; improved results panels; regional settings architecture with only verified figures; Software Stack Calculator (browser-only: list subscriptions, monthly/annual totals, group by function, flag overlaps).

### Release 4: Publishing and audience growth
Studio → human approval → publish, reusing the existing `articles` table and its draft/published states (add `approved_by`, `approved_at`, `unpublished_at`); RSS; search once the library justifies it; The After Five Brief once a sending service is chosen and approved; shop delivery.

---

## Release 1: changed files and checks

| File | Change |
| --- | --- |
| `public/index.html` | New section order; hero CTAs; "The latest from After Five." (featured + list, one-post and no-post states); founder letter with About photo and "Read my story"; Toolkit with live BOM preview and six question links; Building in public; shop teaser; reveal animation; removed the old carousel. Founder copy unchanged word for word. |
| `chrome.js` → synced into static pages | "Follow along →" button; footer Tools column and Follow link. |
| `public/assets/site.css` | Footer grid for four columns; shared `:focus-visible` ring; `prefers-reduced-motion`. |
| `worker.js` | `/api/latest` accepts optional `tag` and returns `cover_url`; editor topic list gains "Building in public". |
| `public/shop.html` | Typographic covers in the brand palette replace emoji/pastel covers. Text, prices and status unchanged. |
| `public/costing-suite.html` | Regional-assumptions note under the intro. No calculator code changed. |

Checked locally by running `worker.js` against a mock D1 with clearly labelled test posts (not committed): 375, 390, 768, 1024, 1440 and 1920px on home, blog, article, About, Costing Suite and Shop, with no horizontal scrolling and no script errors; 0, 1 and 5 published posts; homepage BOM preview matches the suite (defaults $14.75 cost / $29.50 price, and $43.13 at $10 materials and 60%); suite totals, tab deep links and CSV export still work; signup form posts and shows its confirmation; mobile menu opens; keyboard focus ring shows; logo and photo files untouched.

Not checked: the live D1 data (the container can't reach afterfivefounder.com), real Google Fonts delivery (local copies of the same fonts were used), Lighthouse/Core Web Vitals scores.

Outstanding: privacy page; real build-in-public screenshots; cover image field in the editor; between 760 and 1120px the hero still stacks the collage under the copy, as before.

---

## Release 2: changed files and checks

| File | Change |
| --- | --- |
| `public/assets/md.js` (new) | One shared renderer for live posts and the editor preview. `## Heading` now renders as `<h2>` (correct heading order; same look). Adds optional blocks: `::: summary`, `costs`, `for`, `skip`, `before`, `verdict`, `sources`, `disclosure`, closed with `:::`. Links only allow `http(s)`, `/`, `#` and `mailto:`. |
| `worker.js` | Blog index: featured latest post, topic chips with counts (`/blog?topic=…`, shown once there are two or more topics). Article: standfirst, byline with photo, published and updated dates, optional label, optional cover, share links (no third-party scripts), author box, related posts (same topic first), calculator links. About: "How posts are labelled". SEO: canonical URLs, `og:url`, article Open Graph tags, `BlogPosting`/`Blog`/`AboutPage` JSON-LD with Emma as author, `/sitemap.xml`, `noindex` on the 404. Homepage: latest posts are now in the HTML (server-rendered), so they show without JavaScript. Editor: Label, Prices checked on and Cover image fields, plus a block cheat sheet. |
| `public/assets/admin.js` | Uses the shared renderer; sends and loads the three new fields; shows a warning if the database update hasn't been run. |
| `migrations/0001_editorial_fields.sql` (new) | Adds `kind` and `verified_at` to `articles`. Additive only. |
| `public/index.html`, `costing-suite.html`, `shop.html` | Canonical links; homepage skips its post fetch when the server already filled it in. |
| `public/robots.txt` | `Sitemap:` line. |

**Database update:** the two columns were added to the live database on 24 Nov 2026 with `wrangler d1 execute`. Don't run the migration file again. The code still saves posts normally if the columns are ever missing.

Labels are never set automatically. Existing posts stay unlabelled until you choose one; Scout research should be labelled Researched, never Hands-on tested.

Checked locally with the mock D1 and labelled test posts: blog index, topic filter, article (every block), About and editor at 375 and 1440px with no horizontal scroll or script errors; JSON-LD, canonical and sitemap output; 404 is `noindex`; old `/journal` and `/post-…html` routes still work; homepage renders posts server-side and doesn't refetch; Release 1 checks (calculators, export, signup, menu) re-run and still pass.

Moved to later: RSS and search (Release 4), per-post generated OG images (needs an image pipeline; posts with a cover image already use it), category landing pages (the topic filter covers this until each topic has several posts).

---

## Release 3: changed files and checks

| File | Change |
| --- | --- |
| `tools.js` (new) | One list of every tool: question, what it helps decide, what you need, how it's calculated, included/excluded, limits, and the regional settings table. Formulas are described exactly as the Costing Suite code works today. |
| `worker.js` | `/tools` index and `/tools/<slug>` pages for all seven tools, with `WebApplication` and breadcrumb structured data; tools added to the sitemap; article pages suggest the Software Stack calculator plus two calculators picked by topic. |
| `public/assets/stack.js` (new) | Software Stack Calculator: tools, what each is for, price, monthly/yearly billing, seats; monthly and annual totals; totals by function; overlap flags; saves in the browser; CSV export. No server calls. |
| `chrome.js` (synced) | Header "Resources" is now "Tools" and goes to `/tools`; the dropdown and footer include Software stack and "All tools". |
| `public/costing-suite.html` | A "How this is calculated" link on each calculator and a link to `/tools`. No calculator code changed. |
| `public/index.html` | Toolkit gains the software question and a "How each one works" link. |

Tool pages: `/tools/start-up-costs`, `/tools/bill-of-materials`, `/tools/monthly-operating-costs`, `/tools/new-employee-cost`, `/tools/going-digital-costs`, `/tools/can-i-go-full-time`, `/tools/software-stack`. The six costing calculators still run at `/costing-suite.html#…`, so existing links and saved work are untouched.

**Regional settings:** `REGIONS` in `tools.js` lists NZ as available and US, AU and UK as not yet. Nothing for those three is published until the figures are checked against official sources.

**Calculator audit: please check.** The New employee calculator's default employer KiwiSaver rate is 3%. My understanding is that the employer minimum rose to 3.5% from 1 April 2026 (announced in Budget 2025), but I haven't verified that against Inland Revenue, so the default is unchanged. Also, holiday pay is added as 8% on top of 52 weeks of wages, which suits pay-as-you-go holiday pay but may double-count if leave is taken as paid time off within those 52 weeks. Both are flagged rather than changed.

Checked locally: every tool page at 375 and 1440px with no horizontal scroll or script errors; Software Stack totals ($30 monthly + $240 yearly + $15 × 2 seats = $80.00/month, $960/year), overlap flag, reload persistence, add/remove rows and CSV export; sitemap lists all tool pages; Release 1 and 2 checks re-run and pass.

Still to do in later work: one shared calculation module for the six costing calculators (kept as-is for now to avoid changing working maths), and verified regional payroll figures.
