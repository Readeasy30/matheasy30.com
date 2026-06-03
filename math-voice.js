const MATHEASY_VOICE_KEY = "mathEasyPreferredWarmVoiceV2";
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

  if (lang.startsWith("en-us")) score += 65;
  else if (lang.startsWith("en-ca") || lang.startsWith("en-au")) score += 46;
  else if (lang.startsWith("en-gb")) score += 40;
  else if (lang.startsWith("en")) score += 30;
  else score -= 100;

  // Best free voices commonly exposed by Edge, Chrome, Windows, and Apple devices.
  // Goal: warm, clear, patient tutor. Not a character copy.
  if (name.includes("jenny")) score += 190;
  if (name.includes("aria")) score += 165;
  if (name.includes("samantha")) score += 145;
  if (name.includes("victoria")) score += 120;
  if (name.includes("zira")) score += 105;
  if (name.includes("karen")) score += 100;
  if (name.includes("susan")) score += 88;
  if (name.includes("google us english")) score += 78;
  if (name.includes("natural")) score += 70;
  if (name.includes("neural")) score += 62;
  if (name.includes("online")) score += 34;
  if (name.includes("female") || name.includes("woman")) score += 34;
  if (name.includes("microsoft")) score += 28;
  if (voice.localService) score += 10;

  // Avoid voices that commonly sound stiff, harsh, or less tutor-like.
  if (name.includes("david")) score -= 70;
  if (name.includes("mark")) score -= 55;
  if (name.includes("guy")) score -= 45;
  if (name.includes("male")) score -= 34;
  if (name.includes("compact")) score -= 30;
  if (name.includes("novelty")) score -= 80;

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

  const englishVoices = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith("en"));
  const candidates = englishVoices.length ? englishVoices : voices;
  const bestVoice = candidates.slice().sort((a, b) => scoreMathTeachingVoice(b) - scoreMathTeachingVoice(a))[0] || null;

  const savedVoiceName = getSavedMathVoiceName();
  const savedVoice = savedVoiceName ? voices.find(voice => voice.name === savedVoiceName) : null;

  // Keep a saved voice only if it is still close to the best available option.
  if (savedVoice && bestVoice && scoreMathTeachingVoice(savedVoice) >= scoreMathTeachingVoice(bestVoice) - 12) {
    return savedVoice;
  }

  if (bestVoice) saveMathVoiceName(bestVoice);
  return bestVoice;
}

function warmMathVoiceList() {
  if (!window.speechSynthesis) return;
  mathEasyPreferredVoice = getMathTeachingVoice();
}

function numberWord(value) {
  const words = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "14": "fourteen",
    "15": "fifteen",
    "16": "sixteen",
    "17": "seventeen",
    "18": "eighteen",
    "19": "nineteen",
    "20": "twenty"
  };
  return words[value] || value;
}

function softenNumbers(text) {
  return text.replace(/\b\d+\b/g, match => numberWord(match));
}

function prepareMathSpeechText(text) {
  return text
    .replace(/(\d+)\s*\+\s*(\d+)/g, "$1 plus $2")
    .replace(/(\d+)\s*[−-]\s*(\d+)/g, "$1 minus $2")
    .replace(/(\d+)\s*[×xX]\s*(\d+)/g, "$1 times $2")
    .replace(/(\d+)\s*[÷/]\s*(\d+)/g, "$1 divided by $2")
    .replace(/(\d+)\s*=\s*(\d+)/g, "$1 equals $2")
    .replace(/__/g, "blank")
    .replace(/\bwhat is\b/gi, "What is")
    .replace(/\s+/g, " ")
    .trim();
}

function splitMathTeachingPhrases(text) {
  const prepared = softenNumbers(prepareMathSpeechText(text));

  return prepared
    .split(/(?<=[.!?])\s+|(?<=:)\s+|(?<=,)\s+/)
    .map(phrase => phrase.trim())
    .filter(Boolean)
    .flatMap(phrase => splitLongMathPhrase(phrase));
}

