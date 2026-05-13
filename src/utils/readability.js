// ─── utils/readability.js ──────────────────────────────────────────────────
// Client-side readability metrics — no API needed

const countSyllables = (word) => {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
};

export function getReadabilityStats(title, description) {
  const text = `${title} ${description || ""}`;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const sentences = (description || "").split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);

  // Flesch Reading Ease
  const flesch =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / Math.max(1, wordCount));

  const score = Math.round(Math.max(0, Math.min(100, flesch)));
  const complexity = score >= 70 ? "Easy" : score >= 50 ? "Medium" : "Hard";

  return { wordCount, readTime, fleschScore: score, complexity };
}
