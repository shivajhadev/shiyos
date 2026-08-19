import React from "react";

interface ArrowIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: "right" | "up-right";
}

export default function ArrowIcon({
  size = 14,
  className = "",
  style = {},
  variant = "right",
}: ArrowIconProps) {
  if (variant === "up-right") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          flexShrink: 0,
          transition: "transform 150ms ease",
          ...style,
        }}
      >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        transition: "transform 150ms ease",
        ...style,
      }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
