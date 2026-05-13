// ─── pages/BookmarksPage.js ────────────────────────────────────────────────
import React from "react";
import { useNews } from "../context/NewsContext";
import ArticleCard from "../components/cards/ArticleCard";
import EmptyState from "../components/ui/EmptyState";

export default function BookmarksPage({ onArticleClick, onRead, onShare }) {
  const { bookmarks } = useNews();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
          color: "var(--text-primary)", margin: "0 0 6px",
        }}>
          Your Bookmarks
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontSize: 14, margin: 0 }}>
          {bookmarks.length} saved {bookmarks.length === 1 ? "article" : "articles"}
        </p>
        <div style={{ height: 2, background: "var(--accent)", width: 48, marginTop: 12, borderRadius: 2 }} />
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="No bookmarks yet"
          subtitle="Tap the bookmark icon on any article to save it here."
        />
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {bookmarks.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={i}
              onCardClick={onArticleClick}
              onRead={onRead}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
