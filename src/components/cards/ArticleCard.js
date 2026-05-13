// ─── components/cards/ArticleCard.js ──────────────────────────────────────
import React, { useState } from "react";
import { useNews } from "../../context/NewsContext";
import { timeAgo, PLACEHOLDER_IMG } from "../../utils/helpers";
import { getReadabilityStats } from "../../utils/readability";
import ArticleSummary from "../ui/ArticleSummary";

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

export default function ArticleCard({ article, index = 0, isRead = false, onCardClick, onRead, onShare }) {
  const { toggleBookmark, isBookmarked } = useNews();
  const [imgSrc, setImgSrc]   = useState(article.image || PLACEHOLDER_IMG);
  const [hovered, setHovered] = useState(false);
  const saved   = isBookmarked(article.id);
  const { readTime } = getReadabilityStats(article.title, article.description);

  const handleCardClick = (e) => {
    // Don't open modal if clicking a button or link
    if (e.target.closest("button") || e.target.closest("a")) return;
    if (onCardClick) onCardClick(article);
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    if (onRead) onRead(article);
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 12, overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
        animation: `fadeUp 0.4s ease ${index * 0.06}s forwards`,
        opacity: 0,
        cursor: onCardClick ? "pointer" : "default",
      }}
    >
      {/* Image */}
      <div style={{ overflow: "hidden", height: 200, flexShrink: 0, position: "relative" }}>
        <img
          src={imgSrc}
          alt={article.title}
          onError={() => setImgSrc(PLACEHOLDER_IMG)}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Read time badge */}
        <span style={{
          position: "absolute", top: 10, left: 10,
          background: "rgba(0,0,0,0.7)", color: "#fff",
          fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
          padding: "3px 8px", borderRadius: 20, letterSpacing: "0.04em",
        }}>
          🕐 {readTime} min
        </span>
        {/* Read badge */}
        {isRead && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: "#27ae60", color: "#fff",
            fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
            padding: "3px 8px", borderRadius: 20,
          }}>
            ✓ Read
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-sans)" }}>
            {article.source?.name || "News"}
          </span>
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
            {timeAgo(article.publishedAt)}
          </span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700,
          lineHeight: 1.35, color: "var(--text-primary)", margin: "0 0 8px",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {article.title}
        </h3>

        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.65,
          color: "var(--text-muted)", margin: "0 0 12px", flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {article.description}
        </p>

        {/* Summarize */}
        <ArticleSummary article={article} />

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleReadMore}
            style={{
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
              color: "var(--accent)", textDecoration: "none",
              borderBottom: hovered ? "1px solid var(--accent)" : "1px solid transparent",
              transition: "border 0.2s ease",
            }}
          >
            Read more →
          </a>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Share */}
            {onShare && (
              <button
                onClick={(e) => { e.stopPropagation(); onShare(article); }}
                aria-label="Share article"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, transition: "color 0.2s", display: "flex", alignItems: "center" }}
              >
                <ShareIcon />
              </button>
            )}
            {/* Bookmark */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleBookmark(article); }}
              aria-label={saved ? "Remove bookmark" : "Bookmark article"}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, opacity: saved ? 1 : 0.4, transition: "opacity 0.2s ease", padding: 4 }}
            >
              {saved ? "🔖" : "🏷️"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
