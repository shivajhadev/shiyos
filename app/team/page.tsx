"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import type { TeamStoreData } from "@/lib/team-store";

const defaultFallbackData: TeamStoreData = {
  founder: {
    name: "Shiyo",
    role: "Founder & CEO",
    tagline: "Visionary behind Shiyos. 3+ years building brands, automating growth, and engineering results.",
    initials: "S",
    gradient: "linear-gradient(135deg, #F5B92E 0%, #e8a010 100%)",
    image: "",
    experienceYears: "3+",
    brandsCount: "150+",
    teamSize: "15",
    storyTitle: "About Shiyos Technologies",
    storyParagraph1: "Shiyos Technologies was founded in 2021 with a single mission — to give growing brands access to the same level of strategic talent and technology that only large enterprises could afford.",
    storyParagraph2: "What started as a one-person operation quickly grew into a 15-member powerhouse serving 150+ brands across India and worldwide — spanning e-commerce, AI automation, performance marketing, influencer campaigns, web development, and browser extension tools.",
    storyParagraph3: "Every project at Shiyos is founder-led. Shiyo personally oversees strategy, quality, and outcomes — ensuring every client gets the same commitment as if it were our own brand on the line.",
    milestones: [
      { year: "2021", event: "Shiyos founded — first e-commerce client onboarded" },
      { year: "2022", event: "Team grew to 5 — launched performance marketing & SEO" },
      { year: "2023", event: "Crossed 100 brands — added AI automation & influencer services" },
      { year: "2024", event: "15-member team — Chrome & Edge extension division launched" },
    ],
  },
  members: [
    { id: "m_1", name: "Rahul K.", role: "E-commerce Lead", initials: "RK", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
    { id: "m_2", name: "Priya S.", role: "Performance Marketer", initials: "PS", gradient: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)" },
    { id: "m_3", name: "Arjun M.", role: "AI & Automation", initials: "AM", gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" },
    { id: "m_4", name: "Sneha T.", role: "SEO Strategist", initials: "ST", gradient: "linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)" },
    { id: "m_5", name: "Dev P.", role: "Full-Stack Developer", initials: "DP", gradient: "linear-gradient(135deg, #0f3460 0%, #533483 100%)" },
    { id: "m_6", name: "Neha R.", role: "Graphic Designer", initials: "NR", gradient: "linear-gradient(135deg, #533483 0%, #1a1a2e 100%)" },
    { id: "m_7", name: "Kartik B.", role: "Amazon Ads Specialist", initials: "KB", gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" },
    { id: "m_8", name: "Ananya V.", role: "Video Editor", initials: "AV", gradient: "linear-gradient(135deg, #16213e 0%, #533483 100%)" },
    { id: "m_9", name: "Rohit J.", role: "Influencer Manager", initials: "RJ", gradient: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)" },
    { id: "m_10", name: "Meera C.", role: "Social Media Manager", initials: "MC", gradient: "linear-gradient(135deg, #533483 0%, #0f3460 100%)" },
    { id: "m_11", name: "Siddharth N.", role: "BuyBox Strategist", initials: "SN", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
    { id: "m_12", name: "Pooja L.", role: "Content Writer", initials: "PL", gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)" },
    { id: "m_13", name: "Vivek A.", role: "Chrome Extension Dev", initials: "VA", gradient: "linear-gradient(135deg, #0f3460 0%, #533483 100%)" },
    { id: "m_14", name: "Tanvi G.", role: "Brand Onboarding", initials: "TG", gradient: "linear-gradient(135deg, #533483 0%, #1a1a2e 100%)" },
  ],
};

export default function TeamPage() {
  const [teamData, setTeamData] = useState<TeamStoreData>(defaultFallbackData);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.founder && data.members) {
          setTeamData(data);
        }
      })
      .catch((err) => console.error("Could not load dynamic team data:", err));
  }, []);

  const { founder, members } = teamData;

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "100px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,185,46,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div
            className="section-label"
            style={{ display: "inline-flex", marginBottom: "20px" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "7px" }}>●</span>
            Founder-led · India · Working Worldwide
          </div>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "20px",
            }}
          >
            Meet Our <span className="gradient-text">Team</span>
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-muted)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {members.length + 1} specialists. One mission. Engineering growth for brands across
            e-commerce, digital marketing, AI automation, and beyond.
          </p>
        </div>

        {/* ── FOUNDER — 2-col layout ── */}
        <div
          className="founder-section"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          {/* LEFT — Founder card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "24px",
                padding: "48px 40px",
                textAlign: "center",
                width: "100%",
                maxWidth: "380px",
                position: "relative",
                boxShadow: "0 0 80px rgba(245,185,46,0.08), var(--shadow-card)",
              }}
            >
              {/* Founder badge */}
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--accent-gradient)",
                  color: "#0a0a0a",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "4px 18px",
                  borderRadius: "9999px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                ★ Founder
              </div>

              {/* Avatar / Photo */}
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: founder.gradient || "var(--accent-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: "0 0 0 6px rgba(245,185,46,0.15), 0 0 60px rgba(245,185,46,0.25)",
                  fontSize: "56px",
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-0.02em",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {founder.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.image}
                    alt={founder.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  founder.initials || founder.name.charAt(0)
                )}

                {/* Online indicator */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    border: "3px solid var(--bg-card)",
                    boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                    zIndex: 2,
                  }}
                />
              </div>

              <div
                style={{
                  fontWeight: 800,
                  fontSize: "32px",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                }}
              >
                {founder.name}
              </div>
              <div
                className="gradient-text"
                style={{
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {founder.role}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {founder.tagline}
              </p>

              {/* Stats row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px",
                  marginTop: "28px",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {[
                  { val: founder.brandsCount || "150+", lbl: "Brands" },
                  { val: founder.experienceYears || "3+yrs", lbl: "Experience" },
                  { val: founder.teamSize || `${members.length + 1}`, lbl: "Team Size" },
                ].map(({ val, lbl }) => (
                  <div key={lbl}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "20px",
                        color: "var(--accent)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {val}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--text-faint)",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: "2px",
                      }}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — About Shiyos Technologies Story */}
          <div>
            <div
              className="section-label"
              style={{ display: "inline-flex", marginBottom: "20px" }}
            >
              <span style={{ color: "var(--accent)", fontSize: "7px" }}>●</span>
              Our Story
            </div>

            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "20px",
              }}
            >
              About{" "}
              <span className="gradient-text">Shiyos</span>{" "}
              Technologies
            </h2>

            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "16px" }}>
              {founder.storyParagraph1}
            </p>

            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "16px" }}>
              {founder.storyParagraph2}
            </p>

            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "32px" }}>
              {founder.storyParagraph3}
            </p>

            {/* Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {founder.milestones?.map(({ year, event }) => (
                <div key={year} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      background: "rgba(245,185,46,0.1)",
                      border: "1px solid rgba(245,185,46,0.25)",
                      fontWeight: 800,
                      fontSize: "12px",
                      color: "var(--accent)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {year}
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, paddingTop: "3px", margin: 0 }}>
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section divider */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              color: "var(--text-faint)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ width: "60px", height: "1px", background: "var(--border-strong)", display: "inline-block" }} />
            The Team
            <span style={{ width: "60px", height: "1px", background: "var(--border-strong)", display: "inline-block" }} />
          </div>
        </div>

        {/* ── TEAM GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
          className="team-grid"
        >
          {members.map((member) => (
            <div
              key={member.id || member.name}
              className="card"
              style={{
                padding: "28px 20px 24px",
                textAlign: "center",
                cursor: "default",
              }}
            >
              {/* Avatar / Custom Photo */}
              <div
                style={{
                  width: "76px",
                  height: "76px",
                  borderRadius: "50%",
                  background: member.gradient || "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  overflow: "hidden",
                  border: member.image ? "2px solid var(--accent)" : "1px solid var(--border-strong)",
                }}
              >
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  member.initials || member.name.charAt(0)
                )}
              </div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--accent)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                {member.role}
              </div>

              {member.category && (
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-faint)",
                    marginTop: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {member.category}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "80px",
            textAlign: "center",
            padding: "48px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            borderRadius: "24px",
          }}
        >
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Want to work with this team?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              maxWidth: "460px",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Every account gets a dedicated lead strategist, founder oversight, and direct WhatsApp communication.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span>Get in Touch</span>
              <ArrowIcon size={14} />
            </Link>
            <a
              href="https://wa.me/917986408226?text=Hi%2C%20I%27d%20like%20to%20join%20the%20Shiyos%20team"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "9999px",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                color: "var(--text-muted)",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} /> Join the Team
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