function splitLongMathPhrase(phrase) {
  const hasMathOperation = /plus|minus|times|divided by|equals|blank/i.test(phrase);
  const words = phrase.split(" ");

  if (!hasMathOperation && words.length <= 12) return [phrase];

  const parts = phrase
    .replace(/\b(plus|minus|times|divided by|equals)\b/gi, "|$1|")
    .split("|")
    .map(part => part.trim())
    .filter(Boolean);

  if (parts.length <= 1 && words.length > 14) {
    const midpoint = Math.ceil(words.length / 2);
    return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
  }

  return parts.length ? parts : [phrase];
}

function getMathWarmSettings(phrase, phraseIndex, totalPhrases) {
  const isQuestion = /\?$/.test(phrase);
  const isOpeningPhrase = phraseIndex === 0;
  const isClosingPhrase = phraseIndex === totalPhrases - 1;
  const isOperator = /^(plus|minus|times|divided by|equals)$/i.test(phrase);
  const hasMathWords = /plus|minus|times|divided by|equals|answer|number|count|add|subtract|blank|groups|shared|equal/i.test(phrase);
  const hasNumberWords = /zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty/i.test(phrase);

  // Warm, patient, classic family-tutor feel. Not a character copy.
  let rate = 0.66;
  let pitch = 1.08;

  if (hasMathWords || hasNumberWords) rate -= 0.035;
  if (isOperator) {
    rate -= 0.065;
    pitch += 0.035;
  }
  if (isOpeningPhrase) {
    rate -= 0.02;
    pitch += 0.02;
  }
  if (isClosingPhrase) {
    rate -= 0.015;
    pitch -= 0.01;
  }
  if (isQuestion) pitch += 0.08;

  // Tiny deterministic variation keeps the voice from hitting the same robotic note every time.
  const rhythm = phraseIndex % 4;
  if (rhythm === 1) pitch += 0.012;
  if (rhythm === 2) pitch -= 0.01;
  if (rhythm === 3) rate += 0.012;

  return {
    rate: Math.max(0.56, Math.min(rate, 0.76)),
    pitch: Math.max(0.98, Math.min(pitch, 1.18)),
    volume: 1
  };
}

function getMathPhrasePause(phrase, phraseIndex, totalPhrases) {
  let pause = 520;

  if (/^(plus|minus|times|divided by|equals)$/i.test(phrase)) pause += 230;
  if (/zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty/i.test(phrase)) pause += 100;
  if (/\?$/.test(phrase)) pause += 180;
  if (phraseIndex === 0) pause += 120;
  if (phraseIndex === totalPhrases - 1) pause = 0;

  return pause;
}

function buildMathUtterance(phrase, voice, phraseIndex, totalPhrases) {
  const speech = new SpeechSynthesisUtterance(phrase);
  const settings = getMathWarmSettings(phrase, phraseIndex, totalPhrases);

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
            ? `${label} is using a warmer math voice with ${voice.name}. Listen to one small step at a time.`
            : `${label} is using a warmer math voice. Listen to one small step at a time.`
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

  window.setTimeout(speakNextPhrase, 120);
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
  const intro = "Let's look at this together.";
  speakMathTeachingText(`${intro} ${skill}. ${title}. ${question}`, "Bubbles");
}

function readMathHint() {
  const coach = document.getElementById("coachMessage")?.textContent || "Slow down and try one step.";
  const parentTip = document.getElementById("parentTip")?.textContent || "Use objects, fingers, or drawings. Keep the tone calm.";
  speakMathTeachingText(`Here is a helpful hint. ${coach} ${parentTip}`, "Bubbles");
}

if ("speechSynthesis" in window) {
  warmMathVoiceList();
  window.speechSynthesis.onvoiceschanged = warmMathVoiceList;
}
