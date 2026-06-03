// MathEasy30 240-day preview app script
(function () {
  function byId(id) { return document.getElementById(id); }
  function lessons() { return window.MATHEASY_NEXT_PATH_LESSONS || []; }
  function getLesson(day) { return window.getMathEasyStagedLesson ? window.getMathEasyStagedLesson(day) : null; }

  function renderLesson(dayNumber) {
    const lesson = getLesson(dayNumber);
    const output = byId("previewLesson");
    if (!lesson || !output) return;

    output.innerHTML = "<h2>Day " + lesson.day + ": " + lesson.title + "</h2>" +
      "<p><strong>Level " + lesson.level + "</strong> — " + lesson.focus + "</p>" +
      "<div class='confidence-box'><h3>Problem</h3><p>" + lesson.problem + "</p></div>" +
      "<div class='confidence-box'><h3>Hint</h3><p>" + lesson.hint + "</p></div>" +
      "<div class='confidence-box'><h3>Bubbles Says</h3><p>" + lesson.bubbles + "</p></div>" +
      "<p><a class='btn primary' href='app.html'>Open Current Math App</a></p>";
  }

  function boot() {
    const status = byId("previewStatus");
    const select = byId("previewDaySelect");
    const data = lessons();

    if (status) {
      const s = window.MATHEASY_240_LESSON_STATUS;
      status.textContent = s ? ("Loaded " + s.stagedNextPath + " staged lessons, Day " + s.firstStagedDay + " through Day " + s.lastStagedDay + ".") : "Lesson status not found.";
    }

    if (!select || !data.length) return;
    select.innerHTML = data.map(function (lesson) {
      return "<option value='" + lesson.day + "'>Day " + lesson.day + " - Level " + lesson.level + ": " + lesson.title + "</option>";
    }).join("");

    select.addEventListener("change", function () { renderLesson(Number(select.value)); });
    select.value = "31";
    renderLesson(31);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
