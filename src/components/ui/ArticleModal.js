// ─── components/ui/ArticleModal.js ────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import { timeAgo, PLACEHOLDER_IMG } from "../../utils/helpers";

export default function ArticleModal({ article, onClose, onRead }) {
  const [imgSrc, setImgSrc] = useState(article.image || PLACEHOLDER_IMG);
  const closeRef = useRef(null);

  // Scroll lock + Escape key + focus
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    if (onRead) onRead(article);

    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onRead, article]);

  return (
    <div
      onClick={(e) => { if (e.currentTarget === e.target) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          background: "var(--surface)", borderRadius: 16,
          border: "1px solid var(--border)",
          maxWidth: 720, width: "100%", maxHeight: "90vh",
          overflowY: "auto", position: "relative",
          animation: "modalIn 0.25s ease forwards",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative" }}>
          <img
            src={imgSrc}
            alt={article.title}
            onError={() => setImgSrc(PLACEHOLDER_IMG)}
            style={{
              width: "100%", height: 280, objectFit: "cover",
              borderRadius: "16px 16px 0 0", display: "block",
            }}
          />
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close article preview"
            style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(0,0,0,0.6)", border: "none",
              borderRadius: "50%", width: 36, height: 36,
              color: "#fff", fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{
              background: "var(--accent)", color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "4px 10px", borderRadius: 4,
              fontFamily: "var(--font-sans)",
            }}>
              {article.source?.name || "News"}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
              {timeAgo(article.publishedAt)}
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(20px,4vw,26px)",
            fontWeight: 700, lineHeight: 1.3, color: "var(--text-primary)", margin: "0 0 16px",
          }}>
            {article.title}
          </h2>

          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.75,
            color: "var(--text-muted)", margin: "0 0 28px",
          }}>
            {article.description}
          </p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onRead && onRead(article)}
            style={{
              display: "inline-block", background: "var(--accent)", color: "#fff",
              padding: "13px 28px", borderRadius: 8,
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Read Full Article →
          </a>
        </div>
      </div>
    </div>
  );
}
