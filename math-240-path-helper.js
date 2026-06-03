/* MathEasy30 240-day path preview helper. Safe display layer only. */
(function () {
  function byId(id) { return document.getElementById(id); }
  function levels() { return window.MATHEASY240_LEVELS || []; }
  function days() { return window.MATHEASY240_CURRICULUM || []; }

  function addStyles() {
    if (byId("math240Styles")) return;
    const style = document.createElement("style");
    style.id = "math240Styles";
    style.textContent = ".math240-card{margin:1rem 0;padding:1rem;border:1px solid #bfdbfe;background:#eff6ff;border-radius:1rem}.math240-card h2,.math240-card h3{margin-top:0}.math240-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:.7rem}.math240-mini{padding:.75rem;border:1px solid #dbeafe;background:#fff;border-radius:.8rem}.math240-card select{width:100%;padding:.65rem;border:1px solid #cbd5e1;border-radius:.65rem;background:#fff;font:inherit;margin:.25rem 0 .75rem}.math240-actions{display:flex;gap:.55rem;flex-wrap:wrap}.math240-actions a{border-radius:.7rem;padding:.65rem .85rem;font-weight:800;text-decoration:none}.math240-primary{background:#2563eb;color:#fff}.math240-secondary{background:#dbeafe;color:#1e3a8a}.math240-note{color:#475569}@media(max-width:650px){.math240-actions a{width:100%;text-align:center}}";
    document.head.appendChild(style);
  }

  function showChoice() {
    const out = byId("math240Choice");
    const select = byId("math240DaySelect");
    if (!out || !select) return;
    const item = days().find(day => day.day === Number(select.value));
    if (!item) return;
    out.innerHTML = "<h3>Day " + item.day + " - Level " + item.level + "</h3><p><strong>" + item.focus + "</strong></p><p>" + item.goal + "</p><p class='math240-note'>Current status: " + (item.status === "starter-live" ? "starter app" : "next-path staging") + ".</p>";
  }

  function render() {
    if (byId("math240Card")) return;
    if (!levels().length || !days().length) return;
    addStyles();

    const target = document.querySelector(".practice-controls") || document.querySelector(".question-card");
    if (!target) return;

    const card = document.createElement("section");
    card.id = "math240Card";
    card.className = "math240-card";
    card.innerHTML = "<h2>🧭 240-Day Math Path</h2><p>Day 30 is the first milestone. Day 31 starts the next level. MathEasy30 is staged as 8 levels and 240 practice days.</p><div class='math240-grid'><div class='math240-mini'><strong>8 levels</strong><br>Level A through Level H</div><div class='math240-mini'><strong>30 days each</strong><br>Repeat any level when needed</div><div class='math240-mini'><strong>Goal</strong><br>Build toward 8th-grade readiness</div></div><label for='math240DaySelect'><strong>Preview any day</strong></label><select id='math240DaySelect'></select><div id='math240Choice' class='math240-mini'></div><div class='math240-actions'><a class='math240-primary' href='days-1-240-curriculum.html'>View All 240 Days</a><a class='math240-secondary' href='240-day-math-path.html'>240-Day Overview</a></div><p class='math240-note'>Safe update: current Day 1-30 lessons still run normally.</p>";

    target.insertAdjacentElement("afterend", card);
    const select = byId("math240DaySelect");
    select.innerHTML = days().map(item => "<option value='" + item.day + "'>Day " + item.day + ": Level " + item.level + " - " + item.focus + "</option>").join("");
    select.addEventListener("change", showChoice);
    select.value = "1";
    showChoice();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else setTimeout(render, 0);
})();
