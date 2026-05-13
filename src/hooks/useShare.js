// ─── hooks/useShare.js ─────────────────────────────────────────────────────
import { useCallback } from "react";

export const useShare = (onToast) => {
  const share = useCallback(
    async (article) => {
      const url = !article.url || article.url === "#"
        ? window.location.href
        : article.url;

      // Mobile: native share sheet
      if (navigator.share) {
        try {
          await navigator.share({
            title: article.title,
            text: article.description,
            url,
          });
        } catch {
          // User cancelled — not an error
        }
        return;
      }

      // Desktop: clipboard
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = url;
        el.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      onToast("🔗 Link copied!");
    },
    [onToast]
  );

  return { share };
};
