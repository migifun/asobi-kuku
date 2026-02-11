import { kukuData, KukuEntry } from "./kuku-data";

export interface Question {
  entry: KukuEntry;
  choices: number[];
}

/** All unique kuku answers, for generating plausible wrong choices */
const allAnswers = [...new Set(kukuData.map((e) => e.answer))].sort(
  (a, b) => a - b
);

let lastEntry: KukuEntry | null = null;

export function generateQuestion(dan?: number): Question {
  const pool = dan ? kukuData.filter((e) => e.a === dan) : kukuData;
  let entry: KukuEntry;
  do {
    entry = pool[Math.floor(Math.random() * pool.length)];
  } while (entry === lastEntry && pool.length > 1);
  lastEntry = entry;

  const choices = generateChoices(entry.answer);
  return { entry, choices };
}

function generateChoices(correct: number): number[] {
  // Pick wrong answers from real kuku answers close to the correct value
  const candidates = allAnswers
    .filter((a) => a !== correct)
    .sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct));

  const wrong: number[] = [];
  // Pick from the nearest candidates with some randomness
  const pool = candidates.slice(0, 10);
  while (wrong.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    wrong.push(pool.splice(idx, 1)[0]);
  }

  const choices = [correct, ...wrong];
  shuffle(choices);
  return choices;
}

function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function checkAnswer(question: Question, selected: number): boolean {
  return selected === question.entry.answer;
}
