// ─── hooks/useReadingHistory.js ────────────────────────────────────────────
import { useState, useCallback } from "react";

const KEY = "reading_history";
const MAX = 20;

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
};

export const useReadingHistory = () => {
  const [history, setHistory] = useState(load);

  const addToHistory = useCallback((article) => {
    setHistory((prev) => {
      const filtered = prev.filter((a) => a.id !== article.id);
      const updated = [
        { ...article, readAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(KEY);
    setHistory([]);
  }, []);

  const isRead = useCallback(
    (id) => history.some((a) => a.id === id),
    [history]
  );

  return { history, addToHistory, clearHistory, isRead };
};
