"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { rotatingPhrases } from "@/lib/services-data";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingPhrases.length);
        setVisible(true);
      }, 280);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentPhrase = rotatingPhrases[wordIndex] || rotatingPhrases[0];

  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "110px",
        paddingBottom: "48px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg)",
      }}
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,185,46,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* 2-column grid */}
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Text & CTAs ── */}
          <div>
            <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
              <span style={{ color: "var(--accent)", fontSize: "7px" }}>●</span>
              AI • SOFTWARE • AUTOMATION • GROWTH
            </div>

            {/* 4-Line Locked Headline (Headings: Plus Jakarta Sans) */}
            <h1
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(34px, 5.2vw, 60px)",
                lineHeight: "1.12",
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
              }}
            >
              <div>We engineer</div>
              <div>growth through</div>
              {/* Rotating word container (Line 3 & Line 4) */}
              <div style={{ minHeight: "2.3em", overflow: "hidden", marginTop: "4px" }}>
                <div
                  className="gradient-text"
                  style={{
                    display: "block",
                    transition: "opacity 280ms ease, transform 280ms ease",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    letterSpacing: "-0.04em",
                    wordBreak: "break-word",
                  }}
                >
                  <div>{currentPhrase.line1}</div>
                  <div>{currentPhrase.line2}</div>
                </div>
              </div>
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 3.5vw, 17px)",
                color: "var(--text-muted)",
                lineHeight: "1.7",
                marginTop: "20px",
                marginBottom: "28px",
                maxWidth: "500px",
                fontWeight: 400,
              }}
            >
              We help businesses build and grow online through websites, apps, e-commerce, Shopify, Meta & Google Ads, SEO, influencer marketing, and social media - with one team handling everything from strategy to execution.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "12px 24px" }}>
                Let's talk Growth
              </Link>
              <a
                href="https://wa.me/917986408226?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20growth%20needs"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 22px",
                  borderRadius: "9999px",
                  background: "#25D366",
                  color: "#0a0a0a",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "opacity 150ms, transform 150ms",
                }}
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <a
                href="tel:+917986408226"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "1px solid var(--border-strong)",
                  background: "transparent",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                <Phone size={12} /> +91 79864 08226
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "1px solid var(--border-strong)",
                  background: "transparent",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#22c55e", fontSize: "7px" }}>●</span>
                Usually reply within a few hours
              </div>
            </div>
          </div>

          {/* ── RIGHT: Animated Growth Engine Visual (Desktop only) ── */}
          <div
            className="hero-visual-col"
            style={{
              height: "440px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ambient Background Aura */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "360px",
                height: "360px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,185,46,0.18) 0%, rgba(245,185,46,0.04) 50%, transparent 70%)",
                animation: "pulse-glow 4s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* Orbit Container */}
            <div
              style={{
                width: "340px",
                height: "340px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer Orbit Ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1px dashed rgba(245, 185, 46, 0.3)",
                  animation: "spin-cw 32s linear infinite",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 14px var(--accent)",
                  }}
                />
              </div>

              {/* Inner Orbit Ring */}
              <div
                style={{
                  position: "absolute",
                  inset: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  animation: "spin-ccw 22s linear infinite",
                }}
              />

              {/* Core Badge */}
              <div
                className="hero-core-badge"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "28px",
                  background: "var(--accent-gradient)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 60px rgba(245,185,46,0.45), 0 20px 40px rgba(0,0,0,0.4)",
                  zIndex: 2,
                  animation: "float-core 5s ease-in-out infinite",
                }}
              >
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "56px",
                    color: "#0a0a0a",
                    lineHeight: 1,
                  }}
                >
                  S
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#0a0a0a",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  SHIYOS
                </span>
              </div>

              {/* Floating Stat Card 1 */}
              <div
                className="hero-stat-card hero-stat-1"
                style={{
                  position: "absolute",
                  top: "-15px",
                  right: "-20px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  boxShadow: "var(--shadow-card)",
                  zIndex: 4,
                  animation: "float-card-1 4.5s ease-in-out infinite",
                }}
              >
                <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                  150+ Projects
                </div>
                <div style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 600 }}>E-comm &amp; D2C Scale</div>
              </div>

              {/* Floating Stat Card 2 */}
              <div
                className="hero-stat-card hero-stat-2"
                style={{
                  position: "absolute",
                  bottom: "-15px",
                  left: "-25px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  boxShadow: "var(--shadow-card)",
                  zIndex: 4,
                  animation: "float-card-2 5s ease-in-out infinite",
                }}
              >
                <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                  4.8x Avg ROAS
                </div>
                <div style={{ fontSize: "11px", color: "#22c55e", fontWeight: 600 }}>Performance Ads</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Stats Strip (Mobile Responsive) ── */}
        <div
          className="hero-bottom-stats"
          style={{
            marginTop: "36px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {[
            { stat: "150+ Projects", sub: "Across E-commerce • D2C • Technology" },
            { stat: "2+ Years", sub: "Building digital businesses" },
            { stat: "15+ Specialists", sub: "Growth & Tech Experts" },
          ].map(({ stat, sub }) => (
            <div key={stat} style={{ minWidth: 0 }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: "clamp(17px, 4vw, 21px)", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                {stat}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes float-core { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes float-card-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes float-card-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-visual-col { display: none !important; }
        }
        @media (max-width: 640px) {
          .hero-bottom-stats {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
