// MathEasy30 live 240-day integration
// Expands the proven 30-day live app to use staged Days 31-240.
// Keeps existing app controls, progress, hints, Bubbles, and answer checking.
(function () {
  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function normalizeLevel(level) {
    return String(level || "B").replace(/^Level\s+/i, "").trim().toUpperCase() || "B";
  }

  function convertLesson(lesson) {
    const day = Number(lesson.day);
    const level = normalizeLevel(lesson.level);
    return {
      day: day,
      topic: lesson.title || "Math Practice",
      focus: lesson.focus || "Practice one math skill.",
      coach: lesson.bubbles || "Try one step at a time.",
      tip: lesson.hint || "Use the hint and explain your thinking.",
      qs: [[
        lesson.focus || "Math practice",
        lesson.problem || "Solve the problem.",
        String(lesson.answer || "").trim(),
        lesson.hint || "Think carefully and try one step."
      ]],
      level: level
    };
  }

  function integrate() {
    if (window.__mathEasyLive240Integrated) return;
    window.__mathEasyLive240Integrated = true;

    if (typeof lessonPlan === "undefined") return;

    const staged = [
      ...safeArray(window.MATHEASY_LEVEL_B_LESSONS),
      ...safeArray(window.MATHEASY_LEVEL_C_LESSONS),
      ...safeArray(window.MATHEASY_LEVEL_D_LESSONS),
      ...safeArray(window.MATHEASY_LEVEL_E_LESSONS),
      ...safeArray(window.MATHEASY_LEVEL_F_LESSONS),
      ...safeArray(window.MATHEASY_LEVEL_G_LESSONS),
      ...safeArray(window.MATHEASY_LEVEL_H_LESSONS)
    ].sort(function (a, b) { return a.day - b.day; });

    if (!staged.length) return;

    const originalLiveDays = lessonPlan.length;
    const hasStagedAlready = lessonPlan.some(function (lesson) {
      return Number(lesson.day) === 31;
    });

    if (!hasStagedAlready) {
      staged.forEach(function (lesson) {
        lessonPlan.push(convertLesson(lesson));
      });
    }

    window.MATHEASY_LIVE_240_STATUS = {
      originalLiveDays: originalLiveDays,
      stagedAdded: staged.length,
      liveDaysNow: lessonPlan.length,
      firstStagedDay: staged[0] ? staged[0].day : null,
      lastStagedDay: staged[staged.length - 1] ? staged[staged.length - 1].day : null
    };

    if (typeof startDailyPractice === "function") {
      const originalStartDailyPractice = startDailyPractice;
      window.startDailyPractice = startDailyPractice = function (day) {
        removeLevelPath && removeLevelPath();
        mode = "lesson";
        currentQuestion = 0;
        score = 0;
        answered = false;
        const maxDay = lessonPlan.reduce(function (max, lesson) { return Math.max(max, Number(lesson.day) || 1); }, 240);
        activeDay = Math.min(Math.max(Number(day || activeDay), 1), maxDay);
        activeLesson = getLesson(activeDay);
        activeQuestions = activeLesson.questions;
        localStorage.setItem("mathEasy30CurrentMode", "lesson");
        localStorage.setItem("mathEasy30ActiveDay", activeDay);
        localStorage.setItem("mathEasy30CurrentQuestion", "0");
        localStorage.setItem("mathEasy30CurrentScore", "0");
        buildDaySelector();
        loadQuestion();
      };
    }

    if (typeof showLessonResults === "function") {
      const originalShowLessonResults = showLessonResults;
      window.showLessonResults = showLessonResults = function () {
        const percent = Math.round((score / activeQuestions.length) * 100);
        skillLabel.textContent = "Day " + activeDay + " complete";
        questionTitle.textContent = "Day " + activeDay + " Practice Complete";
        questionText.innerHTML = "<strong>Score:</strong> " + score + " out of " + activeQuestions.length + ".<br><br>You finished today’s practice.";

        hidePracticeControls();
        localStorage.setItem("mathEasy30Day" + activeDay + "Complete", "true");
        localStorage.setItem("mathEasy30Day" + activeDay + "Percent", percent);
        localStorage.removeItem("mathEasy30CurrentQuestion");
        localStorage.removeItem("mathEasy30CurrentScore");
        buildDaySelector();

        const maxDay = lessonPlan.reduce(function (max, lesson) { return Math.max(max, Number(lesson.day) || 1); }, 240);
        if (activeDay < maxDay) {
          coachMessage.textContent = "Excellent work. You practiced slowly and carefully.";
          confidenceMessage.innerHTML = "Day " + (activeDay + 1) + " is ready when you are.<br><button class='btn primary' type='button' onclick='startDailyPractice(" + (activeDay + 1) + ")'>Start Day " + (activeDay + 1) + "</button>";
          parentTip.textContent = "Stop while the learner still feels successful. Short practice beats frustration.";
          localStorage.setItem("mathEasy30ActiveDay", activeDay + 1);
        } else {
          coachMessage.textContent = "You finished the full 240-day MathEasy30 path.";
          confidenceMessage.textContent = "This is a real win. Repeat any level or continue with enrichment.";
          parentTip.textContent = "Celebrate the full 240-day effort. Confidence and consistency matter.";
        }

        updateProgress(true);
      };
    }

    if (typeof buildDaySelector === "function") buildDaySelector();
    if (typeof loadQuestion === "function") loadQuestion();

    const subtitle = document.querySelector(".lesson-subtitle");
    if (subtitle) subtitle.textContent = "Slow down. Think carefully. Practice one step at a time. MathEasy30 now runs as a full 240-day readiness path.";

    const coach = document.getElementById("coachMessage");
    if (coach) coach.textContent = "MathEasy30 is now live through Day 240. Start where you are and move one lesson at a time.";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", integrate);
  else integrate();
})();
