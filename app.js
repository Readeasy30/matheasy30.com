const questions = [
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

let currentQuestion = 0;
let score = 0;
let answered = false;

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
  const item = questions[currentQuestion];

  answered = false;

  skillLabel.textContent = `Level ${item.level} • ${item.skill}`;
  questionTitle.textContent = `Math Check ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.question;
  answerInput.value = "";
  answerInput.style.display = "block";
  checkBtn.style.display = "inline-block";
  hintBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";

  coachMessage.textContent = "Take your time. You only need to try.";
  confidenceMessage.textContent = "Mistakes are not bad. Mistakes help us learn.";

  updateProgress();
  answerInput.focus();
}

function showHint() {
  const item = questions[currentQuestion];
  coachMessage.textContent = `Hint: ${item.hint}`;
  confidenceMessage.textContent = "Hints are not cheating. Hints help your brain find the path.";
}

function checkAnswer() {
  if (answered) return;

  const item = questions[currentQuestion];
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

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const percent = Math.round((score / questions.length) * 100);
  let level = "A";

  if (score >= 7) {
    level = "D";
  } else if (score >= 5) {
    level = "C";
  } else if (score >= 3) {
    level = "B";
  }

  localStorage.setItem("mathEasy30Level", level);
  localStorage.setItem("mathEasy30Score", score);
  localStorage.setItem("mathEasy30Percent", percent);

  skillLabel.textContent = "Placement complete";
  questionTitle.textContent = "Math Check Complete";
  questionText.innerHTML = `
    <strong>Score:</strong> ${score} out of ${questions.length}.<br><br>
    <strong>Starting Level:</strong> Level ${level}
  `;

  answerInput.style.display = "none";
  checkBtn.style.display = "none";
  hintBtn.style.display = "none";
  nextBtn.style.display = "none";

  coachMessage.textContent = "Great job finishing your math check.";
  confidenceMessage.textContent = "MathEasy30 will now start at the right level for you.";

  updateProgress(true);
  showLevelPath(level);
}

function showLevelPath(level) {
  const oldPath = document.getElementById("levelPathBox");

  if (oldPath) {
    oldPath.remove();
  }

  const lessonBox = document.createElement("section");
  lessonBox.className = "confidence-box level-path-box";
  lessonBox.id = "levelPathBox";

  const paths = {
    A: {
      title: "Level A Path",
      intro: "We will build number confidence from the ground up.",
      skills: ["Counting", "Number recognition", "Simple addition"]
    },
    B: {
      title: "Level B Path",
      intro: "We will strengthen basic operations and number sense.",
      skills: ["Subtraction", "Number comparison", "Patterns"]
    },
    C: {
      title: "Level C Path",
      intro: "We will grow fluency and start stronger problem solving.",
      skills: ["Addition fluency", "Multiplication basics", "Simple word problems"]
    },
    D: {
      title: "Level D Path",
      intro: "We will practice deeper thinking with early middle-school skills.",
      skills: ["Division", "Multi-step thinking", "Early fractions"]
    }
  };

  const path = paths[level];

  lessonBox.innerHTML = `
    <h3>${path.title}</h3>
    <p>${path.intro}</p>
    <ul>
      ${path.skills.map(skill => `<li>${skill}</li>`).join("")}
    </ul>
    <button class="btn primary full" type="button" onclick="startDailyPractice()">
      Start Day 1 Practice
    </button>
  `;

  document.querySelector(".app-wrap").appendChild(lessonBox);
}

function startDailyPractice() {
  coachMessage.textContent = "Day 1 practice is next. We will build this lesson path one step at a time.";
  confidenceMessage.textContent = "You finished the first important step: finding the right starting point.";
}

function updateProgress(done = false) {
  const percent = done ? 100 : Math.round((currentQuestion / questions.length) * 100);

  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function saveProgress() {
  localStorage.setItem("mathEasy30CurrentQuestion", currentQuestion);
  localStorage.setItem("mathEasy30Score", score);
}

checkBtn.addEventListener("click", checkAnswer);
hintBtn.addEventListener("click", showHint);
nextBtn.addEventListener("click", nextQuestion);

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

loadQuestion();
