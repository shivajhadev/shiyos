import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
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
              fontWeight: 800,
              fontSize: "clamp(38px, 5.2vw, 64px)",
              lineHeight: "1.1",
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
                  Most growing brands end up with four different freelancers who don't talk to each other — a media buyer blaming the creative, an editor blaming the script, and a developer who doesn't understand conversion rates.
                </p>
                <p>
                  Shiyos was founded on a simple premise: growth works when strategy, creative, performance marketing, and engineering are connected under one roof with direct founder accountability.
                </p>
                <p>
                  We don't sell hours or vanity metrics. Every engagement is judged on revenue, ROAS, and compounding business value.
                </p>
              </div>
            </div>

            <div>
              {/* Studio Numbers Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                {[
                  { value: "150+", label: "Brands Served" },
                  { value: "3+ yrs", label: "Studio History" },
                  { value: "15+", label: "Specialists" },
                  { value: "4.8x", label: "Average Ad ROAS" },
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
                        fontWeight: 800,
                        fontSize: "32px",
                        color: "var(--accent)",
                        marginBottom: "6px",
                        letterSpacing: "-0.02em",
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
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    marginBottom: "20px",
                    letterSpacing: "-0.02em",
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
                          background: "rgba(37, 99, 235, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      >
                        <Check size={10} style={{ color: "#2563EB" }} />
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
                fontWeight: 700,
                letterSpacing: "-0.02em",
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
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "#0a0a0a",
                }}
              >
                S
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "16px" }}>
                  Shiva
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Founder, Shiyos Technologies
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "48px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span>Start a Project</span>
              <ArrowIcon size={14} />
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
