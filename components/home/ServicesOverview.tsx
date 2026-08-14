"use client";

import Link from "next/link";
import { useState } from "react";
import { serviceCategories } from "@/lib/services-data";
import { ChevronDown, Sparkles } from "lucide-react";

export default function ServicesOverview() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? serviceCategories : serviceCategories.slice(0, 4);

  return (
    <section
      style={{
        paddingTop: "48px",
        paddingBottom: "48px",
        position: "relative",
      }}
    >
      <div className="container-custom">
        <div style={{ marginBottom: "14px" }}>
          <span className="section-label">SERVICES TAXONOMY</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: "clamp(36px, 4.5vw, 60px)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              maxWidth: "680px",
            }}
          >
            All 7 categories. Every angle of{" "}
            <span className="gradient-text">growth.</span>
          </h2>

          <Link href="/services" className="btn-secondary">
            Explore directory →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {visibleCategories.map((cat) => {
            const isOpen = openCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                className="card"
                style={{
                  padding: 0,
                  border: "1px solid var(--border-card)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transform: "none",
                  transition: "border-color 200ms",
                  borderColor: isOpen ? "rgba(245,185,46,0.4)" : undefined,
                  backgroundColor: "var(--bg-card)",
                }}
                id={cat.slug}
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 32px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "rgba(245, 185, 46, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: '"Syne", sans-serif',
                          fontWeight: 800,
                          fontSize: "20px",
                          color: "var(--text-primary)",
                          marginBottom: "4px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {cat.name}
                      </div>
                      <div style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: '"Space Grotesk", sans-serif' }}>
                        {cat.description}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--text-faint)",
                        background: "rgba(255,255,255,0.04)",
                        padding: "5px 12px",
                        borderRadius: "9999px",
                        border: "1px solid var(--border-card)",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat.services.length} services
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "var(--text-muted)",
                        transition: "transform 200ms",
                        transform: isOpen ? "rotate(180deg)" : "none",
                      }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 32px 28px",
                      borderTop: "1px solid var(--border-card)",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: "10px",
                      }}
                    >
                      {cat.services.map((svc) => (
                        <Link
                          key={svc.slug}
                          href={`/services/${svc.slug}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-card)",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            textDecoration: "none",
                            background: "var(--bg-surface)",
                            transition: "border-color 150ms, transform 150ms",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                            (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(3px)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-card)";
                            (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                          }}
                        >
                          <span>{svc.name}</span>
                          {svc.isFlagship ? (
                            <span style={{ color: "var(--accent)", fontSize: "11px", fontWeight: 700 }}>★</span>
                          ) : (
                            <span style={{ color: "var(--text-faint)", fontSize: "12px" }}>→</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Show More / Show Less Button ── */}
        <div style={{ marginTop: "28px", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            <span>{showAll ? "Show Less" : `Show More (+${serviceCategories.length - 4} Categories)`}</span>
            <ChevronDown
              size={16}
              style={{
                transition: "transform 200ms ease",
                transform: showAll ? "rotate(180deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
