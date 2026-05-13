// ─── pages/HistoryPage.js ─────────────────────────────────────────────────
import React from "react";
import ArticleCard from "../components/cards/ArticleCard";
import EmptyState from "../components/ui/EmptyState";

export default function HistoryPage({ history, clearHistory, onArticleClick, onRead }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
            color: "var(--text-primary)", margin: "0 0 6px",
          }}>
            Reading History
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontSize: 14, margin: 0 }}>
            {history.length} {history.length === 1 ? "article" : "articles"} read
          </p>
          <div style={{ height: 2, background: "var(--accent)", width: 48, marginTop: 12, borderRadius: 2 }} />
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            aria-label="Clear reading history"
            style={{
              background: "none", border: "1px solid var(--border)",
              borderRadius: 8, padding: "8px 16px",
              color: "var(--text-muted)", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: 13,
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState
          icon="🕐"
          title="No reading history yet"
          subtitle="Articles you open or read will appear here."
        />
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {history.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={i}
              isRead={true}
              onCardClick={onArticleClick}
              onRead={onRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
