// ─── components/layout/Navbar.js ──────────────────────────────────────────
import React, { useState, useEffect } from "react";
import { useNews } from "../../context/NewsContext";
import { useDebounce } from "../../hooks/useDebounce";

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BookmarkIcon = ({ count }) => (
  <div style={{ position: "relative" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
    {count > 0 && (
      <span style={{
        position: "absolute", top: -6, right: -6,
        background: "var(--accent)", color: "#fff", borderRadius: "50%",
        width: 15, height: 15, fontSize: 9,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-sans)", fontWeight: 700,
      }}>{count}</span>
    )}
  </div>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// ── Theme helper ───────────────────────────────────────────────────────────
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const initTheme = () => localStorage.getItem("theme") || getSystemTheme();

export default function Navbar({
  onBookmarksClick, showBookmarks,
  onHistoryClick, showHistory,
  onShortcutsClick,
  searchInputRef,
}) {
  const { searchQuery, setSearchQuery, bookmarks } = useNews();
  const [inputVal, setInputVal]       = useState(searchQuery);
  const [scrolled, setScrolled]       = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [theme, setTheme]             = useState(initTheme);
  const debounced                     = useDebounce(inputVal, 500);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => { setSearchQuery(debounced); }, [debounced, setSearchQuery]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClear = () => { setInputVal(""); setSearchQuery(""); };
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const btnStyle = (active) => ({
    background: active ? "var(--accent)" : "var(--surface)",
    border: "1px solid var(--border)", borderRadius: 8,
    padding: "8px 12px", color: active ? "#fff" : "var(--text-primary)",
    cursor: "pointer", transition: "all 0.2s ease", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  });

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(8,8,8,0.95)" : "var(--bg)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      transition: "background 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "12px 24px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
            The<span style={{ color: "var(--accent)" }}>Wire</span>
          </span>
          <span style={{ display: "block", fontSize: 8, letterSpacing: 3, color: "var(--text-muted)", fontFamily: "var(--font-sans)", textTransform: "uppercase", marginTop: -2 }}>
            Live · Independent · Global
          </span>
        </div>

        {/* Search */}
        <div
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            flex: 1, display: "flex", alignItems: "center", gap: 10,
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 14px", maxWidth: 460,
            outline: searchFocused ? "2px solid var(--accent)" : "none",
            outlineOffset: 2, transition: "outline 0.15s ease",
          }}
        >
          <SearchIcon />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search headlines…"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            aria-label="Search news"
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 14,
            }}
          />
          {inputVal && (
            <button onClick={handleClear} aria-label="Clear search"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0, fontSize: 14 }}>
              ✕
            </button>
          )}
        </div>

        {/* Theme toggle */}
        <button onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} style={btnStyle(false)}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* History */}
        <button onClick={onHistoryClick} aria-label="Reading history" style={btnStyle(showHistory)}>
          🕐
        </button>

        {/* Bookmarks */}
        <button onClick={onBookmarksClick} aria-label={`Bookmarks (${bookmarks.length})`} style={btnStyle(showBookmarks)}>
          <BookmarkIcon count={bookmarks.length} />
        </button>

        {/* Shortcuts */}
        <button onClick={onShortcutsClick} aria-label="Keyboard shortcuts" style={btnStyle(false)}>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14 }}>?</span>
        </button>
      </div>
    </header>
  );
}
