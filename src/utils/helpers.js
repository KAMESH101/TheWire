// ─── utils/helpers.js ─────────────────────────────────────────────────────

export const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60)   return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const clamp = (str, max) =>
  str && str.length > max ? str.slice(0, max) + "…" : str;

export const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23141414' width='800' height='450'/%3E%3Ctext fill='%23333' font-family='serif' font-size='48' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E📰%3C/text%3E%3C/svg%3E";
