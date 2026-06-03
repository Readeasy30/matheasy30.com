const MATHEASY_VOICE_KEY = "mathEasyPreferredVoice";
let mathEasyAudioSession = 0;
let mathEasyAudioActive = false;
let mathEasyPreferredVoice = null;

function setMathVoiceStatus(message) {
  const coachMessage = document.getElementById("coachMessage");
  if (coachMessage) coachMessage.textContent = message;
}

function getMathVoiceList() {
  if (!window.speechSynthesis || !window.speechSynthesis.getVoices) return [];
  return window.speechSynthesis.getVoices() || [];
}

function scoreMathTeachingVoice(voice) {
  if (!voice || !voice.name) return -100;

  const name = voice.name.toLowerCase();
  const lang = (voice.lang || "").toLowerCase();
  let score = 0;

  if (lang.startsWith("en-us")) score += 60;
  else if (lang.startsWith("en-gb") || lang.startsWith("en-ca") || lang.startsWith("en-au")) score += 42;
  else if (lang.startsWith("en")) score += 30;
  else score -= 90;

  // Warm classic teaching-coach preference: calm, clear, reassuring, parent-like.
  if (name.includes("jenny")) score += 165;
  if (name.includes("aria")) score += 140;
  if (name.includes("samantha")) score += 120;
  if (name.includes("victoria")) score += 105;
  if (name.includes("zira")) score += 95;
  if (name.includes("karen")) score += 90;
  if (name.includes("susan")) score += 78;
  if (name.includes("google us english")) score += 68;
  if (name.includes("microsoft")) score += 24;
  if (name.includes("natural")) score += 50;
  if (name.includes("neural")) score += 45;
  if (name.includes("online")) score += 24;
  if (name.includes("female") || name.includes("woman")) score += 28;
  if (voice.localService) score += 10;

  // These voices can work, but often sound flatter or less nurturing for learners.
  if (name.includes("david")) score -= 50;
  if (name.includes("mark")) score -= 38;
  if (name.includes("guy")) score -= 30;
  if (name.includes("male")) score -= 24;
  if (name.includes("compact")) score -= 24;

  return score;
}

function getSavedMathVoiceName() {
  try {
    return localStorage.getItem(MATHEASY_VOICE_KEY) || "";
  } catch (error) {
    return "";
  }
}

function saveMathVoiceName(voice) {
  if (!voice || !voice.name) return;
  try {
    localStorage.setItem(MATHEASY_VOICE_KEY, voice.name);
  } catch (error) {
    // Private browsing may block storage. Voice still works without saving.
  }
}

function getMathTeachingVoice() {
  const voices = getMathVoiceList();
  if (!voices.length) return null;

  const savedVoiceName = getSavedMathVoiceName();
  const savedVoice = savedVoiceName ? voices.find(voice => voice.name === savedVoiceName) : null;
  if (savedVoice) return savedVoice;

  const englishVoices = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith("en"));
  const candidates = englishVoices.length ? englishVoices : voices;
  const bestVoice = candidates.slice().sort((a, b) => scoreMathTeachingVoice(b) - scoreMathTeachingVoice(a))[0] || null;

  if (bestVoice) saveMathVoiceName(bestVoice);
  return bestVoice;
}

function warmMathVoiceList() {
  if (!window.speechSynthesis) return;
  mathEasyPreferredVoice = getMathTeachingVoice();
}

