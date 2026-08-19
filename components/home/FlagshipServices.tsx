"use client";

import Link from "next/link";
import { Code, Cpu, TrendingUp, Sparkles } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";

interface Pillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Code;
  services: { name: string; slug: string; tag: string }[];
}

const pillars: Pillar[] = [
  {
    id: "build",
    number: "01",
    title: "BUILD",
    tagline: "Software & Web Infrastructure",
    description:
      "Enterprise-grade web applications, Shopify stores, and digital infrastructure engineered for speed, conversions, and scale.",
    icon: Code,
    services: [
      { name: "Website Design & Development", slug: "website-development", tag: "Full-Stack" },
      { name: "Shopify & E-commerce Stores", slug: "shopify-development", tag: "Headless & Liquid" },
      { name: "Custom Software & Web Apps", slug: "software-support", tag: "Scalable Arch" },
    ],
  },
  {
    id: "automate",
    number: "02",
    title: "AUTOMATE",
    tagline: "AI Workflows & Operations",
    description:
      "End-to-end intelligent automation for e-commerce, internal processes, and generative AI UGC video pipelines.",
    icon: Cpu,
    services: [
      { name: "Advance AI Automation", slug: "ai-automation", tag: "Intelligent Workflows" },
      { name: "AI UGC Video Ads", slug: "ai-ugc-video-ads", tag: "Generative Video" },
      { name: "E-commerce Automation", slug: "ecommerce-automation", tag: "Sync & Repricing" },
    ],
  },
  {
    id: "grow",
    number: "03",
    title: "GROW",
    tagline: "Performance & Marketplace Scale",
    description:
      "Data-backed performance marketing, marketplace advertising, and organic search strategies optimized strictly for ROAS and revenue.",
    icon: TrendingUp,
    services: [
      { name: "Performance Marketing (Meta & Google)", slug: "performance-marketing", tag: "High-ROI Media" },
      { name: "Marketplace Ads (Amazon & Flipkart)", slug: "ecommerce-ads", tag: "ACoS Optimization" },
      { name: "AI-Assisted SEO & Search Growth", slug: "ai-assisted-seo", tag: "Organic Authority" },
    ],
  },
];

export default function FlagshipServices() {
  return (
    <section
      style={{
        paddingTop: "64px",
        paddingBottom: "64px",
        position: "relative",
      }}
    >
      <div className="container-custom">
        <div style={{ marginBottom: "16px" }}>
          <span className="section-label">CORE FRAMEWORK</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 4.2vw, 52px)",
                lineHeight: "1.12",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                maxWidth: "680px",
              }}
            >
              Engineered for scale in three pillars:{" "}
              <span className="gradient-text">Build. Automate. Grow.</span>
            </h2>
          </div>

          <Link href="/services" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span>View full 30+ service directory</span>
            <ArrowIcon size={14} />
          </Link>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="pillars-grid"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="card"
                style={{
                  padding: "36px 30px",
                  borderRadius: "20px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "460px",
                }}
              >
                <div>
                  {/* Top: Icon + Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "28px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background:
                          pillar.id === "build"
                            ? "rgba(37, 99, 235, 0.12)"
                            : pillar.id === "automate"
                            ? "rgba(6, 182, 212, 0.12)"
                            : "rgba(59, 130, 246, 0.12)",
                        border:
                          pillar.id === "build"
                            ? "1px solid rgba(37, 99, 235, 0.25)"
                            : pillar.id === "automate"
                            ? "1px solid rgba(6, 182, 212, 0.25)"
                            : "1px solid rgba(59, 130, 246, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color:
                          pillar.id === "build"
                            ? "#2563EB"
                            : pillar.id === "automate"
                            ? "#06B6D4"
                            : "#3B82F6",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontSize: "14px",
                        fontWeight: 800,
                        color: "var(--text-faint)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color:
                        pillar.id === "build"
                          ? "#2563EB"
                          : pillar.id === "automate"
                          ? "#06B6D4"
                          : "var(--brand-text)",
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      marginBottom: "6px",
                    }}
                  >
                    {pillar.tagline}
                  </div>
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: "26px",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      marginBottom: "14px",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      lineHeight: "1.65",
                      marginBottom: "28px",
                    }}
                  >
                    {pillar.description}
                  </p>

                  {/* Key Services in this Pillar */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {pillar.services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border)",
                          textDecoration: "none",
                          color: "var(--text-primary)",
                          transition: "border-color 150ms ease, transform 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37, 99, 235, 0.4)";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(2px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1, paddingRight: "8px" }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                            {s.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "1px" }}>
                            {s.tag}
                          </div>
                        </div>
                        <ArrowIcon size={14} style={{ color: "var(--accent)" }} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  <Link
                    href={`/services#${pillar.id}`}
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--accent)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Explore all {pillar.title.toLowerCase()} capabilities</span>
                    <ArrowIcon size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory Router Strip */}
        <div
          style={{
            marginTop: "32px",
            padding: "24px 32px",
            borderRadius: "16px",
            border: "1px solid var(--border-card)",
            background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, var(--bg-card) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(37,99,235,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563EB",
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                Looking for all 7 specialized disciplines?
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Browse our complete taxonomy of 30+ bespoke services and technical capabilities.
              </div>
            </div>
          </div>

          <Link href="/services" className="btn-primary" style={{ padding: "10px 22px", fontSize: "13px" }}>
            Explore Services Directory
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

