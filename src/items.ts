export interface Item {
  id: number;
  name: string;
  emoji: string;
}

export const ALL_ITEMS: Item[] = [
  // けん
  { id: 1, name: "きのけん", emoji: "🪵🗡️" },
  { id: 2, name: "てつのけん", emoji: "⚔️" },
  { id: 3, name: "ほのおのけん", emoji: "🔥🗡️" },
  { id: 4, name: "こおりのけん", emoji: "❄️🗡️" },
  { id: 5, name: "ほしのつるぎ", emoji: "⭐🗡️" },
  { id: 6, name: "でんせつのけん", emoji: "👑🗡️" },
  // やり
  { id: 7, name: "てつのやり", emoji: "🔱" },
  { id: 8, name: "いかづちのやり", emoji: "⚡🔱" },
  // つえ
  { id: 9, name: "まほうのつえ", emoji: "🪄" },
  { id: 10, name: "ほのおのつえ", emoji: "🔥🪄" },
  { id: 11, name: "こおりのつえ", emoji: "❄️🪄" },
  // おの
  { id: 12, name: "きのおの", emoji: "🪵🪓" },
  { id: 13, name: "きんのおの", emoji: "✨🪓" },
  // ゆみ
  { id: 14, name: "きのゆみ", emoji: "🏹" },
  { id: 15, name: "にじのゆみ", emoji: "🌈🏹" },
  // たて
  { id: 16, name: "きのたて", emoji: "🪵🛡️" },
  { id: 17, name: "てつのたて", emoji: "🛡️" },
  { id: 18, name: "ダイヤのたて", emoji: "💎🛡️" },
  // そうび
  { id: 19, name: "かわのぼうし", emoji: "👒" },
  { id: 20, name: "てつのかぶと", emoji: "🪖" },
  { id: 21, name: "かわのくつ", emoji: "👢" },
  { id: 22, name: "まほうのゆびわ", emoji: "🪄💍" },
  { id: 23, name: "おうかん", emoji: "👑" },
  // どうぐ
  { id: 24, name: "いやしのくすり", emoji: "🧪" },
  { id: 25, name: "すいしょうだま", emoji: "🔮" },
  { id: 26, name: "ぎんのすず", emoji: "🔔" },
  { id: 27, name: "ひみつのかぎ", emoji: "🗝️" },
  { id: 28, name: "ほしのかけら", emoji: "🌟" },
  { id: 29, name: "にじのけっしょう", emoji: "🌈💎" },
  { id: 30, name: "きんか", emoji: "🪙" },
];

const STORAGE_KEY = "kuku-owned-items";

export function getOwnedItems(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

function saveOwnedItems(ids: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function resetOwnedItems(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Award a random item not yet owned. Returns the item, or null if all owned. */
export function awardRandomItem(): Item | null {
  const owned = getOwnedItems();
  const unowned = ALL_ITEMS.filter((item) => !owned.includes(item.id));
  if (unowned.length === 0) return null;

  const item = unowned[Math.floor(Math.random() * unowned.length)];
  saveOwnedItems([...owned, item.id]);
  return item;
}
