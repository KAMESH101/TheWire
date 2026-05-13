// api/news.js — Vercel Serverless Function proxy for GNews API
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { topic, q, max = 10, page = 1 } = req.query;
  const API_KEY = process.env.REACT_APP_GNEWS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  let url;
  if (q) {
    url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=${max}&page=${page}&token=${API_KEY}`;
  } else {
    const topicParam = topic && topic !== "general" ? `&topic=${topic}` : "";
    url = `https://gnews.io/api/v4/top-headlines?lang=en&max=${max}&page=${page}${topicParam}&token=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `GNews API error: ${response.status}` });
    }
    const data = await response.json();
    // Cache for 5 minutes
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
