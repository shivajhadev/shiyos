"use client";

import { useState } from "react";
import Link from "next/link";
import { flagshipServices } from "@/lib/services-data";
import { ChevronDown } from "lucide-react";

export default function FlagshipServices() {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? flagshipServices : flagshipServices.slice(0, 6);

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
          <span className="section-label">WHAT WE DO</span>
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
            Built for brands that need to be{" "}
            <span className="gradient-text">seen.</span>
          </h2>

          <Link href="/services" className="btn-secondary">
            All services →
          </Link>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
          className="services-showcase-grid"
        >
          {visibleServices.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{
                  padding: "32px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  {/* Category badge */}
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--text-faint)",
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      marginBottom: "16px",
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    {svc.tagline.toUpperCase()}
                  </div>

                  <h3
                    style={{
                      fontFamily: '"Syne", sans-serif',
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "var(--text-primary)",
                      lineHeight: "1.25",
                      marginBottom: "14px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {svc.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      lineHeight: "1.65",
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    {svc.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "28px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Show More / Show Less Button ── */}
        {flagshipServices.length > 6 && (
          <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
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
              <span>{showAll ? "Show Less" : `Show More (+${flagshipServices.length - 6} Services)`}</span>
              <ChevronDown
                size={16}
                style={{
                  transition: "transform 200ms ease",
                  transform: showAll ? "rotate(180deg)" : "none",
                }}
              />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-showcase-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-showcase-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
