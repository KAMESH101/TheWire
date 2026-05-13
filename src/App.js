// ─── App.js ───────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from "react";
import { NewsProvider } from "./context/NewsContext";
import { useNews } from "./context/NewsContext";
import Navbar from "./components/layout/Navbar";
import CategoryTabs from "./components/layout/CategoryTabs";
import HomePage from "./pages/HomePage";
import BookmarksPage from "./pages/BookmarksPage";
import HistoryPage from "./pages/HistoryPage";
import ArticleModal from "./components/ui/ArticleModal";
import ShortcutsModal from "./components/ui/ShortcutsModal";
import InstallBanner from "./components/ui/InstallBanner";
import Toast from "./components/ui/Toast";
import { useReadingHistory } from "./hooks/useReadingHistory";
import { useShare } from "./hooks/useShare";
import { CATEGORIES } from "./context/NewsContext";
import "./index.css";

// ── Inner app — needs NewsProvider context ─────────────────────────────────
function AppInner() {
  const { setActiveCategory, setSearchQuery, searchQuery } = useNews();
  const [showBookmarks,  setShowBookmarks]  = useState(false);
  const [showHistory,    setShowHistory]    = useState(false);
  const [showShortcuts,  setShowShortcuts]  = useState(false);
  const [modalArticle,   setModalArticle]   = useState(null);
  const [toast,          setToast]          = useState(null);
  const searchInputRef = useRef(null);

  const { history, addToHistory, clearHistory, isRead } = useReadingHistory();

  // Toast helper
  const showToast = useCallback((msg) => {
    setToast({ msg, key: Date.now() });
  }, []);

  // Share hook
  const { share } = useShare(showToast);

  // Close all overlays
  const closeAll = useCallback(() => {
    setModalArticle(null);
    setShowShortcuts(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const typing = tag === "input" || tag === "textarea";

      if (e.key === "Escape") {
        if (modalArticle) { setModalArticle(null); return; }
        if (showShortcuts) { setShowShortcuts(false); return; }
        if (searchQuery)   { setSearchQuery(""); return; }
      }

      if (typing) return; // Don't fire shortcuts while typing

      if (e.key === "?" || e.key === "/") {
        if (e.key === "?") { e.preventDefault(); setShowShortcuts((v) => !v); return; }
      }

      if (e.key === "s" || e.key === "S" || e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if (e.key === "b" || e.key === "B") {
        setShowBookmarks((v) => !v);
        setShowHistory(false);
        return;
      }

      if (e.key === "h" || e.key === "H") {
        setShowHistory((v) => !v);
        setShowBookmarks(false);
        return;
      }

      // 1–7 switch category
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        const cat = CATEGORIES[num - 1];
        if (cat) {
          setActiveCategory(cat.id);
          setShowBookmarks(false);
          setShowHistory(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalArticle, showShortcuts, searchQuery, setSearchQuery, setActiveCategory]);

  const currentPage = showHistory ? "history" : showBookmarks ? "bookmarks" : "home";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      <Navbar
        onBookmarksClick={() => { setShowBookmarks((v) => !v); setShowHistory(false); }}
        showBookmarks={showBookmarks}
        onHistoryClick={() => { setShowHistory((v) => !v); setShowBookmarks(false); }}
        showHistory={showHistory}
        onShortcutsClick={() => setShowShortcuts((v) => !v)}
        searchInputRef={searchInputRef}
      />

      {currentPage === "home" && <CategoryTabs />}

      <main
        id="main-content"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}
      >
        {currentPage === "bookmarks" && (
          <BookmarksPage
            onArticleClick={setModalArticle}
            onRead={addToHistory}
            onShare={share}
          />
        )}

        {currentPage === "history" && (
          <HistoryPage
            history={history}
            clearHistory={clearHistory}
            onArticleClick={setModalArticle}
            onRead={addToHistory}
          />
        )}

        {currentPage === "home" && (
          <HomePage
            onArticleClick={setModalArticle}
            onRead={addToHistory}
            onShare={share}
          />
        )}
      </main>

      <footer style={{
        borderTop: "1px solid var(--border)", padding: "20px 24px",
        textAlign: "center", fontFamily: "var(--font-sans)",
        fontSize: 12, color: "var(--text-muted)",
      }}>
        TheWire · Powered by{" "}
        <a href="https://gnews.io" target="_blank" rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none" }}>
          GNews API
        </a>
      </footer>

      {/* Article Modal */}
      {modalArticle && (
        <ArticleModal
          article={modalArticle}
          onClose={() => setModalArticle(null)}
          onRead={addToHistory}
        />
      )}

      {/* Shortcuts Modal */}
      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} />}

      {/* Toast */}
      {toast && (
        <Toast
          key={toast.key}
          message={toast.msg}
          onClose={() => setToast(null)}
        />
      )}

      {/* PWA Install Banner */}
      <InstallBanner />
    </div>
  );
}

export default function App() {
  return (
    <NewsProvider>
      <AppInner />
    </NewsProvider>
  );
}
