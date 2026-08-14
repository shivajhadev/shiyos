"use client";

import Link from "next/link";

interface PainPoint {
  pain: string;
  fix: string;
  service: string;
  serviceSlug: string;
}

const painPoints: PainPoint[] = [
  {
    pain: "“We run ads constantly and can’t tell what’s actually returning.”",
    fix: "Usually a tracking problem before it's a creative problem. We verify measurement end to end, then judge every campaign on what it returns.",
    service: "→ Performance marketing",
    serviceSlug: "/services/performance-marketing",
  },
  {
    pain: "“Our e-commerce store is live but sales aren’t growing.”",
    fix: "We audit your listings, ads, and operations — then build a compounding growth strategy with automation so results scale without your effort.",
    service: "→ E-commerce automation",
    serviceSlug: "/services/ecommerce-automation",
  },
  {
    pain: "“We’re invisible in search — competitors rank, we don’t.”",
    fix: "Technical debt, thin pages, or content written for nobody. We fix the foundation first, then build pages around real queries people type.",
    service: "→ AI-assisted SEO",
    serviceSlug: "/services/ai-assisted-seo",
  },
  {
    pain: "“We’re juggling four freelancers with zero coordination.”",
    fix: "Editor, media buyer, designer, developer — one studio owns the whole thing, one strategy runs it, and one report explains it.",
    service: "→ On-demand extension",
    serviceSlug: "/services/on-demand-extension",
  },
];

export default function PainPoints() {
  return (
    <section
      style={{
        paddingTop: "48px",
        paddingBottom: "48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner geometric decoration like DigiHandler */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "60px",
          right: "5%",
          width: "60px",
          height: "60px",
          border: "2px solid rgba(245, 185, 46, 0.4)",
          transform: "rotate(45deg)",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      <span className="sparkle sparkle-sm" style={{ top: "40px", left: "10%", animationDelay: "1s" }}>✦</span>

      <div className="container-custom">
        <div style={{ marginBottom: "14px" }}>
          <span className="section-label">YOUR SITUATION</span>
        </div>

        <h2
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "36px",
            maxWidth: "700px",
          }}
        >
          You’re probably here for one of{" "}
          <span className="gradient-text">these.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
          className="pain-grid"
        >
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "36px",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "220px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-card)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    lineHeight: "1.35",
                    marginBottom: "14px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {point.pain}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    lineHeight: "1.65",
                    marginBottom: "24px",
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}
                >
                  {point.fix}
                </p>
              </div>

              <Link
                href={point.serviceSlug}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "color 150ms, transform 150ms",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {point.service}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pain-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
