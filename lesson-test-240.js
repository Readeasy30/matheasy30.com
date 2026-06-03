// MathEasy30 staged lesson test script
// Loads after level-b through level-h lesson files and lesson-loader-240.js.
(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function statusText(status) {
    if (!status) return "No lesson status found.";
    return [
      "Staged lessons loaded: " + status.stagedNextPath,
      "Expected staged lessons: " + status.expectedStagedNextPath,
      "First staged day: " + status.firstStagedDay,
      "Last staged day: " + status.lastStagedDay,
      "Levels loaded: " + status.levelsLoaded.join(", ")
    ].join("\n");
  }

  function lessonLine(day) {
    const lesson = window.getMathEasyStagedLesson ? window.getMathEasyStagedLesson(day) : null;
    if (!lesson) return "Day " + day + ": missing";
    return "Day " + lesson.day + " | Level " + lesson.level + " | " + lesson.title;
  }

  function render() {
    const status = window.MATHEASY_240_LESSON_STATUS;
    const lessons = window.MATHEASY_NEXT_PATH_LESSONS || [];
    const output = byId("lessonTestOutput");
    const sample = byId("lessonSampleOutput");
    const daySelect = byId("lessonDaySelect");

    if (output) {
      const pass = status && status.stagedNextPath === status.expectedStagedNextPath && status.firstStagedDay === 31 && status.lastStagedDay === 240;
      output.textContent = (pass ? "PASS\n" : "CHECK NEEDED\n") + statusText(status);
    }

    if (daySelect) {
      daySelect.innerHTML = lessons.map(function (lesson) {
        return "<option value='" + lesson.day + "'>Day " + lesson.day + " - Level " + lesson.level + ": " + lesson.title + "</option>";
      }).join("");
      daySelect.addEventListener("change", function () {
        showLesson(Number(daySelect.value));
      });
    }

    if (sample) {
      sample.textContent = [lessonLine(31), lessonLine(60), lessonLine(90), lessonLine(120), lessonLine(150), lessonLine(180), lessonLine(210), lessonLine(240)].join("\n");
    }

    showLesson(31);
  }

  function showLesson(day) {
    const detail = byId("lessonDetailOutput");
    const lesson = window.getMathEasyStagedLesson ? window.getMathEasyStagedLesson(day) : null;
    if (!detail || !lesson) return;

    detail.innerHTML = "<h2>Day " + lesson.day + ": " + lesson.title + "</h2>" +
      "<p><strong>Level:</strong> " + lesson.level + "</p>" +
      "<p><strong>Focus:</strong> " + lesson.focus + "</p>" +
      "<p><strong>Problem:</strong> " + lesson.problem + "</p>" +
      "<p><strong>Hint:</strong> " + lesson.hint + "</p>" +
      "<p><strong>Bubbles:</strong> " + lesson.bubbles + "</p>";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
