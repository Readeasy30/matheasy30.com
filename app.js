const questions = [
  {
    level: "A",
    question: "What number comes after 3?",
    answer: "4",
    hint: "Count: 1, 2, 3, then what comes next?"
  },
  {
    level: "A",
    question: "What is 2 + 1?",
    answer: "3",
    hint: "Start with 2. Add 1 more."
  },
  {
    level: "B",
    question: "What is 5 - 2?",
    answer: "3",
    hint: "Start with 5. Take away 2."
  },
  {
    level: "B",
    question: "Which is bigger: 7 or 4?",
    answer: "7",
    hint: "The bigger number means more."
  },
  {
    level: "C",
    question: "What is 3 + 4?",
    answer: "7",
    hint: "Start at 3 and count 4 more."
  },
  {
    level: "C",
    question: "What is 2 × 3?",
    answer: "6",
    hint: "2 groups of 3 means 3 + 3."
  },
  {
    level: "D",
    question: "What is 10 ÷ 2?",
    answer: "5",
    hint: "Split 10 into 2 equal groups."
  },
  {
    level: "D",
    question: "A box has 4 rows of 3 apples. How many apples are there?",
    answer: "12",
    hint: "4 rows of 3 means 4 × 3."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const coachMessage = document.getElementById("coachMessage");
const confidenceMessage = document.getElementById("confidenceMessage");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

function loadQuestion() {
  const item = questions[currentQuestion];

  answered = false;

  questionTitle.textContent = `Math Check ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.question;
  answerInput.value = "";
  answerInput.style.display = "block";
  checkBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";

  coachMessage.textContent = "Take your time. You only need to try.";
  confidenceMessage.textContent = "Mistakes are not bad. Mistakes help us learn.";

  updateProgress();
  answerInput.focus();
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

  questionTitle.textContent = "Math Check Complete";

  questionText.innerHTML = `
    Score: ${score} out of ${questions.length}.<br><br>
    Starting Level: <strong>Level ${level}</strong>
  `;

  answerInput.style.display = "none";
  checkBtn.style.display = "none";
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

  const lessonBox = document.createElement("div");
  lessonBox.className = "confidence-box";
  lessonBox.id = "levelPathBox";

  let lessonMessage = "";

  if (level === "A") {
    lessonMessage = `
      <h3>Level A Path</h3>
      <p>We will practice:</p>
      <ul>
        <li>Counting</li>
        <li>Number recognition</li>
        <li>Simple addition</li>
      </ul>
    `;
  } else if (level === "B") {
    lessonMessage = `
      <h3>Level B Path</h3>
      <p>We will practice:</p>
      <ul>
        <li>Subtraction</li>
        <li>Number comparison</li>
        <li>Patterns</li>
      </ul>
    `;
  } else if (level === "C") {
    lessonMessage = `
      <h3>Level C Path</h3>
      <p>We will practice:</p>
      <ul>
        <li>Addition fluency</li>
        <li>Multiplication basics</li>
        <li>Simple word problems</li>
      </ul>
    `;
  } else {
    lessonMessage = `
      <h3>Level D Path</h3>
      <p>We will practice:</p>
      <ul>
        <li>Division</li>
        <li>Multi-step thinking</li>
        <li>Early fractions</li>
      </ul>
    `;
  }

  lessonBox.innerHTML = lessonMessage;
  document.querySelector(".app-wrap").appendChild(lessonBox);
}

function updateProgress(done = false) {
  let percent;

  if (done) {
    percent = 100;
  } else {
    percent = Math.round((currentQuestion / questions.length) * 100);
  }

  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function saveProgress() {
  localStorage.setItem("mathEasy30CurrentQuestion", currentQuestion);
  localStorage.setItem("mathEasy30Score", score);
}

checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

loadQuestion();
