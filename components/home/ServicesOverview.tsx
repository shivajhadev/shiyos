"use client";

import Link from "next/link";
import { useState } from "react";
import { serviceCategories } from "@/lib/services-data";
import { ChevronDown, Sparkles } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";

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
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: "1.12",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              maxWidth: "680px",
            }}
          >
            All 7 categories. Every angle of{" "}
            <span className="gradient-text">growth.</span>
          </h2>

          <Link href="/services" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span>Explore directory</span>
            <ArrowIcon size={14} />
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
                  className="services-tax-btn"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "rgba(37, 99, 235, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#2563EB",
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={18} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: "clamp(16px, 3.8vw, 19px)",
                          color: "var(--text-primary)",
                          marginBottom: "2px",
                          letterSpacing: "-0.02em",
                          lineHeight: "1.25",
                        }}
                      >
                        {cat.name}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          lineHeight: "1.4",
                        }}
                      >
                        {cat.description}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <span
                      className="hidden sm:inline-block"
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--text-faint)",
                        background: "rgba(255,255,255,0.04)",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        border: "1px solid var(--border-card)",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat.services.length}
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
                      padding: "0 24px 24px",
                      borderTop: "1px solid var(--border-card)",
                      paddingTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
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
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-card)",
                            fontSize: "13px",
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
                            <ArrowIcon size={11} style={{ color: "var(--text-faint)" }} />
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
