// ─── utils/trending.js ─────────────────────────────────────────────────────

const STOP = new Set([
  "the","a","an","in","of","to","and","is","are","for","on","with","at","by",
  "from","as","it","its","was","be","has","have","that","this","or","but",
  "he","she","they","we","you","i","his","her","their","our","not","all",
  "one","new","says","will","more","than","after","over","into","about",
  "said","just","up","also","who","been","were","had","which","when","us",
]);

export function extractTrending(articles, count = 8) {
  const freq = {};
  articles.forEach(({ title }) => {
    if (!title) return;
    title
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w))
      .forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}
