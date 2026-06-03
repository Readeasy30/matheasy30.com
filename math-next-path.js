function showMathNextPathCard() {
  const title = document.getElementById("questionTitle");
  const questionText = document.getElementById("questionText");
  const coachMessage = document.getElementById("coachMessage");
  const confidenceMessage = document.getElementById("confidenceMessage");
  const parentTip = document.getElementById("parentTip");

  const day30Complete = localStorage.getItem("mathEasy30Day30Complete") === "true";
  const titleShowsDay30 = title && /Day 30 Practice Complete/i.test(title.textContent || "");

  if (!day30Complete && !titleShowsDay30) return;
  if (document.getElementById("mathNextPathCard")) return;

  if (coachMessage) {
    coachMessage.textContent = "You finished the first 30-day MathEasy30 path. Day 31 is the next level, not the end.";
  }

  if (confidenceMessage) {
    confidenceMessage.innerHTML = "Strong work. You completed the starter path. Now choose the next 30-day level or repeat this level for extra confidence.";
  }

  if (parentTip) {
    parentTip.textContent = "Celebrate the full 30-day effort. Then decide whether to repeat for fluency or move to the next level.";
  }

  if (questionText) {
    const card = document.createElement("section");
    card.id = "mathNextPathCard";
    card.className = "confidence-box";
    card.innerHTML = `
      <h3>🎉 Day 31: Start the Next Path</h3>
      <p>You finished the first 30 days. MathEasy30 is built as 8 levels of 30 days, working toward 8th-grade math readiness.</p>
      <p><strong>Next choice:</strong> repeat this level for stronger facts, or begin the next 30-day level.</p>
      <div class="button-row">
        <a class="btn primary" href="240-day-math-path.html">See the 240-Day Math Path</a>
        <button class="btn secondary" type="button" onclick="resetProgress()">Repeat Starter Path</button>
      </div>
    `;
    questionText.insertAdjacentElement("afterend", card);
  }
}

window.addEventListener("load", showMathNextPathCard);
document.addEventListener("click", function() {
  window.setTimeout(showMathNextPathCard, 250);
});
window.setInterval(showMathNextPathCard, 1200);
