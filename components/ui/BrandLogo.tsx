import React from "react";

interface BrandLogoProps {
  size?: number; // Size of the S icon
  showWordmark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function BrandLogo({
  size = 32,
  showWordmark = true,
  className = "",
  style = {},
}: BrandLogoProps) {
  const gradientId = "shiyos-blue-cyan-grad";
  const glowGradientId = "shiyos-blue-glow";

  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={{ textDecoration: "none", ...style }}
    >
      {/* S Emblem SVG inspired by the flowing ribbon reference */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id={`${gradientId}-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id={`${gradientId}-bot`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id={glowGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <filter id="subtle-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer subtle rounded container backdrop for high contrast & elegance */}
        <rect width="100" height="100" rx="24" fill="url(#shiyos-blue-cyan-grad)" opacity="0.12" />
        <rect width="98" height="98" x="1" y="1" rx="23" stroke="url(#shiyos-blue-cyan-grad)" strokeOpacity="0.35" strokeWidth="2" />

        {/* Upper flowing sweep */}
        <path
          d="M 68 25 C 50 18, 30 22, 26 38 C 22 52, 44 54, 58 60 C 72 66, 78 78, 68 88 C 58 98, 34 94, 24 82"
          stroke="url(#shiyos-blue-cyan-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#subtle-shadow)"
        />

        {/* Flowing Inner Core dynamic curve */}
        <path
          d="M 64 27 C 48 20, 32 26, 30 38 C 28 50, 48 52, 60 58 C 72 64, 76 76, 68 85 C 60 93, 38 91, 28 80"
          stroke="url(#shiyos-blue-cyan-grad-top)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tech Nodes (accent cubes inspiration) */}
        <rect x="74" y="20" width="7" height="7" rx="2" fill="#06B6D4" />
        <rect x="83" y="14" width="6" height="6" rx="1.5" fill="#60A5FA" />
        <rect x="85" y="24" width="5" height="5" rx="1" fill="#3B82F6" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 800,
              fontSize: Math.max(16, Math.round(size * 0.58)),
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              transition: "color 200ms ease",
            }}
          >
            SHIYOS
          </span>
        </div>
      )}
    </div>
  );
}
