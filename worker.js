var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@1,6..96,500;1,6..96,600;1,6..96,700&display=swap" rel="stylesheet">`;
var CSS = `
:root{--pink:#B0894E;--pink-deep:#8A6A38;--orange:#CBBBA4;--clay:#E0D3BF;--taupe:#CBBBA4;--greige:#8A8078;--ink:#1A1512;--warm:#FAF8F4;--blush:#EDE6D9;--cream:#F2ECE1;--r:22px}
*{box-sizing:border-box}html,body{margin:0;padding:0;max-width:100%;overflow-x:hidden}
body{background:var(--warm);color:var(--ink);font-family:'Jost',system-ui,sans-serif;font-size:1.0rem;line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}a{color:inherit;text-decoration:none}
.wrap{width:min(1100px,92vw);margin-inline:auto}
.serif{font-family:'Jost',system-ui,sans-serif;font-weight:400;line-height:1.08;letter-spacing:-.01em}
.serif em{font-family:'Bodoni Moda',Georgia,serif;font-style:italic;font-weight:600;font-optical-sizing:none;font-variation-settings:'opsz' 22}
.mono{font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.14em;font-size:.72rem;font-weight:700}
.btn{font-family:'Jost',system-ui,sans-serif;display:inline-flex;align-items:center;gap:.5em;font-weight:600;border-radius:100px;padding:.7em 1.3em;font-size:.92rem;cursor:pointer;border:2px solid transparent;transition:transform .12s}
.btn:hover{transform:translateY(-1px)}.btn-pink{background:var(--ink);color:#fff}.btn-cream{background:var(--warm);color:var(--pink);border-color:var(--pink)}
.tag{display:inline-block;font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.12em;font-size:.62rem;font-weight:700;color:var(--pink)}
.tag-pill{display:inline-block;font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;font-weight:700;padding:.45em .9em;border-radius:100px;background:var(--blush);color:var(--pink-deep)}
/* nav */
.nav{position:sticky;top:0;z-index:40;background:var(--warm);border-bottom:1px solid #ece6dd}
.nav .in{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.7rem 0;width:min(1100px,92vw);margin-inline:auto}
.nav img{height:36px;width:auto}.nav .links{font-family:'Jost',system-ui,sans-serif;display:flex;gap:1.5rem;align-items:center;font-weight:500;font-size:.92rem}
.nav .links a{opacity:.82}.nav .links a:hover{opacity:1}
.dropdown{position:relative;display:flex;align-items:center;padding:.85rem 0;margin:-.85rem 0}
.drop-toggle{cursor:pointer}
.drop-menu{position:absolute;top:100%;left:50%;transform:translateX(-50%);background:var(--warm);border:1px solid #e6ddcf;border-radius:16px;box-shadow:0 20px 44px rgba(20,18,16,.14);padding:.55rem;min-width:222px;display:none;flex-direction:column;gap:.05rem;z-index:60}
.dropdown:hover .drop-menu{display:flex}
.drop-head{font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.12em;font-size:.58rem;font-weight:700;color:var(--greige);padding:.4em .9em .55em}
.drop-menu a{padding:.55em .9em;border-radius:9px;font-size:.9rem;white-space:nowrap;opacity:.85}
.drop-menu a:hover{background:var(--cream);opacity:1;color:var(--pink)}
.nav-toggle{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:6px;margin-left:auto}
.nav-toggle span{width:24px;height:2px;background:var(--ink);border-radius:2px;transition:transform .25s,opacity .2s}
.nav-toggle.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.nav-toggle.open span:nth-child(2){opacity:0}
.nav-toggle.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.nav-mobile{display:none;flex-direction:column;background:var(--warm);border-top:1px solid #ece6dd;padding:.3rem 6vw 1.1rem}
.nav-mobile.open{display:flex}
.nav-mobile a{padding:.9rem 0;font-family:'Jost',system-ui,sans-serif;font-weight:500;font-size:1.05rem;color:var(--ink);border-bottom:1px solid rgba(20,18,16,.07)}
.nav-mobile a.nm-follow{color:var(--pink-deep);font-weight:700;border-bottom:0;margin-top:.3rem}
@media(max-width:760px){.nav .links{display:none}.nav-toggle{display:flex}}
/* journal index */
.jhead{padding:4rem 0 2rem}.jhead .eyebrow{color:var(--pink)}.jhead h1{font-size:clamp(2.4rem,5vw,4rem);margin:.8rem 0 0}.jhead p{color:#5a534b;max-width:46ch;margin:1rem 0 0}
.series-band{background:linear-gradient(120deg,var(--blush),var(--cream));border-radius:var(--r);padding:2.2rem;margin:2rem 0 3rem;display:flex;justify-content:space-between;align-items:center;gap:1.5rem;flex-wrap:wrap}
.series-band h2{font-family:'Jost',system-ui,sans-serif;font-weight:600;font-size:1.7rem;margin:.4rem 0 .3rem}.series-band p{margin:0;color:#4a433b;max-width:48ch;font-size:.95rem}
.posts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.3rem;padding-bottom:4rem}
@media(max-width:820px){.posts{grid-template-columns:1fr}}
.post{border:1px solid #eadfd2;border-radius:var(--r);padding:1.5rem;background:#fff;display:flex;flex-direction:column;gap:.7rem;transition:transform .15s,box-shadow .15s}
.post:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(20,18,16,.08)}
.post h3{font-family:'Jost',system-ui,sans-serif;font-weight:700;font-size:1.3rem;line-height:1.14;margin:0}
.post .ex{color:#5a534b;font-size:.9rem;margin:0}.post .meta{margin-top:auto;font-size:.8rem;color:var(--greige)}
.pill-row{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}
/* article */
.article{padding:3rem 0 2rem}.article .back{color:var(--pink);font-weight:700;font-size:.9rem}
.a-head{max-width:760px;margin:1.5rem auto 0}.a-head .meta{color:var(--greige);font-size:.85rem;margin-top:1rem}
.a-head h1{font-size:clamp(2rem,4.5vw,3.4rem);margin:1rem 0 0}
.series-crumb{display:inline-block;margin-top:1rem;background:var(--blush);color:var(--pink-deep);border-radius:100px;padding:.5em 1em;font-family:'Jost',system-ui,sans-serif;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700}
.body{max-width:680px;margin:2.5rem auto 0;font-size:1.12rem;color:#2b2620}
.body p{margin:1.3rem 0}.body h3{font-family:'Jost',system-ui,sans-serif;font-size:1.6rem;margin:2.2rem 0 .6rem}
.body ul{padding-left:1.2rem}.body li{margin:.4rem 0}
.body blockquote,.body .pull{border-left:4px solid var(--pink);margin:2rem 0;padding:.4rem 0 .4rem 1.4rem;font-family:'Bodoni Moda',serif;font-style:italic;font-size:1.5rem;line-height:1.3;color:var(--ink)}
.body a{color:var(--pink-deep);text-decoration:underline}
.body .gg{font-weight:700}
.body>p:first-of-type::first-letter{font-family:'Bodoni Moda',serif;font-weight:600;font-size:3.4rem;float:left;line-height:.8;padding:.05em .12em 0 0;color:var(--pink)}
.a-nav{max-width:680px;margin:3rem auto 0;display:flex;justify-content:space-between;gap:1rem;border-top:1px solid #eadfd2;padding-top:1.5rem}
.a-nav a{font-size:.9rem;font-weight:600;max-width:45%}.a-nav .l{color:var(--greige)}
/* series page */
.slist{max-width:760px;margin:2rem auto 4rem;display:flex;flex-direction:column;gap:1rem}
.sitem{display:flex;gap:1.2rem;align-items:flex-start;border:1px solid #eadfd2;border-radius:var(--r);padding:1.3rem 1.5rem;background:#fff;transition:transform .15s}
.sitem:hover{transform:translateX(4px)}
.sitem .n{font-family:'Bodoni Moda',serif;font-weight:600;font-size:2rem;color:var(--pink);line-height:1;min-width:1.4em}
.sitem h3{font-family:'Jost',system-ui,sans-serif;font-size:1.25rem;margin:0 0 .2rem}.sitem p{margin:0;color:#5a534b;font-size:.88rem}
/* follow strip + footer */
.follow{background:var(--ink);color:#fff;text-align:center;padding:4rem 0;margin-top:2rem}
.follow h2{font-family:'Bodoni Moda',serif;font-size:clamp(1.8rem,4vw,2.8rem);margin:0 0 .6rem}
.follow p{opacity:.95;margin:0 0 1.5rem}.follow .form{display:flex;gap:.6rem;max-width:440px;margin:0 auto;flex-wrap:wrap;justify-content:center}
.follow input{flex:1;min-width:200px;border:0;border-radius:100px;padding:1em 1.4em;font-family:inherit}
.foot{background:var(--cream);color:var(--ink);padding:3rem 0 2rem;border-top:1px solid #ece2d5}.foot .g{display:flex;justify-content:space-between;gap:2rem;flex-wrap:wrap;align-items:center}
.foot img{height:52px;width:auto;opacity:.95}.foot .links{display:flex;gap:1.3rem;font-size:.9rem;flex-wrap:wrap}.foot .links a{opacity:.8}
.foot .brandcol{display:flex;flex-direction:column;gap:.5rem}.foot .tag{font-family:'Bodoni Moda',Georgia,serif;font-style:italic;font-size:1.02rem;color:var(--ink);opacity:.8;margin:0;max-width:32ch}
.foot .base{margin-top:2rem;padding-top:1.4rem;border-top:1px solid rgba(20,18,16,.14);font-size:.78rem;opacity:.6}
.foot .socs{display:flex;gap:.6rem;align-items:center}
.foot .socs a{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--ink);color:var(--cream);transition:background .18s,transform .18s}
.foot .socs a:hover{background:var(--pink-deep);transform:translateY(-2px)}
.foot .socs svg{width:18px;height:18px}
.foot .tm-note{font-size:.72rem;color:var(--greige);opacity:.7;margin:1.2rem 0 0;max-width:76ch;line-height:1.4}
.hp{position:absolute!important;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none}
.follow .sub-status{min-height:1.2em;margin:.7rem 0 0;font-size:.9rem;font-weight:600}
.empty{max-width:600px;margin:3rem auto;text-align:center;color:var(--greige)}
.about-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);gap:3rem;align-items:start;padding-bottom:2rem}
.about-grid img{width:100%;border-radius:var(--r);box-shadow:0 24px 60px rgba(20,18,16,.14)}
.about-grid .body{margin-top:0}
@media(max-width:820px){.about-grid{grid-template-columns:1fr}}
`;
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(esc, "esc");
function escAttr(s) {
  return esc(s).replace(/'/g, "&#39;");
}
__name(escAttr, "escAttr");
function slugify(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
__name(slugify, "slugify");
function fmtDate(iso) {
  if (!iso) return "";
  const d = /* @__PURE__ */ new Date(iso + (iso.length <= 10 ? "T00:00:00Z" : ""));
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
__name(fmtDate, "fmtDate");
function readMins(md) {
  const w = String(md || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(w / 200));
}
__name(readMins, "readMins");
function inline(s) {
  return esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${escAttr(u)}">${t}</a>`);
}
__name(inline, "inline");
function mdToHtml(md) {
  const lines = String(md || "").replace(/\r/g, "").split("\n");
  let out = [], i = 0;
  while (i < lines.length) {
    let ln = lines[i];
    if (!ln.trim()) {
      i++;
      continue;
    }
    if (ln.startsWith("## ")) {
      out.push("<h3>" + inline(ln.slice(3).trim()) + "</h3>");
      i++;
      continue;
    }
    if (ln.startsWith("> ")) {
      let buf2 = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf2.push(lines[i].slice(2).trim());
        i++;
      }
      out.push('<blockquote class="pull">' + inline(buf2.join(" ")) + "</blockquote>");
      continue;
    }
    if (/^[-*]\s+/.test(ln)) {
      let buf2 = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        buf2.push("<li>" + inline(lines[i].replace(/^[-*]\s+/, "").trim()) + "</li>");
        i++;
      }
      out.push("<ul>" + buf2.join("") + "</ul>");
      continue;
    }
    let buf = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("## ") && !lines[i].startsWith("> ") && !/^[-*]\s+/.test(lines[i])) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push("<p>" + inline(buf.join(" ")) + "</p>");
  }
  return out.join("\n");
}
__name(mdToHtml, "mdToHtml");
function nav() {
  return `<nav class="nav"><div class="in">
    <a href="/"><img src="/assets/logo-wm.png" alt="After Five Founder"></a>
    <div class="links">
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <div class="dropdown"><a href="/costing-suite.html" class="drop-toggle">Resources &#9662;</a>
        <div class="drop-menu">
          <span class="drop-head">Cost calculators</span>
          <a href="/costing-suite.html#startup">Start-up costs</a>
          <a href="/costing-suite.html#bom">Bill of materials</a>
          <a href="/costing-suite.html#opex">Monthly operating</a>
          <a href="/costing-suite.html#emp">New employee</a>
          <a href="/costing-suite.html#digital">Going digital</a>
          <a href="/costing-suite.html#leap">Can I go full-time?</a>
        </div></div>
      <a href="/shop.html">Shop</a>
      <a class="btn btn-pink" href="/#join">Follow &rarr;</a>
    </div>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" onclick="var o=this.classList.toggle('open');this.setAttribute('aria-expanded',o);document.getElementById('navMobile').classList.toggle('open')"><span></span><span></span><span></span></button>
    </div>
    <div class="nav-mobile" id="navMobile"><a href="/about">About</a><a href="/blog">Blog</a><a href="/costing-suite.html">Resources</a><a href="/shop.html">Shop</a><a href="/#join" class="nm-follow">Follow &rarr;</a></div></nav>`;
}
__name(nav, "nav");
function followFoot() {
  return `<section class="follow"><div class="wrap">
    <h2>Follow along.</h2>
    <p>The experiments, what worked, what flopped, and the tools I build along the way &mdash; straight to your inbox.</p>
    <form class="form" id="subForm" data-src="blog"><input type="email" name="email" placeholder="you@email.com" aria-label="Email" required><input type="text" name="company" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn btn-cream" type="submit">Follow along</button></form>
    <p class="sub-status" id="subMsg" role="status"></p>
  </div></section>
  <footer class="foot"><div class="wrap"><div class="g">
    <div class="brandcol"><a href="/"><img src="/assets/logo-full.png" alt="After Five Founder"></a><p class="tag">Beyond the hype. Real businesses, real results.</p></div>
    <div class="links"><a href="/about">About</a><a href="/blog">Blog</a><a href="/costing-suite.html">Resources</a><a href="/shop.html">Shop</a></div>
    <div class="socs">
      <a href="https://instagram.com/afterfivefounder" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a>
      <a href="https://facebook.com/afterfivefounder" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.74-1.6 1.5V12h2.7l-.43 2.9h-2.27v7A10 10 0 0 0 22 12z"/></svg></a>
      <a href="https://linkedin.com/in/afterfivefounder" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H16.4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H8.9z"/></svg></a>
      <a href="https://x.com/afterfivefounder" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.8l-5.3-6.9L5.1 22H2l8-9.2L1.2 2H8l4.8 6.3zM17.7 20.1h1.7L7.4 3.8H5.6z"/></svg></a>
      <a href="https://youtube.com/@afterfivefounder" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 16.5 31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7l6 3.5z"/></svg></a>
    </div>
  </div><div class="base">&copy; 2026 After Five Founder &middot; Building GobyGO in the open. &middot; Powered by MinnowByte IT</div><p class="tm-note">All product names, logos and trademarks are the property of their respective owners. After Five is not affiliated with or endorsed by them.</p></div></footer>`;
}
__name(followFoot, "followFoot");
var SUB_JS = `<script>(function(){var f=document.getElementById('subForm');if(!f)return;var msg=document.getElementById('subMsg');var btn=f.querySelector('button');f.addEventListener('submit',function(e){e.preventDefault();var email=(f.email.value||'').trim();if(!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)){show('Please enter a valid email.',false);return;}var o=btn.textContent;btn.disabled=true;btn.textContent='\u2026';fetch('/api/subscribe',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:email,company:f.company?f.company.value:'',source:f.getAttribute('data-src')||'site'})}).then(function(r){return r.json();}).then(function(d){if(d&&d.ok){f.reset();show("You're in \u2014 watch your inbox.",true);}else{show((d&&d.error)||'Something went wrong.',false);}}).catch(function(){show('Network error. Please try again.',false);}).finally(function(){btn.disabled=false;btn.textContent=o;});});function show(t,ok){if(!msg)return;msg.textContent=t;msg.style.color=ok?'#EAD9AE':'#ff9a9a';}})();<\/script>`;
function layout({ title, desc, body }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${escAttr(desc || "")}">
  <link rel="icon" href="/assets/favicon.png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <meta property="og:type" content="website"><meta property="og:site_name" content="After Five Founder"><meta property="og:title" content="${escAttr(title)}"><meta property="og:description" content="${escAttr(desc || "")}"><meta property="og:image" content="https://afterfivefounder.com/assets/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escAttr(title)}"><meta name="twitter:description" content="${escAttr(desc || "")}"><meta name="twitter:image" content="https://afterfivefounder.com/assets/og.jpg">
  ${FONTS}<style>${CSS}</style></head>
  <body>${nav()}${body}${followFoot()}${SUB_JS}<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "dd631d4caee3489ca4fb0bec69f6f42e"}'><\/script></body></html>`;
}
__name(layout, "layout");
var CSP = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com";
var SEC = { "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin", "x-frame-options": "DENY", "strict-transport-security": "max-age=31536000; includeSubDomains" };
function htmlResp(html, status = 200) {
  return new Response(html, { status, headers: { "content-type": "text/html;charset=utf-8", "content-security-policy": CSP, ...SEC } });
}
__name(htmlResp, "htmlResp");
function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", ...SEC, ...extra } });
}
__name(json, "json");
async function journalIndex(env) {
  const { results: arts } = await env.DB.prepare(`SELECT slug,title,excerpt,tag,read_minutes,published_at FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC`).all();
  const series = await env.DB.prepare(`SELECT slug,title,description FROM series ORDER BY sort`).first();
  let seriesCount = 0;
  if (series) {
    const c = await env.DB.prepare(`SELECT COUNT(*) n FROM articles a JOIN series s ON a.series_id=s.id WHERE s.slug=? AND a.status='published'`).bind(series.slug).first();
    seriesCount = c ? c.n : 0;
  }
  const cards = (arts || []).map((a) => `<a class="post" href="/blog/${esc(a.slug)}">
    <span class="tag">${esc(a.tag || "Journal")}</span>
    <h3>${esc(a.title)}</h3>
    <p class="ex">${esc(a.excerpt || "")}</p>
    <span class="meta">${fmtDate(a.published_at)} &middot; ${a.read_minutes || 2} min read</span></a>`).join("");
  const band = series && seriesCount > 0 ? `<a class="series-band" href="/series/${esc(series.slug)}">
    <div><span class="mono" style="color:var(--pink-deep)">Series &middot; ${seriesCount} parts</span>
      <h2>${esc(series.title)}</h2><p>${esc(series.description || "")}</p></div>
    <span class="btn btn-pink">Read the series &rarr;</span></a>` : "";
  const body = `<header class="jhead"><div class="wrap">
      <span class="mono eyebrow">The Blog</span><h1 class="serif">The honest version.</h1>
      <p>No gatekeeping, no jargon &mdash; just what I'm learning as I build, in real time.</p></div></header>
    <div class="wrap">${band}</div>
    <div class="wrap"><div class="posts">${cards || '<p class="empty">First post coming soon.</p>'}</div></div>`;
  return htmlResp(layout({ title: "The Blog \u2014 After Five Founder", desc: "Building a software company after five, in the open.", body }));
}
__name(journalIndex, "journalIndex");
async function articlePage(env, slug) {
  const a = await env.DB.prepare(`SELECT * FROM articles WHERE slug=? AND status='published'`).bind(slug).first();
  if (!a) return htmlResp(layout({ title: "Not found \u2014 After Five Founder", body: `<div class="empty" style="padding:5rem 0"><h1 class="serif">Post not found</h1><p><a class="btn btn-pink" href="/blog">&larr; Back to the Journal</a></p></div>` }), 404);
  let crumb = "", anav = "";
  if (a.series_id) {
    const s = await env.DB.prepare(`SELECT slug,title FROM series WHERE id=?`).bind(a.series_id).first();
    if (s) {
      crumb = `<a class="series-crumb" href="/series/${esc(s.slug)}">Part ${a.series_order} &middot; ${esc(s.title)}</a>`;
      const prev = await env.DB.prepare(`SELECT slug,title FROM articles WHERE series_id=? AND status='published' AND series_order<? ORDER BY series_order DESC LIMIT 1`).bind(a.series_id, a.series_order).first();
      const next = await env.DB.prepare(`SELECT slug,title FROM articles WHERE series_id=? AND status='published' AND series_order>? ORDER BY series_order ASC LIMIT 1`).bind(a.series_id, a.series_order).first();
      anav = `<div class="a-nav">
        <div>${prev ? `<div class="l mono">Previous</div><a href="/blog/${esc(prev.slug)}">${esc(prev.title)}</a>` : ""}</div>
        <div style="text-align:right">${next ? `<div class="l mono">Next</div><a href="/blog/${esc(next.slug)}">${esc(next.title)}</a>` : ""}</div></div>`;
    }
  }
  const body = `<article class="article"><div class="wrap">
      <a class="back" href="/blog">&larr; The Blog</a>
      <div class="a-head"><span class="tag-pill">${esc(a.tag || "Journal")}</span>
        <h1 class="serif">${esc(a.title)}</h1>
        <div class="meta">${fmtDate(a.published_at)} &middot; ${a.read_minutes || 2} min read &middot; Emma</div>
        ${crumb}</div>
      <div class="body">${a.body_html || mdToHtml(a.body_md)}</div>
      ${anav}
    </div></article>`;
  return htmlResp(layout({ title: esc(a.title) + " \u2014 After Five Founder", desc: a.excerpt, body }));
}
__name(articlePage, "articlePage");
async function seriesPage(env, slug) {
  const s = await env.DB.prepare(`SELECT * FROM series WHERE slug=?`).bind(slug).first();
  if (!s) return htmlResp(layout({ title: "Not found", body: `<div class="empty" style="padding:5rem 0"><h1 class="serif">Series not found</h1><p><a class="btn btn-pink" href="/blog">&larr; Journal</a></p></div>` }), 404);
  const { results: arts } = await env.DB.prepare(`SELECT slug,title,excerpt,series_order FROM articles WHERE series_id=? AND status='published' ORDER BY series_order ASC`).bind(s.id).all();
  const items = (arts || []).map((a, idx) => `<a class="sitem" href="/blog/${esc(a.slug)}">
    <span class="n">${String(idx + 1).padStart(2, "0")}</span>
    <div><h3>${esc(a.title)}</h3><p>${esc(a.excerpt || "")}</p></div></a>`).join("");
  const body = `<header class="jhead"><div class="wrap">
      <a class="back" href="/blog" style="color:var(--pink);font-weight:700;font-size:.9rem">&larr; The Blog</a>
      <span class="mono eyebrow" style="display:block;margin-top:1.2rem">The Series</span>
      <h1 class="serif">${esc(s.title)}</h1><p>${esc(s.description || "")}</p></div></header>
    <div class="wrap"><div class="slist">${items || '<p class="empty">No parts published yet.</p>'}</div></div>`;
  return htmlResp(layout({ title: esc(s.title) + " \u2014 After Five Founder", desc: s.description, body }));
}
__name(seriesPage, "seriesPage");
function aboutPage() {
  const body = `<header class="jhead"><div class="wrap">
      <span class="mono eyebrow">About \xB7 After Five</span>
      <h1 class="serif">Hi, I\u2019m Emma.</h1>
      <p>I grew up in New Zealand and moved to the US more than a decade ago. Since then, I\u2019ve built a career working at the intersection of business and technology.</p></div></header>
    <div class="wrap about-grid">
      <img src="/assets/emma-about.jpg" alt="Emma, founder of After Five">
      <div class="body">
        <p>I\u2019ve worked with businesses as they\u2019ve grown from small operations into companies with hundreds of employees. I\u2019ve seen businesses succeed, businesses fail, and plenty just trying to keep everything moving.</p>
        <p>And I\u2019ve seen the same problems come up again and again.</p>
        <p>Spreadsheets everywhere. Processes that take far too long. Software that doesn\u2019t talk to other software. Too many apps. Too much manual work.</p>
        <p>But AI has changed the conversation.</p>
        <p>Small businesses now have access to tools and capabilities that once would have required developers, consultants, expensive software or entire teams.</p>
        <p>That\u2019s what got me thinking about After Five.</p>
        <p>I wanted somewhere to explore what all of this actually means for small business.</p>
        <p>Not AI for the sake of AI. Not another subscription because somebody on the internet says you need it. And definitely not pretending every new tool is going to revolutionize your business.</p>
        <p>Sometimes the answer is AI. Sometimes it\u2019s automation. Sometimes it\u2019s simply getting more out of something you\u2019re already paying for.</p>
        <p>And sometimes the spreadsheet is perfectly fine.</p>
        <p>After Five is where I\u2019m giving things a go, figuring out what works, learning from what doesn\u2019t, and sharing it all along the way.</p>
        <blockquote class="pull">Because this isn\u2019t about having all the answers. It\u2019s about being willing to figure them out.</blockquote>
        <p style="margin-top:1.6rem"><a class="btn btn-pink" href="/#join">Follow the journey</a></p>
      </div>
    </div>`;
  return htmlResp(layout({ title: "About \u2014 After Five Founder", desc: "The story behind After Five \u2014 an honest experiment in what actually helps a small business, from AI to automation to getting more out of the tools you already pay for.", body }));
}
__name(aboutPage, "aboutPage");
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(hmac, "hmac");
async function makeToken(env) {
  const p = "admin." + Date.now();
  return p + "." + await hmac(env.SESSION_SECRET || "dev", p);
}
__name(makeToken, "makeToken");
async function validToken(env, tok) {
  if (!tok) return false;
  const i = tok.lastIndexOf(".");
  if (i < 0) return false;
  const p = tok.slice(0, i), sig = tok.slice(i + 1);
  if (await hmac(env.SESSION_SECRET || "dev", p) !== sig) return false;
  const ts = parseInt(p.split(".")[1] || "0");
  return Date.now() - ts < 30 * 864e5;
}
__name(validToken, "validToken");
function cookie(req, name) {
  const c = req.headers.get("cookie") || "";
  const m = c.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : null;
}
__name(cookie, "cookie");
async function authed(req, env) {
  return await validToken(env, cookie(req, "aff_session"));
}
__name(authed, "authed");
function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "unknown";
}
__name(clientIp, "clientIp");
async function rateOk(env, key, limit, windowSec) {
  try {
    const now = Math.floor(Date.now() / 1e3);
    const row = await env.DB.prepare("SELECT count,window_start FROM rate_limits WHERE key=?").bind(key).first();
    if (!row || row.window_start < now - windowSec) {
      await env.DB.prepare("INSERT INTO rate_limits(key,count,window_start) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=1,window_start=?").bind(key, now, now).run();
      return true;
    }
    if (row.count >= limit) return false;
    await env.DB.prepare("UPDATE rate_limits SET count=count+1 WHERE key=?").bind(key).run();
    return true;
  } catch (e) {
    return true;
  }
}
__name(rateOk, "rateOk");
async function api(request, env, url) {
  const p = url.pathname, method = request.method;
  const secure = url.protocol === "https:" ? " Secure;" : "";
  if (p === "/api/login" && method === "POST") {
    if (!await rateOk(env, "login:" + clientIp(request), 8, 300)) return json({ ok: false, error: "Too many attempts. Try again in a few minutes." }, 429);
    const { password } = await request.json().catch(() => ({}));
    if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) return json({ ok: false, error: "Wrong password" }, 401);
    const tok = await makeToken(env);
    return json({ ok: true }, 200, { "set-cookie": `aff_session=${tok}; HttpOnly;${secure} SameSite=Lax; Path=/; Max-Age=${30 * 86400}` });
  }
  if (p === "/api/logout") {
    return json({ ok: true }, 200, { "set-cookie": `aff_session=; HttpOnly;${secure} SameSite=Lax; Path=/; Max-Age=0` });
  }
  if (p === "/api/latest" && method === "GET") {
    const n = Math.min(12, Math.max(1, parseInt(url.searchParams.get("n") || "6")));
    const { results } = await env.DB.prepare(`SELECT slug,title,excerpt,tag,read_minutes,published_at FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC LIMIT ?`).bind(n).all();
    return json({ posts: results || [] }, 200, { "cache-control": "max-age=60" });
  }
  if (p === "/api/subscribe" && method === "POST") {
    if (!await rateOk(env, "sub:" + clientIp(request), 6, 600)) return json({ ok: false, error: "Too many attempts. Please try again shortly." }, 429);
    const b = await request.json().catch(() => ({}));
    if (b.company) return json({ ok: true });
    const email = (b.email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return json({ ok: false, error: "Please enter a valid email." }, 400);
    try {
      await env.DB.prepare(`INSERT INTO subscribers (email,source,created_at) VALUES (?,?,?) ON CONFLICT(email) DO NOTHING`).bind(email, (b.source || "site").slice(0, 40), (/* @__PURE__ */ new Date()).toISOString()).run();
    } catch (e) {
      return json({ ok: false, error: "Something went wrong. Please try again." }, 500);
    }
    return json({ ok: true });
  }
  if (!await authed(request, env)) return json({ ok: false, error: "unauthorized" }, 401);
  if (p === "/api/series") {
    if (method === "GET") {
      const { results } = await env.DB.prepare(`SELECT * FROM series ORDER BY sort`).all();
      return json({ series: results });
    }
    if (method === "POST") {
      const b = await request.json();
      const slug = b.slug ? slugify(b.slug) : slugify(b.title);
      await env.DB.prepare(`INSERT INTO series (slug,title,description,sort) VALUES (?,?,?,?)`).bind(slug, b.title, b.description || "", b.sort || 0).run();
      return json({ ok: true, slug });
    }
  }
  if (p === "/api/articles") {
    if (method === "GET") {
      const { results } = await env.DB.prepare(`SELECT id,slug,title,tag,status,series_id,series_order,published_at,updated_at FROM articles ORDER BY updated_at DESC`).all();
      return json({ articles: results });
    }
    if (method === "POST") {
      return await saveArticle(env, await request.json(), null);
    }
  }
  let m;
  if (m = p.match(/^\/api\/articles\/(\d+)$/)) {
    const id = parseInt(m[1]);
    if (method === "GET") {
      const a = await env.DB.prepare(`SELECT * FROM articles WHERE id=?`).bind(id).first();
      return a ? json({ article: a }) : json({ error: "not found" }, 404);
    }
    if (method === "PUT") {
      return await saveArticle(env, await request.json(), id);
    }
    if (method === "DELETE") {
      await env.DB.prepare(`DELETE FROM articles WHERE id=?`).bind(id).run();
      return json({ ok: true });
    }
  }
  return json({ error: "not found" }, 404);
}
__name(api, "api");
async function saveArticle(env, b, id) {
  const title = (b.title || "").trim();
  if (!title) return json({ error: "Title required" }, 400);
  let slug = b.slug ? slugify(b.slug) : slugify(title);
  const md = b.body_md || "";
  const html = mdToHtml(md);
  const tag = b.tag || "Journal";
  const excerpt = (b.excerpt || "").trim();
  const cover = b.cover_url || null;
  const series_id = b.series_id ? parseInt(b.series_id) : null;
  const series_order = b.series_order ? parseInt(b.series_order) : 0;
  const status = b.status === "published" ? "published" : "draft";
  const read = readMins(md);
  if (id) {
    const cur = await env.DB.prepare(`SELECT published_at,status FROM articles WHERE id=?`).bind(id).first();
    let pub = cur ? cur.published_at : null;
    if (status === "published" && !pub) pub = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    await env.DB.prepare(`UPDATE articles SET slug=?,title=?,excerpt=?,body_md=?,body_html=?,tag=?,cover_url=?,series_id=?,series_order=?,status=?,read_minutes=?,published_at=?,updated_at=datetime('now') WHERE id=?`).bind(slug, title, excerpt, md, html, tag, cover, series_id, series_order, status, read, pub, id).run();
    return json({ ok: true, id, slug });
  } else {
    const pub = status === "published" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null;
    const r = await env.DB.prepare(`INSERT INTO articles (slug,title,excerpt,body_md,body_html,tag,cover_url,series_id,series_order,status,read_minutes,published_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(slug, title, excerpt, md, html, tag, cover, series_id, series_order, status, read, pub).run();
    return json({ ok: true, id: r.meta.last_row_id, slug });
  }
}
__name(saveArticle, "saveArticle");
function adminHtml() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin \u2014 After Five Founder</title>${FONTS}<style>${CSS}
  .admin{max-width:960px;margin:2rem auto;padding:0 1rem}
  .login{max-width:360px;margin:6rem auto;text-align:center}
  .field{display:block;margin:.9rem 0}.field label{display:block;font-family:'Jost',system-ui,sans-serif;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--greige);margin-bottom:.35rem}
  input,textarea,select{width:100%;font-family:inherit;font-size:1rem;border:1.5px solid #e0d7ca;border-radius:12px;padding:.7em .9em;background:#fff}
  textarea{min-height:340px;line-height:1.6;resize:vertical}
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media(max-width:640px){.row2{grid-template-columns:1fr}}
  .toolbar{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}
  .list{display:flex;flex-direction:column;gap:.6rem}
  .li{display:flex;justify-content:space-between;align-items:center;gap:1rem;border:1px solid #eadfd2;border-radius:14px;padding:.9rem 1.1rem;background:#fff}
  .li .st{font-family:'Jost',system-ui,sans-serif;font-size:.58rem;text-transform:uppercase;letter-spacing:.1em;padding:.3em .7em;border-radius:100px}
  .st.published{background:#e6f7ec;color:#1a7a44}.st.draft{background:var(--blush);color:var(--pink-deep)}
  .li .acts{display:flex;gap:.5rem}.link{color:var(--pink-deep);font-weight:700;cursor:pointer;font-size:.85rem;background:none;border:0}
  .editor{display:none}.editor.on{display:block}.dash.off{display:none}
  .preview{border:1px dashed #d9cebd;border-radius:12px;padding:1rem 1.2rem;background:#fff;margin-top:.5rem}
  .msg{padding:.7rem 1rem;border-radius:10px;margin:1rem 0;display:none}.msg.on{display:block}.msg.err{background:#fde8ee;color:#b3164a}.msg.ok{background:#e6f7ec;color:#1a7a44}
  h1.serif{font-size:2rem}.muted{color:var(--greige);font-size:.85rem}
  </style></head><body>
  <div class="admin">
    <div id="login" class="login">
      <img src="/assets/logo-wm.png" style="height:44px;margin:0 auto 1.5rem" alt="">
      <h1 class="serif">Journal admin</h1>
      <p class="muted">Sign in to write.</p>
      <div class="msg err" id="loginErr"></div>
      <input type="password" id="pw" placeholder="Password" onkeydown="if(event.key==='Enter')login()">
      <button class="btn btn-pink" style="margin-top:1rem;width:100%;justify-content:center" onclick="login()">Sign in</button>
    </div>

    <div id="app" style="display:none">
      <div class="toolbar">
        <a href="/blog" class="serif" style="font-size:1.4rem">The Blog <span class="muted" style="font-family:Montserrat">admin</span></a>
        <div style="display:flex;gap:.6rem">
          <button class="btn btn-pink" onclick="newPost()">+ New article</button>
          <button class="link" onclick="logout()">Sign out</button>
        </div>
      </div>
      <div class="msg" id="msg"></div>

      <div class="dash" id="dash"><div class="list" id="list"></div></div>

      <div class="editor" id="editor">
        <button class="link" onclick="closeEditor()">&larr; All articles</button>
        <input type="hidden" id="f_id">
        <div class="field"><label>Title</label><input id="f_title" placeholder="Article title"></div>
        <div class="row2">
          <div class="field"><label>Tag</label><select id="f_tag"><option>Strategy</option><option>Systems</option><option>Mindset</option><option>Life</option><option>Journal</option></select></div>
          <div class="field"><label>Slug (URL) \u2014 leave blank to auto</label><input id="f_slug" placeholder="auto-from-title"></div>
        </div>
        <div class="row2">
          <div class="field"><label>Series</label><select id="f_series"><option value="">\u2014 None (standalone) \u2014</option></select></div>
          <div class="field"><label>Order in series</label><input id="f_order" type="number" value="0"></div>
        </div>
        <div class="field"><label>Excerpt (short summary)</label><input id="f_excerpt" placeholder="One line shown on cards"></div>
        <div class="field"><label>Body \u2014 plain text. **bold**, *italic*, ## heading, &gt; quote, - list</label><textarea id="f_body" oninput="renderPrev()"></textarea></div>
        <div class="field"><label>Live preview</label><div class="preview body" id="prev"></div></div>
        <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem">
          <button class="btn btn-pink" onclick="save('published')">Publish</button>
          <button class="btn btn-cream" onclick="save('draft')">Save draft</button>
          <button class="link" id="delBtn" onclick="del()" style="margin-left:auto;color:#b3164a">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <script>${ADMIN_JS}<\/script></body></html>`;
}
__name(adminHtml, "adminHtml");
var ADMIN_JS = `
let SERIES=[];
async function login(){
  const pw=document.getElementById('pw').value;
  const r=await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pw})});
  const d=await r.json();
  if(d.ok){document.getElementById('login').style.display='none';document.getElementById('app').style.display='block';init();}
  else{const e=document.getElementById('loginErr');e.textContent=d.error||'Failed';e.classList.add('on');}
}
async function logout(){await fetch('/api/logout');location.reload();}
function flash(t,ok){const m=document.getElementById('msg');m.textContent=t;m.className='msg on '+(ok?'ok':'err');setTimeout(()=>m.className='msg',3000);}
async function init(){
  const s=await (await fetch('/api/series')).json();SERIES=s.series||[];
  const sel=document.getElementById('f_series');sel.innerHTML='<option value=\\'\\'>\u2014 None (standalone) \u2014</option>'+SERIES.map(x=>'<option value="'+x.id+'">'+x.title+'</option>').join('');
  loadList();
}
async function loadList(){
  const d=await (await fetch('/api/articles')).json();
  const map={};SERIES.forEach(s=>map[s.id]=s.title);
  document.getElementById('list').innerHTML=(d.articles||[]).map(a=>
    '<div class="li"><div><strong>'+a.title+'</strong><div class="muted">'+(a.tag||'')+(a.series_id?(' \xB7 '+(map[a.series_id]||'series')+' #'+a.series_order):'')+'</div></div>'
    +'<div class="acts"><span class="st '+a.status+'">'+a.status+'</span><button class="link" onclick="edit('+a.id+')">Edit</button></div></div>'
  ).join('')||'<p class="muted">No articles yet. Click \u201CNew article\u201D.</p>';
}
function showEditor(on){document.getElementById('editor').classList.toggle('on',on);document.getElementById('dash').classList.toggle('off',on);}
function closeEditor(){showEditor(false);loadList();}
function newPost(){
  document.getElementById('f_id').value='';['f_title','f_slug','f_excerpt','f_body'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('f_tag').value='Strategy';document.getElementById('f_series').value='';document.getElementById('f_order').value='0';
  document.getElementById('delBtn').style.display='none';renderPrev();showEditor(true);
}
async function edit(id){
  const d=await (await fetch('/api/articles/'+id)).json();const a=d.article;if(!a)return;
  document.getElementById('f_id').value=a.id;document.getElementById('f_title').value=a.title||'';
  document.getElementById('f_slug').value=a.slug||'';document.getElementById('f_tag').value=a.tag||'Strategy';
  document.getElementById('f_series').value=a.series_id||'';document.getElementById('f_order').value=a.series_order||0;
  document.getElementById('f_excerpt').value=a.excerpt||'';document.getElementById('f_body').value=a.body_md||'';
  document.getElementById('delBtn').style.display='inline';renderPrev();showEditor(true);
}
function payload(status){return{id:document.getElementById('f_id').value||null,title:document.getElementById('f_title').value,
  slug:document.getElementById('f_slug').value,tag:document.getElementById('f_tag').value,
  series_id:document.getElementById('f_series').value,series_order:document.getElementById('f_order').value,
  excerpt:document.getElementById('f_excerpt').value,body_md:document.getElementById('f_body').value,status:status};}
async function save(status){
  const p=payload(status);if(!p.title){flash('Title required',false);return;}
  const id=p.id;const r=await fetch('/api/articles'+(id?('/'+id):''),{method:id?'PUT':'POST',headers:{'content-type':'application/json'},body:JSON.stringify(p)});
  const d=await r.json();
  if(d.ok){flash(status==='published'?'Published \u2713':'Draft saved \u2713',true);document.getElementById('f_id').value=d.id;document.getElementById('delBtn').style.display='inline';}
  else flash(d.error||'Save failed',false);
}
async function del(){
  const id=document.getElementById('f_id').value;if(!id)return;
  if(!confirm('Delete this article? This cannot be undone.'))return;
  const r=await fetch('/api/articles/'+id,{method:'DELETE'});const d=await r.json();
  if(d.ok){flash('Deleted',true);closeEditor();}
}
function inlineMd(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>').replace(/\\*([^*]+)\\*/g,'<em>$1</em>').replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g,'<a href="$2">$1</a>');}
function renderPrev(){
  const md=document.getElementById('f_body').value;const lines=md.replace(/\\r/g,'').split('\\n');let out=[],i=0;
  while(i<lines.length){let ln=lines[i];if(!ln.trim()){i++;continue;}
    if(ln.startsWith('## ')){out.push('<h3>'+inlineMd(ln.slice(3))+'</h3>');i++;continue;}
    if(ln.startsWith('> ')){let b=[];while(i<lines.length&&lines[i].startsWith('> ')){b.push(lines[i].slice(2));i++;}out.push('<blockquote class="pull">'+inlineMd(b.join(' '))+'</blockquote>');continue;}
    if(/^[-*]\\s+/.test(ln)){let b=[];while(i<lines.length&&/^[-*]\\s+/.test(lines[i])){b.push('<li>'+inlineMd(lines[i].replace(/^[-*]\\s+/,''))+'</li>');i++;}out.push('<ul>'+b.join('')+'</ul>');continue;}
    let b=[];while(i<lines.length&&lines[i].trim()&&!lines[i].startsWith('## ')&&!lines[i].startsWith('> ')&&!/^[-*]\\s+/.test(lines[i])){b.push(lines[i]);i++;}
    out.push('<p>'+inlineMd(b.join(' '))+'</p>');}
  document.getElementById('prev').innerHTML=out.join('');
}
// auto-open app if already logged in
fetch('/api/articles').then(r=>{if(r.ok){document.getElementById('login').style.display='none';document.getElementById('app').style.display='block';init();}});
`;
async function adminPage(request, env) {
  return htmlResp(adminHtml());
}
__name(adminPage, "adminPage");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let p = url.pathname;
    if (/^\/blog(\/|\.html|$)/.test(p)) p = p.replace("/blog", "/journal");
    try {
      if (p.startsWith("/api/")) return await api(request, env, url);
      if (p === "/admin" || p === "/admin/") return await adminPage(request, env);
      if (p === "/about" || p === "/about/") return aboutPage();
      if (p === "/journal" || p === "/journal/" || p === "/journal.html") return await journalIndex(env);
      let m;
      if (m = p.match(/^\/journal\/([a-z0-9-]+)\/?$/)) return await articlePage(env, m[1]);
      if (m = p.match(/^\/post-([a-z0-9-]+)\.html$/)) return await articlePage(env, m[1]);
      if (m = p.match(/^\/series\/([a-z0-9-]+)\/?$/)) return await seriesPage(env, m[1]);
      const asset = await env.ASSETS.fetch(request);
      if (p.startsWith("/assets/") && asset.ok) {
        const r = new Response(asset.body, asset);
        r.headers.set("Cache-Control", "public, max-age=31536000, immutable");
        return r;
      }
      return asset;
    } catch (e) {
      return new Response("Server error: " + (e && e.message || e), { status: 500 });
    }
  }
};
export {
  worker_default as default
};
