import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allServices } from "@/lib/services-data";
import LeadForm from "@/components/home/LeadForm";
import { Check, Sparkles } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allServices.map((svc) => ({ slug: svc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} — Shiyos Technologies`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = allServices
    .filter((s) => s.categorySlug === service.categorySlug && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "72px",
          position: "relative",
          borderBottom: "1px solid var(--border-card)",
        }}
      >
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
              fontSize: "13px",
              color: "var(--text-faint)",
            }}
          >
            <Link href="/" style={{ color: "var(--text-faint)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: "var(--text-faint)", textDecoration: "none" }}>Services</Link>
            <span>/</span>
            <Link href={`/services#${service.categorySlug}`} style={{ color: "var(--text-faint)", textDecoration: "none" }}>
              {service.category}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{service.name}</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                background: "rgba(245, 185, 46, 0.1)",
                padding: "4px 12px",
                borderRadius: "9999px",
                border: "1px solid rgba(245, 185, 46, 0.25)",
              }}
            >
              {service.tagline}
            </span>
          </div>

          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(38px, 5vw, 60px)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "24px",
              maxWidth: "750px",
            }}
          >
            {service.name}
          </h1>
          <p
            style={{
              fontSize: "19px",
              color: "var(--text-muted)",
              maxWidth: "640px",
              lineHeight: "1.65",
            }}
          >
            {service.description}
          </p>
        </div>
      </section>

      {/* Main content + sticky form */}
      <section style={{ paddingTop: "80px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: "80px",
              alignItems: "start",
            }}
            className="service-detail-grid"
          >
            {/* Left: content */}
            <div>
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "28px",
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em",
                }}
              >
                What's included in this engagement
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
                {getServiceDetails(service.slug).map((detail, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "18px 22px",
                      borderRadius: "14px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(245, 185, 46, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <Check size={12} style={{ color: "var(--accent)" }} />
                    </div>
                    <span style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: "1.6" }}>
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shiyos standard card */}
              <div
                style={{
                  padding: "36px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-card)",
                  background: "linear-gradient(145deg, #151515, #0f0f0f)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    marginBottom: "12px",
                  }}
                >
                  THE SHIYOS STANDARD
                </div>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "12px",
                  }}
                >
                  Direct founder accountability
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.7" }}>
                  Every {service.name.toLowerCase()} account is personally managed by the founders.
                  You get weekly strategic reviews, continuous optimization, and measurable ROI.
                </p>
              </div>

              {/* Related services */}
              {related.length > 0 && (
                <div style={{ marginTop: "64px" }}>
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: "22px",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      marginBottom: "20px",
                    }}
                  >
                    Related services in this discipline
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/services/${rel.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px 20px",
                          borderRadius: "12px",
                          border: "1px solid var(--border-card)",
                          background: "var(--bg-card)",
                          textDecoration: "none",
                          color: "var(--text-primary)",
                          transition: "border-color 150ms, transform 150ms",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Sparkles size={14} style={{ color: "var(--accent)" }} />
                          <span style={{ fontWeight: 700, fontSize: "14px" }}>
                            {rel.name}
                          </span>
                        </div>
                        <ArrowIcon size={14} style={{ color: "var(--accent)" }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky lead form */}
            <div style={{ position: "sticky", top: "100px" }}>
              <div
                style={{
                  padding: "36px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    marginBottom: "8px",
                  }}
                >
                  START THIS SERVICE
                </div>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "22px",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                  }}
                >
                  Get an audit for {service.name}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "24px" }}>
                  Drop your contact info — the founder will reply within 4 hours.
                </p>
                <LeadForm
                  sourcePage={`service-${service.slug}`}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .service-detail-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  );
}

