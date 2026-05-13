// ─── components/ui/SkeletonCard.js ────────────────────────────────────────
import React from "react";

// FIX: Shimmer gradient middle stop changed from #1e1e1e (same as border) to
// #2d2d2d so the shimmer animation is actually visible against the background.
const Bone = ({ h = 16, w = "100%", mb = 10, radius = 6 }) => (
  <div style={{
    height: h, width: w, marginBottom: mb,
    borderRadius: radius, background: "var(--border)",
    backgroundImage: "linear-gradient(90deg, var(--border) 25%, #2d2d2d 50%, var(--border) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite linear",
  }} />
);

export function SkeletonCard() {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: 12, overflow: "hidden",
    }}>
      <div style={{ height: 200, background: "var(--border)" }} />
      <div style={{ padding: "18px 20px" }}>
        <Bone h={12} w="60%" mb={14} />
        <Bone h={18} mb={6} />
        <Bone h={18} w="80%" mb={14} />
        <Bone h={13} mb={6} />
        <Bone h={13} mb={6} />
        <Bone h={13} w="70%" mb={16} />
        <Bone h={13} w="30%" />
      </div>
    </div>
  );
}

// FIX: Use className="hero-grid" / "hero-image-half" for mobile responsiveness
export function SkeletonHero() {
  return (
    <div
      className="hero-grid"
      style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}
    >
      <div className="hero-image-half" style={{ background: "var(--border)" }} />
      <div style={{ background: "var(--surface)", padding: "36px 32px" }}>
        <Bone h={24} w="40%" mb={20} />
        <Bone h={36} mb={10} />
        <Bone h={36} w="75%" mb={24} />
        <Bone h={14} mb={8} />
        <Bone h={14} mb={8} />
        <Bone h={14} w="60%" mb={32} />
        <Bone h={44} w={160} radius={8} />
      </div>
    </div>
  );
}
