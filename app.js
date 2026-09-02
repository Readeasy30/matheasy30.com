/**
 * MathEasy30 - Welcoming Bubbles Learning Engine Framework
 * Designed for maximum clarity, low-stress, and positive feedback loops.
 */

class BubblesCoachingEngine {
    constructor() {
        this.currentScore = parseInt(localStorage.getItem('math_completed_questions_count')) || 0;
        this.starsEarned = parseInt(localStorage.getItem('math_stars_earned_count')) || 1;
        this.num1 = 0;
        this.num2 = 0;
        this.correctAnswer = 0;
        
        this.initializeUIHooks();
        this.generateNewQuestion();
        this.setupAudioButton();
        console.log("[BUBBLES ENGINE]: Active, warm, and listening.");
    }

    initializeUIHooks() {
        this.renderBubblesAvatar({
            message: "Hello! Welcome back to our math playground. I am your friend Bubbles! Let's solve a fun question together. You can do it! ✨",
            vibe: "happy"
        });
        this.updateVisualCounters();
    }

    setupAudioButton() {
        const audioBtn = document.getElementById('audio-readout-btn');
        if (audioBtn) {
            audioBtn.onclick = () => this.speakQuestion();
        }
    }

    generateNewQuestion() {
        // Simple progression for quick success (numbers 1-9)
        this.num1 = Math.floor(Math.random() * 8) + 1;
        this.num2 = Math.floor(Math.random() * 8) + 1;
        this.correctAnswer = this.num1 + this.num2;

        const display = document.getElementById('math-problem-display');
        if (display) {
            display.textContent = `${this.num1} + ${this.num2} = ?`;
        }
        
        // Automatically read out new questions for sensory learning support
        setTimeout(() => this.speakQuestion(), 600);
    }

    speakQuestion() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Clear old speech queues
            const text = `What is ${this.num1} plus ${this.num2}?`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85; // Speak slowly and calmly
            utterance.pitch = 1.1; // Gentle tone
            window.speechSynthesis.speak(utterance);
        }
    }

    renderBubblesAvatar(state) {
        const coachBox = document.getElementById('bubbles-coach-container');
        if (!coachBox) return;

        coachBox.innerHTML = `
            <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-2xl">
                <div class="text-4xl animate-bounce select-none">🫧</div>
                <div class="text-center sm:text-left">
                    <span class="text-[10px] font-mono font-bold tracking-widest text-indigo-500 uppercase block mb-1">Your Friend Bubbles Says:</span>
                    <p class="text-base font-bold text-slate-800 leading-snug">${state.message}</p>
                </div>
            </div>
        `;
    }

    processAnswerCheck(userAnswerString) {
        const userAnswer = parseInt(userAnswerString);
        
        if (userAnswer === this.correctAnswer) {
            this.currentScore += 1;
            
            // Earn a milestone star badge every 3 correct answers
            if (this.currentScore % 3 === 0) {
                this.starsEarned += 1;
                localStorage.setItem('math_stars_earned_count', this.starsEarned);
            }

            localStorage.setItem('math_completed_questions_count', this.currentScore);
            this.updateVisualCounters();
            
            this.renderBubblesAvatar({
                message: "Hooray! Exceptional effort! You got it right! Let's try another one! ⭐",
                vibe: "celebrate"
            });

            // Pause briefly so the student can read the celebration before switching numbers
            setTimeout(() => this.generateNewQuestion(), 2000);
        } else {
            this.renderBubblesAvatar({
                message: "That was a wonderful try! Let's clear the box and count it out together to try again. You've got this! ✨",
                vibe: "encouraging"
            });
        }
    }

    updateVisualCounters() {
        const scoreDisplay = document.getElementById('streak-counter');
        const starDisplay = document.getElementById('badge-counter');
        
        if (scoreDisplay) scoreDisplay.textContent = this.currentScore;
        if (starDisplay) {
            starDisplay.textContent = "⭐".repeat(Math.max(1, this.starsEarned));
        }
    }
}

// Bind engine variables on window frame DOM stream loading configurations
window.addEventListener('DOMContentLoaded', () => {
    window.bubblesCoreInstance = new BubblesCoachingEngine();
});
Inject progressive math questions and audio speech synthesis to app.js 
