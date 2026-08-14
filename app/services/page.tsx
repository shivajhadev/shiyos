import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, flagshipServices } from "@/lib/services-data";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Every Service Shiyos Offers",
  description:
    "Browse all 7 service categories and 30+ individual services offered by Shiyos Technologies — from e-commerce automation and AI to performance marketing, influencer campaigns, and website development.",
};

export default function ServicesPage() {
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
            ALL SERVICES DIRECTORY
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
              maxWidth: "750px",
            }}
          >
            Every service Shiyos{" "}
            <span className="gradient-text">offers.</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              maxWidth: "580px",
              lineHeight: "1.65",
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            Seven specialized categories, 30+ individual services — all under one roof,
            all delivered by the same founder-led team.
          </p>
        </div>
      </section>

      {/* Flagship Services Section */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-custom">
          <div style={{ marginBottom: "32px" }}>
            <span className="section-label">FLAGSHIP CORE OFFERINGS</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {flagshipServices.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "260px",
                    borderRadius: "16px",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "12px",
                      }}
                    >
                      {svc.tagline}
                    </div>
                    <h3
                      style={{
                        fontFamily: '"Syne", sans-serif',
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "var(--text-primary)",
                        marginBottom: "12px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {svc.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-muted)",
                        lineHeight: "1.65",
                      }}
                    >
                      {svc.description}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "24px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    View service details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories Breakdown */}
      <section style={{ paddingTop: "40px", paddingBottom: "120px" }}>
        <div className="container-custom">
          {serviceCategories.map((cat) => (
            <div key={cat.slug} id={cat.slug} style={{ marginBottom: "88px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "32px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid var(--border-card)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(245, 185, 46, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: '"Syne", sans-serif',
                      fontWeight: 800,
                      fontSize: "28px",
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {cat.name}
                  </h2>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
                    {cat.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "14px",
                }}
              >
                {cat.services.map((svc) => (
                  <Link key={svc.slug} href={`/services/${svc.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      className="card"
                      style={{
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "130px",
                        borderRadius: "12px",
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-card)",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                          <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)", fontFamily: '"Syne", sans-serif' }}>
                            {svc.name}
                          </span>
                          {svc.isFlagship && (
                            <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>★</span>
                          )}
                        </div>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                          {svc.tagline}
                        </p>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)", marginTop: "12px" }}>
                        Explore →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
