// ─── components/ui/ShortcutsModal.js ──────────────────────────────────────
import React, { useEffect } from "react";

const SHORTCUTS = [
  { key: "S  or  /", action: "Focus the search input" },
  { key: "B", action: "Toggle Bookmarks page" },
  { key: "H", action: "Toggle History page" },
  { key: "Escape", action: "Close modal / clear search" },
  { key: "1 – 7", action: "Switch category tab by number" },
  { key: "?", action: "Open this shortcuts panel" },
];

export default function ShortcutsModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "32px 36px",
          maxWidth: 460, width: "100%",
          animation: "modalIn 0.25s ease forwards",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
            color: "var(--text-primary)", margin: 0,
          }}>
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            aria-label="Close shortcuts panel"
            style={{
              background: "none", border: "1px solid var(--border)",
              borderRadius: 8, padding: "6px 10px",
              color: "var(--text-muted)", cursor: "pointer", fontSize: 14,
            }}
          >✕</button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {SHORTCUTS.map(({ key, action }) => (
              <tr key={key} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 0", width: 140 }}>
                  <kbd style={{
                    background: "var(--bg)", border: "1px solid var(--border)",
                    borderRadius: 6, padding: "3px 8px",
                    fontFamily: "monospace", fontSize: 12,
                    color: "var(--text-primary)",
                  }}>
                    {key}
                  </kbd>
                </td>
                <td style={{
                  padding: "12px 0 12px 12px",
                  fontFamily: "var(--font-sans)", fontSize: 14,
                  color: "var(--text-muted)",
                }}>
                  {action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
