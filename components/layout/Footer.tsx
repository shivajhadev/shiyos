"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceCategories } from "@/lib/services-data";
import { Sparkles, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  const topServices = [
    { name: "E-commerce Automation", slug: "ecommerce-automation" },
    { name: "AI Automation & Intelligence", slug: "ai-automation" },
    { name: "AI-Assisted SEO", slug: "ai-assisted-seo" },
    { name: "Performance Marketing", slug: "performance-marketing" },
    { name: "Influencer Marketing", slug: "influencer-marketing" },
    { name: "Website Design & Development", slug: "website-design-development" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-card)",
        backgroundColor: "var(--bg-surface)",
        paddingTop: "96px",
        paddingBottom: "48px",
        position: "relative",
      }}
    >
      <div className="container-custom">
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "72px",
          }}
          className="footer-grid"
        >
          {/* Brand block */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--accent-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "17px",
                  color: "#0a0a0a",
                  boxShadow: "0 0 16px rgba(245, 185, 46, 0.3)",
                }}
              >
                S
              </div>
              <span
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "20px",
                  color: "var(--text-primary)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                SHIYOS
              </span>
            </Link>

            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                lineHeight: "1.7",
                marginBottom: "24px",
                maxWidth: "280px",
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              Full-service IT, e-commerce growth, and digital marketing studio.
              Founder-led, results-driven.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px", fontSize: "13px" }}>
              <a
                href="tel:+917986408226"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
              >
                <Phone size={14} style={{ color: "var(--accent)" }} /> +91 79864 08226
              </a>
              <a
                href="mailto:info.shiyos@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
              >
                <Mail size={14} style={{ color: "var(--accent)" }} /> info.shiyos@gmail.com
              </a>
              <a
                href="https://wa.me/917986408226"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#25D366",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                <MessageCircle size={14} /> WhatsApp Chat
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "LinkedIn", href: "#", char: "in" },
                { label: "Instagram", href: "#", char: "ig" },
                { label: "YouTube", href: "#", char: "yt" },
                { label: "Twitter", href: "#", char: "x" },
              ].map(({ label, href, char }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-card)",
                    background: "var(--bg-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "border-color 150ms, color 150ms",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-card)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                  }}
                >
                  {char}
                </a>
              ))}
            </div>
          </div>

          {/* Top Services column */}
          <div>
            <div className="section-label" style={{ marginBottom: "20px" }}>SERVICES</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {topServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms, transform 150ms",
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  }}
                >
                  {svc.name}
                </Link>
              ))}
              <Link
                href="/services"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  textDecoration: "none",
                  marginTop: "6px",
                }}
              >
                All 30+ services →
              </Link>
            </nav>
          </div>

          {/* Categories column */}
          <div>
            <div className="section-label" style={{ marginBottom: "20px" }}>DISCIPLINES</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {serviceCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/services#${cat.slug}`}
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms, transform 150ms",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  }}
                >
                  <Sparkles size={11} style={{ color: "var(--accent)" }} />
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company column */}
          <div>
            <div className="section-label" style={{ marginBottom: "20px" }}>STUDIO</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/about", label: "About Studio" },
                { href: "/team", label: "Meet Our Team" },
                { href: "/work", label: "Selected Work" },
                { href: "/journal", label: "Journal & Insights" },
                { href: "/contact", label: "Get a Free Audit" },
                { href: "/admin", label: "Admin Console 🔒" },
                { href: "https://wa.me/917986408226", label: "Direct WhatsApp" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms, transform 150ms",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-card)",
            paddingTop: "32px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--text-faint)", maxWidth: "520px", lineHeight: "1.6" }}>
            Shiyos Technologies — full-service IT, e-commerce growth, and digital marketing studio helping brands automate, advertise, and scale across every channel.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-faint)" }}>
              © {currentYear} shiyostechnologies.com
            </span>
            <Link
              href="/privacy"
              style={{ fontSize: "13px", color: "var(--text-faint)", textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-faint)")}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              style={{ fontSize: "13px", color: "var(--text-faint)", textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-faint)")}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
