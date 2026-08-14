import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Shiyos Technologies",
  description: "Privacy policy for Shiyos Technologies website and services.",
};

export default function PrivacyPage() {
  return (
    <>
      <section style={{ paddingTop: "140px", paddingBottom: "80px", backgroundColor: "var(--bg-surface)" }}>
        <div className="container-custom">
          <span className="section-label" style={{ marginBottom: "24px", display: "inline-block" }}>Legal</span>
          <h1 style={{ fontFamily: "Libre Caslon Text, serif", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: "1.1", color: "var(--text-primary)", marginBottom: "16px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Last updated: August 2025</p>
        </div>
      </section>

      <section style={{ paddingTop: "64px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "720px" }}>
            {[
              {
                heading: "Information we collect",
                content: "When you submit a lead form on our website, we collect your name, email address, phone number, and any information you provide in the message field. We also collect basic analytics data (page views, referrer source) to understand how visitors use our website.",
              },
              {
                heading: "How we use your information",
                content: "We use the information you submit to: (a) respond to your enquiry; (b) contact you about services that may be relevant to your stated needs; (c) improve our website and service offering. We do not sell your information to third parties.",
              },
              {
                heading: "Data storage",
                content: "Lead submissions are stored in Supabase (a Postgres database hosted on AWS infrastructure). Data is encrypted at rest and in transit. We retain lead data for a maximum of 2 years unless you request deletion earlier.",
              },
              {
                heading: "Cookies",
                content: "We use only essential cookies required for the website to function (e.g., theme preference). We do not use tracking or advertising cookies. No third-party analytics platforms with user-level tracking are active on this site.",
              },
              {
                heading: "Your rights",
                content: "You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, email us at info.shiyos@gmail.com with the subject line 'Data Request'.",
              },
              {
                heading: "Contact",
                content: "For privacy-related enquiries, contact us at: info.shiyos@gmail.com or via WhatsApp at +91 79864 08226.",
              },
            ].map(({ heading, content }) => (
              <div key={heading} style={{ marginBottom: "40px" }}>
                <h2 style={{ fontFamily: "Libre Caslon Text, serif", fontWeight: 700, fontSize: "22px", color: "var(--text-primary)", marginBottom: "12px" }}>
                  {heading}
                </h2>
                <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: "1.7" }}>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
