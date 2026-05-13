// ─── components/ui/Toast.js ────────────────────────────────────────────────
import React, { useEffect, useState } from "react";

export default function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed", bottom: 32, left: "50%", zIndex: 9999,
        transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 10, padding: "12px 24px",
        fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
        color: "var(--text-primary)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        pointerEvents: "none", whiteSpace: "nowrap",
      }}
    >
      {message}
    </div>
  );
}
