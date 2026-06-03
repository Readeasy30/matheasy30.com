const MATH_VOICE_PICKER_KEY = "mathEasyPreferredWarmVoiceV2";

function mathPickerSetStatus(message) {
  const coachMessage = document.getElementById("coachMessage");
  if (coachMessage) coachMessage.textContent = message;
}

function mathPickerGetVoices() {
  if (!window.speechSynthesis || !window.speechSynthesis.getVoices) return [];
  return window.speechSynthesis.getVoices() || [];
}

function mathPickerScoreVoice(voice) {
  if (!voice || !voice.name) return -100;

  const name = voice.name.toLowerCase();
  const lang = (voice.lang || "").toLowerCase();
  let score = 0;

  if (lang.startsWith("en-us")) score += 60;
  else if (lang.startsWith("en")) score += 35;
  else score -= 100;

  if (name.includes("jenny")) score += 220;
  if (name.includes("aria")) score += 190;
  if (name.includes("samantha")) score += 165;
  if (name.includes("victoria")) score += 140;
  if (name.includes("zira")) score += 120;
  if (name.includes("karen")) score += 110;
  if (name.includes("susan")) score += 95;
  if (name.includes("google us english")) score += 85;
  if (name.includes("natural")) score += 80;
  if (name.includes("neural")) score += 70;
  if (name.includes("online")) score += 45;
  if (name.includes("microsoft")) score += 25;

  if (name.includes("david")) score -= 80;
  if (name.includes("mark")) score -= 60;
  if (name.includes("guy")) score -= 45;
  if (name.includes("compact")) score -= 35;

  return score;
}

function mathPickerBestVoice() {
  const voices = mathPickerGetVoices();
  const english = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith("en"));
  const candidates = english.length ? english : voices;
  return candidates.slice().sort((a, b) => mathPickerScoreVoice(b) - mathPickerScoreVoice(a))[0] || null;
}

function mathPickerSavedVoiceName() {
  try {
    return localStorage.getItem(MATH_VOICE_PICKER_KEY) || "";
  } catch (error) {
    return "";
  }
}

function mathPickerSelectedVoice() {
  const voices = mathPickerGetVoices();
  const savedName = mathPickerSavedVoiceName();
  return voices.find(voice => voice.name === savedName) || mathPickerBestVoice();
}

window.getMathTeachingVoice = function getMathTeachingVoiceOverride() {
  return mathPickerSelectedVoice();
};

function mathPickerSaveVoice() {
  const select = document.getElementById("mathVoiceSelect");
  if (!select || !select.value) return;

  try {
    localStorage.setItem(MATH_VOICE_PICKER_KEY, select.value);
  } catch (error) {
    // Voice still works during the current page session if storage is blocked.
  }

  mathPickerSetStatus(`Voice saved: ${select.value}. Tap Test Voice to compare it.`);
}

function mathPickerTestVoice() {
  mathPickerSaveVoice();

  if (typeof speakMathTeachingText === "function") {
    speakMathTeachingText(
      "Let's try this voice together. What is two plus three? Take your time. The answer is five.",
      "Bubbles"
    );
  }
}

function mathPickerUseBestVoice() {
  const bestVoice = mathPickerBestVoice();
  if (!bestVoice) {
    mathPickerSetStatus("No free browser voices are ready yet. Try again in a few seconds.");
    return;
  }

  try {
    localStorage.setItem(MATH_VOICE_PICKER_KEY, bestVoice.name);
  } catch (error) {
    // Ignore storage errors.
  }

  const select = document.getElementById("mathVoiceSelect");
  if (select) select.value = bestVoice.name;
  mathPickerSetStatus(`Best free voice selected: ${bestVoice.name}. Tap Test Voice to hear it.`);
}

function mathPickerRender() {
  const questionCard = document.querySelector(".question-card");
  if (!questionCard || document.getElementById("mathVoicePicker")) return;

  const card = document.createElement("section");
  card.id = "mathVoicePicker";
  card.className = "voice-choice-card";
  card.innerHTML = `
    <label for="mathVoiceSelect">Free Voice Test</label>
    <select id="mathVoiceSelect" aria-label="Choose MathEasy30 voice">
      <option value="">Loading voices...</option>
    </select>
    <div class="voice-actions">
      <button class="btn secondary" type="button" onclick="mathPickerTestVoice()">Test Voice</button>
      <button class="btn secondary" type="button" onclick="mathPickerUseBestVoice()">Use Best Free Voice</button>
    </div>
    <p id="mathVoiceNote" class="voice-note">Choose the most natural free voice on this computer.</p>
  `;

  const firstButtonRow = questionCard.querySelector(".button-row");
  if (firstButtonRow) questionCard.insertBefore(card, firstButtonRow);
  else questionCard.appendChild(card);

  mathPickerPopulate();
}

function mathPickerPopulate() {
  const select = document.getElementById("mathVoiceSelect");
  const note = document.getElementById("mathVoiceNote");
  if (!select) return;

  const voices = mathPickerGetVoices();
  select.innerHTML = "";

  if (!voices.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Loading voices...";
    select.appendChild(option);
    if (note) note.textContent = "Voices are loading. Try again in a few seconds.";
    return;
  }

  const english = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith("en"));
  const candidates = (english.length ? english : voices).slice().sort((a, b) => mathPickerScoreVoice(b) - mathPickerScoreVoice(a));
  const bestVoice = mathPickerBestVoice();
  const savedName = mathPickerSavedVoiceName();

  candidates.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang || "voice"})`;
    if (bestVoice && voice.name === bestVoice.name) option.textContent += " — best match";
    select.appendChild(option);
  });

  select.value = savedName || (bestVoice ? bestVoice.name : candidates[0]?.name || "");
  select.onchange = mathPickerSaveVoice;

  if (note) {
    note.textContent = bestVoice
      ? `Best free match on this device: ${bestVoice.name}. Test a few voices; every computer is different.`
      : "Test a few voices; every computer is different.";
  }
}

function mathPickerInjectStyles() {
  if (document.getElementById("mathVoicePickerStyles")) return;

  const style = document.createElement("style");
  style.id = "mathVoicePickerStyles";
  style.textContent = `
    .voice-choice-card{margin:.9rem 0 1rem;padding:.9rem;border:1px solid #dbeafe;background:#eff6ff;border-radius:.9rem}.voice-choice-card label{display:block;font-weight:800;margin-bottom:.35rem}.voice-choice-card select{width:100%;max-width:100%;padding:.65rem;border:1px solid #cbd5e1;border-radius:.65rem;background:white;font:inherit}.voice-choice-card .voice-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.65rem}.voice-choice-card .voice-note{margin:.55rem 0 0;color:#475569;font-size:.92rem;line-height:1.45}@media(max-width:650px){.voice-choice-card .voice-actions button{width:100%}}
  `;
  document.head.appendChild(style);
}

mathPickerInjectStyles();
mathPickerRender();

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    mathPickerPopulate();
  };

  setTimeout(mathPickerPopulate, 500);
  setTimeout(mathPickerPopulate, 1500);
}
