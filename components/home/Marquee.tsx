"use client";

export default function IndustriesMarquee() {
  const industries = [
    "E-commerce",
    "Healthcare & Wellness",
    "FMCG & Beverage",
    "Fashion & Apparel",
    "Fine Jewellery",
    "Consumer Electronics",
    "Home & Living",
    "B2B & SaaS",
    "Real Estate",
    "Education & EdTech",
    "Quick Commerce Brands",
    "Automotive",
    "Sports & Fitness",
    "Consulting & Media",
    "Retail & D2C",
    "Manufacturing",
  ];

  const doubled = [...industries, ...industries];

  return (
    <section
      style={{
        paddingTop: "24px",
        paddingBottom: "24px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="container-custom" style={{ marginBottom: "14px" }}>
        <div className="section-label">INDUSTRIES WE SERVE</div>
      </div>

      <div
        className="marquee-container"
        style={{
          borderTop: "1px solid var(--border-card)",
          borderBottom: "1px solid var(--border-card)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div className="marquee-track" style={{ padding: "18px 0" }}>
          {doubled.map((industry, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "24px",
                paddingRight: "48px",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              {industry}
              <span style={{ color: "var(--accent)", fontSize: "10px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
