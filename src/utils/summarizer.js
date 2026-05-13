// ─── utils/summarizer.js ───────────────────────────────────────────────────
// Extractive summarization — pure JS, no API needed

export function summarize(title, description) {
  if (!description || description.length < 50) return description || "";

  const sentences = description
    .replace(/([.!?])\s+/g, "$1|")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (sentences.length <= 2) return description;

  // Title keywords for overlap scoring
  const titleWords = new Set(
    title.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter((w) => w.length > 3)
  );

  // Word frequency across all sentences
  const freq = {};
  sentences.forEach((s) => {
    s.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).forEach((w) => {
      if (w.length > 3) freq[w] = (freq[w] || 0) + 1;
    });
  });

  // Score each sentence
  const scored = sentences.map((sentence, i) => {
    const words = sentence.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter((w) => w.length > 3);
    const freqScore = words.reduce((s, w) => s + (freq[w] || 0), 0) / (words.length || 1);
    const posScore = i === 0 ? 2 : 1 / (i + 1);
    const overlapScore = words.filter((w) => titleWords.has(w)).length;
    return { sentence, score: freqScore + posScore + overlapScore, idx: i };
  });

  // Pick top 2, restore original order
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .sort((a, b) => a.idx - b.idx)
    .map((s) => s.sentence)
    .join(" ");
}
