// ─── components/ui/ErrorBanner.js ─────────────────────────────────────────
import React from "react";

export default function ErrorBanner({ message, onRetry }) {
  return (
    <div style={{
      background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.3)",
      borderRadius: 10, padding: "18px 24px",
      display: "flex", alignItems: "center", gap: 16,
      fontFamily: "var(--font-sans)",
    }}>
      <span style={{ fontSize: 24 }}>⚠️</span>
      <div style={{ flex: 1 }}>
        <p style={{ color: "var(--text-primary)", margin: 0, fontSize: 15, fontWeight: 600 }}>
          {message || "Something went wrong"}
        </p>
        <p style={{ color: "var(--text-muted)", margin: "4px 0 0", fontSize: 13 }}>
          Using cached/demo data below. Check your API key or network.
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "var(--accent)", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 20px", cursor: "pointer",
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
            flexShrink: 0,
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
