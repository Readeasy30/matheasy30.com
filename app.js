const placementQuestions = [
  { level: "A", skill: "Counting", question: "What number comes after 3?", answer: "4", hint: "Count slowly: 1, 2, 3, then what comes next?" },
  { level: "A", skill: "Adding one more", question: "What is 2 + 1?", answer: "3", hint: "Start with 2. Add 1 more." },
  { level: "B", skill: "Subtraction", question: "What is 5 - 2?", answer: "3", hint: "Start with 5. Take away 2. Count what is left." },
  { level: "B", skill: "Comparing numbers", question: "Which is bigger: 7 or 4?", answer: "7", hint: "The bigger number means more." },
  { level: "C", skill: "Addition fluency", question: "What is 3 + 4?", answer: "7", hint: "Start at 3 and count 4 more: 4, 5, 6, 7." },
  { level: "C", skill: "Multiplication basics", question: "What is 2 × 3?", answer: "6", hint: "2 groups of 3 means 3 + 3." },
  { level: "D", skill: "Division basics", question: "What is 10 ÷ 2?", answer: "5", hint: "Split 10 into 2 equal groups. Each group has 5." },
  { level: "D", skill: "Array thinking", question: "A box has 4 rows of 3 apples. How many apples are there?", answer: "12", hint: "4 rows of 3 means 4 × 3. Count 3, 6, 9, 12." }
];

