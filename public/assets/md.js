// After Five Founder: the blog's plain-text format, shared by the Worker
// (live posts) and the /admin editor (preview), so the two always match.
// Loaded as a classic script in the browser and imported by worker.js; it sets globalThis.AFMD.
//
//   **bold**  *italic*  ## Heading  > Quote  - List item  [link](https://...)
//
// Optional blocks (use only where they help; personal posts don't need any):
//   ::: summary     The 60-second version
//   ::: costs       What it costs
//   ::: for         Who it's for
//   ::: skip        Who should skip it
//   ::: before      Before you buy
//   ::: verdict     The After Five Verdict
//   ::: sources     Sources
//   ::: disclosure  Disclosure
//   ...text, lists or headings...
//   :::
(function (root) {
  var BLOCKS = {
    summary: "The 60-second version",
    costs: "What it costs",
    "for": "Who it’s for",
    skip: "Who should skip it",
    before: "Before you buy",
    verdict: "The After Five Verdict",
    sources: "Sources",
    disclosure: "Disclosure"
  };
  // Article classifications. Leave a post unclassified rather than guess.
  var KINDS = {
    tested: "Hands-on tested",
    researched: "Researched",
    "first-look": "First look",
    practice: "In practice",
    journal: "Founder journal",
    comparison: "Comparison",
    building: "Building in public"
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    return /^(https?:\/\/|\/|#|mailto:)/i.test(u) ? u : "#";
  }
  function inline(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, t, u) {
        var href = safeUrl(u.replace(/&amp;/g, "&").replace(/&quot;/g, '"'));
        var ext = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?afterfivefounder\.com/i.test(href);
        return '<a href="' + esc(href).replace(/'/g, "&#39;") + '"' + (ext ? ' rel="noopener"' : "") + ">" + t + "</a>";
      });
  }
  function isList(l) { return /^[-*]\s+/.test(l); }
  function isFence(l) { return /^:::/.test(l); }

  function mdToHtml(md, opts) {
    opts = opts || {};
    var lines = String(md || "").replace(/\r/g, "").split("\n"), out = [], i = 0, buf;
    while (i < lines.length) {
      var ln = lines[i];
      if (!ln.trim()) { i++; continue; }
      var fence = ln.match(/^:::\s*([a-z-]+)\s*$/i);
      if (fence && BLOCKS[fence[1].toLowerCase()]) {
        var key = fence[1].toLowerCase(), inner = [];
        i++;
        while (i < lines.length && !/^:::\s*$/.test(lines[i])) { inner.push(lines[i]); i++; }
        i++; // closing :::
        var note = key === "costs" && opts.verified ? '<p class="blk-note">Prices checked ' + esc(opts.verified) + ". They change, so check before you buy.</p>" : "";
        out.push('<aside class="blk blk-' + key + '"><p class="blk-h">' + BLOCKS[key] + "</p>" + mdToHtml(inner.join("\n"), {}) + note + "</aside>");
        continue;
      }
      if (ln.indexOf("## ") === 0) { out.push("<h2>" + inline(ln.slice(3).trim()) + "</h2>"); i++; continue; }
      if (ln.indexOf("### ") === 0) { out.push("<h3>" + inline(ln.slice(4).trim()) + "</h3>"); i++; continue; }
      if (ln.indexOf("> ") === 0) {
        buf = [];
        while (i < lines.length && lines[i].indexOf("> ") === 0) { buf.push(lines[i].slice(2).trim()); i++; }
        out.push('<blockquote class="pull">' + inline(buf.join(" ")) + "</blockquote>");
        continue;
      }
      if (isList(ln)) {
        buf = [];
        while (i < lines.length && isList(lines[i])) { buf.push("<li>" + inline(lines[i].replace(/^[-*]\s+/, "").trim()) + "</li>"); i++; }
        out.push("<ul>" + buf.join("") + "</ul>");
        continue;
      }
      buf = [];
      while (i < lines.length && lines[i].trim() && lines[i].indexOf("## ") !== 0 && lines[i].indexOf("### ") !== 0 && lines[i].indexOf("> ") !== 0 && !isList(lines[i]) && !isFence(lines[i])) { buf.push(lines[i].trim()); i++; }
      if (!buf.length) { out.push("<p>" + inline(ln.trim()) + "</p>"); i++; continue; }
      out.push("<p>" + inline(buf.join(" ")) + "</p>");
    }
    return out.join("\n");
  }

  // Plain text for summaries and read time (drops block fences and markup).
  function plain(md) {
    return String(md || "").replace(/^:::.*$/gm, "").replace(/[*#>`]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  }

  root.AFMD = { mdToHtml: mdToHtml, inline: inline, esc: esc, plain: plain, BLOCKS: BLOCKS, KINDS: KINDS };
})(typeof globalThis !== "undefined" ? globalThis : this);
