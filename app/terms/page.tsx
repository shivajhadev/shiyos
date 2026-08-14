import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Shiyos Technologies",
  description: "Terms of service for Shiyos Technologies website and services.",
};

export default function TermsPage() {
  return (
    <>
      <section style={{ paddingTop: "140px", paddingBottom: "80px", backgroundColor: "var(--bg-surface)" }}>
        <div className="container-custom">
          <span className="section-label" style={{ marginBottom: "24px", display: "inline-block" }}>Legal</span>
          <h1 style={{ fontFamily: "Libre Caslon Text, serif", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: "1.1", color: "var(--text-primary)", marginBottom: "16px" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Last updated: August 2025</p>
        </div>
      </section>

      <section style={{ paddingTop: "64px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "720px" }}>
            {[
              {
                heading: "Services",
                content: "Shiyos Technologies provides IT, e-commerce growth, and digital marketing services as agreed in individual service proposals. The website itself is informational; no binding service agreement is formed until a written proposal has been signed by both parties.",
              },
              {
                heading: "Enquiries and lead forms",
                content: "Submitting an enquiry through our website does not constitute a contract or obligation on either side. We will respond to every genuine enquiry, but reserve the right to decline engagements without explanation.",
              },
              {
                heading: "Intellectual property",
                content: "All content on this website — including text, design, graphics, and code — is the property of Shiyos Technologies and may not be reproduced without written permission. Work product delivered to clients becomes the client's property upon full payment, as defined in the relevant service agreement.",
              },
              {
                heading: "Limitation of liability",
                content: "Shiyos Technologies is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services beyond the value of the services paid for in the relevant engagement period.",
              },
              {
                heading: "Governing law",
                content: "These terms are governed by the laws of India. Any disputes will be resolved in the courts of jurisdiction applicable to our registered address.",
              },
              {
                heading: "Changes to these terms",
                content: "We may update these terms at any time. Continued use of the website after changes constitutes acceptance. For questions, contact info.shiyos@gmail.com.",
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
