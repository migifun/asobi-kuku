import { generateQuestion, checkAnswer, Question } from "./game";
import { awardRandomItem, getOwnedItems, resetOwnedItems, ALL_ITEMS } from "./items";
import { playCorrect, playWrong, playItemGet, playTap } from "./sound";

const GOAL_CORRECT = 5;

let app: HTMLElement;
let currentQuestion: Question | null = null;
let answered = false;
let selectedDan: number | undefined;
let correctCount = 0;
let hintTimer: ReturnType<typeof setTimeout> | null = null;

export function init(): void {
  app = document.getElementById("app")!;
  showStartScreen();
}

function showStartScreen(): void {
  const danColors = [
    "#ff6b6b", "#45b7d1", "#ffd93d", "#6bcb77",
    "#ff8a5c", "#a78bfa", "#f472b6", "#38bdf8", "#fb923c",
  ];

  app.innerHTML = `
    <div class="screen start-screen">
      <h1 class="title">ハルくんの<br>くくチャレンジ</h1>
      <div class="mode-section">
        <div class="mode-label">なんのだん？</div>
        <div class="dan-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9]
            .map(
              (n, i) =>
                `<button class="dan-btn" data-dan="${n}" style="background:${danColors[i]}">${n}のだん</button>`
            )
            .join("")}
        </div>
        <button class="start-btn" id="random-btn">ぜんぶランダム</button>
      </div>
      <button class="collection-btn" id="collection-btn">アイテムずかん</button>
    </div>
  `;

  app.querySelectorAll(".dan-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      playTap();
      selectedDan = parseInt((btn as HTMLElement).dataset.dan!);
      startSession();
    });
  });

  document.getElementById("random-btn")!.addEventListener("click", () => {
    playTap();
    selectedDan = undefined;
    startSession();
  });

  document.getElementById("collection-btn")!.addEventListener("click", () => {
    playTap();
    showCollectionScreen();
  });
}

function startSession(): void {
  correctCount = 0;
  nextQuestion();
}

function nextQuestion(): void {
  answered = false;
  currentQuestion = generateQuestion(selectedDan);
  renderQuestion();
}

function questionReading(reading: string, answer: number): string {
  // 「が」がある場合（答え1〜9）: 「が」の前まで + 「が？」
  if (reading.includes("が")) {
    return reading.split("が")[0] + "が？";
  }
  // 答え10以上: 答えの読みを末尾から除去して「？」
  const tensNames = ["", "じゅう", "にじゅう", "さんじゅう", "しじゅう", "ごじゅう", "ろくじゅう", "しちじゅう", "はちじゅう"];
  const onesNames = ["", "いち", "に", "さん", "し", "ご", "ろく", "しち", "はち", "く"];
  const answerStr = tensNames[Math.floor(answer / 10)] + onesNames[answer % 10];
  if (reading.endsWith(answerStr)) {
    return reading.slice(0, -answerStr.length) + "？";
  }
  return reading;
}

function renderQuestion(): void {
  if (!currentQuestion) return;
  const { entry, choices } = currentQuestion;

  const colorClasses = ["choice-red", "choice-blue", "choice-yellow", "choice-green"];

  app.innerHTML = `
    <div class="screen game-screen">
      <div class="game-header">
        <button class="back-btn" id="back-btn">もどる</button>
        <div class="progress">せいかい ${correctCount}/${GOAL_CORRECT}</div>
      </div>
      <div class="question-area">
        <div class="question">${entry.a} × ${entry.b} = ?</div>
        <div class="reading">${questionReading(entry.reading, entry.answer)}</div>
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

  document.getElementById("back-btn")!.addEventListener("click", showStartScreen);

  // 3秒後に読み仮名の答えを表示
  if (hintTimer) clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    const readingEl = app.querySelector(".reading");
    if (readingEl && !answered) {
      const hint = questionReading(entry.reading, entry.answer);
      const answerPart = entry.reading.slice(hint.length - 1); // 「？」の代わりの部分
      readingEl.innerHTML = hint.slice(0, -1) + `<span class="reading-answer">${answerPart}</span>`;
    }
  }, 3000);

  app.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
      const value = parseInt((btn as HTMLElement).dataset.value!);
      handleAnswer(value);
    });
  });
}

function handleAnswer(selected: number): void {
  if (!currentQuestion) return;

  const isCorrect = checkAnswer(currentQuestion, selected);
  if (isCorrect) {
    playCorrect();
    correctCount++;
  } else {
    playWrong();
  }

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

  const isCleared = correctCount >= GOAL_CORRECT;

  // Show result overlay
  const overlay = document.createElement("div");
  overlay.className = "result-overlay";
  overlay.innerHTML = `
    <div class="result-mark ${isCorrect ? "correct" : "incorrect"}">
      ${isCorrect ? "○" : "✕"}
    </div>
    ${isCorrect ? "" : `<div class="result-answer">こたえ: ${currentQuestion.entry.answer}</div>`}
    <button class="next-btn">${isCleared ? "けっかへ" : "つぎへ"}</button>
  `;

  overlay.querySelector(".next-btn")!.addEventListener("click", () => {
    playTap();
    if (isCleared) {
      showResultScreen();
    } else {
      nextQuestion();
    }
  });

  app.querySelector(".game-screen")!.appendChild(overlay);
}

function showResultScreen(): void {
  const rewardItem = awardRandomItem();
  playItemGet();

  app.innerHTML = `
    <div class="screen result-screen">
      <div class="result-score">
        <div class="result-score-label">${GOAL_CORRECT}もん クリア！</div>
      </div>
      <div class="item-reward">
        ${
          rewardItem
            ? `<div class="reward-emoji">${rewardItem.emoji}</div>
               <div class="reward-text">アイテムゲット！</div>
               <div class="reward-name">「${rewardItem.name}」</div>`
            : `<div class="reward-emoji">🎉</div>
               <div class="reward-text">ぜんぶあつめた！</div>
               <div class="reward-name">すごい！コンプリート！</div>`
        }
      </div>
      <div class="result-buttons">
        <button class="start-btn" id="retry-btn">もういちど</button>
        <button class="back-btn result-back-btn" id="home-btn">もどる</button>
      </div>
    </div>
  `;

  document.getElementById("retry-btn")!.addEventListener("click", () => {
    playTap();
    startSession();
  });
  document.getElementById("home-btn")!.addEventListener("click", () => {
    playTap();
    showStartScreen();
  });
}

function showCollectionScreen(): void {
  const owned = getOwnedItems();

  app.innerHTML = `
    <div class="screen collection-screen">
      <h2 class="collection-title">アイテムずかん</h2>
      <div class="collection-count">${owned.length}/${ALL_ITEMS.length}</div>
      <div class="item-grid">
        ${ALL_ITEMS.map((item) => {
          const isOwned = owned.includes(item.id);
          return `<div class="item-card ${isOwned ? "owned" : "locked"}">
            <div class="item-emoji">${isOwned ? item.emoji : "❓"}</div>
            <div class="item-name">${isOwned ? item.name : "？？？"}</div>
          </div>`;
        }).join("")}
      </div>
      <div class="collection-buttons">
        <button class="back-btn" id="back-btn">もどる</button>
        <button class="reset-btn" id="reset-btn">リセット</button>
      </div>
    </div>
  `;

  document.getElementById("back-btn")!.addEventListener("click", showStartScreen);
  document.getElementById("reset-btn")!.addEventListener("click", () => {
    if (confirm("アイテムをぜんぶリセットするよ？")) {
      resetOwnedItems();
      showCollectionScreen();
    }
  });
}
