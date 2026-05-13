// ─── components/ui/ArticleSummary.js ──────────────────────────────────────
import React, { useState } from "react";
import { summarize } from "../../utils/summarizer";

export default function ArticleSummary({ article }) {
  const [summary, setSummary] = useState(null);
  const [done, setDone] = useState(false);

  const handleClick = () => {
    if (done) return;
    const result = summarize(article.title, article.description);
    setSummary(result || "Could not generate summary for this article.");
    setDone(true);
  };

  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={handleClick}
        disabled={done}
        aria-label={done ? "Article already summarized" : "Summarize this article"}
        style={{
          background: "none",
          border: `1px solid ${done ? "var(--border)" : "var(--accent)"}`,
          borderRadius: 6, padding: "5px 12px",
          color: done ? "var(--text-muted)" : "var(--accent)",
          fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
          cursor: done ? "default" : "pointer",
          transition: "all 0.2s ease", letterSpacing: "0.04em",
        }}
      >
        {done ? "📝 Summarized" : "📝 Summarize"}
      </button>

      {summary && (
        <div style={{
          marginTop: 10,
          borderLeft: "3px solid var(--accent)",
          background: "var(--bg)",
          padding: "10px 14px",
          borderRadius: "0 6px 6px 0",
          animation: "fadeUp 0.3s ease forwards",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: 1.7,
            color: "var(--text-muted)", margin: 0, fontStyle: "italic",
          }}>
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}
