import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Shiyos Technologies — Founder-Led IT & Growth Agency",
  description:
    "Shiyos Technologies is a founder-led IT and growth agency based in India. Learn about our team, our philosophy, and why brands choose us for e-commerce, AI, and digital marketing.",
};

const values = [
  "Every client engagement is led by the founders personally — you're never handed to a junior.",
  "All disciplines in-house: designers, media buyers, developers, SEO specialists, copywriters.",
  "We measure success solely by business revenue impact, not vanity clicks or impressions.",
  "Month-to-month commitments — we earn your business every single billing cycle.",
  "NDA signed before we review any proprietary data or store credentials.",
  "Fluent English communication — strategy, scripts, and reporting on your schedule.",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "150px",
          paddingBottom: "80px",
          position: "relative",
          borderBottom: "1px solid var(--border-card)",
        }}
      >
        <div className="container-custom">
          <span className="section-label" style={{ marginBottom: "20px", display: "inline-block" }}>
            ABOUT THE STUDIO
          </span>
          <h1
            style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: "clamp(40px, 5.5vw, 68px)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "24px",
              maxWidth: "800px",
            }}
          >
            A founder-led growth studio with{" "}
            <span className="gradient-text">founder-level attention.</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              maxWidth: "640px",
              lineHeight: "1.65",
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            Shiyos Technologies is a full-service IT, e-commerce growth, and digital marketing studio.
            We operate across every discipline under one roof, with one team, and one standard.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="about-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "36px",
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em",
                }}
              >
                Why we built this studio
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  color: "var(--text-muted)",
                  fontSize: "16px",
                  lineHeight: "1.7",
                }}
              >
                <p>
                  Most traditional agencies are designed for scale at the expense of quality. The senior person who pitches you the strategy is rarely the person executing your campaigns or writing your code.
                </p>
                <p>
                  Shiyos exists to eliminate that breakdown. Founded by Shiva, we operate on a simple principle: the founders stay on the account. Strategy, execution, and performance reporting are held to the same unyielding standard.
                </p>
                <p>
                  We have built a dedicated in-house team of 15+ specialists across e-commerce automation, media buying, full-stack development, and SEO — large enough to execute complete multi-channel roadmaps, small enough that the founders are actively involved in every weekly sprint.
                </p>
              </div>
            </div>

            <div>
              {/* Stats Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                {[
                  { value: "150+", label: "Brands served worldwide" },
                  { value: "3+ yrs", label: "In continuous operation" },
                  { value: "15+", label: "In-house specialists" },
                  { value: "7", label: "Core growth disciplines" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    style={{
                      padding: "24px",
                      borderRadius: "16px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '"Syne", sans-serif',
                        fontWeight: 800,
                        fontSize: "32px",
                        color: "var(--accent)",
                        marginBottom: "6px",
                      }}
                    >
                      {value}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Operating Principles */}
              <div
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card)",
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginBottom: "20px",
                  }}
                >
                  Our operating commitments
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {values.map((v, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "rgba(245, 185, 46, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      >
                        <Check size={10} style={{ color: "var(--accent)" }} />
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: "1.6" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section style={{ paddingTop: "20px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div
            style={{
              padding: "48px",
              borderRadius: "24px",
              border: "1px solid var(--border-card)",
              background: "linear-gradient(145deg, #151515, #0a0a0a)",
              maxWidth: "760px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                color: "var(--accent)",
                fontFamily: '"Syne", sans-serif',
                lineHeight: "1",
                marginBottom: "16px",
              }}
            >
              “
            </div>
            <p
              style={{
                fontSize: "20px",
                color: "var(--text-primary)",
                lineHeight: "1.6",
                fontFamily: '"Syne", sans-serif',
                fontWeight: 700,
                marginBottom: "28px",
              }}
            >
              When you hire Shiyos, you get the founders in your corner — leading strategy, reviewing every deliverable, and personally accountable for your results.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "var(--accent-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "#0a0a0a",
                }}
              >
                S
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "16px", fontFamily: '"Syne", sans-serif' }}>
                  Shiva
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Founder, Shiyos Technologies
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "48px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              Start a Project →
            </Link>
            <Link href="/services" className="btn-secondary">
              See All Services
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </>
  );
}
