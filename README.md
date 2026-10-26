# After Five Founder

Static website for After Five Founder, the sister brand of Minnow Byte IT. Every page is a self-contained HTML file (styles and scripts inline), so there is no build step.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: Can a side hustle become the real thing? |
| `small-business-project.html` | The Small Business Project |
| `journal.html` | The Journal |
| `costing-suite.html` | Costing Suite |
| `cost-calculator.html` | Cost Calculator |
| `social-kit.html` | Social Kit |
| `archive/after-five-founder-v1.html` | Earlier version of the site (August 2026), kept for reference |

Links between pages point at the local files, so the site works when served from any static host.

## Preview locally

Open `index.html` in a browser, or run a local server:

```sh
python3 -m http.server 8000
```

## Deploy

Any static host works. On Cloudflare Pages, connect this repo with no build command and `/` as the output directory.
