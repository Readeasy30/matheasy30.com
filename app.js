const placementQuestions = [
  {
    level: "A",
    skill: "Counting",
    question: "What number comes after 3?",
    answer: "4",
    hint: "Count slowly: 1, 2, 3, then what comes next?"
  },
  {
    level: "A",
    skill: "Adding one more",
    question: "What is 2 + 1?",
    answer: "3",
    hint: "Start with 2. Add 1 more."
  },
  {
    level: "B",
    skill: "Subtraction",
    question: "What is 5 - 2?",
    answer: "3",
    hint: "Start with 5. Take away 2. Count what is left."
  },
  {
    level: "B",
    skill: "Comparing numbers",
    question: "Which is bigger: 7 or 4?",
    answer: "7",
    hint: "The bigger number means more."
  },
  {
    level: "C",
    skill: "Addition fluency",
    question: "What is 3 + 4?",
    answer: "7",
    hint: "Start at 3 and count 4 more: 4, 5, 6, 7."
  },
  {
    level: "C",
    skill: "Multiplication basics",
    question: "What is 2 × 3?",
    answer: "6",
    hint: "2 groups of 3 means 3 + 3."
  },
  {
    level: "D",
    skill: "Division basics",
    question: "What is 10 ÷ 2?",
    answer: "5",
    hint: "Split 10 into 2 equal groups. Each group has 5."
  },
  {
    level: "D",
    skill: "Array thinking",
    question: "A box has 4 rows of 3 apples. How many apples are there?",
    answer: "12",
    hint: "4 rows of 3 means 4 × 3. You can count 3, 6, 9, 12."
  }
];

const dailyLessons = {
  A: [
    {
      day: 1,
      title: "Day 1: Count Forward",
      coach: "Today we count slowly and notice what number comes next.",
      questions: [
        { skill: "Counting", question: "What number comes after 1?", answer: "2", hint: "Count 1, then 2." },
        { skill: "Counting", question: "What number comes after 4?", answer: "5", hint: "Count 1, 2, 3, 4, 5." },
        { skill: "Counting", question: "What number comes before 6?", answer: "5", hint: "Count up to 6. The number right before it is 5." }
      ]
    }
  ],
  B: [
    {
      day: 1,
      title: "Day 1: Take Away",
      coach: "Today we practice taking away small numbers.",
      questions: [
        { skill: "Subtraction", question: "What is 4 - 1?", answer: "3", hint: "Start with 4. Take away 1." },
        { skill: "Subtraction", question: "What is 6 - 2?", answer: "4", hint: "Start with 6. Count back 2." },
        { skill: "Compare", question: "Which is smaller: 3 or 8?", answer: "3", hint: "The smaller number is less." }
      ]
    }
  ],
  C: [
    {
      day: 1,
      title: "Day 1: Add and Group",
      coach: "Today we strengthen addition and start thinking in groups.",
      questions: [
        { skill: "Addition", question: "What is 5 + 2?", answer: "7", hint: "Start at 5 and count 2 more." },
        { skill: "Addition", question: "What is 4 + 4?", answer: "8", hint: "Double 4 is 8." },
        { skill: "Groups", question: "2 groups of 4 is how many?", answer: "8", hint: "4 + 4 = 8." }
      ]
    }
  ],
  D: [
    {
      day: 1,
      title: "Day 1: Share and Think",
      coach: "Today we practice sharing numbers into equal groups.",
      questions: [
        { skill: "Division", question: "What is 8 ÷ 2?", answer: "4", hint: "Split 8 into 2 equal groups." },
        { skill: "Multiplication", question: "What is 3 × 4?", answer: "12", hint: "Count 4, 8, 12." },
        { skill: "Word problem", question: "Sam has 12 blocks. He makes 3 equal groups. How many blocks are in each group?", answer: "4", hint: "12 ÷ 3 = 4." }
      ]
    }
  ]
};

let mode = "placement";
let currentQuestion = 0;
let score = 0;
let answered = false;
let learnerLevel = localStorage.getItem("mathEasy30Level") || "A";
let activeLesson = null;
let activeQuestions = placementQuestions;

