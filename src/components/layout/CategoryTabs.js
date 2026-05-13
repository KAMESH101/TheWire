// ─── components/layout/CategoryTabs.js ────────────────────────────────────
import React, { useRef } from "react";
import { useNews, CATEGORIES } from "../../context/NewsContext";

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory, searchQuery } = useNews();
  const tabsRef = useRef(null);

  if (searchQuery) return null; // Hide tabs during search

  return (
    <nav
      ref={tabsRef}
      aria-label="News categories"
      style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px",
        display: "flex", gap: 0,
        overflowX: "auto", scrollbarWidth: "none",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {CATEGORIES.map((cat) => {
        const active = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={active}
            style={{
              flexShrink: 0,
              background: "none", border: "none",
              borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
              color: active ? "var(--text-primary)" : "var(--text-muted)",
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: active ? 700 : 400,
              letterSpacing: "0.04em", textTransform: "uppercase",
              padding: "14px 18px", cursor: "pointer",
              transition: "all 0.2s ease",
              marginBottom: -1,
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
}
