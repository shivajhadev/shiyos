"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";

const reasons = [
  "Editors, media buyers, designers, and developers in one room — nothing is subcontracted out.",
  "The founders lead every engagement personally; you are never handed to a junior account manager.",
  "We work in IST (UTC+5:30): full working-day overlap with Europe and the Gulf, and mornings with US East Coast.",
  "All strategy, scripting, and reporting delivered in English on your calendar, every time.",
  "NDA signed before we see anything sensitive — several clients prefer we stay unnamed.",
];

export default function WhyShiyos() {
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
          <span className="section-label">WHY BRANDS ABROAD WORK WITH US</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="why-grid"
        >
          {/* Left: headline + reasons */}
          <div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(34px, 4.5vw, 54px)",
                lineHeight: "1.12",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "20px",
              }}
            >
              A 15-person studio, with founder-level{" "}
              <span className="gradient-text">attention.</span>
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "var(--text-muted)",
                lineHeight: "1.65",
                marginBottom: "40px",
              }}
            >
              Big enough to run every discipline in-house, small enough that the
              founders are still on your account every week.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {reasons.map((reason, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: "1px solid var(--border-card)",
                    background: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(245, 185, 46, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Check size={12} style={{ color: "var(--accent)" }} />
                  </div>
                  <span style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: "1.6" }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "36px" }}>
              <Link href="/about" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span>More about the studio</span>
                <ArrowIcon size={14} />
              </Link>
            </div>
          </div>

          {/* Right: manifesto quote card */}
          <div>
            <div
              className="card"
              style={{
                padding: "40px",
                border: "1px solid var(--border-card)",
                borderRadius: "20px",
                background: "linear-gradient(145deg, #151515, #0f0f0f)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                THE SHIYOS STANDARD
              </div>

              <div
                style={{
                  fontWeight: 800,
                  fontSize: "26px",
                  color: "var(--text-primary)",
                  lineHeight: "1.25",
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                "We don't subcontract. When you hire us, you get the founders."
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  lineHeight: "1.7",
                  marginBottom: "32px",
                }}
              >
                Strategy, creative reviews, data analysis, and media management — held to the highest standard across every channel.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--border-card)",
                }}
              >
                <div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: "28px", color: "var(--accent)", letterSpacing: "-0.03em" }}>
                    150+
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-faint)", marginTop: "2px" }}>
                    Brands Served
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: "28px", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    3+ <span className="gradient-text" style={{ fontSize: "20px", fontWeight: 700 }}>Years</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-faint)", marginTop: "2px" }}>
                    Founder-Led Studio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
