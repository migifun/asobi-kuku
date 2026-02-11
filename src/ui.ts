import { generateQuestion, checkAnswer, Question } from "./game";

let app: HTMLElement;
let currentQuestion: Question | null = null;
let answered = false;

export function init(): void {
  app = document.getElementById("app")!;
  showStartScreen();
}

function showStartScreen(): void {
  app.innerHTML = `
    <div class="screen start-screen">
      <h1 class="title">くく<br>チャレンジ</h1>
      <button class="start-btn" id="start-btn">はじめる</button>
    </div>
  `;
  document.getElementById("start-btn")!.addEventListener("click", nextQuestion);
}

function nextQuestion(): void {
  answered = false;
  currentQuestion = generateQuestion();
  renderQuestion();
}

function renderQuestion(): void {
  if (!currentQuestion) return;
  const { entry, choices } = currentQuestion;

  const colorClasses = ["choice-red", "choice-blue", "choice-yellow", "choice-green"];

  app.innerHTML = `
    <div class="screen game-screen">
      <div class="question-area">
        <div class="question">${entry.a} × ${entry.b} = ?</div>
        <div class="reading">${entry.reading}</div>
      </div>
      <div class="choices">
        ${choices
          .map(
            (c, i) =>
              `<button class="choice-btn ${colorClasses[i]}" data-value="${c}">${c}</button>`
          )
          .join("")}
      </div>
    </div>
  `;

  app.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const value = parseInt((btn as HTMLElement).dataset.value!);
      handleAnswer(value);
    });
  });
}

function handleAnswer(selected: number): void {
  if (!currentQuestion) return;

  const isCorrect = checkAnswer(currentQuestion, selected);

  // Highlight correct / wrong buttons
  app.querySelectorAll(".choice-btn").forEach((btn) => {
    const el = btn as HTMLButtonElement;
    const value = parseInt(el.dataset.value!);
    if (value === currentQuestion!.entry.answer) {
      el.classList.add("correct-choice");
    }
    if (value === selected && !isCorrect) {
      el.classList.add("wrong-choice");
    }
    el.disabled = true;
  });

  // Show result overlay
  const overlay = document.createElement("div");
  overlay.className = "result-overlay";
  overlay.innerHTML = `
    <div class="result-mark ${isCorrect ? "correct" : "incorrect"}">
      ${isCorrect ? "○" : "✕"}
    </div>
    ${isCorrect ? "" : `<div class="result-answer">こたえ: ${currentQuestion.entry.answer}</div>`}
    <button class="next-btn">つぎへ</button>
  `;

  overlay.querySelector(".next-btn")!.addEventListener("click", nextQuestion);

  app.querySelector(".game-screen")!.appendChild(overlay);
}
