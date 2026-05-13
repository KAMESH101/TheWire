// ─── components/ui/EmptyState.js ──────────────────────────────────────────
import React from "react";

export default function EmptyState({ icon = "📭", title, subtitle }) {
  return (
    <div style={{
      textAlign: "center", padding: "80px 24px",
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>{icon}</div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: 24,
        color: "var(--text-primary)", margin: "0 0 10px",
      }}>
        {title}
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: 15, margin: 0 }}>
        {subtitle}
      </p>
    </div>
  );
}
