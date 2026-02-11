export interface KukuEntry {
  a: number;
  b: number;
  answer: number;
  reading: string;
}

export const kukuData: KukuEntry[] = [
  // 1の段
  { a: 1, b: 1, answer: 1, reading: "いんいちがいち" },
  { a: 1, b: 2, answer: 2, reading: "いんにがに" },
  { a: 1, b: 3, answer: 3, reading: "いんさんがさん" },
  { a: 1, b: 4, answer: 4, reading: "いんしがし" },
  { a: 1, b: 5, answer: 5, reading: "いんごがご" },
  { a: 1, b: 6, answer: 6, reading: "いんろくがろく" },
  { a: 1, b: 7, answer: 7, reading: "いんしちがしち" },
  { a: 1, b: 8, answer: 8, reading: "いんはちがはち" },
  { a: 1, b: 9, answer: 9, reading: "いんくがく" },

  // 2の段
  { a: 2, b: 1, answer: 2, reading: "にいちがに" },
  { a: 2, b: 2, answer: 4, reading: "ににんがし" },
  { a: 2, b: 3, answer: 6, reading: "にさんがろく" },
  { a: 2, b: 4, answer: 8, reading: "にしがはち" },
  { a: 2, b: 5, answer: 10, reading: "にごじゅう" },
  { a: 2, b: 6, answer: 12, reading: "にろくじゅうに" },
  { a: 2, b: 7, answer: 14, reading: "にしちじゅうし" },
  { a: 2, b: 8, answer: 16, reading: "にはちじゅうろく" },
  { a: 2, b: 9, answer: 18, reading: "にくじゅうはち" },

  // 3の段
  { a: 3, b: 1, answer: 3, reading: "さんいちがさん" },
  { a: 3, b: 2, answer: 6, reading: "さんにがろく" },
  { a: 3, b: 3, answer: 9, reading: "さざんがく" },
  { a: 3, b: 4, answer: 12, reading: "さんしじゅうに" },
  { a: 3, b: 5, answer: 15, reading: "さんごじゅうご" },
  { a: 3, b: 6, answer: 18, reading: "さぶろくじゅうはち" },
  { a: 3, b: 7, answer: 21, reading: "さんしちにじゅういち" },
  { a: 3, b: 8, answer: 24, reading: "さんぱにじゅうし" },
  { a: 3, b: 9, answer: 27, reading: "さんくにじゅうしち" },

  // 4の段
  { a: 4, b: 1, answer: 4, reading: "しいちがし" },
  { a: 4, b: 2, answer: 8, reading: "しにがはち" },
  { a: 4, b: 3, answer: 12, reading: "しさんじゅうに" },
  { a: 4, b: 4, answer: 16, reading: "ししじゅうろく" },
  { a: 4, b: 5, answer: 20, reading: "しごにじゅう" },
  { a: 4, b: 6, answer: 24, reading: "しろくにじゅうし" },
  { a: 4, b: 7, answer: 28, reading: "ししちにじゅうはち" },
  { a: 4, b: 8, answer: 32, reading: "しはさんじゅうに" },
  { a: 4, b: 9, answer: 36, reading: "しくさんじゅうろく" },

  // 5の段
  { a: 5, b: 1, answer: 5, reading: "ごいちがご" },
  { a: 5, b: 2, answer: 10, reading: "ごにじゅう" },
  { a: 5, b: 3, answer: 15, reading: "ごさんじゅうご" },
  { a: 5, b: 4, answer: 20, reading: "ごしにじゅう" },
  { a: 5, b: 5, answer: 25, reading: "ごごにじゅうご" },
  { a: 5, b: 6, answer: 30, reading: "ごろくさんじゅう" },
  { a: 5, b: 7, answer: 35, reading: "ごしちさんじゅうご" },
  { a: 5, b: 8, answer: 40, reading: "ごはしじゅう" },
  { a: 5, b: 9, answer: 45, reading: "ごくしじゅうご" },

  // 6の段
  { a: 6, b: 1, answer: 6, reading: "ろくいちがろく" },
  { a: 6, b: 2, answer: 12, reading: "ろくにじゅうに" },
  { a: 6, b: 3, answer: 18, reading: "ろくさんじゅうはち" },
  { a: 6, b: 4, answer: 24, reading: "ろくしにじゅうし" },
  { a: 6, b: 5, answer: 30, reading: "ろくごさんじゅう" },
  { a: 6, b: 6, answer: 36, reading: "ろくろくさんじゅうろく" },
  { a: 6, b: 7, answer: 42, reading: "ろくしちしじゅうに" },
  { a: 6, b: 8, answer: 48, reading: "ろくはしじゅうはち" },
  { a: 6, b: 9, answer: 54, reading: "ろっくごじゅうし" },

  // 7の段
  { a: 7, b: 1, answer: 7, reading: "しちいちがしち" },
  { a: 7, b: 2, answer: 14, reading: "しちにじゅうし" },
  { a: 7, b: 3, answer: 21, reading: "しちさんにじゅういち" },
  { a: 7, b: 4, answer: 28, reading: "しちしにじゅうはち" },
  { a: 7, b: 5, answer: 35, reading: "しちごさんじゅうご" },
  { a: 7, b: 6, answer: 42, reading: "しちろくしじゅうに" },
  { a: 7, b: 7, answer: 49, reading: "しちしちしじゅうく" },
  { a: 7, b: 8, answer: 56, reading: "しちはごじゅうろく" },
  { a: 7, b: 9, answer: 63, reading: "しちくろくじゅうさん" },

  // 8の段
  { a: 8, b: 1, answer: 8, reading: "はちいちがはち" },
  { a: 8, b: 2, answer: 16, reading: "はちにじゅうろく" },
  { a: 8, b: 3, answer: 24, reading: "はちさんにじゅうし" },
  { a: 8, b: 4, answer: 32, reading: "はちしさんじゅうに" },
  { a: 8, b: 5, answer: 40, reading: "はちごしじゅう" },
  { a: 8, b: 6, answer: 48, reading: "はちろくしじゅうはち" },
  { a: 8, b: 7, answer: 56, reading: "はちしちごじゅうろく" },
  { a: 8, b: 8, answer: 64, reading: "はっぱろくじゅうし" },
  { a: 8, b: 9, answer: 72, reading: "はっくしちじゅうに" },

  // 9の段
  { a: 9, b: 1, answer: 9, reading: "くいちがく" },
  { a: 9, b: 2, answer: 18, reading: "くにじゅうはち" },
  { a: 9, b: 3, answer: 27, reading: "くさんにじゅうしち" },
  { a: 9, b: 4, answer: 36, reading: "くしさんじゅうろく" },
  { a: 9, b: 5, answer: 45, reading: "くごしじゅうご" },
  { a: 9, b: 6, answer: 54, reading: "くろくごじゅうし" },
  { a: 9, b: 7, answer: 63, reading: "くしちろくじゅうさん" },
  { a: 9, b: 8, answer: 72, reading: "くはしちじゅうに" },
  { a: 9, b: 9, answer: 81, reading: "くくはちじゅういち" },
];
