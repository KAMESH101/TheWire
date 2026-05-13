// ─── services/newsApi.js ───────────────────────────────────────────────────
const API_KEY = process.env.REACT_APP_GNEWS_API_KEY || "";
// On Vercel → use the serverless proxy (/api/news) to avoid CORS + hide key
// On localhost → call GNews directly with the .env key
const IS_PROD = process.env.NODE_ENV === "production";
const PROXY_URL = "/api/news";
const BASE_URL = "https://gnews.io/api/v4";

// ── Mock fallback ──────────────────────────────────────────────────────────
export const MOCK_ARTICLES = [
  {
    id: "mock-1",
    title: "Global Leaders Gather for Historic Climate Summit in Geneva",
    description: "World leaders have converged on Geneva to sign a landmark agreement targeting net-zero emissions by 2040, with 190 nations committing to binding carbon reduction targets.",
    content: "", url: "#", image: "https://picsum.photos/seed/climate/800/450",
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    source: { name: "Reuters", url: "https://reuters.com" },
  },
  {
    id: "mock-2",
    title: "OpenAI Releases GPT-5 with Unprecedented Reasoning Capabilities",
    description: "The latest model demonstrates near-human performance on complex scientific benchmarks and can solve multi-step problems that previously stumped AI systems.",
    content: "", url: "#", image: "https://picsum.photos/seed/ai/800/450",
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    source: { name: "TechCrunch", url: "https://techcrunch.com" },
  },
  {
    id: "mock-3",
    title: "Markets Surge as Federal Reserve Signals Rate Cuts Ahead",
    description: "Wall Street posted its biggest single-day gain in two years after Fed Chair Jerome Powell hinted at three rate reductions before year-end, boosting investor sentiment.",
    content: "", url: "#", image: "https://picsum.photos/seed/finance/800/450",
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    source: { name: "Financial Times", url: "https://ft.com" },
  },
  {
    id: "mock-4",
    title: "NASA's Artemis IV Crew Completes First Lunar Base Construction",
    description: "Astronauts successfully assembled the first permanent habitat module on the lunar south pole, marking a pivotal step toward sustained human presence on the Moon.",
    content: "", url: "#", image: "https://picsum.photos/seed/nasa/800/450",
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    source: { name: "Space.com", url: "https://space.com" },
  },
  {
    id: "mock-5",
    title: "Champions League Final Sets New Global Viewership Record",
    description: "An estimated 650 million viewers tuned in worldwide to watch the dramatic penalty shootout final, surpassing the previous record set in 2019.",
    content: "", url: "#", image: "https://picsum.photos/seed/soccer/800/450",
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    source: { name: "BBC Sport", url: "https://bbc.co.uk/sport" },
  },
  {
    id: "mock-6",
    title: "Breakthrough Gene Therapy Cures Rare Childhood Blindness",
    description: "A single-injection gene therapy has restored sight in 94% of trial participants with Leber congenital amaurosis, offering hope to millions with inherited blindness.",
    content: "", url: "#", image: "https://picsum.photos/seed/health/800/450",
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    source: { name: "Nature Medicine", url: "https://nature.com" },
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const normaliseArticle = (raw, index) => ({
  id: raw.url + index,
  title: raw.title,
  description: raw.description,
  content: raw.content,
  url: raw.url,
  image: raw.image,
  publishedAt: raw.publishedAt,
  source: raw.source,
});

const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
};

// ── Public API ────────────────────────────────────────────────────────────
export const fetchTopHeadlines = async (topic = "general", max = 10, page = 1) => {
  let url;
  if (IS_PROD) {
    const topicParam = topic === "general" ? "" : `&topic=${topic}`;
    url = `${PROXY_URL}?max=${max}&page=${page}${topicParam}`;
  } else {
    const topicParam = topic === "general" ? "" : `&topic=${topic}`;
    url = `${BASE_URL}/top-headlines?lang=en&max=${max}&page=${page}${topicParam}&token=${API_KEY}`;
  }
  const data = await fetchJSON(url);
  return data.articles.map(normaliseArticle);
};

export const searchArticles = async (query, max = 10, page = 1) => {
  let url;
  if (IS_PROD) {
    url = `${PROXY_URL}?q=${encodeURIComponent(query)}&max=${max}&page=${page}`;
  } else {
    url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=en&max=${max}&page=${page}&token=${API_KEY}`;
  }
  const data = await fetchJSON(url);
  return data.articles.map(normaliseArticle);
};
