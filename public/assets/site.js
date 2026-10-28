// After Five Founder: mobile menu and email signup, shared by every page.
(function () {
  var toggle = document.querySelector(".sx-toggle");
  var menu = document.getElementById("sxMobile");
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  document.querySelectorAll("form[data-subscribe]").forEach(function (form) {
    var status = form.parentNode.querySelector(".sx-status");
    var btn = form.querySelector("button");
    var show = function (text, ok) {
      if (!status) return;
      status.textContent = text;
      status.className = "sx-status " + (ok ? "ok" : "err");
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.email.value || "").trim();
      if (!EMAIL.test(email)) return show("Please enter a valid email.", false);
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = "…";
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email, company: form.company ? form.company.value : "", source: form.getAttribute("data-subscribe") || "site" })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.ok) { form.reset(); show("You’re in — watch your inbox.", true); }
          else show((d && d.error) || "Something went wrong.", false);
        })
        .catch(function () { show("Network error. Please try again.", false); })
        .finally(function () { btn.disabled = false; btn.textContent = label; });
    });
  });
})();
