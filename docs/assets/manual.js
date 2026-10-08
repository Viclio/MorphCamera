/* Morph Camera manual - behaviour. Builds the table of contents, figure numbers,
   version labels and the image zoom from index.html, so adding a section never
   requires editing this file. */
(function () {
  "use strict";

  // ---- version: one place to change it (the <meta name="addon-version"> tag) ----
  var version = (document.querySelector('meta[name="addon-version"]') || {}).content || "";
  document.querySelectorAll("[data-version]").forEach(function (el) { el.textContent = version; });

  // ---- "since" badges: <section data-since="1.7.0"> or <h3 data-since="1.7.0"> ----
  document.querySelectorAll("[data-since]").forEach(function (el) {
    var h = el.matches("h2, h3") ? el : el.querySelector("h2, h3");
    if (!h) return;
    var b = document.createElement("span");
    b.className = "since";
    b.textContent = "since " + el.getAttribute("data-since");
    h.appendChild(b);
  });

  // ---- table of contents from <section id> h2 and <h3 id> ----
  var toc = document.getElementById("toc");
  var links = [];
  if (toc) {
    document.querySelectorAll("main [data-part], main section[id]").forEach(function (el) {
      if (el.hasAttribute("data-part")) {
        var p = document.createElement("li");
        p.className = "part";
        p.textContent = el.getAttribute("data-part");
        toc.appendChild(p);
        if (!el.matches("section[id]")) return;
      }
      var h2 = el.querySelector("h2");
      if (!h2) return;
      addLink(el.id, h2, false);
      el.querySelectorAll("h3[id]").forEach(function (h3) { addLink(h3.id, h3, true); });
    });
  }
  function addLink(id, heading, sub) {
    var li = document.createElement("li");
    if (sub) li.className = "sub";
    var a = document.createElement("a");
    a.href = "#" + id;
    a.textContent = heading.getAttribute("data-toc") || heading.firstChild.textContent.trim();
    li.appendChild(a);
    toc.appendChild(li);
    links.push({ a: a, target: document.getElementById(id) });
    a.addEventListener("click", function () { document.querySelector(".sidebar").classList.remove("open"); });
  }

  // ---- highlight the section being read ----
  function spy() {
    var y = window.scrollY + 120, current = null;
    links.forEach(function (l) { if (l.target && l.target.offsetTop <= y) current = l; });
    links.forEach(function (l) { l.a.classList.toggle("active", l === current); });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  // ---- figure numbers ----
  var n = 0;
  document.querySelectorAll("main figure figcaption").forEach(function (cap) {
    n += 1;
    var s = document.createElement("span");
    s.className = "num";
    s.textContent = "Fig. " + n + ".";
    cap.insertBefore(s, cap.firstChild);
  });

  // ---- click an image to see it full size ----
  var box = document.createElement("div");
  box.className = "lightbox";
  var big = document.createElement("img");
  box.appendChild(big);
  document.body.appendChild(box);
  document.querySelectorAll("main figure img").forEach(function (img) {
    img.classList.add("zoomable");
    img.addEventListener("click", function () { big.src = img.src; big.alt = img.alt; box.classList.add("open"); });
  });
  box.addEventListener("click", function () { box.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("open"); });

  // ---- mobile menu ----
  var btn = document.querySelector(".menu-btn");
  if (btn) btn.addEventListener("click", function () { document.querySelector(".sidebar").classList.toggle("open"); });

  // ---- light / dark switch (remembered when the browser allows it) ----
  var root = document.documentElement, t = document.querySelector(".theme-toggle");
  try { var saved = localStorage.getItem("mc-manual-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  if (t) t.addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") ? root.getAttribute("data-theme") === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("mc-manual-theme", next); } catch (e) {}
  });
})();
