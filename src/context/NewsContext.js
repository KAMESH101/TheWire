// ─── context/NewsContext.js ────────────────────────────────────────────────
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { fetchTopHeadlines, searchArticles, MOCK_ARTICLES } from "../services/newsApi";

const NewsContext = createContext(null);

export const CATEGORIES = [
  { id: "general",       label: "Top Stories" },
  { id: "technology",    label: "Technology"  },
  { id: "business",      label: "Business"    },
  { id: "sports",        label: "Sports"      },
  { id: "entertainment", label: "Entertainment" },
  { id: "health",        label: "Health"      },
  { id: "science",       label: "Science"     },
];

export const NewsProvider = ({ children }) => {
  const [articles,        setArticles]        = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [activeCategory,  setActiveCategory]  = useState("general");
  const [searchQuery,     setSearchQuery]     = useState("");
  const [bookmarks,       setBookmarks]       = useState(() => {
    try { return JSON.parse(localStorage.getItem("news_bookmarks") || "[]"); }
    catch { return []; }
  });

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem("news_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const loadArticles = useCallback(async (category, query) => {
    setLoading(true);
    setError(null);
    try {
      const data = query
        ? await searchArticles(query)
        : await fetchTopHeadlines(category);
      setArticles(data);
    } catch (e) {
      // FIX: Error is now correctly set and mock articles used as fallback
      setError("Could not load live articles. Showing demo data.");
      setArticles(MOCK_ARTICLES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles(activeCategory, searchQuery);
  }, [activeCategory, searchQuery, loadArticles]);

  const toggleBookmark = useCallback((article) => {
    setBookmarks((prev) => {
      const exists = prev.find((a) => a.id === article.id);
      return exists ? prev.filter((a) => a.id !== article.id) : [article, ...prev];
    });
  }, []);

  const isBookmarked = useCallback(
    (id) => bookmarks.some((a) => a.id === id),
    [bookmarks]
  );

  return (
    <NewsContext.Provider
      value={{
        articles, loading, error,
        activeCategory, setActiveCategory,
        searchQuery, setSearchQuery,
        bookmarks, toggleBookmark, isBookmarked,
        retry: () => loadArticles(activeCategory, searchQuery),
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be used inside <NewsProvider>");
  return ctx;
};
