/* MathEasy30 safe answer helper
   Purpose: keep the existing app engine, but make beginner answers a little more forgiving.
   This file is loaded after app.js and does not replace the lesson engine. */

const mathEasy30NumberWords = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
  eleven: "11",
  twelve: "12",
  thirteen: "13",
  fourteen: "14",
  fifteen: "15",
  sixteen: "16",
  seventeen: "17",
  eighteen: "18",
  nineteen: "19",
  twenty: "20",
  half: "1/2",
  fourth: "1/4",
  quarter: "1/4",
  whole: "whole"
};

function mathEasy30CleanAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ");
}

function mathEasy30AnswerForms(value) {
  const cleaned = mathEasy30CleanAnswer(value);
  const forms = new Set([cleaned]);

  if (mathEasy30NumberWords[cleaned]) forms.add(mathEasy30NumberWords[cleaned]);

  const compact = cleaned.replace(/\s+/g, "");
  forms.add(compact);

  if (["one half", "a half", "one-half", "half"].includes(cleaned)) {
    forms.add("1/2");
    forms.add("half");
  }

  if (["one fourth", "a fourth", "one-fourth", "one quarter", "a quarter", "quarter", "fourth"].includes(cleaned)) {
    forms.add("1/4");
    forms.add("fourth");
    forms.add("quarter");
  }

  if (["three fourths", "three-fourths", "three quarters", "three-quarters"].includes(cleaned)) {
    forms.add("3/4");
  }

  if (["one whole", "all", "all of it", "1"].includes(cleaned)) {
    forms.add("whole");
  }

  if (["y", "yeah", "yep", "correct"].includes(cleaned)) forms.add("yes");
  if (["n", "nope", "not correct"].includes(cleaned)) forms.add("no");

  return forms;
}

normalizeAnswer = function(value) {
  return mathEasy30CleanAnswer(value);
};

isAnswerCorrect = function(userAnswer, correctAnswer) {
  const userForms = mathEasy30AnswerForms(userAnswer);
  const correctForms = mathEasy30AnswerForms(correctAnswer);

  for (const form of userForms) {
    if (correctForms.has(form)) return true;
  }

  return false;
};

updateProgress = function(done = false) {
  const total = activeQuestions && activeQuestions.length ? activeQuestions.length : 1;
  const completed = done ? total : currentQuestion + (answered ? 1 : 0);
  const percent = Math.min(100, Math.max(0, Math.round((completed / total) * 100)));

  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
};

try {
  updateProgress();
} catch (error) {
  console.warn("MathEasy30 answer helper loaded before progress controls were ready.", error);
}
