const bubblesMathAnswers = [
  {
    keywords: ["start", "begin", "first", "check", "level"],
    answer: "Start with the Math Check. It helps find a calm starting point. Do one small problem at a time."
  },
  {
    keywords: ["hard", "stuck", "confused", "struggle", "difficult"],
    answer: "Slow down. Read the problem out loud. Use fingers, objects, or a drawing. One small step is still progress."
  },
  {
    keywords: ["hint", "help", "answer", "solve"],
    answer: "Use the hint button first. Try the next step yourself. Bubbles helps you think, not rush."
  },
  {
    keywords: ["practice", "long", "minutes", "daily", "time"],
    answer: "Ten to thirty minutes is enough for many learners. Stop while the learner is still calm."
  },
  {
    keywords: ["adult", "adults", "older", "adhd", "dyscalculia"],
    answer: "MathEasy30 can help children, adults, ADHD learners, dyscalculia learners, parents, tutors, and anyone who needs calm math practice."
  },
  {
    keywords: ["facts", "addition", "subtraction", "multiplication", "division"],
    answer: "Math facts work best when patterns make sense first. Practice slowly before speed. Accuracy comes before fast answers."
  }
];

function getMathBubblesElements() {
  return {
    input: document.getElementById("bubblesMathInput"),
    answer: document.getElementById("bubblesMathAnswer"),
    status: document.getElementById("bubblesMathVoiceStatus"),
    image: document.getElementById("bubblesMathImage")
  };
}

function scoreMathBubblesVoice(voice) {
  if (!voice || !voice.name) return -100;

  const name = voice.name.toLowerCase();
  const lang = (voice.lang || "").toLowerCase();
  let score = 0;

  if (lang.startsWith("en-us")) score += 45;
  else if (lang.startsWith("en")) score += 25;
  else score -= 75;

  if (name.includes("victoria")) score += 130;
  if (name.includes("samantha")) score += 62;
  if (name.includes("karen")) score += 58;
  if (name.includes("zira")) score += 55;
  if (name.includes("susan")) score += 50;
  if (name.includes("aria")) score += 48;
  if (name.includes("jenny")) score += 48;
  if (name.includes("google us english")) score += 45;
  if (name.includes("natural")) score += 35;
  if (name.includes("neural")) score += 35;
  if (name.includes("female")) score += 30;
  if (name.includes("woman")) score += 25;

  if (name.includes("david")) score -= 40;
  if (name.includes("mark")) score -= 35;
  if (name.includes("guy")) score -= 30;
  if (name.includes("male")) score -= 30;

  return score;
}

function getMathBubblesVoice() {
  if (!window.speechSynthesis || !window.speechSynthesis.getVoices) return null;
  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith("en"));
  const candidates = englishVoices.length ? englishVoices : voices;
  return candidates.slice().sort((a, b) => scoreMathBubblesVoice(b) - scoreMathBubblesVoice(a))[0] || null;
}

function speakMathBubbles(text) {
  const { status, image } = getMathBubblesElements();

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    if (status) status.textContent = "Voice is not supported in this browser. You can still read Bubbles' answer.";
    return;
  }

  const startSpeech = () => {
    const speech = new SpeechSynthesisUtterance(text);
    const voice = getMathBubblesVoice();

    speech.rate = 0.78;
    speech.pitch = 1.08;
    speech.volume = 1;
    speech.lang = voice && voice.lang ? voice.lang : "en-US";
    if (voice) speech.voice = voice;

    speech.onstart = () => {
      if (status) status.textContent = voice ? `Bubbles is speaking with ${voice.name}.` : "Bubbles is speaking.";
      if (image) image.classList.add("bubbles-speaking");
    };

    speech.onend = () => {
      if (status) status.textContent = "Ask Bubbles another math question.";
      if (image) image.classList.remove("bubbles-speaking");
    };

    speech.onerror = () => {
      if (status) status.textContent = "Voice was blocked or stopped. Check sound, then try again.";
      if (image) image.classList.remove("bubbles-speaking");
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    setTimeout(() => window.speechSynthesis.speak(speech), 60);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    if (status) status.textContent = "Loading Bubbles' voice. Tap again if it does not start.";
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      startSpeech();
    };
    setTimeout(startSpeech, 300);
    return;
  }

  startSpeech();
}

function findMathBubblesAnswer(questionText) {
  const question = (questionText || "").toLowerCase();

  if (!question.trim()) {
    return "Ask me about starting, hints, math facts, practice time, or what to do when math feels hard.";
  }

  const scoredAnswers = bubblesMathAnswers.map(item => {
    const score = item.keywords.reduce((total, keyword) => total + (question.includes(keyword) ? 1 : 0), 0);
    return { ...item, score };
  }).sort((a, b) => b.score - a.score);

  if (scoredAnswers[0] && scoredAnswers[0].score > 0) {
    return scoredAnswers[0].answer;
  }

  return "I can answer simple MathEasy30 questions. Try asking: Where should I start? What if math feels hard? How long should I practice?";
}

function askMathBubbles(questionText) {
  const { input, answer } = getMathBubblesElements();
  const question = questionText || (input ? input.value : "");
  const reply = findMathBubblesAnswer(question);

  if (answer) answer.textContent = reply;
  speakMathBubbles(reply);
}

function introduceMathBubbles() {
  const intro = "Hi, I am Bubbles. I help with calm math practice. Slow down, try one step, and do not rush.";
  const { answer } = getMathBubblesElements();
  if (answer) answer.textContent = intro;
  speakMathBubbles(intro);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-bubbles-math]").forEach(button => {
    button.addEventListener("click", () => askMathBubbles(button.getAttribute("data-bubbles-math")));
  });

  const input = document.getElementById("bubblesMathInput");
  if (input) {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") askMathBubbles();
    });
  }
});