function getServiceDetails(slug: string): string[] {
  const defaults: Record<string, string[]> = {
    "ecommerce-automation": [
      "End-to-end inventory sync and automated dynamic repricing across Amazon, Flipkart, and D2C stores",
      "Order routing and fulfillment automation to reduce manual errors and turnaround times",
      "Custom workflow automation built on Zapier, Make, or bespoke backend pipelines",
      "Real-time unified dashboard for orders, sales velocity, and multi-channel metrics",
      "Bi-weekly optimization sprints to refine automation logic",
    ],
    "ecommerce-ads": [
      "Amazon Sponsored Products, Sponsored Brands, and Video campaign structure & bid management",
      "Flipkart PLA and display advertising managed for maximum ROAS and ACoS targets",
      "Quick Commerce (Blinkit, Zepto, Swiggy Instamart) promotional campaigns and brand banners",
      "In-depth competitor keyword harvesting using Helium 10 and Amazon Brand Analytics",
      "Weekly performance reviews tied directly to net profit, not vanity clicks",
    ],
    "ai-automation": [
      "Discovery and end-to-end mapping of repetitive manual workflows across your team",
      "Custom AI agents and pipelines using OpenAI, Claude, and Gemini with function calling",
      "Automated content generation, product metadata generation, and customer communication workflows",
      "Deep integration with your current software stack (CRM, ERP, Shopify, warehouse systems)",
      "Continuous prompt engineering and accuracy monitoring",
    ],
    "ai-ugc-video-ads": [
      "Hyper-realistic AI creator generation and avatar scripting tailored to your target audience",
      "High-converting direct-response creative frameworks: 5+ scroll-stopping hooks & multiple CTA variations per concept",
      "Studio-grade AI voiceovers, voice cloning, and multilingual localization across 20+ languages",
      "Rapid creative volume: test 20–50 video variations weekly at 90% lower cost than traditional video shoots",
      "Platform-optimized delivery formatted for Meta Reels, TikTok, and YouTube Shorts with native subtitles & sound design",
      "Weekly performance reviews and creative iteration based on actual ROAS, CTR, and hook retention rates",
    ],
    "ai-assisted-seo": [
      "Full technical SEO overhaul: Core Web Vitals, crawl indexability, schema markup, and site architecture",
      "AI-driven search intent mapping based on real commercial search queries",
      "On-page optimization across meta titles, headings, internal links, and structured content",
      "AI-assisted content briefs and execution reviewed by senior search specialists",
      "Monthly keyword ranking tracker and organic revenue attribution report",
    ],
    "performance-marketing": [
      "Full-funnel Meta (Facebook + Instagram) and Google Ads campaign architecture",
      "Continuous creative testing: hooks, UGC variations, static banners, and video formats",
      "Conversion API, pixel, and server-side tracking audited and hardened before scaling budget",
      "Audience segmentation, retargeting funnels, and LTV-focused bidding strategies",
      "Weekly ROAS and revenue reporting with zero fluff",
    ],
    "influencer-marketing": [
      "Creator scouting and vetting across YouTube, Instagram, and TikTok tailored to your demographic",
      "Creative brief development, pricing negotiations, and contract management",
      "Rigorous content review and script alignment before any post goes live",
      "Performance attribution: UTM tracking, affiliate codes, and post-campaign conversion analysis",
      "End-to-end campaign post-mortem with creator-by-creator ROI breakdown",
    ],
    "website-design-development": [
      "High-speed, conversion-engineered website development using Next.js, React, or Shopify",
      "Mobile-first user experience designed to maximize checkout and lead form conversions",
      "Clean semantic code structure with Core Web Vitals score exceeding 95+",
      "Custom UI animations with Framer Motion that feel fluid and premium",
      "Comprehensive post-launch technical support and ongoing iteration",
    ],
    "on-demand-extension": [
      "Dedicated senior e-commerce specialists integrated directly into your workflow",
      "Flexible augmentation for product launches, festive sales, or ongoing support",
      "Direct access to our designers, media buyers, developers, and copywriters",
      "Single point of communication with the founders — no juggling separate freelancers",
      "Clear time logs and outcome-focused delivery sprints",
    ],
  };

  return (
    defaults[slug] || [
      "Comprehensive initial audit and strategy session with the founders",
      "Tailored execution plan aligned with your quarterly revenue targets",
      "In-house delivery by experienced practitioners — zero subcontracting",
      "Transparent reporting with metrics that matter to your bottom line",
      "Continuous iteration based on live market feedback",
    ]
  );
}
