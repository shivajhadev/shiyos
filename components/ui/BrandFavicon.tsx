import React from "react";

interface BrandFaviconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function BrandFavicon({
  size = 14,
  className = "",
  style = {},
}: BrandFaviconProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: Math.max(3, Math.round(size * 0.25)),
        background: "var(--accent-gradient)",
        color: "#0a0a0a",
        fontWeight: 800,
        fontSize: Math.max(8, Math.round(size * 0.65)),
        lineHeight: 1,
        flexShrink: 0,
        ...style,
      }}
    >
      S
    </span>
  );
}
