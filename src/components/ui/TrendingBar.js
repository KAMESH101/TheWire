// ─── components/ui/TrendingBar.js ─────────────────────────────────────────
import React, { useState } from "react";
import { useNews } from "../../context/NewsContext";
import { extractTrending } from "../../utils/trending";

export default function TrendingBar({ articles }) {
  const { setSearchQuery } = useNews();
  const [hovered, setHovered] = useState(null);

  if (!articles || articles.length === 0) return null;
  const topics = extractTrending(articles);
  if (topics.length === 0) return null;

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 10,
        overflowX: "auto", scrollbarWidth: "none",
        padding: "10px 0", marginBottom: 8,
      }}
    >
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
        color: "var(--accent)", whiteSpace: "nowrap", flexShrink: 0,
        letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        🔥 Trending:
      </span>
      {topics.map((topic, i) => (
        <button
          key={topic}
          onClick={() => setSearchQuery(topic)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          aria-label={`Search trending topic: ${topic}`}
          style={{
            flexShrink: 0,
            background: hovered === i ? "var(--accent)" : "transparent",
            border: "1px solid var(--border)",
            borderRadius: 20, padding: "4px 14px",
            fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600,
            color: hovered === i ? "#fff" : "var(--text-muted)",
            cursor: "pointer", transition: "all 0.2s ease",
            textTransform: "capitalize",
          }}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
