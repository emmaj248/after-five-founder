// Blog editor at /admin. Talks to the Worker's /api/articles (and /api/login when password sign-in is on).
(function () {
  var $ = function (id) { return document.getElementById(id); };
  // "access": Cloudflare Access handles sign-in (email code), so there's no password form.
  var ACCESS = document.querySelector("main.admin").getAttribute("data-auth") === "access";
  var posts = [];
  var dirty = false;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function slugify(s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  }
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso.length <= 10 ? iso + "T00:00:00Z" : /[TZ]/.test(iso) ? iso : iso.replace(" ", "T") + "Z");
    return isNaN(d) ? iso : d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  }

  // Shared with the Worker (public/assets/md.js), so the preview matches the live post.
  var mdToHtml = function (md) { return window.AFMD.mdToHtml(md, { verified: $("f_verified").value ? fmtDate($("f_verified").value) : "" }); };

  function flash(text, ok) {
    var m = $("msg");
    m.textContent = text;
    m.className = "msg on " + (ok ? "ok" : "err");
    clearTimeout(flash.t);
    flash.t = setTimeout(function () { m.className = "msg"; }, 4000);
  }
  function api(path, opts) {
    return fetch(path, opts).then(function (r) {
      return r.json().catch(function () { return { ok: false, error: "Something went wrong (" + r.status + ")." }; })
        .then(function (d) { d.httpStatus = r.status; return d; });
    }, function () {
      // With Access, an expired sign-in turns API calls into a redirect the browser blocks.
      return { ok: false, httpStatus: ACCESS ? 401 : 0, error: "Couldn’t reach the site. Check your connection and try again." };
    });
  }

  function showApp() {
    $("login").hidden = true;
    $("app").hidden = false;
    loadList();
  }
  function login() {
    api("/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password: $("pw").value }) })
      .then(function (d) {
        if (d.ok) return showApp();
        var e = $("loginErr");
        e.textContent = d.error || "Sign-in failed.";
        e.className = "msg on err";
      });
  }

  function loadList() {
    api("/api/articles").then(function (d) {
      posts = d.articles || [];
      // Drafts first: anything not live is waiting for your review before it can go out.
      posts.sort(function (a, b) { return (a.status === "published") - (b.status === "published"); });
      var live = posts.filter(function (a) { return a.status === "published"; }).length, waiting = posts.length - live;
      $("count").textContent = posts.length ? live + " live · " + waiting + (waiting === 1 ? " draft" : " drafts") + " waiting for review" : "";
      $("list").innerHTML = posts.map(function (a) {
        var when = a.status === "published"
          ? "Published " + fmtDate(a.published_at) + (a.approved_at ? " · approved " + fmtDate(a.approved_at) : "")
          : (a.unpublished_at ? "Taken off the blog " + fmtDate(a.unpublished_at) : "Draft") + " · edited " + fmtDate(a.updated_at);
        return '<div class="li"><div class="li-main"><button class="li-title" data-edit="' + a.id + '">' + esc(a.title) + "</button>" +
          '<div class="muted">' + esc(a.tag || "Journal") + " · " + when + "</div></div>" +
          '<div class="acts"><span class="st ' + a.status + '">' + (a.status === "published" ? "Live" : "Needs review") + "</span>" +
          (a.status === "published" ? '<a class="link" href="/blog/' + encodeURIComponent(a.slug) + '" target="_blank" rel="noopener">View</a>' : "") +
          '<button class="link" data-edit="' + a.id + '">' + (a.status === "published" ? "Edit" : "Review") + "</button></div></div>";
      }).join("") || '<p class="muted empty-list">No posts yet. Click “New post” to write your first one.</p>';
    });
  }

  function fill(a) {
    $("f_id").value = a.id || "";
    $("f_title").value = a.title || "";
    $("f_slug").value = a.slug || "";
    $("f_tag").value = a.tag || "Journal";
    $("f_excerpt").value = a.excerpt || "";
    $("f_body").value = a.body_md || "";
    $("f_kind").value = a.kind || "";
    $("f_verified").value = a.verified_at || "";
    $("f_cover").value = a.cover_url || "";
    setStatus(a.status || "");
    renderPreview();
    dirty = false;
  }
  function setStatus(status) {
    // status: "" (new), "draft" or "published"
    var live = status === "published";
    $("ed-state").textContent = !status ? "New post" : live ? "Live on the blog" : "Draft (not on the blog)";
    $("ed-state").className = "st " + (live ? "published" : "draft");
    $("btnPublish").textContent = live ? "Update post" : "Approve & publish";
    $("btnDraft").textContent = live ? "Unpublish" : "Save draft";
    $("btnDelete").hidden = !$("f_id").value;
    var view = $("btnView");
    view.hidden = !live;
    view.href = "/blog/" + encodeURIComponent($("f_slug").value || "");
  }
  function openEditor(a) {
    fill(a);
    $("dash").hidden = true;
    $("editor").hidden = false;
    window.scrollTo(0, 0);
    $("f_title").focus();
  }
  function closeEditor() {
    if (dirty && !confirm("You have unsaved changes. Leave without saving?")) return;
    dirty = false;
    $("editor").hidden = true;
    $("dash").hidden = false;
    loadList();
  }
  function edit(id) {
    api("/api/articles/" + id).then(function (d) { if (d.article) openEditor(d.article); else flash(d.error || "Couldn’t open that post.", false); });
  }

  function save(status) {
    var id = $("f_id").value;
    var body = {
      title: $("f_title").value, slug: $("f_slug").value, tag: $("f_tag").value,
      excerpt: $("f_excerpt").value, body_md: $("f_body").value, status: status,
      kind: $("f_kind").value, verified_at: $("f_verified").value, cover_url: $("f_cover").value
    };
    if (!body.title.trim()) { flash("Add a title first.", false); $("f_title").focus(); return; }
    api("/api/articles" + (id ? "/" + id : ""), { method: id ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
      .then(function (d) {
        if (d.httpStatus === 401) { flash(ACCESS ? "Your sign-in has expired. Copy your post somewhere safe, then reload the page to get a new email code." : "You’ve been signed out. Sign in again, then save.", false); return; }
        if (!d.ok) { flash(d.error || "Save failed.", false); return; }
        $("f_id").value = d.id;
        $("f_slug").value = d.slug;
        dirty = false;
        setStatus(d.status);
        if (d.warn) { flash(d.warn, false); return; }
        flash(d.status === "published" ? "Saved. It’s live on the blog." : "Saved as a draft. It’s not on the blog.", true);
      });
  }
  function del() {
    var id = $("f_id").value;
    if (!id || !confirm("Delete this post for good? This can’t be undone.")) return;
    api("/api/articles/" + id, { method: "DELETE" }).then(function (d) {
      if (!d.ok) { flash(d.error || "Delete failed.", false); return; }
      dirty = false;
      flash("Post deleted.", true);
      closeEditor();
    });
  }
  function renderPreview() {
    $("prev").innerHTML = mdToHtml($("f_body").value) || '<p class="muted">Your post will appear here as you type.</p>';
    $("slugHint").textContent = "afterfivefounder.com/blog/" + (slugify($("f_slug").value) || slugify($("f_title").value) || "…");
  }

  // wire up
  if (!ACCESS) {
    $("pw").addEventListener("keydown", function (e) { if (e.key === "Enter") login(); });
    $("btnLogin").addEventListener("click", login);
  }
  $("btnNew").addEventListener("click", function () { openEditor({ tag: "Journal" }); });
  $("btnBack").addEventListener("click", closeEditor);
  // Publishing is the approval step: confirm before a post goes live for the first time.
  $("btnPublish").addEventListener("click", function () {
    var live = $("ed-state").className.indexOf("published") > -1;
    if (!live && !confirm("Approve and publish this post? It goes live on the blog, the homepage and the RSS feed straight away.")) return;
    save("published");
  });
  $("btnDraft").addEventListener("click", function () { save("draft"); });
  $("btnDelete").addEventListener("click", del);
  $("btnLogout").addEventListener("click", function () {
    if (ACCESS) { location.href = "/cdn-cgi/access/logout"; return; }
    fetch("/api/logout").then(function () { location.reload(); });
  });
  $("list").addEventListener("click", function (e) { var b = e.target.closest("[data-edit]"); if (b) edit(b.getAttribute("data-edit")); });
  ["f_title", "f_slug", "f_tag", "f_excerpt", "f_body", "f_kind", "f_verified", "f_cover"].forEach(function (id) {
    $(id).addEventListener("input", function () { dirty = true; renderPreview(); });
  });
  window.addEventListener("beforeunload", function (e) { if (dirty) { e.preventDefault(); e.returnValue = ""; } });

  // Skip the sign-in screen if the session cookie is still valid.
  fetch("/api/articles").then(function (r) { if (r.ok) showApp(); });
})();