const embeddedLessonPlan = [
  { day: 1, topic: "Counting Forward", focus: "Number order", coach: "Today we count slowly and notice what number comes next.", tip: "Use fingers, blocks, or coins. Touch one item for each number.", qs: [["Counting", "What number comes after 1?", "2", "Count 1, then 2."], ["Counting", "What number comes after 4?", "5", "Count 1, 2, 3, 4, 5."], ["Counting", "What number comes before 6?", "5", "Count up to 6. The number right before it is 5."]] },
  { day: 2, topic: "Counting Back", focus: "Before and after", coach: "Counting backward helps subtraction feel easier.", tip: "Count forward first if counting backward feels hard.", qs: [["Counting", "What number comes before 5?", "4", "Say 1, 2, 3, 4, 5."], ["Counting", "What number comes before 9?", "8", "The number just before 9 is 8."], ["Order", "Which comes first: 6 or 8?", "6", "Count up. You say 6 before 8."]] },
  { day: 3, topic: "Bigger and Smaller", focus: "Comparing numbers", coach: "Today we compare numbers without rushing.", tip: "Draw dots under each number. More dots means the number is bigger.", qs: [["Compare", "Which is bigger: 5 or 2?", "5", "5 means more than 2."], ["Compare", "Which is smaller: 3 or 7?", "3", "3 means less than 7."], ["Compare", "Which is bigger: 9 or 6?", "9", "9 is farther along when you count."]] },
  { day: 4, topic: "Add One More", focus: "Early addition", coach: "Adding one means the next number.", tip: "Say the first number, then count one more.", qs: [["Addition", "What is 1 + 1?", "2", "One more after 1 is 2."], ["Addition", "What is 4 + 1?", "5", "One more after 4 is 5."], ["Addition", "What is 7 + 1?", "8", "One more after 7 is 8."]] },
  { day: 5, topic: "Review Small Numbers", focus: "Confidence check", coach: "Review days help the brain feel safe and strong.", tip: "Praise careful thinking, not speed.", qs: [["Review", "What number comes after 8?", "9", "Count 7, 8, 9."], ["Review", "Which is bigger: 6 or 3?", "6", "6 is more."], ["Review", "What is 2 + 1?", "3", "One more after 2 is 3."]] },
  { day: 6, topic: "Addition Within 5", focus: "Small sums", coach: "Today we add small numbers we can see in our head.", tip: "Use small objects to show both parts, then count all.", qs: [["Addition", "What is 2 + 2?", "4", "Two and two make four."], ["Addition", "What is 3 + 1?", "4", "One more after 3 is 4."], ["Addition", "What is 1 + 4?", "5", "Start at 4 and add 1."]] },
  { day: 7, topic: "Addition Within 10", focus: "Counting on", coach: "Start with the bigger number, then count on.", tip: "Circle the bigger number. Count on from there.", qs: [["Addition", "What is 5 + 2?", "7", "Start at 5. Count 6, 7."], ["Addition", "What is 6 + 3?", "9", "Count 7, 8, 9."], ["Addition", "What is 4 + 5?", "9", "Start at 5 and count 4 more."]] },
  { day: 8, topic: "Doubles", focus: "Math patterns", coach: "Doubles are friendly facts that help later.", tip: "Use two hands or two matching groups.", qs: [["Doubles", "What is 2 + 2?", "4", "Double 2 is 4."], ["Doubles", "What is 3 + 3?", "6", "Count 3 and 3 more."], ["Doubles", "What is 5 + 5?", "10", "Double 5 is 10."]] },
  { day: 9, topic: "Make 10", focus: "Number partners", coach: "Making 10 is one of the most useful math skills.", tip: "Use ten fingers. Hold up the first number and see how many fingers are left.", qs: [["Make 10", "What goes with 9 to make 10?", "1", "9 plus 1 is 10."], ["Make 10", "What goes with 8 to make 10?", "2", "8 plus 2 is 10."], ["Make 10", "What is 6 + 4?", "10", "6 and 4 are partners for 10."]] },
  { day: 10, topic: "Addition Review", focus: "Steady fluency", coach: "Today we practice addition calmly.", tip: "Let the learner explain how they got the answer.", qs: [["Addition", "What is 7 + 2?", "9", "Start at 7 and count 2 more."], ["Addition", "What is 4 + 4?", "8", "Double 4 is 8."], ["Addition", "What is 6 + 4?", "10", "6 and 4 make 10."]] },
  { day: 11, topic: "Take Away One", focus: "Early subtraction", coach: "Taking away one means the number before.", tip: "Start with objects. Remove one and count what is left.", qs: [["Subtraction", "What is 5 - 1?", "4", "One before 5 is 4."], ["Subtraction", "What is 8 - 1?", "7", "One before 8 is 7."], ["Subtraction", "What is 3 - 1?", "2", "One before 3 is 2."]] },
  { day: 12, topic: "Subtraction Within 10", focus: "Counting back", coach: "We can subtract by counting backward.", tip: "Count backward out loud together.", qs: [["Subtraction", "What is 6 - 2?", "4", "Count back: 5, 4."], ["Subtraction", "What is 9 - 3?", "6", "Count back 3 steps."], ["Subtraction", "What is 7 - 4?", "3", "Count back: 6, 5, 4, 3."]] },
  { day: 13, topic: "Missing Parts", focus: "Addition and subtraction connection", coach: "Missing-part problems are just puzzles.", tip: "Ask: how many more do we need?", qs: [["Missing number", "3 + __ = 5", "2", "3 needs 2 more to make 5."], ["Missing number", "6 + __ = 10", "4", "6 and 4 make 10."], ["Missing number", "10 - __ = 7", "3", "10 take away 3 is 7."]] },
  { day: 14, topic: "Word Problems: Add and Take Away", focus: "Real-life math", coach: "Read the story slowly. Find what changes.", tip: "Ask whether the story is getting more or taking away.", qs: [["Word problem", "Mia has 3 apples. She gets 2 more. How many apples?", "5", "More means add: 3 + 2."], ["Word problem", "Tom has 6 blocks. He gives away 2. How many are left?", "4", "Gives away means subtract."], ["Word problem", "A dog has 4 treats and gets 1 more. How many treats?", "5", "4 + 1 = 5."]] },
  { day: 15, topic: "Subtraction Review", focus: "Confidence check", coach: "Review helps skills stick.", tip: "Keep review calm. Repeating basics is normal.", qs: [["Subtraction", "What is 8 - 2?", "6", "Count back 2."], ["Subtraction", "What is 10 - 5?", "5", "Half of 10 is 5."], ["Missing number", "4 + __ = 9", "5", "4 plus 5 is 9."]] },
  { day: 16, topic: "Groups", focus: "Multiplication foundation", coach: "Multiplication starts with equal groups.", tip: "Draw equal groups before using the multiplication sign.", qs: [["Groups", "2 groups of 3 is how many?", "6", "3 + 3 = 6."], ["Groups", "3 groups of 2 is how many?", "6", "2 + 2 + 2 = 6."], ["Groups", "4 groups of 1 is how many?", "4", "1 + 1 + 1 + 1 = 4."]] },
  { day: 17, topic: "Counting by 2s", focus: "Skip counting", coach: "Skip counting is multiplication in motion.", tip: "Clap or tap each skip-count number.", qs: [["Skip count", "Count by 2s: 2, 4, __", "6", "Add 2 more."], ["Skip count", "Count by 2s: 6, 8, __", "10", "Add 2 more."], ["Multiplication", "What is 2 × 4?", "8", "Count 2, 4, 6, 8."]] },
  { day: 18, topic: "Counting by 5s", focus: "Skip counting", coach: "Counting by 5s helps with money, time, and multiplication.", tip: "Use nickels or fingers on a clock face.", qs: [["Skip count", "Count by 5s: 5, 10, __", "15", "Add 5 more."], ["Skip count", "Count by 5s: 15, 20, __", "25", "Add 5 more."], ["Multiplication", "What is 5 × 3?", "15", "5, 10, 15."]] },
  { day: 19, topic: "Counting by 10s", focus: "Tens facts", coach: "Tens are friendly because they follow a pattern.", tip: "Point out that the ones digit stays zero.", qs: [["Skip count", "10, 20, __", "30", "Add 10 more."], ["Multiplication", "What is 10 × 4?", "40", "Four tens is 40."], ["Place value", "How many tens are in 50?", "5", "50 is five tens."]] },
  { day: 20, topic: "Multiplication Review", focus: "Equal groups", coach: "You are learning to see groups, not just numbers.", tip: "Return to drawings if facts feel too fast.", qs: [["Multiplication", "What is 3 × 3?", "9", "3 + 3 + 3 = 9."], ["Multiplication", "What is 4 × 2?", "8", "4 groups of 2 is 8."], ["Word problem", "There are 3 bags with 5 marbles each. How many marbles?", "15", "3 groups of 5."]] },
  { day: 21, topic: "Sharing Evenly", focus: "Division foundation", coach: "Division means sharing into equal groups.", tip: "Use objects and share them one at a time into groups.", qs: [["Division", "Share 6 into 2 equal groups. How many in each?", "3", "3 and 3 make 6."], ["Division", "What is 8 ÷ 2?", "4", "Two groups of 4 make 8."], ["Division", "What is 10 ÷ 5?", "2", "Five groups of 2 make 10."]] },
  { day: 22, topic: "Division by 2", focus: "Halves", coach: "Dividing by 2 is the same as making two equal parts.", tip: "Use the word half. Half means two equal parts.", qs: [["Division", "What is 4 ÷ 2?", "2", "Two equal groups of 2."], ["Division", "What is 12 ÷ 2?", "6", "Half of 12 is 6."], ["Division", "What is 14 ÷ 2?", "7", "Two groups of 7 make 14."]] },
  { day: 23, topic: "Division and Multiplication", focus: "Fact families", coach: "Multiplication and division are connected.", tip: "Say the related multiplication fact out loud.", qs: [["Fact family", "If 3 × 4 = 12, what is 12 ÷ 3?", "4", "The facts are connected."], ["Fact family", "If 5 × 2 = 10, what is 10 ÷ 5?", "2", "Use the multiplication fact."], ["Division", "What is 15 ÷ 3?", "5", "3 groups of 5 make 15."]] },
  { day: 24, topic: "Division Word Problems", focus: "Real-life sharing", coach: "Look for equal groups in the story.", tip: "Circle the total and underline how many groups.", qs: [["Word problem", "12 cookies are shared by 4 kids. How many each?", "3", "12 ÷ 4 = 3."], ["Word problem", "10 pencils go into 2 boxes equally. How many per box?", "5", "10 ÷ 2 = 5."], ["Word problem", "15 cards are split into 3 equal piles. How many per pile?", "5", "15 ÷ 3 = 5."]] },
  { day: 25, topic: "Division Review", focus: "Confidence check", coach: "Slow sharing builds division confidence.", tip: "Let the learner draw equal groups.", qs: [["Division", "What is 16 ÷ 2?", "8", "Half of 16 is 8."], ["Division", "What is 20 ÷ 5?", "4", "5 groups of 4 make 20."], ["Fact family", "If 4 × 3 = 12, what is 12 ÷ 4?", "3", "Use the related fact."]] },
  { day: 26, topic: "Fractions: Equal Parts", focus: "Fraction meaning", coach: "Fractions begin with equal parts.", tip: "Use paper. Fold it into equal parts.", qs: [["Fractions", "If a shape is cut into 2 equal parts, one part is called one what?", "half", "One of 2 equal parts is one half."], ["Fractions", "How many halves make one whole?", "2", "Two halves make a whole."], ["Fractions", "Are 2 equal pieces fair shares? yes or no", "yes", "Equal means fair."]] },
  { day: 27, topic: "Halves and Fourths", focus: "Early fractions", coach: "Today we compare halves and fourths.", tip: "Draw a rectangle. Split one into halves and one into fourths.", qs: [["Fractions", "How many fourths make one whole?", "4", "Four fourths make a whole."], ["Fractions", "Which is bigger: 1/2 or 1/4?", "1/2", "Half is bigger than one fourth."], ["Fractions", "Two fourths equals what simple fraction?", "1/2", "Two of four equal parts is half."]] },
  { day: 28, topic: "Fraction Pictures", focus: "Visual thinking", coach: "Fractions are easier when we picture them.", tip: "Draw four boxes and shade the number asked.", qs: [["Fractions", "If 1 of 4 equal parts is shaded, what fraction is shaded?", "1/4", "One out of four parts is 1/4."], ["Fractions", "If 3 of 4 equal parts are shaded, what fraction is shaded?", "3/4", "Three out of four parts is 3/4."], ["Fractions", "If all 4 of 4 parts are shaded, what is it called?", "whole", "All parts make the whole."]] },
  { day: 29, topic: "Mixed Review", focus: "All operations", coach: "Today we mix skills gently so the brain can connect them.", tip: "Pause after each question and name the skill: add, subtract, multiply, divide, or fraction.", qs: [["Review", "What is 6 + 3?", "9", "Count on from 6."], ["Review", "What is 12 ÷ 3?", "4", "3 groups of 4 make 12."], ["Review", "Which is bigger: 1/2 or 1/4?", "1/2", "Half is bigger."]] },
  { day: 30, topic: "Final Confidence Check", focus: "30-day review", coach: "You made it to Day 30. That is real progress.", tip: "Celebrate effort and name one skill that feels easier now.", qs: [["Final review", "What is 8 + 2?", "10", "8 and 2 make 10."], ["Final review", "What is 3 × 5?", "15", "3 groups of 5."], ["Final review", "What is 16 ÷ 2?", "8", "Half of 16 is 8."]] }
];

