function scoreMathTeachingVoice(voice) {
  if (!voice || !voice.name) return -100;

  const name = voice.name.toLowerCase();
  const lang = (voice.lang || "").toLowerCase();
  let score = 0;

  if (lang.startsWith("en-us")) score += 45;
  else if (lang.startsWith("en")) score += 25;
  else score -= 75;

  // Pleasant female teaching voice preference.
  if (name.includes("jenny")) score += 140;
  if (name.includes("aria")) score += 105;
  if (name.includes("samantha")) score += 85;
  if (name.includes("victoria")) score += 78;
  if (name.includes("karen")) score += 72;
  if (name.includes("zira")) score += 68;
  if (name.includes("susan")) score += 58;
  if (name.includes("google us english")) score += 50;

  if (name.includes("natural")) score += 40;
  if (name.includes("online")) score += 30;
  if (name.includes("neural")) score += 35;
  if (name.includes("female")) score += 30;
  if (name.includes("woman")) score += 25;

  if (name.includes("david")) score -= 50;
  if (name.includes("mark")) score -= 40;
  if (name.includes("guy")) score -= 35;
  if (name.includes("male")) score -= 35;

  return score;
}

function getMathTeachingVoice() {
  if (!window.speechSynthesis || !window.speechSynthesis.getVoices) return null;
  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith("en"));
  const candidates = englishVoices.length ? englishVoices : voices;
  return candidates.slice().sort((a, b) => scoreMathTeachingVoice(b) - scoreMathTeachingVoice(a))[0] || null;
}

function setMathVoiceStatus(message) {
  const coachMessage = document.getElementById("coachMessage");
  if (coachMessage) coachMessage.textContent = message;
}

function speakMathTeachingText(text, label = "Bubbles") {
  if (!text || !text.trim()) {
    setMathVoiceStatus("There is nothing ready to read yet. Try again after the problem loads.");
    return;
  }

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    setMathVoiceStatus("This browser does not support voice reading. Try Chrome, Edge, or Safari with sound turned on.");
    return;
  }

  const startSpeech = () => {
    const speech = new SpeechSynthesisUtterance(text);
    const voice = getMathTeachingVoice();

    speech.rate = 0.76;
    speech.pitch = 1.06;
    speech.volume = 1;
    speech.lang = voice && voice.lang ? voice.lang : "en-US";
    if (voice) speech.voice = voice;

    speech.onstart = () => {
      setMathVoiceStatus(voice ? `${label} is speaking with ${voice.name}. Listen, then try one step.` : `${label} is speaking. Listen, then try one step.`);
    };

    speech.onend = () => {
      setMathVoiceStatus("Now try one small step. You do not need to rush.");
    };

    speech.onerror = () => {
      setMathVoiceStatus("Voice was blocked or stopped. Check sound, then tap the button again.");
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    setTimeout(() => window.speechSynthesis.speak(speech), 60);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    setMathVoiceStatus("Loading the teaching voice. Tap again if it does not start.");
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      startSpeech();
    };
    setTimeout(startSpeech, 300);
    return;
  }

  startSpeech();
}

function readMathProblem() {
  const skill = document.getElementById("skillLabel")?.textContent || "Math practice";
  const title = document.getElementById("questionTitle")?.textContent || "Question";
  const question = document.getElementById("questionText")?.textContent || "";
  speakMathTeachingText(`${skill}. ${title}. ${question}`, "Bubbles");
}

function readMathHint() {
  const coach = document.getElementById("coachMessage")?.textContent || "Slow down and try one step.";
  const parentTip = document.getElementById("parentTip")?.textContent || "Use objects, fingers, or drawings. Keep the tone calm.";
  speakMathTeachingText(`${coach} Hint: ${parentTip}`, "Bubbles");
}
