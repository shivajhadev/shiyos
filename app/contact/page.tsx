import type { Metadata } from "next";
import LeadForm from "@/components/home/LeadForm";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Start a Project with Shiyos Technologies",
  description:
    "Get in touch with Shiyos Technologies. Fill out the form and expect a response from the founder within 4 hours. No obligation, no boilerplate decks.",
};

export default function ContactPage() {
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
            DIRECT CONSULTATION
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
              maxWidth: "700px",
            }}
          >
            Start a project with{" "}
            <span className="gradient-text">Shiyos.</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              maxWidth: "560px",
              lineHeight: "1.65",
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            Fill out the form below. The founders review every submission and reply within 4 hours — no junior handoff, no fluff.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "80px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "420px 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="contact-page-grid"
          >
            {/* Left: contact details */}
            <div>
              <h2
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "26px",
                  color: "var(--text-primary)",
                  marginBottom: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                Studio channels
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                {[
                  { icon: Phone, label: "Direct Phone", value: "+91 79864 08226", href: "tel:+917986408226" },
                  { icon: Mail, label: "Official Email", value: "info.shiyos@gmail.com", href: "mailto:info.shiyos@gmail.com" },
                  { icon: MessageCircle, label: "WhatsApp Direct", value: "Instant chat (1-hr response)", href: "https://wa.me/917986408226" },
                  { icon: MapPin, label: "Headquarters", value: "India · Serving Global Accounts", href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "20px",
                      borderRadius: "16px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: "rgba(245, 185, 46, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(245, 185, 46, 0.2)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", textDecoration: "none", fontFamily: '"Syne", sans-serif' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", fontFamily: '"Syne", sans-serif' }}>
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "28px",
                  borderRadius: "18px",
                  border: "1px solid var(--border-card)",
                  background: "linear-gradient(145deg, #151515, #0f0f0f)",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
                  GUARANTEED RESPONSE
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Every enquiry receives an actionable review within <strong style={{ color: "var(--text-primary)" }}>4 business hours</strong>.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div
              style={{
                padding: "48px",
                borderRadius: "24px",
                border: "1px solid var(--border-card)",
                background: "var(--bg-card)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <h2
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "28px",
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Tell us what you're trying to achieve
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "32px", lineHeight: "1.6" }}>
                The more context you provide, the more tailored our initial strategy response will be.
              </p>
              <LeadForm sourcePage="contact-page" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-page-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  );
}