function prepareMathSpeechText(text) {
  return text
    .replace(/\+/g, " plus ")
    .replace(/-/g, " minus ")
    .replace(/×|x/g, " times ")
    .replace(/÷|\//g, " divided by ")
    .replace(/=/g, " equals ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitMathTeachingPhrases(text) {
  const prepared = prepareMathSpeechText(text);
  return prepared
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map(sentence => sentence.trim())
    .filter(Boolean) || [];
}

function getMathWarmSettings(sentence, phraseIndex, totalPhrases) {
  const isQuestion = /\?$/.test(sentence);
  const isOpeningPhrase = phraseIndex === 0;
  const isClosingPhrase = phraseIndex === totalPhrases - 1;
  const hasMathWords = /plus|minus|times|divided by|equals|answer|number|count|add|subtract/i.test(sentence);
  const hasDigits = /\d/.test(sentence);

  // Warm, patient, classic family-tutor feel. Not a character copy.
  let rate = 0.68;
  let pitch = 1.08;

  if (hasMathWords || hasDigits) rate -= 0.04;
  if (isOpeningPhrase) {
    rate -= 0.025;
    pitch += 0.025;
  }
  if (isClosingPhrase) {
    rate -= 0.015;
    pitch -= 0.01;
  }
  if (isQuestion) pitch += 0.09;

  return {
    rate: Math.max(0.58, Math.min(rate, 0.78)),
    pitch: Math.max(0.98, Math.min(pitch, 1.18)),
    volume: 1
  };
}

function getMathPhrasePause(sentence, phraseIndex, totalPhrases) {
  let pause = 620;

  if (/plus|minus|times|divided by|equals/i.test(sentence)) pause += 180;
  if (/\d/.test(sentence)) pause += 120;
  if (/\?$/.test(sentence)) pause += 180;
  if (phraseIndex === 0) pause += 100;
  if (phraseIndex === totalPhrases - 1) pause = 0;

  return pause;
}

function buildMathUtterance(sentence, voice, phraseIndex, totalPhrases) {
  const speech = new SpeechSynthesisUtterance(sentence);
  const settings = getMathWarmSettings(sentence, phraseIndex, totalPhrases);

  speech.rate = settings.rate;
  speech.pitch = settings.pitch;
  speech.volume = settings.volume;
  speech.lang = voice && voice.lang ? voice.lang : "en-US";
  if (voice) speech.voice = voice;

  return speech;
}

function stopMathAudio(message) {
  mathEasyAudioSession++;
  mathEasyAudioActive = false;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (message) setMathVoiceStatus(message);
}

function speakMathPhraseQueue(phrases, voice, label) {
  const sessionId = ++mathEasyAudioSession;
  let phraseIndex = 0;
  let started = false;

  mathEasyAudioActive = true;
  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();

  const speakNextPhrase = () => {
    if (!mathEasyAudioActive || sessionId !== mathEasyAudioSession) return;

    if (phraseIndex >= phrases.length) {
      mathEasyAudioActive = false;
      setMathVoiceStatus("Good. Now try one small step. You do not need to rush.");
      return;
    }

    const phrase = phrases[phraseIndex];
    const speech = buildMathUtterance(phrase, voice, phraseIndex, phrases.length);

    speech.onstart = () => {
      if (!started) {
        started = true;
        setMathVoiceStatus(
          voice
            ? `${label} is using Warm Math Voice with ${voice.name}. Listen to one calm step at a time.`
            : `${label} is using Warm Math Voice. Listen to one calm step at a time.`
        );
      }
    };

    speech.onend = () => {
      if (!mathEasyAudioActive || sessionId !== mathEasyAudioSession) return;
      const pause = getMathPhrasePause(phrase, phraseIndex, phrases.length);
      phraseIndex++;
      window.setTimeout(speakNextPhrase, pause);
    };

    speech.onerror = () => {
      if (sessionId !== mathEasyAudioSession) return;
      mathEasyAudioActive = false;
      setMathVoiceStatus("Voice was blocked or stopped. Check sound, then tap the button again.");
    };

    window.speechSynthesis.speak(speech);
  };

  window.setTimeout(speakNextPhrase, 100);
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

  if (mathEasyAudioActive || window.speechSynthesis.speaking) {
    stopMathAudio("Voice stopped. Tap the button again to restart from the first step.");
    return;
  }

  const phrases = splitMathTeachingPhrases(text);
  if (!phrases.length) {
    setMathVoiceStatus("There is nothing ready to read yet. Try again after the problem loads.");
    return;
  }

  const startSpeech = () => {
    mathEasyPreferredVoice = getMathTeachingVoice();
    speakMathPhraseQueue(phrases, mathEasyPreferredVoice, label);
  };

  if (getMathVoiceList().length === 0) {
    setMathVoiceStatus("Loading the teaching voice. Tap again if it does not start.");
    window.speechSynthesis.onvoiceschanged = () => {
      warmMathVoiceList();
      window.speechSynthesis.onvoiceschanged = null;
      startSpeech();
    };
    window.setTimeout(startSpeech, 350);
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

if ("speechSynthesis" in window) {
  warmMathVoiceList();
  window.speechSynthesis.onvoiceschanged = warmMathVoiceList;
}
