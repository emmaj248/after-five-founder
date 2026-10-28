// Copies the shared header, signup strip and footer from chrome.js into the
// static pages, between <!-- site:NAME --> and <!-- /site:NAME --> markers.
// Run after changing chrome.js:  node scripts/sync-chrome.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { siteHeader, siteFollow, siteFooter } from "../chrome.js";

const PAGES = {
  "public/index.html": { active: "", follow: { source: "home" } },
  "public/costing-suite.html": { active: "resources", follow: { source: "costing" } },
  "public/shop.html": {
    active: "shop",
    follow: {
      eyebrow: "Opening soon",
      title: "Be first through <em>the door.</em>",
      text: "The shop is almost ready. Leave your email and you&rsquo;ll get first access &mdash; plus a launch discount on the whole kit.",
      button: "Notify me",
      source: "shop"
    }
  }
};

let failed = false;
for (const [file, cfg] of Object.entries(PAGES)) {
  let html = readFileSync(file, "utf8");
  const parts = { header: siteHeader(cfg.active), follow: siteFollow(cfg.follow), footer: siteFooter() };
  for (const [name, markup] of Object.entries(parts)) {
    const re = new RegExp(`<!-- site:${name} -->[\\s\\S]*?<!-- /site:${name} -->`);
    if (!re.test(html)) { console.error(`${file}: missing <!-- site:${name} --> markers`); failed = true; continue; }
    html = html.replace(re, () => `<!-- site:${name} -->\n${markup}\n<!-- /site:${name} -->`);
  }
  // The static pages use Windows line endings; keep them so diffs stay small.
  writeFileSync(file, html.replace(/\r?\n/g, "\r\n"));
  console.log(`updated ${file}`);
}
if (failed) process.exit(1);
