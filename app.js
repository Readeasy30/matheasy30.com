/**
 * MathEasy30 Core Application Engine (app.js)
 * Optimizes state management for 240-day curriculum delivery
 * Tailored for high-anxiety learners & shared device profiles
 */

// Application State Store
const AppState = {
    currentLevel: 'A',        // Tracks Level A-H
    currentDay: 1,           // Day 1 to 240
    currentStep: 0,          // Steps within the daily lesson
    score: 0,
    profile: null,           // Injected from student-profiles.js
    curriculumData: null     // Loaded from curriculum-240.js
};

// DOM Visual Anchor Selectors
const DOM = {
    progressBar: document.getElementById('progress-bar'),
    lessonTitle: document.getElementById('lesson-title'),
    lessonContainer: document.getElementById('lesson-container'),
    feedbackPanel: document.getElementById('feedback-panel'),
    submitBtn: document.getElementById('submit-answer-btn'),
    voiceToggle: document.getElementById('voice-toggle-btn')
};

// Initialize Application Hub
document.addEventListener("DOMContentLoaded", async () => {
    try {
        initProfileEngine();
        await loadCurriculumDataset();
        mountVoiceSupport();
        loadActiveDay();
    } catch (error) {
        console.error("MathEasy30 Critical Init Failure:", error);
        showFallbackUI();
    }
});

/**
 * Step 1: Initialize Student Profiles
 * Handles cross-device or shared-device local storage tracking
 */
function initProfileEngine() {
    if (typeof StudentProfiles !== 'undefined') {
        AppState.profile = StudentProfiles.getActiveProfile() || StudentProfiles.createGuestProfile();
        AppState.currentDay = AppState.profile.lastCompletedDay + 1;
        AppState.currentLevel = determineLevelByDay(AppState.currentDay);
    } else {
        // Fallback gracefully to direct localStorage if tracking script fails
        AppState.currentDay = parseInt(localStorage.getItem('me30_day')) || 1;
        AppState.currentLevel = determineLevelByDay(AppState.currentDay);
    }
}

/**
 * Step 2: Asynchronously Verify and Pull Curriculum
 */
async function loadCurriculumDataset() {
    // Verifies data injected from curriculum-240.js and level scripts
    if (typeof MathEasy30Curriculum !== 'undefined') {
        AppState.curriculumData = MathEasy30Curriculum;
    } else {
        throw new Error("Curriculum database 'MathEasy30Curriculum' missing from viewport context.");
    }
}

/**
 * Step 3: Mount the Lesson Stream UI
 */
function loadActiveDay() {
    const dayData = AppState.curriculumData[`level_${AppState.currentLevel.toLowerCase()}`]?.days?.find(d => d.day === AppState.currentDay);
    
    if (!dayData) {
        console.warn(`Day ${AppState.currentDay} not staged yet. Redirecting to next logic step.`);
        if (typeof MathNextPath !== 'undefined') MathNextPath.routeToNextStagedBlock();
        return;
    }

    // Render active elements
    if (DOM.lessonTitle) DOM.lessonTitle.innerText = `Day ${AppState.currentDay}: ${dayData.title}`;
    renderActiveStep(dayData.steps[AppState.currentStep]);
    updateProgressBar();
}

/**
 * Step 4: Render Interactive Step and Bind Forgiving Input Response
 */
function renderActiveStep(step) {
    if (!DOM.lessonContainer) return;

    let htmlMarkup = `
        <div class="space-y-4 animate-fade-in">
            <p class="text-xl text-slate-800 font-medium">${step.instruction}</p>
    `;

    if (step.type === 'interactive-input') {
        htmlMarkup += `
            <div class="mt-4">
                <input type="text" id="user-math-input" 
                       class="w-full p-4 text-2xl font-bold border-2 border-slate-300 rounded-2xl focus:border-indigo-600 outline-none text-center" 
                       placeholder="Type your answer here..." autocomplete="off">
            </div>
        `;
    } else if (step.type === 'multiple-choice') {
        htmlMarkup += `<div class="grid grid-cols-1 gap-3 mt-4">`;
        step.options.forEach((opt, idx) => {
            htmlMarkup += `
                <button onclick="handleOptionSelect('${opt}')" 
                        class="p-4 bg-white border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30 rounded-xl text-left font-semibold text-slate-700 transition-all cursor-pointer">
                    ${opt}
                </button>
            `;
        });
        htmlMarkup += `</div>`;
    }

    htmlMarkup += `</div>`;
    DOM.lessonContainer.innerHTML = htmlMarkup;

    // Use Jenny's natural voice system if active
    triggerVoiceSynth(step.instruction);
}

