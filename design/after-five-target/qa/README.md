# Homepage restyle: visual QA record

Scope: the homepage (`public/index.html`), plus the shared header in `public/assets/site.css` so every page keeps the same header. No other page was restyled.

Screenshots were taken with Playwright (Chromium) against a local copy of `public/`, with reduced motion on and fonts loaded. `/api/latest` was mocked with posts titled "TEST: …" so the stories layout could be checked; those titles are not real content. `after-empty-state-1440.png` shows the page when no posts are published.

Files: `baseline-*` is the site before this change, `reference-*` is `03-reference.html`, `after-*` is this change. `*-viewport.png` is the first screen, `*-full.png` the whole page.

## Asset map

| Target area | Source used | Notes |
|---|---|---|
| Header and footer logo | `public/assets/logo-wm.png`, `logo-full.png` | Unchanged |
| Typography | Google Fonts Jost and Bodoni Moda (already loaded) | Added the upright Bodoni Moda weights for headings |
| Hero illustration | `public/assets/emma-hero.jpg` plus the existing invoice spreadsheet, dozen-app panel, AI question and handwritten notes | Emma's photo is the focal point with the panels layered around it, after feedback that the photo-free version felt flat. Brand-coloured app tiles and the AI brand dot replaced with generic line icons; the app names stay as plain text |
| Stories | `/api/latest` (client) and `homeLatestHtml` in `worker.js` (server) | Now one feature and two smaller stories (was one and three). Empty state unchanged in wording |
| Founder | `public/assets/emma-about.jpg` and the existing welcome copy | Directly after the stories |
| Who it's for | `public/assets/emma-apps.jpg` and existing copy | Kept, restyled |
| Toolkit | The existing Bill of materials preview and its maths | Logic unchanged; laid out as intro, calculator, question list |
| Threads | The existing four threads | Bronze top rules instead of coloured cards |
| Shop | The existing five products, prices and "Coming soon" | Unchanged content |
| Newsletter | Shared signup strip, `/api/subscribe` | Homepage-only cream two-column layout; form and endpoint unchanged |

## Checklist

| Check | Result | Evidence |
|---|---|---|
| Original logo and fonts; no generated portrait, brand marks or fake articles | PASS | `after-1440-viewport.png` |
| Header about 80px | PASS | 81px desktop (incl. border), 65px mobile |
| Hero about 530px, two balanced columns | PASS | 560px at 1440 and 1920, 540px at 1024 |
| First editorial heading and start of stories visible at 1440x900 | PASS | `after-1440-viewport.png` |
| Bright paper hero, bronze accent on final tagline line, original illustration on the right | PASS | `after-1440-viewport.png` |
| Content max 1240px, section spacing 48–88px | PASS | `--max` 1240, `--section` clamp(48px, 6vw, 88px) |
| Feature + smaller stories; honest empty state | PASS | `after-1440-full.png`, `after-empty-state-1440.png` |
| Founder directly after stories | PASS | `after-1440-full.png` |
| Toolkit visible with the real calculator | PASS | Materials 10, margin 40% gives $28.75 price, $17.25 cost, same as before |
| No horizontal overflow at 390 and 375 | PASS | scrollWidth equals viewport width at every size tested |
| Mobile: readable headline, simpler illustration, menu works, touch targets | PASS | Menu opens; no visible button or link in the tested set under 40px tall |
| Routes, forms, calculators, shop, newsletter unchanged | PASS | Same links and ids; costing suite and shop load with no script errors |
| Contrast | PASS | Bronze on paper 4.9:1, bronze on cream 4.5:1, muted text 6.1:1+, white on bronze-dark 7.4:1 |
| Keyboard focus visible, reduced motion respected | PASS | Shared focus outline; hero and reveal animations off under reduced motion |

## Known differences from the reference

- The reference hero has no portrait. A first pass followed it, but it read as flat, so Emma's hero photo is back as the focal point. The founder section after the stories uses a different photo.
- Text is heavier than the pack's defaults (Jost at 500, darker grey) after feedback that the type was too thin.
- The three small "Practical solutions / Real-world tests / Built for small business" badges under the hero buttons were removed to keep the hero near 530px.
- The "Who is this for?" and "Building in public" sections are not in the reference. They were kept and restyled because they hold existing copy.
- The shop shows the five real products, not the reference's three.
- The footer stays as it was (cream with link columns), not the reference's dark footer.
