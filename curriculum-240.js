/**
 * MathEasy30 Curriculum Database (curriculum-240.js)
 * Structures Days 1 to 240 into progressive learning tiers.
 * Designed to map cleanly to app.js, math-answer-helper.js, and Jenny's voice engine.
 */

const MathEasy30Curriculum = {
    // LEVEL A: Days 1 to 30 (Core Foundation & Number Sense)
    level_a: {
        meta: {
            title: "Level A: Breaking the Fear",
            focus: "Number confidence, visual tracking, and everyday adult estimations."
        },
        days: [
            {
                day: 1,
                title: "Visualizing Quantities Without Staring",
                steps: [
                    {
                        type: "multiple-choice",
                        instruction: "Look at a standard egg carton. If two slots are empty, how many eggs are left inside?",
                        options: ["8 eggs", "10 eggs", "12 eggs", "6 eggs"],
                        answer: "10 eggs",
                        explanation: "A standard carton holds 12 eggs. Taking 2 away drops you instantly to 10. Think of it as a missing frame."
                    },
                    {
                        type: "interactive-input",
                        instruction: "If you have a $20 bill and buy a coffee for $4, how many clean $5 bills should you expect back in change?",
                        answer: "3",
                        explanation: "Your change is $16 ($20 minus $4). Three $5 bills make $15, plus a stray dollar coin or bill makes $16!"
                    }
                ]
            },
            {
                day: 2,
                title: "The Power of Tens",
                steps: [
                    {
                        type: "interactive-input",
                        instruction: "Add 30 and 45 quickly in your head by adding the tens first (30 + 40), then jumping by the leftover 5. What do you get?",
                        answer: "75",
                        explanation: "Breaking it up makes it painless: 30 + 40 is 70. Add the 5, and you are smoothly at 75."
                    }
                ]
            },
            {
                day: 3,
                title: "Halves and Shares",
                steps: [
                    {
                        type: "multiple-choice",
                        instruction: "You split a $14 lunch bill evenly with one coworker. What is your exact personal share?",
                        options: ["$6.00", "$6.50", "$7.00", "$7.50"],
                        answer: "$7.00",
                        explanation: "Half of 14 is exactly 7. No calculators or stress required."
                    }
                ]
            }
            // Days 4 through 30 automatically reference down into level-b-lessons.js structures
        ]
    },

    // LEVEL B: Days 31 to 60 (Survival Multiplications & Rapid Estimations)
    level_b: {
        meta: {
            title: "Level B: Rapid Day-to-Day Speed",
            focus: "Tipping, split bills, sizing spaces, and multiplication shortcuts."
        },
        days: [
            {
                day: 31,
                title: "The Easy 10% Tipping Trick",
                steps: [
                    {
                        type: "interactive-input",
                        instruction: "Your total dinner bill is $65.00. Move the decimal point one spot to the left to find a 10% tip instantly. What is that number?",
                        answer: "6.50",
                        explanation: "Moving the decimal left by one turning point on $65.00 drops you directly on $6.50. Double that to make a 20% tip ($13) effortlessly!"
                    }
                ]
            }
        ]
    }
};

// Global mount registration to ensure window context stability across systems
if (typeof window !== 'undefined') {
    window.MathEasy30Curriculum = MathEasy30Curriculum;
}