/**
 * Step 5: Process Input with Forgiving Evaluation Checks
 */
window.evaluateActiveInput = function() {
    const inputElement = document.getElementById('user-math-input');
    if (!inputElement) return;

    const rawUserAnswer = inputElement.value.trim();
    const currentDayData = AppState.curriculumData[`level_${AppState.currentLevel.toLowerCase()}`].days.find(d => d.day === AppState.currentDay);
    const expectedAnswer = currentDayData.steps[AppState.currentStep].answer;

    let isCorrect = false;

    // Leverage your built-in math-answer-helper if present
    if (typeof MathAnswerHelper !== 'undefined') {
        isCorrect = MathAnswerHelper.verifyForgivingly(rawUserAnswer, expectedAnswer);
    } else {
        // Fallback raw exact matching
        isCorrect = rawUserAnswer.toLowerCase() === expectedAnswer.toString().toLowerCase();
    }

    processEvaluationResult(isCorrect, currentDayData.steps[AppState.currentStep].explanation);
};

function processEvaluationResult(isCorrect, explanation) {
    if (!DOM.feedbackPanel) return;

    DOM.feedbackPanel.classList.remove('hidden');
    if (isCorrect) {
        DOM.feedbackPanel.className = "mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900";
        DOM.feedbackPanel.innerHTML = `<p class="font-bold">✨ Brilliant! You got it right.</p><p class="text-sm mt-1">${explanation}</p>`;
        AppState.score += 10;
        advanceWorkflowTrack();
    } else {
        DOM.feedbackPanel.className = "mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900";
        DOM.feedbackPanel.innerHTML = `<p class="font-bold">❌ Not quite. Let's look closer:</p><p class="text-sm mt-1">${explanation}</p>`;
    }
}

/**
 * Utilities & Continuity Support
 */
function advanceWorkflowTrack() {
    setTimeout(() => {
        if (DOM.feedbackPanel) DOM.feedbackPanel.classList.add('hidden');
        AppState.currentStep++;
        
        const dayData = AppState.curriculumData[`level_${AppState.currentLevel.toLowerCase()}`].days.find(d => d.day === AppState.currentDay);
        
        if (AppState.currentStep < dayData.steps.length) {
            renderActiveStep(dayData.steps[AppState.currentStep]);
        } else {
            // Day complete logic loop
            AppState.currentStep = 0;
            AppState.currentDay++;
            saveProgressToProfile();
            loadActiveDay();
        }
    }, 4000);
}

function saveProgressToProfile() {
    if (typeof StudentProfiles !== 'undefined') {
        StudentProfiles.updateProgress(AppState.profile.id, AppState.currentDay - 1, AppState.score);
    } else {
        localStorage.setItem('me30_day', AppState.currentDay);
    }
}

function determineLevelByDay(day) {
    if (day <= 30) return 'A';
    if (day <= 60) return 'B';
    if (day <= 90) return 'C';
    return 'D'; // Continuous spectrum scale through level H
}

function updateProgressBar() {
    if (!DOM.progressBar) return;
    const percentage = ((AppState.currentDay - 1) / 240) * 100;
    DOM.progressBar.style.width = `${percentage}%`;
}

function triggerVoiceSynth(text) {
    if (typeof MathVoice !== 'undefined' && !MathVoice.isMuted()) {
        MathVoice.speakWithVoice(text, 'Jenny'); // Forces clean preferred tone configuration
    }
}

function mountVoiceSupport() {
    if (DOM.voiceToggle && typeof MathVoicePicker !== 'undefined') {
        MathVoicePicker.attachToElement(DOM.voiceToggle);
    }
}

function showFallbackUI() {
    if (DOM.lessonContainer) {
        DOM.lessonContainer.innerHTML = `
            <div class="text-center p-6 bg-red-50 text-red-800 rounded-xl border border-red-200">
                <p class="font-bold">App data synchronization error.</p>
                <p class="text-xs mt-1">Please try hard-refreshing your browser tab to clear the deployment cache layer.</p>
            </div>`;
    }
}

 
   









  