// --- 240-day staged-data wiring (added 2026-06-12) ---------------------------
// Build the live lesson plan from the staged Level A-H data loaded by
// lesson-loader-240.js. Falls back to the embedded 30-day plan if the staged
// data is unavailable for any reason, so the app never renders empty.
function buildStagedLessonPlan() {
  var staged = (typeof window !== "undefined" && Array.isArray(window.MATHEASY_NEXT_PATH_LESSONS))
    ? window.MATHEASY_NEXT_PATH_LESSONS
    : [];
  if (!staged.length) return null;
  return staged.map(function (s) {
    var skill = s.focus || s.title || ("Level " + (s.level || ""));
    return {
      day: s.day,
      level: s.level,
      topic: s.title || ("Day " + s.day),
      focus: s.focus || "",
      coach: s.bubbles || s.focus || "Take your time. You only need to try.",
      tip: "Helper tip: " + (s.focus || s.title || "Work through it together.") +
           " Go slowly and let the learner explain their thinking.",
      qs: [[skill, s.problem, String(s.answer), s.hint || "Look closely at the numbers and take it one step at a time."]]
    };
  });
}

const lessonPlan = buildStagedLessonPlan() || embeddedLessonPlan;
// ----------------------------------------------------------------------------

let mode = localStorage.getItem("mathEasy30CurrentMode") || "placement";
let currentQuestion = Number(localStorage.getItem("mathEasy30CurrentQuestion")) || 0;
let score = Number(localStorage.getItem("mathEasy30CurrentScore")) || 0;
let answered = false;
let activeDay = Number(localStorage.getItem("mathEasy30ActiveDay")) || 1;
let learnerLevel = localStorage.getItem("mathEasy30Level") || "A";
let activeLesson = null;
let activeQuestions = placementQuestions;

