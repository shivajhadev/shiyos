import React from "react";

interface BrandFaviconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function BrandFavicon({
  size = 16,
  className = "",
  style = {},
}: BrandFaviconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="favicon-blue-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="26" fill="url(#favicon-blue-cyan)" />
      <path
        d="M 68 28 C 50 20, 30 24, 26 38 C 22 52, 44 54, 58 60 C 72 66, 78 78, 68 86 C 58 94, 36 92, 26 80"
        stroke="#ffffff"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="76" y="18" width="8" height="8" rx="2" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
