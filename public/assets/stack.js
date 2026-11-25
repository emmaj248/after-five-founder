// Software Stack Calculator (/tools/software-stack).
// Runs entirely in the browser: nothing is sent anywhere. Saves to localStorage and exports CSV.
(function () {
  var root = document.getElementById("stackCalc");
  if (!root) return;
  var KEY = "aff-stack-v1";
  var GROUPS = ["Accounting & invoicing", "Payments & point of sale", "Email & newsletters", "Social media & scheduling", "Design & content", "Website & hosting", "Chat & video calls", "Files & documents", "Projects & tasks", "Bookings & calendar", "Customers & sales (CRM)", "AI assistants", "Automation", "Other"];
  var $ = function (s) { return root.querySelector(s); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var money = function (n) { n = Math.round((+n || 0) * 100) / 100; return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var money0 = function (n) { return "$" + Math.round(+n || 0).toLocaleString("en-US"); };
  var nid = 1;
  var blank = function () { return { id: nid++, name: "", group: "", price: "", billing: "monthly", seats: 1 }; };
  var rows;
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved && saved.length) rows = saved; } catch (e) {}
  if (!rows) rows = [blank(), blank(), blank()];
  rows.forEach(function (r) { nid = Math.max(nid, (r.id || 0) + 1); });
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(rows)); } catch (e) {} };
  var monthly = function (r) { var p = Math.max(0, parseFloat(r.price) || 0), s = Math.max(1, parseInt(r.seats, 10) || 1); return r.billing === "yearly" ? p * s / 12 : p * s; };

  function rowHtml(r, i) {
    var opts = '<option value="">Choose…</option>' + GROUPS.map(function (g) { return "<option" + (g === r.group ? " selected" : "") + ">" + esc(g) + "</option>"; }).join("");
    return '<div class="st-row" data-id="' + r.id + '">' +
      '<label class="st-f st-name"><span>Tool</span><input data-k="name" value="' + esc(r.name) + '" placeholder="e.g. your accounting app" autocomplete="off"></label>' +
      '<label class="st-f st-group"><span>What it’s for</span><select data-k="group">' + opts + "</select></label>" +
      '<label class="st-f st-price"><span>Price</span><span class="st-in"><i>$</i><input data-k="price" type="number" inputmode="decimal" min="0" step="0.01" value="' + esc(r.price) + '" placeholder="0.00"></span></label>' +
      '<label class="st-f st-bill"><span>Billed</span><select data-k="billing"><option value="monthly"' + (r.billing !== "yearly" ? " selected" : "") + '>Monthly</option><option value="yearly"' + (r.billing === "yearly" ? " selected" : "") + ">Yearly</option></select></label>" +
      '<label class="st-f st-seats"><span>Seats</span><input data-k="seats" type="number" inputmode="numeric" min="1" step="1" value="' + esc(r.seats) + '"></label>' +
      '<button type="button" class="st-del" data-del="' + r.id + '" aria-label="Remove ' + esc(r.name || "row " + (i + 1)) + '">&times;</button></div>';
  }
  function renderRows() { $("#stRows").innerHTML = rows.map(rowHtml).join(""); }

  function recompute() {
    var total = 0, by = {}, counted = 0;
    rows.forEach(function (r) {
      var m = monthly(r);
      if (!r.name.trim() && !m) return;
      counted++;
      total += m;
      var g = r.group || "Not grouped yet";
      (by[g] = by[g] || { sum: 0, tools: [] });
      by[g].sum += m;
      by[g].tools.push(r.name.trim() || "Unnamed tool");
    });
    $("#stMonthly").textContent = money(total);
    $("#stAnnual").textContent = money0(total * 12);
    $("#stCount").textContent = counted;
    var groups = Object.keys(by).sort(function (a, b) { return by[b].sum - by[a].sum; });
    $("#stGroups").innerHTML = groups.length ? groups.map(function (g) {
      var pct = total > 0 ? by[g].sum / total * 100 : 0;
      return '<div class="st-g"><div class="st-g-top"><span>' + esc(g) + ' <small>' + by[g].tools.length + (by[g].tools.length === 1 ? " tool" : " tools") + '</small></span><b>' + money(by[g].sum) + '<small>/mo</small></b></div><div class="st-bar"><span style="width:' + pct.toFixed(1) + '%"></span></div></div>';
    }).join("") : '<p class="st-empty">Add a tool and its price to see where the money goes.</p>';
    var overlaps = groups.filter(function (g) { return g !== "Not grouped yet" && g !== "Other" && by[g].tools.length > 1; });
    var ov = $("#stOverlap");
    if (overlaps.length) {
      ov.hidden = false;
      ov.innerHTML = '<p class="st-ov-h">Worth a second look</p>' + overlaps.map(function (g) {
        return "<p><b>" + by[g].tools.length + " tools for " + esc(g.toLowerCase()) + "</b>: " + by[g].tools.map(esc).join(", ") + ". Could one of them do the job? Sometimes two is on purpose.</p>";
      }).join("");
    } else ov.hidden = true;
    save();
  }

  $("#stRows").addEventListener("input", function (e) {
    var k = e.target.getAttribute("data-k"); if (!k) return;
    var id = +e.target.closest(".st-row").getAttribute("data-id");
    var r = rows.find(function (x) { return x.id === id; }); if (!r) return;
    r[k] = e.target.value;
    recompute();
  });
  $("#stRows").addEventListener("click", function (e) {
    var b = e.target.closest("[data-del]"); if (!b) return;
    var id = +b.getAttribute("data-del");
    rows = rows.filter(function (x) { return x.id !== id; });
    if (!rows.length) rows.push(blank());
    renderRows(); recompute();
  });
  $("#stAdd").addEventListener("click", function () {
    rows.push(blank()); renderRows(); recompute();
    var last = root.querySelectorAll(".st-row input[data-k=name]"); if (last.length) last[last.length - 1].focus();
  });
  $("#stClear").addEventListener("click", function () {
    if (!confirm("Clear every tool from this list? This only affects this browser.")) return;
    rows = [blank(), blank(), blank()]; renderRows(); recompute();
  });
  $("#stExport").addEventListener("click", function () {
    var cell = function (v) { v = String(v == null ? "" : v); return /[",\r\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var L = [["Tool", "What it's for", "Price", "Billed", "Seats", "Per month", "Per year"]], t = 0;
    rows.forEach(function (r) { var m = monthly(r); if (!r.name.trim() && !m) return; t += m; L.push([r.name, r.group, +r.price || 0, r.billing, +r.seats || 1, m.toFixed(2), (m * 12).toFixed(2)]); });
    L.push([]); L.push(["Total", "", "", "", "", t.toFixed(2), (t * 12).toFixed(2)]);
    var csv = "﻿" + L.map(function (r) { return r.map(cell).join(","); }).join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "after-five-founder-software-stack.csv";
    document.body.appendChild(a); a.click(); a.remove();
    var n = $("#stNote"); n.textContent = "Downloaded. It opens in Excel or Google Sheets."; setTimeout(function () { n.textContent = ""; }, 5000);
  });

  renderRows();
  recompute();
})();
