// ─── components/ui/InstallBanner.js ───────────────────────────────────────
import React, { useState, useEffect } from "react";

export default function InstallBanner() {
  const [prompt, setPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("pwa_dismissed") === "1"
  );

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
  };

  const dismiss = () => {
    localStorage.setItem("pwa_dismissed", "1");
    setDismissed(true);
  };

  if (!prompt || dismissed) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
      background: "var(--surface)", borderTop: "1px solid var(--border)",
      padding: "14px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, fontFamily: "var(--font-sans)",
      animation: "fadeUp 0.4s ease forwards",
    }}>
      <span style={{ color: "var(--text-primary)", fontSize: 14 }}>
        📱 Install <strong>TheWire</strong> for offline access
      </span>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          onClick={install}
          aria-label="Install TheWire app"
          style={{
            background: "var(--accent)", color: "#fff", border: "none",
            borderRadius: 8, padding: "8px 18px",
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Install
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss install banner"
          style={{
            background: "none", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 12px",
            color: "var(--text-muted)", cursor: "pointer", fontSize: 14,
          }}
        >✕</button>
      </div>
    </div>
  );
}
