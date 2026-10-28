var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
import { siteHeader, siteFollow, siteFooter } from "./chrome.js";
var FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@1,6..96,500;1,6..96,600;1,6..96,700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/site.css">`;
var CSS = `
:root{--gold:#B0894E;--gold-ink:#7A5C2E;--muted:#6B625A;--ink:#1A1512;--warm:#FAF8F4;--blush:#EDE6D9;--cream:#F2ECE1;--line:#EADFD2;--r:22px}
*{box-sizing:border-box}html,body{margin:0;padding:0;max-width:100%;overflow-x:hidden}
body{background:var(--warm);color:var(--ink);font-family:'Jost',system-ui,sans-serif;font-size:1.0rem;line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}a{color:inherit;text-decoration:none}
.wrap{width:var(--sx-wrap);margin-inline:auto}
.serif{font-family:'Jost',system-ui,sans-serif;font-weight:400;line-height:1.08;letter-spacing:-.01em}
.serif em{font-family:'Bodoni Moda',Georgia,serif;font-style:italic;font-weight:600;font-optical-sizing:none;font-variation-settings:'opsz' 22}
.mono{font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.14em;font-size:.72rem;font-weight:700}
.btn{font-family:'Jost',system-ui,sans-serif;display:inline-flex;align-items:center;gap:.5em;font-weight:600;border-radius:100px;padding:.7em 1.3em;font-size:.92rem;cursor:pointer;border:2px solid transparent;transition:transform .12s}
.btn:hover{transform:translateY(-1px)}.btn-dark{background:var(--ink);color:#fff}.btn-cream{background:var(--warm);color:var(--gold-ink);border-color:var(--gold-ink)}
.tag{display:inline-block;font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.12em;font-size:.62rem;font-weight:700;color:var(--gold-ink)}
.tag-pill{display:inline-block;font-family:'Jost',system-ui,sans-serif;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;font-weight:700;padding:.45em .9em;border-radius:100px;background:var(--blush);color:var(--gold-ink)}
/* journal index */
.jhead{padding:4rem 0 2rem}.jhead .eyebrow{color:var(--gold-ink)}.jhead h1{font-size:clamp(2.4rem,5vw,4rem);margin:.8rem 0 0}.jhead p{color:#4a433b;max-width:46ch;margin:1rem 0 0;font-size:1.15rem}
.posts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.3rem;padding-bottom:4rem}
@media(max-width:820px){.posts{grid-template-columns:1fr}}
.post{border:1px solid #eadfd2;border-radius:var(--r);padding:1.5rem;background:#fff;display:flex;flex-direction:column;gap:.7rem;transition:transform .15s,box-shadow .15s}
.post:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(20,18,16,.08)}
.post h3{font-family:'Jost',system-ui,sans-serif;font-weight:700;font-size:1.3rem;line-height:1.14;margin:0}
.post .ex{color:#5a534b;font-size:.9rem;margin:0}.post .meta{margin-top:auto;font-size:.8rem;color:var(--muted)}
.pill-row{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}
/* article */
.article{padding:3rem 0 2rem}.article .back{display:block;width:max-content;margin-bottom:1.4rem;color:var(--gold-ink);font-weight:700;font-size:.9rem}
.a-head{max-width:680px;margin:1.5rem auto 0}.a-head .meta{color:var(--muted);font-size:.85rem;margin-top:1rem}
.a-head h1{font-size:clamp(2rem,4.5vw,3.4rem);margin:1rem 0 0}
.body{max-width:680px;margin:2.5rem auto 0;font-size:1.12rem;color:#2b2620}
.body p{margin:1.3rem 0}.body h3{font-family:'Jost',system-ui,sans-serif;font-size:1.6rem;margin:2.2rem 0 .6rem}
.body ul{padding-left:1.2rem}.body li{margin:.4rem 0}
.body blockquote,.body .pull{border-left:4px solid var(--gold);margin:2rem 0;padding:.4rem 0 .4rem 1.4rem;font-family:'Bodoni Moda',serif;font-style:italic;font-size:1.5rem;line-height:1.3;color:var(--ink)}
.body a{color:var(--gold-ink);text-decoration:underline}
.body .gg{font-weight:700}
.body>p:first-child::first-letter{font-family:'Bodoni Moda',serif;font-weight:600;font-size:3.4rem;float:left;line-height:.8;padding:.05em .12em 0 0;color:var(--gold)}
.empty{max-width:600px;margin:3rem auto;text-align:center;color:var(--muted)}
.about-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);gap:3rem;align-items:start;padding-bottom:2rem}
.about-grid img{width:100%;border-radius:var(--r);box-shadow:0 24px 60px rgba(20,18,16,.14)}
.about-grid .body{margin-top:0}
@media(min-width:821px){.about-grid img{position:sticky;top:96px}}
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
function layout({ title, desc, body, active = "" }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${escAttr(desc || "")}">
  <link rel="icon" href="/assets/favicon.png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <meta property="og:type" content="website"><meta property="og:site_name" content="After Five Founder"><meta property="og:title" content="${escAttr(title)}"><meta property="og:description" content="${escAttr(desc || "")}"><meta property="og:image" content="https://afterfivefounder.com/assets/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escAttr(title)}"><meta name="twitter:description" content="${escAttr(desc || "")}"><meta name="twitter:image" content="https://afterfivefounder.com/assets/og.jpg">
  ${FONTS}<style>${CSS}</style></head>
  <body>${siteHeader(active)}${body}${siteFollow({ source: "blog" })}${siteFooter()}<script src="/assets/site.js" defer><\/script><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "dd631d4caee3489ca4fb0bec69f6f42e"}'><\/script></body></html>`;
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
  const cards = (arts || []).map((a) => `<a class="post" href="/blog/${esc(a.slug)}">
    <span class="tag">${esc(a.tag || "Journal")}</span>
    <h3>${esc(a.title)}</h3>
    <p class="ex">${esc(a.excerpt || "")}</p>
    <span class="meta">${fmtDate(a.published_at)} &middot; ${a.read_minutes || 2} min read</span></a>`).join("");
  const body = `<header class="jhead"><div class="wrap">
      <span class="mono eyebrow">The Blog</span><h1 class="serif">The honest <em>version.</em></h1>
      <p>No gatekeeping, no jargon &mdash; just what I'm learning as I build, in real time.</p></div></header>
    <div class="wrap">${cards ? `<div class="posts">${cards}</div>` : '<p class="empty">The first post is on its way. Follow along below to hear when it lands.</p>'}</div>`;
  return htmlResp(layout({ title: "The Blog \u2014 After Five Founder", desc: "Building a software company after five, in the open.", body, active: "blog" }));
}
__name(journalIndex, "journalIndex");
async function articlePage(env, slug) {
  const a = await env.DB.prepare(`SELECT * FROM articles WHERE slug=? AND status='published'`).bind(slug).first();
  if (!a) return htmlResp(layout({ title: "Not found \u2014 After Five Founder", body: `<div class="empty" style="padding:5rem 0"><h1 class="serif">Post not found</h1><p><a class="btn btn-dark" href="/blog">&larr; Back to the blog</a></p></div>`, active: "blog" }), 404);
  const body = `<article class="article"><div class="wrap">
      <div class="a-head"><a class="back" href="/blog">&larr; The Blog</a>
        <span class="tag-pill">${esc(a.tag || "Journal")}</span>
        <h1 class="serif">${esc(a.title)}</h1>
        <div class="meta">${fmtDate(a.published_at)} &middot; ${a.read_minutes || 2} min read &middot; Emma</div></div>
      <div class="body">${mdToHtml(a.body_md)}</div>
    </div></article>`;
  return htmlResp(layout({ title: a.title + " \u2014 After Five Founder", desc: a.excerpt, body, active: "blog" }));
}
__name(articlePage, "articlePage");
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
        <p style="margin-top:1.6rem"><a class="btn btn-dark" href="/#join">Follow the journey</a></p>
      </div>
    </div>`;
  return htmlResp(layout({ active: "about", title: "About \u2014 After Five Founder", desc: "The story behind After Five \u2014 an honest experiment in what actually helps a small business, from AI to automation to getting more out of the tools you already pay for.", body }));
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
  if (p === "/api/articles") {
    if (method === "GET") {
      const { results } = await env.DB.prepare(`SELECT id,slug,title,tag,status,published_at,updated_at FROM articles ORDER BY updated_at DESC`).all();
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
  if (!title) return json({ error: "Add a title first." }, 400);
  const slug = b.slug ? slugify(b.slug) : slugify(title);
  if (!slug) return json({ error: "The web address needs some letters or numbers." }, 400);
  const clash = await env.DB.prepare(`SELECT id FROM articles WHERE slug=? AND id IS NOT ?`).bind(slug, id).first();
  if (clash) return json({ error: "Another post already uses the address /blog/" + slug + ". Change the title or the web address." }, 409);
  const md = b.body_md || "";
  const html = mdToHtml(md);
  const tag = (b.tag || "Journal").trim().slice(0, 30) || "Journal";
  const excerpt = (b.excerpt || "").trim();
  const cover = b.cover_url || null;
  const status = b.status === "published" ? "published" : "draft";
  const read = readMins(md);
  if (id) {
    const cur = await env.DB.prepare(`SELECT published_at FROM articles WHERE id=?`).bind(id).first();
    if (!cur) return json({ error: "That post no longer exists." }, 404);
    let pub = cur.published_at;
    if (status === "published" && !pub) pub = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    await env.DB.prepare(`UPDATE articles SET slug=?,title=?,excerpt=?,body_md=?,body_html=?,tag=?,cover_url=?,series_id=NULL,series_order=0,status=?,read_minutes=?,published_at=?,updated_at=datetime('now') WHERE id=?`).bind(slug, title, excerpt, md, html, tag, cover, status, read, pub, id).run();
    return json({ ok: true, id, slug, status });
  }
  const pub = status === "published" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null;
  const r = await env.DB.prepare(`INSERT INTO articles (slug,title,excerpt,body_md,body_html,tag,cover_url,series_id,series_order,status,read_minutes,published_at) VALUES (?,?,?,?,?,?,?,NULL,0,?,?,?)`).bind(slug, title, excerpt, md, html, tag, cover, status, read, pub).run();
  return json({ ok: true, id: r.meta.last_row_id, slug, status });
}
__name(saveArticle, "saveArticle");
function adminHtml() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Blog editor — After Five Founder</title>
  <link rel="icon" href="/assets/favicon.png">${FONTS}<style>${CSS}
  body{background:var(--cream)}
  .admin{width:min(1040px,calc(100% - 32px));margin:0 auto;padding:2rem 0 4rem}
  .login{max-width:380px;margin:5rem auto;padding:2.2rem;text-align:center;background:#fff;border:1px solid var(--line);border-radius:var(--r)}
  .login img{height:44px;width:auto;margin:0 auto 1.4rem}
  .login h1{font-size:2rem;margin:0}
  .field{display:block;margin:0 0 1.1rem}
  .field label{display:block;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem}
  .field .help{font-size:.82rem;color:var(--muted);margin:.35rem 0 0}
  input,textarea{width:100%;font:inherit;font-size:1rem;color:var(--ink);border:1.5px solid #DCD0BE;border-radius:12px;padding:.7em .9em;background:#fff}
  input:focus,textarea:focus{outline:none;border-color:var(--gold-ink);box-shadow:0 0 0 3px rgba(122,92,46,.15)}
  #f_title{font-size:1.4rem;font-weight:500}
  textarea{min-height:420px;line-height:1.65;resize:vertical}
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1.4rem;align-items:start}
  @media(max-width:860px){.split,.row2{grid-template-columns:1fr}}
  .toolbar{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}
  .toolbar h1{font-size:2rem;margin:0}.toolbar .right{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap}
  .list{display:flex;flex-direction:column;gap:.6rem}
  .li{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.2rem;background:#fff;border:1px solid var(--line);border-radius:14px}
  .li-main{min-width:0}.li-title{all:unset;cursor:pointer;font-weight:600;font-size:1.05rem}.li-title:hover{color:var(--gold-ink)}
  .acts{display:flex;gap:.9rem;align-items:center;flex-shrink:0}
  .st{display:inline-block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.35em .8em;border-radius:100px}
  .st.published{background:#E3F2E8;color:#1A6B3E}.st.draft{background:var(--blush);color:var(--gold-ink)}
  .link{background:none;border:0;padding:0;font:inherit;font-weight:700;font-size:.88rem;color:var(--gold-ink);cursor:pointer;text-decoration:none}
  .link:hover{text-decoration:underline}
  .ed-top{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.2rem}
  .preview{padding:1.4rem 1.6rem;background:#fff;border:1px solid var(--line);border-radius:12px;min-height:420px;max-height:70vh;overflow:auto}
  .preview.body{margin:0;max-width:none;font-size:1.02rem}
  .bar{position:sticky;bottom:0;display:flex;gap:.7rem;align-items:center;flex-wrap:wrap;margin-top:1rem;padding:1rem 0;background:var(--cream);border-top:1px solid var(--line)}
  .bar .spacer{flex:1}
  .btn-ghost{background:#fff;color:var(--ink);border-color:#DCD0BE}
  .danger{color:#A3123F}
  .msg{display:none;margin:0 0 1rem;padding:.75rem 1rem;border-radius:10px;font-weight:500}.msg.on{display:block}
  #msg{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:10;width:min(560px,calc(100% - 32px));box-shadow:0 12px 30px rgba(20,18,16,.15)}
  .msg.err{background:#FBE4EA;color:#A3123F}.msg.ok{background:#E3F2E8;color:#1A6B3E}
  .muted{color:var(--muted);font-size:.86rem}.empty-list{padding:2rem;text-align:center;background:#fff;border-radius:14px}
  .cheats{display:flex;flex-wrap:wrap;gap:.4rem 1rem;font-size:.8rem;color:var(--muted);margin:.4rem 0 0}.cheats code{background:#fff;border:1px solid var(--line);border-radius:6px;padding:.05em .4em}
  </style></head><body>
  <main class="admin">
    <section id="login" class="login">
      <img src="/assets/logo-wm.png" alt="After Five Founder">
      <h1 class="serif">Blog editor</h1>
      <p class="muted">Sign in to write and publish posts.</p>
      <div class="msg" id="loginErr" role="alert"></div>
      <div class="field" style="text-align:left"><label for="pw">Password</label><input type="password" id="pw" autocomplete="current-password"></div>
      <button class="btn btn-dark" id="btnLogin" style="width:100%;justify-content:center">Sign in</button>
    </section>

    <div id="app" hidden>
      <div class="msg" id="msg" role="status"></div>
      <section id="dash">
        <div class="toolbar">
          <div><h1 class="serif">Your <em>posts</em></h1><span class="muted" id="count"></span></div>
          <div class="right">
            <a class="link" href="/blog" target="_blank" rel="noopener">View the blog</a>
            <button class="link" id="btnLogout">Sign out</button>
            <button class="btn btn-dark" id="btnNew">+ New post</button>
          </div>
        </div>
        <div class="list" id="list"></div>
      </section>

      <section id="editor" hidden>
        <div class="ed-top"><button class="link" id="btnBack">&larr; All posts</button><span id="ed-state" class="st draft"></span></div>
        <input type="hidden" id="f_id">
        <div class="field"><label for="f_title">Title</label><input id="f_title" placeholder="What's this post called?"></div>
        <div class="field"><label for="f_excerpt">Summary</label><input id="f_excerpt" placeholder="One or two sentences. Shows on the blog and home page cards."></div>
        <div class="row2">
          <div class="field"><label for="f_tag">Topic</label><input id="f_tag" list="tags" placeholder="Journal"><datalist id="tags"><option>Journal</option><option>AI</option><option>Tools</option><option>Systems</option><option>Strategy</option><option>Mindset</option></datalist></div>
          <div class="field"><label for="f_slug">Web address</label><input id="f_slug" placeholder="Leave blank to use the title"><p class="help" id="slugHint"></p></div>
        </div>
        <div class="split">
          <div class="field"><label for="f_body">Post</label><textarea id="f_body" placeholder="Start writing. Leave a blank line between paragraphs."></textarea>
            <div class="cheats"><span><code>**bold**</code></span><span><code>*italic*</code></span><span><code>## Heading</code></span><span><code>&gt; Quote</code></span><span><code>- List item</code></span><span><code>[link](https://...)</code></span></div></div>
          <div class="field"><label>Preview</label><div class="preview body" id="prev"></div></div>
        </div>
        <div class="bar">
          <button class="btn btn-dark" id="btnPublish">Publish</button>
          <button class="btn btn-ghost" id="btnDraft">Save draft</button>
          <a class="link" id="btnView" target="_blank" rel="noopener" hidden>View post</a>
          <span class="spacer"></span>
          <button class="link danger" id="btnDelete" hidden>Delete post</button>
        </div>
      </section>
    </div>
  </main>
  <script src="/assets/admin.js" defer><\/script></body></html>`;
}
__name(adminHtml, "adminHtml");
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
      if (/^\/series(\/|$)/.test(p)) return Response.redirect(url.origin + "/blog", 301);
      if (p === "/small-business-project" || p === "/small-business-project.html") return Response.redirect(url.origin + "/", 301);
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