const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const checkBtn = document.getElementById("checkBtn");
const hintBtn = document.getElementById("hintBtn");
const clearBtn = document.getElementById("clearBtn");
const nextBtn = document.getElementById("nextBtn");
const placementBtn = document.getElementById("placementBtn");
const resetBtn = document.getElementById("resetBtn");
const daySelect = document.getElementById("daySelect");
const coachMessage = document.getElementById("coachMessage");
const confidenceMessage = document.getElementById("confidenceMessage");
const parentTip = document.getElementById("parentTip");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const skillLabel = document.getElementById("skillLabel");

function getLesson(day) {
  const lesson = lessonPlan.find(item => item.day === day) || lessonPlan[0];
  return {
    ...lesson,
    questions: lesson.qs.map(q => ({ skill: q[0], question: q[1], answer: q[2], hint: q[3] }))
  };
}

function buildDaySelector() {
  daySelect.innerHTML = lessonPlan.map(lesson => {
    const complete = localStorage.getItem(`mathEasy30Day${lesson.day}Complete`) === "true";
    return `<option value="${lesson.day}">Day ${lesson.day}${complete ? " ✓" : ""} — ${lesson.topic}</option>`;
  }).join("");
  daySelect.value = String(activeDay);
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isAnswerCorrect(userAnswer, correctAnswer) {
  const user = normalizeAnswer(userAnswer);
  const correct = normalizeAnswer(correctAnswer);
  const alternates = {
    "half": ["1/2", "one half", "a half"],
    "whole": ["one whole", "1", "all"],
    "yes": ["y", "yeah", "yep"],
    "no": ["n", "nope"]
  };

  if (user === correct) return true;
  if (alternates[correct] && alternates[correct].includes(user)) return true;
  return false;
}

function loadQuestion() {
  removeLevelPath();

  if (mode === "lesson") {
    activeLesson = getLesson(activeDay);
    activeQuestions = activeLesson.questions;
  } else {
    activeQuestions = placementQuestions;
  }

  if (currentQuestion >= activeQuestions.length) currentQuestion = 0;

  const item = activeQuestions[currentQuestion];
  answered = false;

  skillLabel.textContent = mode === "placement" ? `Level ${item.level} • ${item.skill}` : `Day ${activeDay} • ${item.skill}`;
  questionTitle.textContent = mode === "placement" ? `Math Check ${currentQuestion + 1} of ${activeQuestions.length}` : `${activeLesson.topic} — Question ${currentQuestion + 1}`;
  questionText.textContent = item.question;
  progressLabel.textContent = mode === "placement" ? "Math Check Progress" : `Day ${activeDay} Progress`;
  daySelect.value = String(activeDay);

  answerInput.value = "";
  showPracticeControls();

  coachMessage.textContent = mode === "placement" ? "Take your time. You only need to try." : activeLesson.coach;
  confidenceMessage.textContent = "Mistakes are not bad. Mistakes help us learn.";
  parentTip.textContent = mode === "placement" ? "Let the learner try without pressure. The goal is to find a good starting point." : activeLesson.tip;

  updateProgress();
  answerInput.focus();
}

function showHint() {
  const item = activeQuestions[currentQuestion];
  coachMessage.textContent = `Hint: ${item.hint}`;
  confidenceMessage.textContent = "Hints are not cheating. Hints help your brain find the path.";
}

function checkAnswer() {
  if (answered) return;

  const item = activeQuestions[currentQuestion];
  const userAnswer = answerInput.value;

  if (normalizeAnswer(userAnswer) === "") {
    coachMessage.textContent = "Type your answer first. Then we will check it together.";
    confidenceMessage.textContent = "No rush. One small step at a time.";
    return;
  }

  if (isAnswerCorrect(userAnswer, item.answer)) {
    score++;
    coachMessage.textContent = "Yes. Good thinking.";
    confidenceMessage.textContent = "That step counts. Your math brain is getting stronger.";
  } else {
    coachMessage.textContent = `Not yet. Hint: ${item.hint}`;
    confidenceMessage.textContent = "That is okay. Slow thinking wins.";
  }

  answered = true;
  saveProgress();
  updateProgress();
}

function nextQuestion() {
  if (!answered) {
    coachMessage.textContent = "Try checking your answer first.";
    confidenceMessage.textContent = "Checking helps us learn what to practice next.";
    return;
  }

  if (currentQuestion < activeQuestions.length - 1) {
    currentQuestion++;
    saveProgress();
    loadQuestion();
    return;
  }

  mode === "placement" ? showPlacementResults() : showLessonResults();
}

function showPlacementResults() {
  const percent = Math.round((score / activeQuestions.length) * 100);
  learnerLevel = "A";

  if (score >= 7) learnerLevel = "D";
  else if (score >= 5) learnerLevel = "C";
  else if (score >= 3) learnerLevel = "B";

  localStorage.setItem("mathEasy30Level", learnerLevel);
  localStorage.setItem("mathEasy30Score", score);
  localStorage.setItem("mathEasy30Percent", percent);

  skillLabel.textContent = "Placement complete";
  questionTitle.textContent = "Math Check Complete";
  questionText.innerHTML = `<strong>Score:</strong> ${score} out of ${activeQuestions.length}.<br><br><strong>Starting Level:</strong> Level ${learnerLevel}`;

  hidePracticeControls();
  coachMessage.textContent = "Great job finishing your math check.";
  confidenceMessage.textContent = "MathEasy30 will now start with Day 1 and grow step by step.";
  parentTip.textContent = "Use the starting level as a guide, not a label. Confidence matters.";

  localStorage.setItem("mathEasy30CurrentMode", "lesson");
  localStorage.setItem("mathEasy30ActiveDay", "1");
  localStorage.removeItem("mathEasy30CurrentQuestion");
  localStorage.removeItem("mathEasy30CurrentScore");

  updateProgress(true);
  showLevelPath(learnerLevel);
}

function showLevelPath(level) {
  removeLevelPath();

  const paths = {
    A: ["Counting", "Number recognition", "Simple addition"],
    B: ["Subtraction", "Number comparison", "Patterns"],
    C: ["Addition fluency", "Multiplication basics", "Word problems"],
    D: ["Division", "Multi-step thinking", "Early fractions"]
  };

  const lessonBox = document.createElement("section");
  lessonBox.className = "confidence-box level-path-box";
  lessonBox.id = "levelPathBox";
  lessonBox.innerHTML = `
    <h3>Level ${level} Path</h3>
    <p>We will start with steady practice and move through 30 days.</p>
    <ul>${paths[level].map(skill => `<li>${skill}</li>`).join("")}</ul>
    <button class="btn primary full" type="button" onclick="startDailyPractice(1)">Start Day 1 Practice</button>
  `;

  document.querySelector(".app-wrap").appendChild(lessonBox);
}

function startDailyPractice(day = activeDay) {
  removeLevelPath();
  mode = "lesson";
  currentQuestion = 0;
  score = 0;
  answered = false;
  activeDay = Math.min(Math.max(Number(day), 1), 30);
  activeLesson = getLesson(activeDay);
  activeQuestions = activeLesson.questions;
  localStorage.setItem("mathEasy30CurrentMode", "lesson");
  localStorage.setItem("mathEasy30ActiveDay", activeDay);
  localStorage.setItem("mathEasy30CurrentQuestion", "0");
  localStorage.setItem("mathEasy30CurrentScore", "0");
  buildDaySelector();
  loadQuestion();
}

function startPlacementCheck() {
  removeLevelPath();
  mode = "placement";
  currentQuestion = 0;
  score = 0;
  answered = false;
  activeQuestions = placementQuestions;
  localStorage.setItem("mathEasy30CurrentMode", "placement");
  localStorage.setItem("mathEasy30CurrentQuestion", "0");
  localStorage.setItem("mathEasy30CurrentScore", "0");
  loadQuestion();
}

function showLessonResults() {
  const percent = Math.round((score / activeQuestions.length) * 100);
  skillLabel.textContent = `Day ${activeDay} complete`;
  questionTitle.textContent = `Day ${activeDay} Practice Complete`;
  questionText.innerHTML = `<strong>Score:</strong> ${score} out of ${activeQuestions.length}.<br><br>You finished today’s practice.`;

  hidePracticeControls();
  localStorage.setItem(`mathEasy30Day${activeDay}Complete`, "true");
  localStorage.setItem(`mathEasy30Day${activeDay}Percent`, percent);
  localStorage.removeItem("mathEasy30CurrentQuestion");
  localStorage.removeItem("mathEasy30CurrentScore");
  buildDaySelector();

  if (activeDay < 30) {
    coachMessage.textContent = "Excellent work. You practiced slowly and carefully.";
    confidenceMessage.innerHTML = `Day ${activeDay + 1} is ready when you are.<br><button class="btn primary" type="button" onclick="startDailyPractice(${activeDay + 1})">Start Day ${activeDay + 1}</button>`;
    parentTip.textContent = "Stop while the learner still feels successful. Short practice beats frustration.";
    localStorage.setItem("mathEasy30ActiveDay", activeDay + 1);
  } else {
    coachMessage.textContent = "You finished the 30-day MathEasy30 starter path.";
    confidenceMessage.textContent = "This is a real win. Next we can unlock stronger practice and review paths.";
    parentTip.textContent = "Celebrate the full 30-day effort before moving to the next level.";
  }

  updateProgress(true);
}

function showPracticeControls() {
  answerInput.style.display = "block";
  checkBtn.style.display = "inline-flex";
  hintBtn.style.display = "inline-flex";
  clearBtn.style.display = "inline-flex";
  nextBtn.style.display = "inline-flex";
}

function hidePracticeControls() {
  answerInput.style.display = "none";
  checkBtn.style.display = "none";
  hintBtn.style.display = "none";
  clearBtn.style.display = "none";
  nextBtn.style.display = "none";
}

function clearAnswer() {
  answerInput.value = "";
  answerInput.focus();
  confidenceMessage.textContent = "Fresh start. Try the step again.";
}

function resetProgress() {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("mathEasy30")) keysToRemove.push(key);
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));

  mode = "placement";
  currentQuestion = 0;
  score = 0;
  answered = false;
  activeDay = 1;
  learnerLevel = "A";
  activeLesson = null;
  activeQuestions = placementQuestions;

  buildDaySelector();
  loadQuestion();
  coachMessage.textContent = "Progress was reset. We will begin again calmly.";
}

function removeLevelPath() {
  const oldPath = document.getElementById("levelPathBox");
  if (oldPath) oldPath.remove();
}

function updateProgress(done = false) {
  const percent = done ? 100 : Math.round((currentQuestion / activeQuestions.length) * 100);
  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function saveProgress() {
  localStorage.setItem("mathEasy30CurrentQuestion", currentQuestion);
  localStorage.setItem("mathEasy30CurrentScore", score);
  localStorage.setItem("mathEasy30CurrentMode", mode);
  localStorage.setItem("mathEasy30ActiveDay", activeDay);
}

checkBtn.addEventListener("click", checkAnswer);
hintBtn.addEventListener("click", showHint);
clearBtn.addEventListener("click", clearAnswer);
nextBtn.addEventListener("click", nextQuestion);
placementBtn.addEventListener("click", startPlacementCheck);
resetBtn.addEventListener("click", resetProgress);
daySelect.addEventListener("change", function() {
  startDailyPractice(Number(daySelect.value));
});

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (!answered) checkAnswer();
    else nextQuestion();
  }
});

buildDaySelector();
if (mode === "lesson") startDailyPractice(activeDay);
else loadQuestion();
