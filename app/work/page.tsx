import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Work & Portfolio — 12 Sectors We've Served",
  description:
    "Selected work by Shiyos Technologies across e-commerce, performance marketing, AI, SEO, influencer campaigns, and website development.",
};

export const sectors = [
  {
    num: "01",
    code: "JWL",
    name: "Fine Jewellery & Luxury",
    tag: "Amazon · D2C · Reels",
    description: "Full-funnel brand growth — reels concepting, 3D product renders, Amazon A+ content, and Meta performance ads.",
    services: ["Listing Image Design", "3D Image Making", "Performance Marketing"],
  },
  {
    num: "02",
    code: "ECC",
    name: "Consumer Electronics",
    tag: "Marketplaces · Quick Commerce",
    description: "Automated catalog repricing, BuyBox strategy, Blinkit ads, and full inventory automation.",
    services: ["E-commerce Automation", "E-commerce Ads", "E-commerce BuyBox Management"],
  },
  {
    num: "03",
    code: "FMCG",
    name: "Food & Beverage Brands",
    tag: "Launch · Ads · UGC",
    description: "Brand registry, launch campaigns, creator seeding, and automated reorder flows.",
    services: ["E-commerce Brand Onboarding", "UGC Ads Making", "Sales Growth Strategy"],
  },
  {
    num: "04",
    code: "SFT",
    name: "SaaS & AI Platforms",
    tag: "AI SEO · Web Dev",
    description: "AI-assisted technical SEO, high-intent conversion pages, and Google Search campaigns.",
    services: ["AI-Assisted SEO", "Website Design & Development", "Digital Marketing"],
  },
  {
    num: "05",
    code: "INF",
    name: "Creator-Led DTC Brands",
    tag: "Influencer Marketing",
    description: "End-to-end influencer campaigns across YouTube and Instagram with full UTM tracking and attribution.",
    services: ["Influencer Marketing", "Social Media Management", "Premium Video Editing"],
  },
  {
    num: "06",
    code: "AUT",
    name: "Automotive & Accessories",
    tag: "Multi-Channel Ads",
    description: "Google Shopping, Amazon Sponsored Brands, and dynamic retargeting across Meta channels.",
    services: ["Performance Marketing", "Amazon Ads Video Making", "E-commerce Ads"],
  },
  {
    num: "07",
    code: "MED",
    name: "Health & Nutraceuticals",
    tag: "SEO · Content · Authority",
    description: "Scientific SEO authority building, educational reels production, and founder personal branding.",
    services: ["SEO", "Personal Branding", "Graphic Design"],
  },
  {
    num: "08",
    code: "FSH",
    name: "Apparel & Fashion Labels",
    tag: "Shopify · High ROAS Ads",
    description: "High-speed Shopify storefront, automated inventory routing, and Meta catalog sales ads.",
    services: ["Shopify Website Making", "E-commerce App Development", "Performance Marketing"],
  },
  {
    num: "09",
    code: "HOM",
    name: "Home Decor & Smart Living",
    tag: "3D Renders · Marketplace Scale",
    description: "Photorealistic 3D lifestyle visuals, Amazon storefront overhaul, and multi-tier PPC ads.",
    services: ["3D Image Making", "Amazon Listing Optimization", "Sales Growth Strategy"],
  },
  {
    num: "10",
    code: "EDT",
    name: "EdTech & Info Products",
    tag: "Funnel Automation · Meta Ads",
    description: "Webinar funnels, lead qualification chatbots, high-converting VSL landing pages, and scale ad campaigns.",
    services: ["AI Automation", "Performance Marketing", "Website Design & Development"],
  },
  {
    num: "11",
    code: "BTY",
    name: "Beauty, Skincare & Cosmetics",
    tag: "Creator Seeding · Reels UGC",
    description: "Micro-influencer sampling at scale, viral Instagram reels production, and D2C repeat purchase flows.",
    services: ["Influencer Marketing", "UGC Ads Making", "Social Media Management"],
  },
  {
    num: "12",
    code: "FIN",
    name: "FinTech & Professional Services",
    tag: "High-Intent SEO · Lead Gen",
    description: "High-intent search capture, Google Ads with strict CAC targets, and compliance-ready landing pages.",
    services: ["AI-Assisted SEO", "Digital Marketing", "Full-Stack Development"],
  },
];

export default function WorkPage() {
  return (
    <>
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
            PORTFOLIO &amp; CASE SECTORS
          </span>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(38px, 5.2vw, 64px)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "24px",
              maxWidth: "750px",
            }}
          >
            Twelve sectors. One format we{" "}
            <span className="gradient-text">know cold.</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              maxWidth: "600px",
              lineHeight: "1.65",
            }}
          >
            Client names withheld by request. Sector, audience size, and scope of work are
            accurate — full case details available on a call.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "80px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {sectors.map((sector) => (
              <div
                key={sector.num}
                className="card"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    padding: "32px",
                    background: "radial-gradient(circle at 50% 20%, rgba(245,185,46,0.06) 0%, transparent 70%)",
                    borderBottom: "1px solid var(--border-card)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "28px",
                        color: "var(--accent)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {sector.num}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--text-faint)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border-card)",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {sector.code}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {sector.name}
                  </h3>

                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "12px",
                      color: "var(--accent)",
                      fontWeight: 600,
                      marginBottom: "16px",
                    }}
                  >
                    {sector.tag}
                  </span>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      lineHeight: "1.65",
                    }}
                  >
                    {sector.description}
                  </p>
                </div>

                <div style={{ padding: "24px 32px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--text-faint)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "12px",
                    }}
                  >
                    Delivered Services
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {sector.services.map((svc) => (
                      <span
                        key={svc}
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-card)",
                          padding: "4px 10px",
                          borderRadius: "8px",
                        }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "80px",
              padding: "60px 48px",
              borderRadius: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                color: "var(--text-primary)",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              Don&apos;t see your exact sector?
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--text-muted)",
                maxWidth: "520px",
                margin: "0 auto 32px",
                lineHeight: "1.65",
              }}
            >
              Our automation, advertising, and development systems adapt to any growth-focused business model.
            </p>
            <Link href="/contact" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span>Book a 30-min Audit Call</span>
              <ArrowIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
