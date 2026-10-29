// Shared header, signup strip and footer.
// The Worker renders these on the blog and About pages, and
// `node scripts/sync-chrome.mjs` copies them into the static pages in public/.
// Styles live in public/assets/site.css, behaviour in public/assets/site.js.

const SOCIALS = [
  ["Instagram", "https://instagram.com/afterfivefounder", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>'],
  ["Facebook", "https://facebook.com/afterfivefounder", '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.74-1.6 1.5V12h2.7l-.43 2.9h-2.27v7A10 10 0 0 0 22 12z"/></svg>'],
  ["LinkedIn", "https://linkedin.com/in/afterfivefounder", '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H16.4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H8.9z"/></svg>'],
  ["X", "https://x.com/afterfivefounder", '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.8l-5.3-6.9L5.1 22H2l8-9.2L1.2 2H8l4.8 6.3zM17.7 20.1h1.7L7.4 3.8H5.6z"/></svg>'],
  ["YouTube", "https://youtube.com/@afterfivefounder", '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 16.5 31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7l6 3.5z"/></svg>']
];

const CALCULATORS = [
  ["startup", "Start-up costs"],
  ["bom", "Bill of materials"],
  ["opex", "Monthly operating"],
  ["emp", "New employee"],
  ["digital", "Going digital"],
  ["leap", "Can I go full-time?"]
];

const NAV = [
  ["about", "/about", "About"],
  ["blog", "/blog", "Blog"],
  ["resources", "/costing-suite.html", "Resources"],
  ["shop", "/shop.html", "Shop"]
];

// active: one of "about", "blog", "resources", "shop", or "" for none.
export function siteHeader(active = "") {
  const cur = (key) => (key === active ? ' aria-current="page"' : "");
  const links = NAV.map(([key, href, label]) => {
    if (key !== "resources") return `<a href="${href}"${cur(key)}>${label}</a>`;
    const items = CALCULATORS.map(([id, name]) => `<a href="/costing-suite.html#${id}">${name}</a>`).join("");
    return `<div class="sx-drop"><a href="${href}"${cur(key)}>${label} <span aria-hidden="true">&#9662;</span></a>
        <div class="sx-menu"><span class="sx-menu-head">Cost calculators</span>${items}</div></div>`;
  }).join("\n      ");
  const mobile = NAV.map(([key, href, label]) => `<a href="${href}"${cur(key)}>${label}</a>`).join("");
  return `<header class="sx-nav">
  <div class="sx-wrap sx-in">
    <a class="sx-logo" href="/"><img src="/assets/logo-wm.png" alt="After Five Founder" width="560" height="242"></a>
    <nav class="sx-links" aria-label="Main">
      ${links}
      <a class="sx-btn" href="#join">Follow &rarr;</a>
    </nav>
    <button class="sx-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="sxMobile"><span></span><span></span><span></span></button>
  </div>
  <nav class="sx-mobile" id="sxMobile" aria-label="Main"><a href="/">Home</a>${mobile}<a class="sx-mobile-follow" href="#join">Follow &rarr;</a></nav>
</header>`;
}

const FOLLOW_DEFAULTS = {
  eyebrow: "Don&rsquo;t miss a finding",
  title: "Follow <em>along.</em>",
  text: "The experiments, what worked, what flopped, and the tools I build along the way &mdash; straight to your inbox.",
  button: "Follow along",
  fine: "No spam &middot; Unsubscribe anytime",
  source: "site"
};

// The email signup strip. Every page has one, with id="join".
export function siteFollow(opts = {}) {
  const o = { ...FOLLOW_DEFAULTS, ...opts };
  return `<section class="sx-follow" id="join">
  <div class="sx-wrap">
    <p class="sx-eyebrow">${o.eyebrow}</p>
    <h2>${o.title}</h2>
    <p class="sx-follow-text">${o.text}</p>
    <form class="sx-form" data-subscribe="${o.source}">
      <input type="email" name="email" placeholder="you@email.com" aria-label="Email address" autocomplete="email" required>
      <input type="text" name="company" class="sx-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="submit">${o.button}</button>
    </form>
    <p class="sx-status" role="status"></p>
    <p class="sx-fine">${o.fine}</p>
  </div>
</section>`;
}

export function siteFooter() {
  const socs = SOCIALS.map(([name, href, svg]) => `<a href="${href}" target="_blank" rel="noopener" aria-label="${name}">${svg}</a>`).join("");
  const explore = NAV.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join("");
  return `<footer class="sx-foot">
  <div class="sx-wrap">
    <div class="sx-foot-grid">
      <div class="sx-brand">
        <a href="/"><img src="/assets/logo-full.png" alt="After Five Founder" width="720" height="238"></a>
        <p class="sx-tagline">Beyond the hype. Real businesses, real results.</p>
      </div>
      <div>
        <h3 class="sx-foot-head">Explore</h3>
        <ul class="sx-foot-links">${explore}</ul>
      </div>
      <div>
        <h3 class="sx-foot-head">Follow</h3>
        <div class="sx-socs">${socs}</div>
      </div>
    </div>
    <div class="sx-base"><span>&copy; 2026 After Five Founder &middot; Building GobyGO in the open.</span><span>Powered by MinnowByte IT</span></div>
    <p class="sx-tm">All product names, logos and trademarks are the property of their respective owners. After Five is not affiliated with, endorsed by, or sponsored by them; names are shown only to illustrate the tools small businesses use.</p>
  </div>
</footer>`;
}
