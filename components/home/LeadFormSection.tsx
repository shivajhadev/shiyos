"use client";

import LeadForm from "./LeadForm";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function LeadFormSection() {
  return (
    <section
      style={{
        paddingTop: "48px",
        paddingBottom: "80px",
        position: "relative",
      }}
    >
      <div className="container-custom">
        <div style={{ marginBottom: "14px" }}>
          <span className="section-label">START A PROJECT</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left — studio details */}
          <div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(34px, 4.5vw, 54px)",
                lineHeight: "1.12",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "24px",
              }}
            >
              Tell us what you're trying to{" "}
              <span className="gradient-text">grow.</span>
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "var(--text-muted)",
                lineHeight: "1.7",
                marginBottom: "48px",
              }}
            >
              We'll come back to you within 4 hours with a clear plan — no fluff, no obligation.
              The founders review every submission personally.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a
                href="tel:+917986408226"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card)",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  transition: "border-color 150ms, transform 150ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-card)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(245,185,46,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(245,185,46,0.25)",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={18} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                    Call Direct
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    +91 79864 08226
                  </div>
                </div>
              </a>

              <a
                href="mailto:info.shiyos@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card)",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  transition: "border-color 150ms, transform 150ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-card)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(245,185,46,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(245,185,46,0.25)",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                    Email
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    info.shiyos@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/917986408226"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card)",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  transition: "border-color 150ms, transform 150ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#25D366";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-card)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(37,211,102,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(37,211,102,0.25)",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={18} style={{ color: "#25D366" }} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                    WhatsApp
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    Fastest — within 1 hour
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — the form */}
          <div
            style={{
              padding: "44px",
              borderRadius: "24px",
              border: "1px solid var(--border-card)",
              background: "var(--bg-card)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <LeadForm sourcePage="homepage-section" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
