"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";

const sectors = [
  {
    num: "01",
    code: "JWL",
    name: "Fine Jewellery & Luxury",
    subtitle: "D2C & Marketplace Growth",
    description: "Reels concepting, creator campaigns, Amazon A+ content, and Meta performance ads.",
    tag: "D2C · Amazon",
  },
  {
    num: "02",
    code: "ECC",
    name: "Consumer Electronics",
    subtitle: "Quick Commerce & Amazon",
    description: "Catalog repricing, BuyBox management, Blinkit ads, and full inventory automation.",
    tag: "Marketplaces",
  },
  {
    num: "03",
    code: "FMCG",
    name: "Food & Beverage Brands",
    subtitle: "Multi-Channel Launch",
    description: "Brand registry, launch campaigns, creator seeding, and automated reorder flows.",
    tag: "Launch · Ads",
  },
  {
    num: "04",
    code: "SFT",
    name: "SaaS & AI Platforms",
    subtitle: "Full-Funnel Acquisition",
    description: "AI-assisted technical SEO, high-intent landing pages, and Google Search campaigns.",
    tag: "SEO · Web",
  },
  {
    num: "05",
    code: "INF",
    name: "Creator-Led DTC Brands",
    subtitle: "Viral Creator Seeding",
    description: "End-to-end influencer campaigns across YouTube and Instagram with full UTM tracking and attribution.",
    tag: "Influencer",
  },
  {
    num: "06",
    code: "AUT",
    name: "Automotive & Accessories",
    subtitle: "Multi-Channel High ROAS",
    description: "Google Shopping, Amazon Sponsored Brands, and dynamic retargeting across Meta channels.",
    tag: "Ads · Scale",
  },
  {
    num: "07",
    code: "MED",
    name: "Health & Nutraceuticals",
    subtitle: "Authority SEO & Content",
    description: "Scientific SEO authority building, educational reels production, and founder personal branding.",
    tag: "SEO · Health",
  },
  {
    num: "08",
    code: "FSH",
    name: "Apparel & Fashion Labels",
    subtitle: "Shopify & Performance Ads",
    description: "High-speed Shopify storefront, automated inventory routing, and Meta catalog sales ads.",
    tag: "DTC · Shopify",
  },
  {
    num: "09",
    code: "HOM",
    name: "Home Decor & Smart Living",
    subtitle: "3D Renders & Amazon Scale",
    description: "Photorealistic 3D lifestyle visuals, Amazon storefront overhaul, and multi-tier PPC ads.",
    tag: "3D · Amazon",
  },
  {
    num: "10",
    code: "EDT",
    name: "EdTech & Info Products",
    subtitle: "Funnel Automation & Ads",
    description: "Webinar funnels, lead qualification chatbots, high-converting VSL landing pages, and scale ad campaigns.",
    tag: "Funnels · AI",
  },
  {
    num: "11",
    code: "BTY",
    name: "Beauty, Skincare & Cosmetics",
    subtitle: "Creator Seeding & Reels UGC",
    description: "Micro-influencer sampling at scale, viral Instagram reels production, and D2C repeat purchase flows.",
    tag: "Beauty · UGC",
  },
  {
    num: "12",
    code: "FIN",
    name: "FinTech & Professional Services",
    subtitle: "High-Intent SEO & Lead Gen",
    description: "High-intent search capture, Google Ads with strict CAC targets, and compliance-ready landing pages.",
    tag: "FinTech · SEO",
  },
];

export default function WorkTeaser() {
  const [showAll, setShowAll] = useState(false);

  const visibleSectors = showAll ? sectors : sectors.slice(0, 4);

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
          <span className="section-label">SELECTED WORK</span>
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
              fontWeight: 800,
              fontSize: "clamp(34px, 4.5vw, 56px)",
              lineHeight: "1.12",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              maxWidth: "680px",
            }}
          >
            Twelve sectors. One format we{" "}
            <span className="gradient-text">know cold.</span>
          </h2>

          <Link href="/work" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span>View all 12 sectors</span>
            <ArrowIcon size={14} />
          </Link>
        </div>

        <p
          style={{
            fontSize: "15px",
            color: "var(--text-muted)",
            maxWidth: "640px",
            marginBottom: "40px",
            lineHeight: "1.6",
          }}
        >
          Client names withheld by request. Sector, audience size and scope of work are
          accurate — full case details available on a call.
        </p>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="work-teaser-grid"
        >
          {visibleSectors.map((sector) => (
            <div
              key={sector.code}
              className="card"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: "380px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                position: "relative",
              }}
            >
              {/* Card visual area */}
              <div
                style={{
                  height: "200px",
                  padding: "24px",
                  background: "radial-gradient(circle at 50% 40%, rgba(245,185,46,0.08) 0%, #111111 80%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  borderBottom: "1px solid var(--border-card)",
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    alignSelf: "flex-end",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid var(--border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    color: "var(--text-faint)",
                    fontWeight: 700,
                  }}
                >
                  {sector.num}
                </div>

                {/* Center Sector Code */}
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 800,
                      fontSize: "36px",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.04em",
                      display: "block",
                    }}
                  >
                    {sector.code}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {sector.tag}
                  </span>
                </div>

                {/* Bottom spacer */}
                <div style={{ height: "10px" }} />
              </div>

              {/* Card info area */}
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                      lineHeight: "1.3",
                    }}
                  >
                    {sector.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      lineHeight: "1.55",
                    }}
                  >
                    {sector.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text-faint)",
                      fontWeight: 500,
                    }}
                  >
                    {sector.subtitle}
                  </span>
                  <Link
                    href="/work"
                    style={{
                      color: "var(--accent)",
                      fontSize: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <span>Cases</span>
                    <ArrowIcon size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Show More / Show Less Button ── */}
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
            }}
          >
            <span>{showAll ? "Show Less" : `Show More (+${sectors.length - 4} Sectors)`}</span>
            <ChevronDown
              size={16}
              style={{
                transition: "transform 200ms ease",
                transform: showAll ? "rotate(180deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .work-teaser-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .work-teaser-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
