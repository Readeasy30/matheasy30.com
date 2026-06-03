// MathEasy30 240-day staged lesson loader
// Loads staged Level B-H lesson data into one safe lookup object.
// This file does not replace the current live app engine.
(function () {
  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  const levelALessons = [];
  const levelBLessons = safeArray(window.MATHEASY_LEVEL_B_LESSONS);
  const levelCLessons = safeArray(window.MATHEASY_LEVEL_C_LESSONS);
  const levelDLessons = safeArray(window.MATHEASY_LEVEL_D_LESSONS);
  const levelELessons = safeArray(window.MATHEASY_LEVEL_E_LESSONS);
  const levelFLessons = safeArray(window.MATHEASY_LEVEL_F_LESSONS);
  const levelGLessons = safeArray(window.MATHEASY_LEVEL_G_LESSONS);
  const levelHLessons = safeArray(window.MATHEASY_LEVEL_H_LESSONS);

  const nextPathLessons = [
    ...levelBLessons,
    ...levelCLessons,
    ...levelDLessons,
    ...levelELessons,
    ...levelFLessons,
    ...levelGLessons,
    ...levelHLessons
  ].sort((a, b) => a.day - b.day);

  const lessonsByDay = nextPathLessons.reduce((map, lesson) => {
    map[String(lesson.day)] = lesson;
    return map;
  }, {});

  const lessonsByLevel = nextPathLessons.reduce((map, lesson) => {
    if (!map[lesson.level]) map[lesson.level] = [];
    map[lesson.level].push(lesson);
    return map;
  }, {});

  window.MATHEASY_NEXT_PATH_LESSONS = nextPathLessons;
  window.MATHEASY_LESSONS_BY_DAY = lessonsByDay;
  window.MATHEASY_LESSONS_BY_LEVEL = lessonsByLevel;
  window.MATHEASY_240_LESSON_STATUS = {
    liveLevelA: levelALessons.length,
    stagedNextPath: nextPathLessons.length,
    expectedStagedNextPath: 210,
    firstStagedDay: nextPathLessons.length ? nextPathLessons[0].day : null,
    lastStagedDay: nextPathLessons.length ? nextPathLessons[nextPathLessons.length - 1].day : null,
    levelsLoaded: Object.keys(lessonsByLevel)
  };

  window.getMathEasyStagedLesson = function getMathEasyStagedLesson(day) {
    return lessonsByDay[String(day)] || null;
  };
})();
