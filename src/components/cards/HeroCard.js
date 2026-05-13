// ─── components/cards/HeroCard.js ─────────────────────────────────────────
import React, { useState } from "react";
import { useNews } from "../../context/NewsContext";
import { timeAgo, PLACEHOLDER_IMG } from "../../utils/helpers";
import { getReadabilityStats } from "../../utils/readability";
import ArticleSummary from "../ui/ArticleSummary";

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

export default function HeroCard({ article, onRead, onShare }) {
  const { toggleBookmark, isBookmarked } = useNews();
  const [imgSrc, setImgSrc] = useState(article.image || PLACEHOLDER_IMG);
  const saved = isBookmarked(article.id);
  const { readTime, complexity, wordCount } = getReadabilityStats(article.title, article.description);

  const handleReadFull = () => { if (onRead) onRead(article); };

  return (
    <article
      className="hero-grid"
      style={{
        position: "relative", borderRadius: 16, overflow: "hidden",
        border: "1px solid var(--border)",
        animation: "fadeUp 0.5s ease forwards",
      }}
    >
      {/* Image half */}
      <div className="hero-image-half">
        <img
          src={imgSrc}
          alt={article.title}
          onError={() => setImgSrc(PLACEHOLDER_IMG)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, transparent 60%, var(--bg) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Content half */}
      <div style={{
        background: "var(--surface)", padding: "32px 28px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {/* Source + time */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{
              background: "var(--accent)", color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "4px 10px", borderRadius: 4,
              fontFamily: "var(--font-sans)",
            }}>
              {article.source?.name || "News"}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
              {timeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(20px,2.5vw,30px)",
            fontWeight: 700, lineHeight: 1.25, color: "var(--text-primary)", margin: "0 0 14px",
          }}>
            {article.title}
          </h2>

          {/* Readability stats row */}
          <div style={{
            display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap",
            fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)",
          }}>
            <span>🕐 {readTime} min read</span>
            <span>📖 {complexity}</span>
            <span>📝 {wordCount} words</span>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.7,
            color: "var(--text-muted)", margin: "0 0 16px",
          }}>
            {article.description}
          </p>

          {/* Summarize */}
          <ArticleSummary article={article} />
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read full story: ${article.title}`}
            onClick={handleReadFull}
            style={{
              background: "var(--accent)", color: "#fff",
              padding: "11px 22px", borderRadius: 8,
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
              textDecoration: "none", transition: "background 0.2s ease",
            }}
          >
            Read Full Story →
          </a>

          {/* Share */}
          {onShare && (
            <button
              onClick={() => onShare(article)}
              aria-label="Share this article"
              style={{
                background: "transparent", border: "1px solid var(--border)",
                borderRadius: 8, padding: "10px 14px", cursor: "pointer",
                color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-sans)", fontSize: 12, transition: "all 0.2s ease",
              }}
            >
              <ShareIcon /> Share
            </button>
          )}

          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(article)}
            aria-label={saved ? "Remove bookmark" : "Bookmark article"}
            style={{
              background: saved ? "var(--accent)" : "transparent",
              border: "1px solid var(--border)", borderRadius: 8,
              color: saved ? "#fff" : "var(--text-muted)",
              padding: "10px 13px", cursor: "pointer",
              fontSize: 15, transition: "all 0.2s ease",
            }}
          >
            {saved ? "🔖" : "🏷️"}
          </button>
        </div>
      </div>
    </article>
  );
}