const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const checkBtn = document.getElementById("checkBtn");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const coachMessage = document.getElementById("coachMessage");
const confidenceMessage = document.getElementById("confidenceMessage");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const skillLabel = document.getElementById("skillLabel");

function loadQuestion() {
  const item = activeQuestions[currentQuestion];
  answered = false;

  skillLabel.textContent = mode === "placement" ? `Level ${item.level} • ${item.skill}` : `Level ${learnerLevel} • ${item.skill}`;
  questionTitle.textContent = mode === "placement" ? `Math Check ${currentQuestion + 1} of ${activeQuestions.length}` : `${activeLesson.title} — Question ${currentQuestion + 1}`;
  questionText.textContent = item.question;
  answerInput.value = "";
  answerInput.style.display = "block";
  checkBtn.style.display = "inline-block";
  hintBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";

  coachMessage.textContent = mode === "placement" ? "Take your time. You only need to try." : activeLesson.coach;
  confidenceMessage.textContent = "Mistakes are not bad. Mistakes help us learn.";

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
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = item.answer.toLowerCase();

  if (userAnswer === "") {
    coachMessage.textContent = "Type your answer first. Then we will check it together.";
    confidenceMessage.textContent = "No rush. One small step at a time.";
    return;
  }

  if (userAnswer === correctAnswer) {
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
    loadQuestion();
    return;
  }

  if (mode === "placement") {
    showPlacementResults();
  } else {
    showLessonResults();
  }
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
  confidenceMessage.textContent = "MathEasy30 will now start at the right level for you.";

  updateProgress(true);
  showLevelPath(learnerLevel);
}

function showLevelPath(level) {
  removeLevelPath();

  const paths = {
    A: ["Counting", "Number recognition", "Simple addition"],
    B: ["Subtraction", "Number comparison", "Patterns"],
    C: ["Addition fluency", "Multiplication basics", "Simple word problems"],
    D: ["Division", "Multi-step thinking", "Early fractions"]
  };

  const lessonBox = document.createElement("section");
  lessonBox.className = "confidence-box level-path-box";
  lessonBox.id = "levelPathBox";
  lessonBox.innerHTML = `
    <h3>Level ${level} Path</h3>
    <p>We will start with the right kind of practice.</p>
    <ul>${paths[level].map(skill => `<li>${skill}</li>`).join("")}</ul>
    <button class="btn primary full" type="button" onclick="startDailyPractice()">Start Day 1 Practice</button>
  `;

  document.querySelector(".app-wrap").appendChild(lessonBox);
}

function startDailyPractice() {
  removeLevelPath();
  mode = "lesson";
  currentQuestion = 0;
  score = 0;
  answered = false;
  activeLesson = dailyLessons[learnerLevel][0];
  activeQuestions = activeLesson.questions;
  localStorage.setItem("mathEasy30CurrentMode", "lesson");
  loadQuestion();
}

function showLessonResults() {
  const percent = Math.round((score / activeQuestions.length) * 100);
  skillLabel.textContent = "Day 1 complete";
  questionTitle.textContent = "Day 1 Practice Complete";
  questionText.innerHTML = `<strong>Score:</strong> ${score} out of ${activeQuestions.length}.<br><br>You finished today’s practice.`;

  hidePracticeControls();
  coachMessage.textContent = "Excellent work. You practiced slowly and carefully.";
  confidenceMessage.textContent = "Come back for the next lesson and keep building math strength.";
  localStorage.setItem("mathEasy30Day1Complete", "true");
  localStorage.setItem("mathEasy30Day1Percent", percent);
  updateProgress(true);
}

function hidePracticeControls() {
  answerInput.style.display = "none";
  checkBtn.style.display = "none";
  hintBtn.style.display = "none";
  nextBtn.style.display = "none";
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
}

checkBtn.addEventListener("click", checkAnswer);
hintBtn.addEventListener("click", showHint);
nextBtn.addEventListener("click", nextQuestion);

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") checkAnswer();
});

loadQuestion();
