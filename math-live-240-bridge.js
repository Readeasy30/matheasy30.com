// MathEasy30 live app 240-day bridge
// Adds safe links to the staged Days 31-240 preview path without changing lesson logic.
(function () {
  function byId(id) { return document.getElementById(id); }

  function addBridgeStyles() {
    if (byId("mathLive240BridgeStyles")) return;
    const style = document.createElement("style");
    style.id = "mathLive240BridgeStyles";
    style.textContent = ".math-live-240-bridge{margin:1rem 0;padding:1rem;border:1px solid #bfdbfe;background:#eff6ff;border-radius:1rem}.math-live-240-bridge h3{margin-top:0}.math-live-240-actions{display:flex;gap:.55rem;flex-wrap:wrap}.math-live-240-actions a{display:inline-flex;align-items:center;justify-content:center;border-radius:.7rem;padding:.65rem .85rem;font-weight:800;text-decoration:none;background:#dbeafe;color:#1e3a8a}.math-live-240-actions a:first-child{background:#2563eb;color:white}@media(max-width:650px){.math-live-240-actions a{width:100%}}";
    document.head.appendChild(style);
  }

  function addNavLink() {
    const nav = document.querySelector(".app-link-row");
    if (!nav || nav.querySelector('a[href="app-240.html"]')) return;
    const link = document.createElement("a");
    link.href = "app-240.html";
    link.textContent = "Days 31-240 Preview";
    const curriculum = nav.querySelector('a[href="days-1-240-curriculum.html"]');
    if (curriculum) curriculum.insertAdjacentElement("afterend", link);
    else nav.appendChild(link);
  }

  function addBridgeCard() {
    if (byId("mathLive240Bridge")) return;
    const target = document.querySelector(".parent-tip-box") || document.querySelector(".confidence-box") || document.querySelector("footer");
    if (!target) return;

    addBridgeStyles();
    const card = document.createElement("section");
    card.id = "mathLive240Bridge";
    card.className = "math-live-240-bridge";
    card.innerHTML = "<h3>After Day 30</h3><p>Day 31 starts the next 30-day level. MathEasy30 is staged as 8 levels and 240 practice days. Use the preview app to test Days 31-240 before full live-app replacement.</p><div class='math-live-240-actions'><a href='app-240.html'>Open Days 31-240 Preview</a><a href='240-day-math-path.html'>240-Day Path</a><a href='days-1-240-curriculum.html'>All 240 Days</a></div>";
    target.insertAdjacentElement("afterend", card);
  }

  function boot() {
    addNavLink();
    addBridgeCard();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
