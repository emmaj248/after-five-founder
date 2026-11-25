var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
import { siteHeader, siteFollow, siteFooter } from "./chrome.js";
import "./public/assets/md.js";
import { TOOLS, REGIONS, toolBySlug } from "./tools.js";
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
.body a:not(.btn){color:var(--gold-ink);text-decoration:underline}
.body .gg{font-weight:700}
.body>p:first-child::first-letter{font-family:'Bodoni Moda',serif;font-weight:600;font-size:3.4rem;float:left;line-height:.8;padding:.05em .12em 0 0;color:var(--gold)}
.empty{max-width:600px;margin:3rem auto;text-align:center;color:var(--muted)}
.empty-left{margin:1rem 0 4rem;text-align:left;font-size:1.05rem}
.about-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(2rem,5vw,4.5rem);align-items:center;padding:4rem 0 3.5rem}
.about-hero .eyebrow{color:var(--gold-ink)}
.about-hero h1{font-size:clamp(2.4rem,5vw,4rem);margin:.8rem 0 0}
.about-hero p{color:#4a433b;max-width:44ch;margin:1.1rem 0 0;font-size:1.15rem}
.about-hero img{width:100%;aspect-ratio:6/5;object-fit:cover;border-radius:var(--r);box-shadow:0 24px 60px rgba(20,18,16,.14)}
.about-story{border-top:1px solid var(--line);padding-bottom:3rem}
.about-story .body>p:first-child{font-size:1.3rem;line-height:1.55;color:var(--ink)}
.about-story .body>p:first-child::first-letter{all:unset}
@media(max-width:820px){.about-hero{grid-template-columns:1fr;padding:2.5rem 0 2.5rem}.about-hero img{order:-1;aspect-ratio:4/3}}
/* release 2: blog listing */
.chips{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.6rem 0 0}
.chip{display:inline-flex;align-items:center;gap:.4em;padding:.5em 1em;border-radius:100px;border:1.5px solid #DCD0BE;font-size:.86rem;font-weight:600;color:var(--ink);background:#fff}
.chip span{color:var(--muted);font-weight:500}
.chip:hover{border-color:var(--gold-ink)}
.chip[aria-current]{background:var(--ink);border-color:var(--ink);color:#fff}.chip[aria-current] span{color:#D9BF8F}
.featured{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(1.4rem,4vw,3rem);align-items:center;margin:0 0 2.6rem;padding-bottom:2.6rem;border-bottom:1px solid var(--line)}
.featured:hover h2{color:var(--gold-ink)}
.featured h2{font-family:'Jost',system-ui,sans-serif;font-weight:500;font-size:clamp(1.7rem,3.2vw,2.5rem);line-height:1.1;letter-spacing:-.01em;margin:.7rem 0 0}
.featured p{color:#4a433b;font-size:1.08rem;margin:.9rem 0 0;max-width:52ch}
.featured .meta{display:block;margin-top:1rem;font-size:.85rem;color:var(--muted)}
@media(max-width:820px){.featured{grid-template-columns:1fr}}
.tile{position:relative;aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;background:radial-gradient(110% 120% at 85% 10%,#4A3E33 0%,transparent 55%),#2A231E}
.tile img{width:100%;height:100%;object-fit:cover}
.tile .tt{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(1.1rem,3vw,1.8rem);color:#F2ECE1}
.tile .tt .s{font-size:.66rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;opacity:.8}
.tile .tt .k{font-family:'Bodoni Moda',Georgia,serif;font-style:italic;font-weight:600;font-size:clamp(2.2rem,5vw,3.8rem);line-height:1;color:#D9BF8F;font-optical-sizing:none;font-variation-settings:'opsz' 22}
.kind{display:inline-block;font-family:'Jost',system-ui,sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.42em .85em;border-radius:100px;border:1.5px solid var(--gold-ink);color:var(--gold-ink)}
.kind-tested,.kind-practice{background:var(--gold-ink);color:#fff}
.post .pill-row{gap:.45rem}
/* release 2: article */
.a-dek{font-size:1.22rem;line-height:1.5;color:#4a433b;margin:1rem 0 0}
.byline{display:flex;align-items:center;gap:.8rem;margin-top:1.4rem;font-size:.88rem;color:var(--muted)}
.byline img{width:40px;height:40px;border-radius:50%;object-fit:cover}
.byline a{color:var(--ink);font-weight:600}
.byline .dot{opacity:.5}
.a-cover{max-width:880px;margin:2.2rem auto 0}.a-cover img{width:100%;border-radius:var(--r)}
.body h2{font-family:'Jost',system-ui,sans-serif;font-size:1.6rem;font-weight:600;line-height:1.2;margin:2.4rem 0 .6rem}
.body h3{font-weight:600;font-size:1.25rem!important;margin:1.8rem 0 .4rem!important}
.blk{margin:2rem 0;padding:1.3rem 1.5rem;border-radius:16px;background:#fff;border:1px solid var(--line);font-size:1.02rem}
.blk>:last-child{margin-bottom:0}.blk p{margin:.7rem 0}
.blk-h{margin:0 0 .4rem!important;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-ink)}
.blk-summary{background:var(--cream);border-color:transparent}
.blk-verdict{background:var(--ink);color:#F2ECE1;border-color:var(--ink)}.blk-verdict .blk-h{color:#D9BF8F}.blk-verdict a:not(.btn){color:#E5CF9F!important}
.blk-skip{border-left:4px solid #88796C}.blk-for{border-left:4px solid var(--gold)}
.blk-sources,.blk-disclosure{font-size:.9rem;color:#4a433b;background:transparent}
.blk-note{font-size:.84rem;color:var(--muted)}
.body .blk ul{margin:.4rem 0}
.share{max-width:680px;margin:2.6rem auto 0;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;padding-top:1.6rem;border-top:1px solid var(--line)}
.share b{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-right:.4rem}
.share a,.share button{display:inline-flex;align-items:center;padding:.5em 1em;border-radius:100px;border:1.5px solid #DCD0BE;background:#fff;font:inherit;font-size:.84rem;font-weight:600;color:var(--ink);cursor:pointer}
.share a:hover,.share button:hover{border-color:var(--gold-ink);color:var(--gold-ink)}
.author{max-width:680px;margin:2rem auto 0;display:grid;grid-template-columns:auto 1fr;gap:1.2rem;align-items:center;padding:1.4rem;border-radius:var(--r);background:var(--cream)}
.author img{width:76px;height:76px;border-radius:50%;object-fit:cover}
.author p{margin:.25rem 0 0;color:#4a433b;font-size:.95rem}
.author .n{margin:0;font-weight:700;color:var(--ink)}
.author a{color:var(--gold-ink);font-weight:600}
.more-wrap{border-top:1px solid var(--line);margin-top:3.5rem;padding:3rem 0 4rem}
.more-wrap h2{font-size:clamp(1.6rem,3vw,2.2rem);margin:0 0 1.4rem}
.tools-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:2.4rem}
.tools-strip a{display:block;padding:1.1rem 1.2rem;border-radius:16px;background:#EAE2D7;color:var(--ink);font-weight:600;transition:transform .15s}
.tools-strip a:hover{transform:translateY(-3px)}
.tools-strip a span{display:block;margin-top:.3rem;font-size:.66rem;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--gold-ink)}
@media(max-width:820px){.tools-strip{grid-template-columns:1fr}}
@media(max-width:520px){.author{grid-template-columns:1fr}.author img{width:60px;height:60px}}
.labels{max-width:680px;margin:3rem auto 0;padding:2.5rem 0 3rem;border-top:1px solid var(--line)}
.labels dl{display:grid;grid-template-columns:max-content 1fr;gap:.7rem 1.2rem;margin:1.2rem 0 0}
.labels dt{margin:0}.labels dd{margin:0;color:#4a433b}
@media(max-width:560px){.labels dl{grid-template-columns:1fr}.labels dd{margin-bottom:.6rem}}
/* release 3: tools */
.t-hero{padding:4rem 0 2.6rem}
.t-hero .eyebrow{color:var(--gold-ink)}
.t-hero h1{font-size:clamp(2.2rem,4.6vw,3.6rem);margin:.8rem 0 0;max-width:22ch}
.t-hero h1 em{color:var(--gold-ink)}
.t-hero p{color:#4a433b;font-size:1.15rem;max-width:54ch;margin:1rem 0 0}
.t-hero .acts{display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.6rem}
.btn-line{background:transparent;color:var(--ink);border:1.6px solid var(--ink)}.btn-line:hover{background:var(--ink);color:#fff}
.t-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:1rem;padding-bottom:4rem}
.t-card{display:flex;flex-direction:column;gap:.55rem;padding:1.5rem;border-radius:var(--r);background:#fff;border:1px solid var(--line);transition:transform .15s,box-shadow .15s}
.t-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(20,18,16,.08)}
.t-card h2{font-family:'Jost',system-ui,sans-serif;font-size:1.25rem;font-weight:600;line-height:1.2;margin:0}
.t-card p{margin:0;color:#5a534b;font-size:.94rem}
.t-card .go{margin-top:auto;padding-top:.6rem;font-weight:700;font-size:.85rem;color:var(--gold-ink)}
.t-card.new{background:var(--ink);color:#F2ECE1;border-color:var(--ink)}.t-card.new p{color:#E5D9C4}.t-card.new .go,.t-card.new .tag{color:#D9BF8F}
.t-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,300px);gap:clamp(2rem,5vw,4rem);align-items:start;padding:2.6rem 0 4rem;border-top:1px solid var(--line)}
.t-body h2{font-family:'Jost',system-ui,sans-serif;font-size:1.4rem;font-weight:600;margin:2.2rem 0 .7rem}
.t-body h2:first-child{margin-top:0}
.t-body p,.t-body li{color:#2b2620;font-size:1.04rem}
.t-body ul,.t-body ol{padding-left:1.25rem;margin:.4rem 0}.t-body li{margin:.4rem 0}
.t-two{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem}
.t-two>div{padding:1.1rem 1.3rem;border-radius:16px;background:#fff;border:1px solid var(--line)}
.t-two h3{margin:0 0 .3rem;font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--gold-ink)}
.t-two ul{margin:0;font-size:.96rem}
.t-limit{margin-top:1.6rem;padding:1.1rem 1.3rem;border-radius:16px;background:var(--cream);color:#2b2620}
.t-limit b{display:block;font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;color:var(--gold-ink);margin-bottom:.3rem}
.t-side{position:sticky;top:96px;display:flex;flex-direction:column;gap:1rem}
.t-side .box{padding:1.3rem;border-radius:var(--r);background:#EAE2D7}
.t-side .box h3{margin:0 0 .6rem;font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--gold-ink)}
.t-side .box a{display:block;padding:.45rem 0;border-bottom:1px solid rgba(122,92,46,.18);font-weight:600;font-size:.95rem}
.t-side .box a:last-child{border-bottom:0}.t-side .box a:hover{color:var(--gold-ink)}
.regions{width:100%;border-collapse:collapse;margin-top:.8rem;font-size:.95rem}
.regions th,.regions td{text-align:left;padding:.6rem .7rem;border-bottom:1px solid var(--line);vertical-align:top}
.regions th{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.rg{display:inline-block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.35em .75em;border-radius:100px;background:var(--blush);color:var(--gold-ink);white-space:nowrap}
.rg.on{background:var(--gold-ink);color:#fff}
@media(max-width:860px){.t-body{grid-template-columns:1fr}.t-side{position:static}.t-two{grid-template-columns:1fr}}
/* software stack calculator */
.st{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,340px);gap:1.4rem;align-items:start;padding-bottom:3rem}
.st-panel{background:#fff;border:1px solid var(--line);border-radius:20px;padding:1.2rem;container-type:inline-size;min-width:0}
.st-row{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1.65fr) minmax(0,.85fr) minmax(0,.9fr) minmax(0,.55fr) 36px;gap:.6rem;align-items:end;padding:.7rem 0;border-bottom:1px solid #F0E8DC}
.st-f span:first-child{display:block;font-size:.64rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:.3rem}
.st-row:not(:first-child) .st-f>span:first-child{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.st-f input,.st-f select{width:100%;font:inherit;font-size:.95rem;color:var(--ink);border:1.5px solid #E0D3BF;border-radius:10px;padding:.55rem .6rem;background:#fff;min-height:42px}
.st-f input:focus,.st-f select:focus{outline:none;border-color:var(--gold-ink);box-shadow:0 0 0 3px rgba(122,92,46,.14)}
.st-in{position:relative;display:block}.st-in i{position:absolute;left:.6rem;top:50%;transform:translateY(-50%);font-style:normal;color:var(--muted);font-size:.9rem}.st-in input{padding-left:1.4rem}
.st-del{width:36px;height:42px;border:0;border-radius:10px;background:transparent;color:var(--muted);font-size:1.4rem;cursor:pointer}.st-del:hover{background:var(--cream);color:#A3123F}
.st-acts{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-top:1rem}
.st-acts .link{background:none;border:0;font:inherit;font-weight:700;font-size:.88rem;color:var(--gold-ink);cursor:pointer;padding:.4rem}
.st-note{font-size:.85rem;color:var(--muted);min-height:1.2em;margin:.6rem 0 0}
.st-out{position:sticky;top:96px;background:#302A25;color:#F2ECE1;border-radius:20px;padding:1.4rem;display:flex;flex-direction:column;gap:1rem}
.st-out .k{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#CDB78F}
.st-out .big{font-size:clamp(2.2rem,4vw,2.8rem);font-weight:500;line-height:1;letter-spacing:-.02em;color:#fff;margin-top:.35rem;font-variant-numeric:tabular-nums}
.st-figs{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}.st-figs .v{font-size:1.15rem;font-weight:600;margin-top:.2rem;font-variant-numeric:tabular-nums}
.st-g{margin-top:.7rem}.st-g-top{display:flex;justify-content:space-between;gap:.6rem;font-size:.88rem}.st-g-top small{color:#BFB2A0;font-size:.75rem;margin-left:.2rem}
.st-bar{height:6px;border-radius:100px;background:#4A3E33;margin-top:.35rem;overflow:hidden}.st-bar span{display:block;height:100%;background:#D9BF8F;transition:width .3s}
.st-empty{font-size:.9rem;color:#BFB2A0;margin:0}
.st-ov{background:#F2ECE1;color:var(--ink);border-radius:14px;padding:.9rem 1rem;font-size:.9rem}.st-ov p{margin:.35rem 0 0}.st-ov-h{margin:0!important;font-size:.66rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-ink)}
.st-priv{font-size:.8rem;color:#BFB2A0;margin:0}
@media(max-width:1120px){.st{grid-template-columns:1fr}.st-out{position:static;order:-1}}
@container (max-width:620px){.st-row{grid-template-columns:1fr 1fr;padding:1rem 0;position:relative}.st-name,.st-group{grid-column:1/-1}.st-row .st-f>span:first-child{position:static!important;width:auto!important;height:auto!important;clip:auto!important}.st-del{position:absolute;top:.6rem;right:0}.st-name{padding-right:40px}}
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
  const w = globalThis.AFMD.plain(md).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(w / 200));
}
__name(readMins, "readMins");
var mdToHtml = (md) => globalThis.AFMD.mdToHtml(md);
function layout({ title, desc, body, active = "", canonical = "", ogType = "website", ogImage = "https://afterfivefounder.com/assets/og.jpg", head = "", noindex = false }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${escAttr(desc || "")}">
  <link rel="icon" href="/assets/favicon.png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">${canonical ? `<link rel="canonical" href="${escAttr(canonical)}"><meta property="og:url" content="${escAttr(canonical)}">` : ""}${noindex ? '<meta name="robots" content="noindex">' : ""}
  <meta property="og:type" content="${ogType}"><meta property="og:site_name" content="After Five Founder"><meta property="og:title" content="${escAttr(title)}"><meta property="og:description" content="${escAttr(desc || "")}"><meta property="og:image" content="${escAttr(ogImage)}">${ogImage.endsWith("/assets/og.jpg") ? '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">' : ""}
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escAttr(title)}"><meta name="twitter:description" content="${escAttr(desc || "")}"><meta name="twitter:image" content="${escAttr(ogImage)}">
  <link rel="alternate" type="application/rss+xml" title="After Five Founder" href="/feed.xml">
  ${FONTS}<style>${CSS}</style>${head}</head>
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
var SITE = "https://afterfivefounder.com";
var KINDS = globalThis.AFMD.KINDS;
var DEFAULT_OG = SITE + "/assets/og.jpg";
// Site-hosted images only (the CSP blocks other hosts).
function localImg(u) {
  return u && /^\/[^\/]/.test(u) ? u : "";
}
__name(localImg, "localImg");
function kindPill(k, tag) {
  return k && KINDS[k] && KINDS[k].toLowerCase() !== String(tag || "").toLowerCase() ? `<span class="kind kind-${esc(k)}" title="How this post is labelled: see About">${esc(KINDS[k])}</span>` : "";
}
__name(kindPill, "kindPill");
function tileHtml(a) {
  const img = localImg(a.cover_url);
  return `<div class="tile">${img ? `<img src="${escAttr(img)}" alt="" loading="lazy">` : `<div class="tt" aria-hidden="true"><span class="s">After Five &middot; The honest version</span><span class="k">${esc(a.tag || "Journal")}</span></div>`}</div>`;
}
__name(tileHtml, "tileHtml");
function postCard(a) {
  return `<a class="post" href="/blog/${esc(a.slug)}">
    <span class="pill-row"><span class="tag">${esc(a.tag || "Journal")}</span>${kindPill(a.kind, a.tag)}</span>
    <h3>${esc(a.title)}</h3>
    <p class="ex">${esc(a.excerpt || "")}</p>
    <span class="meta">${fmtDate(a.published_at)} &middot; ${a.read_minutes || 2} min read</span></a>`;
}
__name(postCard, "postCard");
function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}<\/script>`;
}
__name(jsonLd, "jsonLd");
var PUBLISHER = { "@type": "Organization", name: "After Five Founder", url: SITE + "/", logo: { "@type": "ImageObject", url: SITE + "/assets/logo-full.png" } };
var AUTHOR = { "@type": "Person", name: "Emma", url: SITE + "/about", jobTitle: "Founder, After Five Founder" };
async function publishedPosts(env) {
  const { results } = await env.DB.prepare(`SELECT * FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC`).all();
  return results || [];
}
__name(publishedPosts, "publishedPosts");
async function journalIndex(env, url) {
  const all = await publishedPosts(env);
  const topic = (url.searchParams.get("topic") || "").trim();
  const counts = {};
  all.forEach((a) => { const t = a.tag || "Journal"; counts[t] = (counts[t] || 0) + 1; });
  const topics = Object.keys(counts).sort((x, y) => counts[y] - counts[x] || x.localeCompare(y));
  const match = topics.find((t) => t.toLowerCase() === topic.toLowerCase());
  const arts = match ? all.filter((a) => (a.tag || "Journal") === match) : all;
  const chips = topics.length > 1 ? `<nav class="chips" aria-label="Topics"><a class="chip" href="/blog"${match ? "" : ' aria-current="page"'}>All <span>${all.length}</span></a>${topics.map((t) => `<a class="chip" href="/blog?topic=${encodeURIComponent(t)}"${t === match ? ' aria-current="page"' : ""}>${esc(t)} <span>${counts[t]}</span></a>`).join("")}</nav>` : "";
  let list = "";
  if (arts.length) {
    const showFeat = !match && arts.length > 1;
    const feat = showFeat ? arts[0] : null;
    const rest = showFeat ? arts.slice(1) : arts;
    list = (feat ? `<a class="featured" href="/blog/${esc(feat.slug)}">${tileHtml(feat)}<div>
        <span class="pill-row"><span class="tag">Latest &middot; ${esc(feat.tag || "Journal")}</span>${kindPill(feat.kind, feat.tag)}</span>
        <h2>${esc(feat.title)}</h2>${feat.excerpt ? `<p>${esc(feat.excerpt)}</p>` : ""}
        <span class="meta">${fmtDate(feat.published_at)} &middot; ${feat.read_minutes || 2} min read</span></div></a>` : "") + `<div class="posts">${rest.map(postCard).join("")}</div>`;
  }
  const title = match ? `${match} \u2014 The Blog \u2014 After Five Founder` : "The Blog \u2014 After Five Founder";
  const body = `<header class="jhead"><div class="wrap">
      <span class="mono eyebrow">The Blog${match ? " &middot; " + esc(match) : ""}</span><h1 class="serif">The honest <em>version.</em></h1>
      <p>No gatekeeping, no jargon &mdash; just what I'm learning as I build, in real time.</p>${chips}</div></header>
    <div class="wrap">${list || '<p class="empty empty-left">The first post is on its way. Follow along below to hear when it lands.</p>'}</div>`;
  const canonical = SITE + "/blog" + (match ? "?topic=" + encodeURIComponent(match) : "");
  const ld = jsonLd({ "@context": "https://schema.org", "@type": "Blog", name: "After Five Founder \u2014 The Blog", url: SITE + "/blog", publisher: PUBLISHER, author: AUTHOR });
  return htmlResp(layout({ title, desc: "What I'm learning about small business technology, practical AI, software costs and better workflows \u2014 written by Emma, the founder of After Five.", body, active: "blog", canonical, head: ld }));
}
__name(journalIndex, "journalIndex");
// Calculators suggested under an article: the software-stack tool first, then two picked by topic.
var TOOL_BY_TOPIC = { ai: ["going-digital-costs", "monthly-operating-costs"], tools: ["going-digital-costs", "monthly-operating-costs"], systems: ["monthly-operating-costs", "new-employee-cost"], strategy: ["can-i-go-full-time", "start-up-costs"], "building in public": ["start-up-costs", "can-i-go-full-time"] };
function articleTools(tag) {
  const pick = TOOL_BY_TOPIC[String(tag || "").toLowerCase()] || ["start-up-costs", "monthly-operating-costs"];
  return ["software-stack"].concat(pick).map(toolBySlug).filter(Boolean);
}
__name(articleTools, "articleTools");
async function articlePage(env, slug) {
  const a = await env.DB.prepare(`SELECT * FROM articles WHERE slug=? AND status='published'`).bind(slug).first();
  if (!a) return htmlResp(layout({ title: "Not found \u2014 After Five Founder", body: `<div class="empty" style="padding:5rem 0"><h1 class="serif">Post not found</h1><p><a class="btn btn-dark" href="/blog">&larr; Back to the blog</a></p></div>`, active: "blog", noindex: true }), 404);
  const all = await publishedPosts(env);
  const others = all.filter((x) => x.slug !== a.slug);
  const related = others.filter((x) => (x.tag || "Journal") === (a.tag || "Journal")).concat(others.filter((x) => (x.tag || "Journal") !== (a.tag || "Journal"))).slice(0, 3);
  const pubDay = (a.published_at || "").slice(0, 10);
  const updDay = (a.updated_at || "").slice(0, 10);
  const updated = updDay && pubDay && updDay > pubDay ? updDay : "";
  const verified = a.verified_at ? fmtDate(a.verified_at) : "";
  const url = SITE + "/blog/" + a.slug;
  const cover = localImg(a.cover_url);
  const enc = encodeURIComponent;
  const body = `<article class="article"><div class="wrap">
      <div class="a-head"><a class="back" href="/blog">&larr; The Blog</a>
        <span class="pill-row"><a class="tag-pill" href="/blog?topic=${enc(a.tag || "Journal")}">${esc(a.tag || "Journal")}</a>${kindPill(a.kind, a.tag)}</span>
        <h1 class="serif">${esc(a.title)}</h1>
        ${a.excerpt ? `<p class="a-dek">${esc(a.excerpt)}</p>` : ""}
        <div class="byline"><img src="/assets/emma-about.jpg" alt="" width="40" height="40"><span>By <a href="/about">Emma</a> <span class="dot">&middot;</span> <time datetime="${escAttr(pubDay)}">${fmtDate(pubDay)}</time>${updated ? ` <span class="dot">&middot;</span> Updated <time datetime="${escAttr(updated)}">${fmtDate(updated)}</time>` : ""} <span class="dot">&middot;</span> ${a.read_minutes || 2} min read</span></div></div>
      ${cover ? `<figure class="a-cover"><img src="${escAttr(cover)}" alt=""></figure>` : ""}
      <div class="body">${globalThis.AFMD.mdToHtml(a.body_md, { verified })}</div>
      <div class="share"><b>Share</b>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://x.com/intent/post?url=${enc(url)}&amp;text=${enc(a.title)}" target="_blank" rel="noopener">X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${enc(url)}" target="_blank" rel="noopener">Facebook</a>
        <a href="mailto:?subject=${enc(a.title)}&amp;body=${enc(url)}">Email</a>
        <button type="button" data-copy="${escAttr(url)}">Copy link</button></div>
      <aside class="author"><img src="/assets/emma-about.jpg" alt="" width="76" height="76"><div><p class="n">Written by Emma</p><p>Founder of After Five. I grew up in New Zealand, moved to the US more than a decade ago, and have built a career at the intersection of business and technology. <a href="/about">More about me &rarr;</a></p></div></aside>
    </div></article>
    <section class="more-wrap"><div class="wrap">
      ${related.length ? `<h2 class="serif">Keep <em>reading.</em></h2><div class="posts" style="padding-bottom:0">${related.map(postCard).join("")}</div>` : ""}
      <div class="tools-strip">${articleTools(a.tag).map((t) => `<a href="/tools/${t.slug}">${esc(t.question)}<span>${esc(t.name)} calculator &rarr;</span></a>`).join("")}</div>
    </div></section>
    <script>document.querySelectorAll("[data-copy]").forEach(function(b){b.addEventListener("click",function(){var t=b.textContent;(navigator.clipboard?navigator.clipboard.writeText(b.getAttribute("data-copy")):Promise.reject()).then(function(){b.textContent="Copied";},function(){b.textContent="Copy failed";}).finally(function(){setTimeout(function(){b.textContent=t;},1800);});});});<\/script>`;
  const ld = jsonLd({
    "@context": "https://schema.org", "@type": "BlogPosting", headline: a.title, description: a.excerpt || undefined,
    datePublished: pubDay || undefined, dateModified: updated || pubDay || undefined, url, mainEntityOfPage: url,
    image: cover ? SITE + cover : DEFAULT_OG, author: AUTHOR, publisher: PUBLISHER, articleSection: a.tag || "Journal",
    wordCount: String(a.body_md || "").split(/\s+/).filter(Boolean).length
  });
  const meta = `<meta property="article:published_time" content="${escAttr(pubDay)}">${updated ? `<meta property="article:modified_time" content="${escAttr(updated)}">` : ""}<meta property="article:section" content="${escAttr(a.tag || "Journal")}">`;
  return htmlResp(layout({ title: a.title + " \u2014 After Five Founder", desc: a.excerpt, body, active: "blog", canonical: url, ogType: "article", ogImage: cover ? SITE + cover : DEFAULT_OG, head: meta + ld }));
}
__name(articlePage, "articlePage");
function toolHref(t) {
  return "/tools/" + t.slug;
}
__name(toolHref, "toolHref");
function toolAppHref(t) {
  return t.tab ? "/costing-suite.html#" + t.tab : "/tools/" + t.slug + "#calculator";
}
__name(toolAppHref, "toolAppHref");
function toolsIndex() {
  const cards = TOOLS.map((t) => `<a class="t-card${t.standalone ? " new" : ""}" href="${toolHref(t)}"><span class="tag">${t.standalone ? "New &middot; " : ""}${esc(t.name)}</span><h2>${esc(t.question)}</h2><p>${esc(t.description)}</p><span class="go">How it works &amp; open it &rarr;</span></a>`).join("");
  const body = `<header class="t-hero"><div class="wrap">
      <span class="mono eyebrow">The After Five Toolkit</span>
      <h1 class="serif">Better decisions start with <em>better numbers.</em></h1>
      <p>Practical tools for the decisions small business owners actually have to make. Free, and they all run in your browser: nothing you type is sent anywhere.</p>
    </div></header>
    <div class="wrap"><div class="t-grid">${cards}</div></div>`;
  const ld = jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: "The After Five Toolkit", url: SITE + "/tools", hasPart: TOOLS.map((t) => ({ "@type": "WebPage", name: t.title, url: SITE + toolHref(t) })) });
  return htmlResp(layout({ title: "Free small business calculators — After Five Founder", desc: "Free calculators for start-up costs, product pricing, running costs, hiring, going digital, going full-time and your software subscriptions.", body, active: "resources", canonical: SITE + "/tools", head: ld }));
}
__name(toolsIndex, "toolsIndex");
function regionTable() {
  const rows = Object.entries(REGIONS).map(([k, r]) => `<tr><td>${esc(r.name)}</td><td><span class="rg${r.status === "available" ? " on" : ""}">${r.status === "available" ? "Available" : "Not yet"}</span></td><td>${r.status === "available" ? esc(r.note) : "Coming once the figures are checked against official sources. Until then, you can type your own rates into the calculator."}</td></tr>`).join("");
  return `<h2>Which countries it works for</h2><table class="regions"><thead><tr><th>Region</th><th>Status</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table>`;
}
__name(regionTable, "regionTable");
function toolPage(t) {
  const li = (a) => a.map((x) => `<li>${esc(x)}</li>`).join("");
  const others = TOOLS.filter((x) => x.slug !== t.slug);
  const app = t.standalone ? stackCalculatorHtml() : "";
  const body = `<header class="t-hero"><div class="wrap">
      <a class="back" href="/tools" style="display:block;width:max-content;margin-bottom:1.2rem;color:var(--gold-ink);font-weight:700;font-size:.9rem">&larr; All tools</a>
      <span class="mono eyebrow">${esc(t.title)}</span>
      <h1 class="serif">${esc(t.question)}</h1>
      <p>${esc(t.description)}</p>
      ${t.standalone ? "" : `<div class="acts"><a class="btn btn-dark" href="${toolAppHref(t)}">Open the calculator &rarr;</a><a class="btn btn-line" href="#how">How it works</a></div>`}
    </div></header>
    ${app}
    <div class="wrap t-body" id="how">
      <div>
        <h2>What it helps you decide</h2><p>${esc(t.helps)}</p>
        <h2>What you&rsquo;ll need</h2><ul>${li(t.needs)}</ul>
        <h2>How it&rsquo;s calculated</h2><ol>${li(t.how)}</ol>
        <div class="t-two"><div><h3>Included</h3><ul>${li(t.includes)}</ul></div><div><h3>Not included</h3><ul>${li(t.excludes)}</ul></div></div>
        <div class="t-limit"><b>Good to know</b>${esc(t.limits)}</div>
        ${t.regional ? regionTable() : ""}
        <p style="margin-top:2rem;font-size:.9rem;color:var(--muted)">Indicative figures for planning, not financial, tax or legal advice.${t.standalone ? "" : " Your entries save in this browser only, and you can export them to Excel."}</p>
        ${t.standalone ? "" : `<p style="margin-top:1.4rem"><a class="btn btn-dark" href="${toolAppHref(t)}">Open the calculator &rarr;</a></p>`}
      </div>
      <aside class="t-side"><div class="box"><h3>Other tools</h3>${others.map((x) => `<a href="${toolHref(x)}">${esc(x.question)}</a>`).join("")}</div></aside>
    </div>`;
  const ld = jsonLd([
    { "@context": "https://schema.org", "@type": "WebApplication", name: t.title, url: SITE + toolHref(t), description: t.description, applicationCategory: "BusinessApplication", operatingSystem: "Any (runs in your browser)", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: PUBLISHER },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Tools", item: SITE + "/tools" }, { "@type": "ListItem", position: 2, name: t.name, item: SITE + toolHref(t) }] }
  ]);
  return htmlResp(layout({ title: t.title + " — After Five Founder", desc: t.description, body: body + (t.standalone ? '<script src="/assets/stack.js" defer></script>' : ""), active: "resources", canonical: SITE + toolHref(t), head: ld }));
}
__name(toolPage, "toolPage");
function stackCalculatorHtml() {
  return `<section class="wrap" id="calculator" aria-label="Software stack calculator"><div class="st" id="stackCalc">
      <div class="st-panel">
        <div id="stRows"></div>
        <div class="st-acts"><button type="button" class="btn btn-dark" id="stAdd">+ Add a tool</button><button type="button" class="btn btn-line" id="stExport">Export to Excel</button><button type="button" class="link" id="stClear">Clear all</button></div>
        <p class="st-note" id="stNote" role="status"></p>
      </div>
      <aside class="st-out" aria-live="polite">
        <div><div class="k">You spend each month</div><div class="big" id="stMonthly">$0.00</div></div>
        <div class="st-figs"><div><div class="k">Per year</div><div class="v" id="stAnnual">$0</div></div><div><div class="k">Tools</div><div class="v" id="stCount">0</div></div></div>
        <div><div class="k">By what it&rsquo;s for</div><div id="stGroups"></div></div>
        <div class="st-ov" id="stOverlap" hidden></div>
        <p class="st-priv">Saved in this browser only. Nothing you type is sent anywhere.</p>
      </aside>
    </div></section>`;
}
__name(stackCalculatorHtml, "stackCalculatorHtml");
async function sitemap(env) {
  let posts = [];
  try { posts = await publishedPosts(env); } catch (e) {}
  const stat = ["/", "/about", "/blog", "/tools", "/costing-suite.html", "/shop.html"].concat(TOOLS.map((t) => "/tools/" + t.slug));
  const urls = stat.map((p) => `<url><loc>${SITE}${p}</loc></url>`).concat(posts.map((a) => `<url><loc>${SITE}/blog/${esc(a.slug)}</loc>${(a.updated_at || a.published_at) ? `<lastmod>${esc((a.updated_at || a.published_at).slice(0, 10))}</lastmod>` : ""}</url>`));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`, { headers: { "content-type": "application/xml;charset=utf-8", "cache-control": "max-age=3600", ...SEC } });
}
__name(sitemap, "sitemap");
// RSS 2.0 feed of published posts (newest 20), full text included.
function rfc822(day) {
  const d = new Date((day || "").length <= 10 ? (day || "") + "T12:00:00Z" : String(day).replace(" ", "T") + (/[Z+]/.test(day) ? "" : "Z"));
  return isNaN(d) ? new Date().toUTCString() : d.toUTCString();
}
__name(rfc822, "rfc822");
function cdata(s) {
  return "<![CDATA[" + String(s == null ? "" : s).replace(/]]>/g, "]]]]><![CDATA[>") + "]]>";
}
__name(cdata, "cdata");
async function feed(env) {
  let posts = [];
  try { posts = (await publishedPosts(env)).slice(0, 20); } catch (e) {}
  const items = posts.map((a) => {
    const link = `${SITE}/blog/${esc(a.slug)}`;
    return `<item><title>${esc(a.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${rfc822(a.published_at)}</pubDate><category>${esc(a.tag || "Journal")}</category><description>${esc(a.excerpt || "")}</description><content:encoded>${cdata(a.body_html || "")}</content:encoded></item>`;
  });
  const last = posts.length ? `<lastBuildDate>${rfc822(posts[0].updated_at || posts[0].published_at)}</lastBuildDate>` : "";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>After Five Founder</title><link>${SITE}/blog</link><description>Building a business after hours: tools, systems and honest notes from the build.</description><language>en</language>${last}
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
</channel></rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml;charset=utf-8", "cache-control": "max-age=900", ...SEC } });
}
__name(feed, "feed");
// Homepage: put the latest posts into the HTML so readers and crawlers see them without JavaScript.
// Markup matches the browser renderer in public/index.html.
function homeLatestHtml(posts) {
  const meta = (p) => `<span class="lt-meta">${fmtDate(p.published_at).replace(/^(\w+) (\d+), (\d+)$/, (m, mo, d, y) => mo.slice(0, 3) + " " + d + ", " + y)} &middot; ${p.read_minutes || 2} min read</span>`;
  const item = (p, i) => `<li><a class="lt-item" href="/blog/${esc(p.slug)}"><span class="n" aria-hidden="true">${i < 9 ? "0" : ""}${i + 1}</span><span class="lt-kicker">${esc(p.tag || "Journal")}</span><h3>${esc(p.title)}</h3>${meta(p)}</a></li>`;
  const acts = `<div class="acts"><a class="btn" href="#join">Follow along</a><a class="btn btn-line" href="#toolkit">Try the calculators</a></div>`;
  if (!posts.length) return `<div class="lt-aside lt-empty"><h3>The first post is on its way.</h3><p>Follow along to hear when it lands. In the meantime, the calculators are ready to use.</p>${acts}</div>`;
  const p = posts[0], img = localImg(p.cover_url);
  const feat = `<a class="lt-feat" href="/blog/${esc(p.slug)}"><div class="lt-media">${img ? `<img src="${escAttr(img)}" alt="" loading="lazy">` : `<div class="lt-tile" aria-hidden="true"><span class="s">After Five &middot; The honest version</span><span><span class="k">${esc(p.tag || "Journal")}</span><span class="rule"></span></span></div>`}</div><span class="lt-kicker"><span class="new">Latest</span>${esc(p.tag || "Journal")}</span><h3>${esc(p.title)}</h3>${p.excerpt ? `<p>${esc(p.excerpt)}</p>` : ""}${meta(p)}</a>`;
  const rest = posts.slice(1);
  return feat + (rest.length ? `<ol class="lt-list" start="2">${rest.map((x, i) => item(x, i + 1)).join("")}</ol>` : `<div class="lt-aside"><h3>More posts are on their way.</h3><p>Follow along to hear when the next one lands. In the meantime, the calculators are ready to use.</p>${acts}</div>`);
}
__name(homeLatestHtml, "homeLatestHtml");
async function homePage(request, env) {
  const asset = await env.ASSETS.fetch(request);
  if (!asset.ok || !(asset.headers.get("content-type") || "").includes("text/html")) return asset;
  const html = await asset.text();
  const marker = '<div class="lt-grid" id="latestGrid" aria-live="polite"><p class="lt-note">Loading the latest&hellip;</p></div>';
  let out = html;
  try {
    const { results } = await env.DB.prepare(`SELECT slug,title,excerpt,tag,cover_url,read_minutes,published_at FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC LIMIT 3`).all();
    out = html.replace(marker, `<div class="lt-grid" id="latestGrid" aria-live="polite" data-ssr="1">${homeLatestHtml(results || [])}</div>`);
  } catch (e) {}
  const h = new Headers(asset.headers);
  h.delete("content-length");
  for (const [k, v] of Object.entries(SEC)) h.set(k, v);
  return new Response(out, { status: asset.status, headers: h });
}
__name(homePage, "homePage");
var KIND_HELP = {
  tested: "I&rsquo;ve personally used or evaluated the product.",
  researched: "Based on checked external sources, not my own use.",
  "first-look": "Early coverage of a new product or feature.",
  practice: "A real business putting it to work.",
  journal: "My own observations and experiences.",
  comparison: "A structured look at the alternatives.",
  building: "Progress and lessons from something I&rsquo;m actually building."
};
function aboutPage() {
  const body = `<header class="wrap about-hero">
      <div>
        <span class="mono eyebrow">About \xB7 After Five</span>
        <h1 class="serif">Hi, I\u2019m Emma.</h1>
        <p>I grew up in New Zealand and moved to the US more than a decade ago. Since then, I\u2019ve built a career working at the intersection of business and technology.</p>
      </div>
      <img src="/assets/emma-about.jpg" alt="Emma, founder of After Five" width="615" height="512">
    </header>
    <div class="about-story"><div class="wrap">
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
        <p style="margin-top:1.6rem"><a class="btn btn-dark" href="#join">Follow the journey</a></p>
      </div>
      <section class="labels" id="labels" aria-labelledby="labels-h">
        <h2 class="serif" id="labels-h" style="font-size:clamp(1.6rem,3vw,2.2rem);margin:0">How posts are <em>labelled.</em></h2>
        <p style="color:#4a433b;margin:.8rem 0 0">Some posts carry a label so you can tell what I&rsquo;ve used myself from what I&rsquo;ve researched. Personal posts often don&rsquo;t need one.</p>
        <dl>${Object.entries(KINDS).map(([k, n]) => `<dt><span class="kind kind-${k}">${n}</span></dt><dd>${KIND_HELP[k]}</dd>`).join("")}</dl>
      </section>
    </div></div>`;
  return htmlResp(layout({ active: "about", canonical: SITE + "/about", head: jsonLd({ "@context": "https://schema.org", "@type": "AboutPage", url: SITE + "/about", mainEntity: AUTHOR }), title: "About \u2014 After Five Founder", desc: "The story behind After Five \u2014 an honest experiment in what actually helps a small business, from AI to automation to getting more out of the tools you already pay for.", body }));
}
__name(aboutPage, "aboutPage");
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(hmac, "hmac");
// Sessions are signed with SESSION_SECRET (or the admin password if that isn't set).
// With neither set, as on Preview URLs, nobody can sign in.
function sessionKey(env) {
  return env.SESSION_SECRET || env.ADMIN_PASSWORD || "";
}
__name(sessionKey, "sessionKey");
async function makeToken(env) {
  const p = "admin." + Date.now();
  return p + "." + await hmac(sessionKey(env), p);
}
__name(makeToken, "makeToken");
async function validToken(env, tok) {
  if (!tok || !sessionKey(env)) return false;
  const i = tok.lastIndexOf(".");
  if (i < 0) return false;
  const p = tok.slice(0, i), sig = tok.slice(i + 1);
  if (await hmac(sessionKey(env), p) !== sig) return false;
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
    // Optional ?tag= narrows to one topic (used by the homepage "Building in public" block).
    const tag = (url.searchParams.get("tag") || "").trim().slice(0, 30);
    const cols = "slug,title,excerpt,tag,cover_url,read_minutes,published_at";
    const q = tag
      ? env.DB.prepare(`SELECT ${cols} FROM articles WHERE status='published' AND lower(tag)=lower(?) ORDER BY published_at DESC, id DESC LIMIT ?`).bind(tag, n)
      : env.DB.prepare(`SELECT ${cols} FROM articles WHERE status='published' ORDER BY published_at DESC, id DESC LIMIT ?`).bind(n);
    const { results } = await q.all();
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
      let results;
      try {
        ({ results } = await env.DB.prepare(`SELECT id,slug,title,tag,status,published_at,updated_at,approved_at,unpublished_at FROM articles ORDER BY updated_at DESC`).all());
      } catch (e) {
        ({ results } = await env.DB.prepare(`SELECT id,slug,title,tag,status,published_at,updated_at FROM articles ORDER BY updated_at DESC`).all());
      }
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
// Classification and checked date live in columns added by migrations/0001_editorial_fields.sql.
// Until that migration runs, posts still save; only these two fields are skipped.
async function saveEditorial(env, id, kind, verified) {
  try {
    await env.DB.prepare(`UPDATE articles SET kind=?,verified_at=? WHERE id=?`).bind(kind, verified, id).run();
    return "";
  } catch (e) {
    return /no such column/i.test(String(e && e.message)) ? "Saved, but the label and checked date need the database update in migrations/0001_editorial_fields.sql first." : "";
  }
}
__name(saveEditorial, "saveEditorial");
// Publishing is a human step: only the signed-in editor can make a post live, and the
// first publish records who approved it and when. Columns come from
// migrations/0002_approval_fields.sql; until it runs, posts still save and publish.
async function saveApproval(env, id, before, after) {
  if (before === after) return "";
  try {
    if (after === "published") await env.DB.prepare(`UPDATE articles SET approved_by='editor',approved_at=datetime('now'),unpublished_at=NULL WHERE id=?`).bind(id).run();
    else if (before === "published") await env.DB.prepare(`UPDATE articles SET unpublished_at=datetime('now') WHERE id=?`).bind(id).run();
    return "";
  } catch (e) {
    return /no such column/i.test(String(e && e.message)) ? "Saved, but the approval record needs the database update in migrations/0002_approval_fields.sql first." : "";
  }
}
__name(saveApproval, "saveApproval");
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
  const cover = localImg((b.cover_url || "").trim()) || null;
  const kind = KINDS[b.kind] ? b.kind : null;
  const verified = /^\d{4}-\d{2}-\d{2}$/.test(b.verified_at || "") ? b.verified_at : null;
  const status = b.status === "published" ? "published" : "draft";
  const read = readMins(md);
  if (id) {
    const cur = await env.DB.prepare(`SELECT published_at,status FROM articles WHERE id=?`).bind(id).first();
    if (!cur) return json({ error: "That post no longer exists." }, 404);
    let pub = cur.published_at;
    if (status === "published" && !pub) pub = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    await env.DB.prepare(`UPDATE articles SET slug=?,title=?,excerpt=?,body_md=?,body_html=?,tag=?,cover_url=?,series_id=NULL,series_order=0,status=?,read_minutes=?,published_at=?,updated_at=datetime('now') WHERE id=?`).bind(slug, title, excerpt, md, html, tag, cover, status, read, pub, id).run();
    const warn = [await saveEditorial(env, id, kind, verified), await saveApproval(env, id, cur.status, status)].filter(Boolean).join(" ");
    return json({ ok: true, id, slug, status, warn });
  }
  const pub = status === "published" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null;
  const r = await env.DB.prepare(`INSERT INTO articles (slug,title,excerpt,body_md,body_html,tag,cover_url,series_id,series_order,status,read_minutes,published_at) VALUES (?,?,?,?,?,?,?,NULL,0,?,?,?)`).bind(slug, title, excerpt, md, html, tag, cover, status, read, pub).run();
  const warn = [await saveEditorial(env, r.meta.last_row_id, kind, verified), await saveApproval(env, r.meta.last_row_id, "new", status)].filter(Boolean).join(" ");
  return json({ ok: true, id: r.meta.last_row_id, slug, status, warn });
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
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
  select{width:100%;font:inherit;font-size:1rem;color:var(--ink);border:1.5px solid #DCD0BE;border-radius:12px;padding:.7em .9em;background:#fff}
  .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1.4rem;align-items:start}
  @media(max-width:860px){.split,.row2,.row3{grid-template-columns:1fr}}
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
          <div class="field"><label for="f_tag">Topic</label><input id="f_tag" list="tags" placeholder="Journal"><datalist id="tags"><option>Journal</option><option>AI</option><option>Tools</option><option>Systems</option><option>Strategy</option><option>Mindset</option><option>Building in public</option></datalist></div>
          <div class="field"><label for="f_slug">Web address</label><input id="f_slug" placeholder="Leave blank to use the title"><p class="help" id="slugHint"></p></div>
        </div>
        <div class="row3">
          <div class="field"><label for="f_kind">Label <span style="text-transform:none;letter-spacing:0;font-weight:500">(optional)</span></label><select id="f_kind"><option value="">No label</option>${Object.entries(KINDS).map(([k, n]) => `<option value="${k}">${n}</option>`).join("")}</select><p class="help">Only pick Hands-on tested if you&rsquo;ve used it yourself.</p></div>
          <div class="field"><label for="f_verified">Prices checked on <span style="text-transform:none;letter-spacing:0;font-weight:500">(optional)</span></label><input id="f_verified" type="date"><p class="help">Shown in a &ldquo;What it costs&rdquo; block.</p></div>
          <div class="field"><label for="f_cover">Cover image <span style="text-transform:none;letter-spacing:0;font-weight:500">(optional)</span></label><input id="f_cover" placeholder="/assets/your-screenshot.jpg"><p class="help">A real screenshot or photo saved in the site&rsquo;s assets folder.</p></div>
        </div>
        <div class="split">
          <div class="field"><label for="f_body">Post</label><textarea id="f_body" placeholder="Start writing. Leave a blank line between paragraphs."></textarea>
            <div class="cheats"><span><code>**bold**</code></span><span><code>*italic*</code></span><span><code>## Heading</code></span><span><code>&gt; Quote</code></span><span><code>- List item</code></span><span><code>[link](https://...)</code></span></div>
            <div class="cheats"><span>Optional blocks:</span><span><code>::: summary</code></span><span><code>::: costs</code></span><span><code>::: for</code></span><span><code>::: skip</code></span><span><code>::: before</code></span><span><code>::: verdict</code></span><span><code>::: sources</code></span><span><code>::: disclosure</code></span><span>then your text, then <code>:::</code></span></div></div>
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
  <script src="/assets/md.js" defer><\/script><script src="/assets/admin.js" defer><\/script></body></html>`;
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
      if (p === "/") return await homePage(request, env);
      if (p === "/sitemap.xml") return await sitemap(env);
      if (p === "/feed.xml" || p === "/rss.xml" || p === "/feed" || p === "/rss") return await feed(env);
      if (p === "/tools" || p === "/tools/") return toolsIndex();
      let tm;
      if (tm = p.match(/^\/tools\/([a-z0-9-]+)\/?$/)) { const t = toolBySlug(tm[1]); if (t) return toolPage(t); }
      if (p === "/journal" || p === "/journal/" || p === "/journal.html") return await journalIndex(env, url);
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
