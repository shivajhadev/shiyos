"use client";

const steps = [
  {
    week: "WEEK 0",
    title: "Strategy call",
    description:
      "Free and without obligation. We look at your accounts and your numbers, and tell you honestly whether we're the right studio for the job.",
  },
  {
    week: "WEEKS 1–2",
    title: "Audit & plan",
    description:
      "A written teardown of what's working, what's leaking, and the plan for the first quarter — with the metric each action is meant to move.",
  },
  {
    week: "WEEKS 3–6",
    title: "Build & launch",
    description:
      "First creative batch, campaigns live, tracking verified end to end so the reporting can be trusted from day one.",
  },
  {
    week: "ONGOING",
    title: "Iterate & report",
    description:
      "A monthly report in plain language: what ran, what it returned, and what changes next month.",
  },
];

export default function ProcessTimeline() {
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
          <span className="section-label">HOW AN ENGAGEMENT RUNS</span>
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
          No surprises after the{" "}
          <span className="gradient-text">signature.</span>
        </h2>

        {/* 4 Cards Grid with Gold Line on Hover */}
        <div
          className="process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="card process-card"
              style={{
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                minHeight: "320px",
                cursor: "default",
              }}
            >
              {/* Step week badge */}
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                  marginBottom: "20px",
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                {step.week}
              </div>

              <h3
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "24px",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                  lineHeight: "1.2",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-muted)",
                  lineHeight: "1.7",
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

