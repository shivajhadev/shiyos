"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { rotatingWords } from "@/lib/services-data";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setVisible(true);
      }, 280);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "90px",
        paddingBottom: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sparkle decorations */}
      <span className="sparkle sparkle-sm" style={{ position: "absolute", top: "90px", left: "32px", animationDelay: "0s" }}>✦</span>
      <span className="sparkle sparkle-sm" style={{ position: "absolute", bottom: "30%", left: "5%", animationDelay: "0.8s" }}>+</span>
      <span className="sparkle sparkle-md" style={{ position: "absolute", top: "15%", right: "28%", animationDelay: "2.2s", fontSize: "18px" }}>+</span>

      {/* Dot grid */}
      <div className="dot-grid" style={{ top: 0, right: 0, width: "340px", height: "100%", opacity: 0.5 }} />

      {/* Amber glow */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", right: "8%", transform: "translateY(-50%)", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,185,46,0.10) 0%, transparent 65%)", pointerEvents: "none", filter: "blur(20px)" }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 1, width: "100%" }}>

        {/* 2-column grid */}
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: text ── */}
          <div>
            <div className="section-label" style={{ marginBottom: "32px", display: "inline-flex" }}>
              <span style={{ color: "var(--accent)", fontSize: "7px" }}>●</span>
              IT &amp; Growth Studio · India · Working Worldwide
            </div>

            <div
              style={{
                fontFamily: '"Syne", "Space Grotesk", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(34px, 4.2vw, 56px)",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              <div>We engineer</div>
              <div style={{ whiteSpace: "nowrap" }}>growth through</div>
              {/* Fixed height = 2 lines max of rotating word so headline is always clean 4 lines */}
              <div style={{ minHeight: "2.25em", overflow: "hidden", marginTop: "4px" }}>
                <span
                  className="gradient-text"
                  style={{
                    display: "block",
                    transition: "opacity 280ms ease, transform 280ms ease",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    fontStyle: "italic",
                  }}
                >
                  {rotatingWords[wordIndex]}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: "1.7", marginTop: "24px", marginBottom: "36px", maxWidth: "440px", fontFamily: '"Space Grotesk", sans-serif', fontWeight: 400 }}>
              Full-service IT, e-commerce growth, and digital marketing.
              Founder-led, results-driven. Every service you need, under one roof.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <Link href="/contact" className="btn-primary">Get a Free Audit →</Link>
              <a
                href="https://wa.me/917986408226?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20growth%20needs"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "9999px", background: "#25D366", color: "#fff", fontSize: "15px", fontWeight: 700, textDecoration: "none", fontFamily: '"Space Grotesk", sans-serif', transition: "opacity 150ms, transform 150ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
              <span style={{ fontSize: "13px", color: "var(--text-faint)", fontWeight: 500 }}>Free. No obligation either way.</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <a href="tel:+917986408226" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 }}>
                <Phone size={12} /> +91 79864 08226
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", fontSize: "13px", color: "var(--text-muted)", fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 }}>
                <span style={{ color: "#22c55e", fontSize: "7px" }}>●</span>
                Response within 4 hours
              </div>
            </div>
          </div>

          {/* ── RIGHT: Animated Growth Engine Visual ── */}
          <div
            style={{
              height: "460px",
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
                width: "440px",
                height: "440px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,185,46,0.18) 0%, rgba(255,140,0,0.06) 45%, transparent 70%)",
                filter: "blur(32px)",
                pointerEvents: "none",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            />

            {/* Orbit Container */}
            <div
              style={{
                position: "relative",
                width: "360px",
                height: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer Orbit Ring — Rotating Clockwise */}
              <div
                className="orbit-ring-outer"
                style={{
                  position: "absolute",
                  inset: "0",
                  borderRadius: "50%",
                  border: "1.5px dashed var(--border-strong)",
                  animation: "spin-cw 28s linear infinite",
                  pointerEvents: "none",
                }}
              >
                {/* Comet Node 1 */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 16px 2px rgba(245,185,46,0.9)",
                  }}
                />
                {/* Comet Node 2 */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow: "0 0 12px 2px rgba(255,255,255,0.8)",
                  }}
                />
              </div>

              {/* Inner Orbit Ring — Counter Clockwise */}
              <div
                className="orbit-ring-inner"
                style={{
                  position: "absolute",
                  inset: "38px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-card)",
                  background: "radial-gradient(circle, rgba(245,185,46,0.05) 0%, transparent 60%)",
                  animation: "spin-ccw 20s linear infinite",
                  pointerEvents: "none",
                }}
              >
                {/* Satellite node */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-5px",
                    transform: "translateY(-50%)",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#ff8c00",
                    boxShadow: "0 0 14px 2px rgba(255,140,0,0.8)",
                  }}
                />
              </div>

              {/* Central 3D Brand Core */}
              <div
                className="hero-core-badge"
                style={{
                  width: "136px",
                  height: "136px",
                  borderRadius: "32px",
                  background: "var(--accent-gradient)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 60px rgba(245,185,46,0.45), 0 20px 40px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
                  zIndex: 2,
                  animation: "float-core 5s ease-in-out infinite",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 300ms ease, box-shadow 300ms ease",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 800,
                    fontSize: "66px",
                    color: "#0a0a0a",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  S
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    color: "#0a0a0a",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                    fontFamily: '"Space Grotesk", sans-serif',
                    opacity: 0.85,
                  }}
                >
                  SHIYOS
                </span>
              </div>

              {/* Floating Stat Card 1 — Top Right (150+ Brands) */}
              <div
                className="hero-stat-card hero-stat-1"
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-25px",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  boxShadow: "var(--shadow-card), 0 10px 30px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(12px)",
                  zIndex: 4,
                  animation: "float-card-1 4.5s ease-in-out infinite",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "22px", color: "var(--text-primary)", lineHeight: 1 }}>
                    150+
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.12)", padding: "2px 6px", borderRadius: "9999px" }}>
                    ↗ ROI
                  </span>
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Brands Scaled
                </div>
              </div>

              {/* Floating Stat Card 2 — Left (15 Team Members) */}
              <div
                className="hero-stat-card hero-stat-2"
                style={{
                  position: "absolute",
                  bottom: "35px",
                  left: "-55px",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  boxShadow: "var(--shadow-card), 0 10px 30px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(12px)",
                  zIndex: 4,
                  animation: "float-card-2 5.2s ease-in-out infinite",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                  <span style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "22px", color: "var(--text-primary)", lineHeight: 1 }}>
                    15
                  </span>
                  <span style={{ fontSize: "11px" }}>🚀</span>
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Specialists In-House
                </div>
              </div>

              {/* Floating Stat Card 3 — Bottom Right (3+ Years Experience) */}
              <div
                className="hero-stat-card hero-stat-3"
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  right: "15px",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  boxShadow: "var(--shadow-card), 0 10px 30px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(12px)",
                  zIndex: 4,
                  animation: "float-card-3 4.8s ease-in-out infinite",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "22px", color: "var(--text-primary)", lineHeight: 1 }}>
                    3+<span className="gradient-text">yrs</span>
                  </span>
                  <span style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 700 }}>★ Founder-led</span>
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Proven Track Record
                </div>
              </div>

              {/* Floating Mini Chip — Top Left (Extension & AI Live) */}
              <div
                className="hero-stat-card hero-stat-4"
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "-40px",
                  padding: "8px 14px",
                  borderRadius: "9999px",
                  background: "var(--bg-card)",
                  border: "1px solid rgba(245,185,46,0.3)",
                  boxShadow: "0 0 20px rgba(245,185,46,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 4,
                  animation: "float-card-4 4.2s ease-in-out infinite",
                }}
              >
                <span style={{ fontSize: "12px" }}>⚡</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-primary)", fontFamily: '"Space Grotesk", sans-serif' }}>
                  Live Data &amp; AI Tools
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {[
            { stat: "150+ brands", sub: "Across e-commerce, paid & SEO" },
            { stat: "3+ yrs", sub: "Founded 2021, still founder-run" },
            { stat: "15 members", sub: "Editors, buyers, designers, devs" },
          ].map(({ stat, sub }) => (
            <div key={stat}>
              <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{stat}</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px", fontFamily: '"Space Grotesk", sans-serif' }}>{sub}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes float-core {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes float-card-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px) translateX(3px); }
        }
        @keyframes float-card-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px) translateX(-3px); }
        }
        @keyframes float-card-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px) translateX(2px); }
        }
        @keyframes float-card-4 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-1deg); }
        }
        .hero-core-badge:hover {
          transform: scale(1.06) !important;
          box-shadow: 0 0 80px rgba(245,185,46,0.65), 0 25px 50px rgba(0,0,0,0.5) !important;
        }
        .hero-stat-card {
          transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
        }
        .hero-stat-card:hover {
          border-color: rgba(245,185,46,0.5) !important;
          box-shadow: 0 12px 35px rgba(0,0,0,0.4), 0 0 20px rgba(245,185,46,0.2) !important;
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
