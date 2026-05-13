// ─── pages/HomePage.js ────────────────────────────────────────────────────
import React, { useState, useCallback } from "react";
import { useNews } from "../context/NewsContext";
import HeroCard from "../components/cards/HeroCard";
import ArticleCard from "../components/cards/ArticleCard";
import { SkeletonCard, SkeletonHero } from "../components/ui/SkeletonCard";
import ErrorBanner from "../components/ui/ErrorBanner";
import EmptyState from "../components/ui/EmptyState";
import TrendingBar from "../components/ui/TrendingBar";
import { fetchTopHeadlines, searchArticles } from "../services/newsApi";

const GRID = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 24,
};

const MAX_LOADS = 3;

export default function HomePage({ onArticleClick, onRead, onShare }) {
  const { articles, loading, error, retry, searchQuery, activeCategory } = useNews();
  const [extraArticles, setExtraArticles] = useState([]);
  const [page, setPage]                   = useState(1);
  const [loadingMore, setLoadingMore]     = useState(false);
  const [loadCount, setLoadCount]         = useState(0);

  // Reset pagination when category/search changes
  React.useEffect(() => {
    setExtraArticles([]);
    setPage(1);
    setLoadCount(0);
  }, [activeCategory, searchQuery]);

  const loadMore = useCallback(async () => {
    if (loadingMore || loadCount >= MAX_LOADS) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = searchQuery
        ? await searchArticles(searchQuery, 10, nextPage)
        : await fetchTopHeadlines(activeCategory, 10, nextPage);
      setExtraArticles((prev) => [...prev, ...data]);
      setPage(nextPage);
      setLoadCount((c) => c + 1);
    } catch {
      // Silently fail — user can retry
    } finally {
      setLoadingMore(false);
    }
  }, [page, searchQuery, activeCategory, loadingMore, loadCount]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <SkeletonHero />
        <div style={GRID}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {error && <ErrorBanner message={error} onRetry={retry} />}
        <EmptyState
          icon="🔍"
          title="No articles found"
          subtitle={searchQuery ? "Try a different search term." : "No articles in this category right now."}
        />
      </div>
    );
  }

  const [hero, ...rest] = articles;
  const allGrid = [...rest, ...extraArticles];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {error && <ErrorBanner message={error} onRetry={retry} />}

      {/* Trending bar */}
      <TrendingBar articles={articles} />

      {searchQuery && (
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontSize: 14, margin: 0 }}>
          Showing results for <strong style={{ color: "var(--text-primary)" }}>"{searchQuery}"</strong>
        </p>
      )}

      {/* Hero */}
      <HeroCard key={hero.id} article={hero} onRead={onRead} onShare={onShare} />

      {/* Grid */}
      {allGrid.length > 0 && (
        <div style={GRID}>
          {allGrid.map((article, i) => (
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

      {/* Load More */}
      <div style={{ textAlign: "center", paddingTop: 8 }}>
        {loadCount < MAX_LOADS ? (
          <button
            onClick={loadMore}
            disabled={loadingMore}
            aria-label="Load more articles"
            style={{
              background: loadingMore ? "var(--surface)" : "var(--accent)",
              color: loadingMore ? "var(--text-muted)" : "#fff",
              border: "1px solid var(--border)", borderRadius: 8,
              padding: "12px 32px", cursor: loadingMore ? "default" : "pointer",
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
              transition: "all 0.2s ease",
            }}
          >
            {loadingMore ? "Loading…" : "Load More Stories"}
          </button>
        ) : (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>
            You've reached the end
          </p>
        )}
      </div>
    </div>
  );
}
