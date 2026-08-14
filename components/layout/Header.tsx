"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { serviceCategories } from "@/lib/services-data";
import { Menu, X, Sun, Moon, ChevronDown, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const serviceMenuRef = useRef<HTMLDivElement>(null);
  const serviceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setServiceMenuOpen(false);
  }, [pathname]);

  const handleServiceMouseEnter = () => {
    if (serviceTimerRef.current) clearTimeout(serviceTimerRef.current);
    setServiceMenuOpen(true);
  };

  const handleServiceMouseLeave = () => {
    serviceTimerRef.current = setTimeout(() => setServiceMenuOpen(false), 150);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "var(--header-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-card)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 250ms ease",
          height: scrolled ? "64px" : "76px",
        }}
      >
        <div
          className="container-custom"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
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
                flexShrink: 0,
                boxShadow: "0 0 16px rgba(245, 185, 46, 0.35)",
              }}
            >
              S
            </div>
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: "19px",
                color: "var(--text-primary)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              SHIYOS
            </span>
          </Link>

          {/* Desktop Navigation (> 1024px) */}
          <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "28px" }}>
            <Link
              href="/about"
              style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              About
            </Link>

            {/* Services Mega Menu */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={handleServiceMouseEnter}
              onMouseLeave={handleServiceMouseLeave}
              ref={serviceMenuRef}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: serviceMenuOpen ? "var(--accent)" : "var(--text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 0",
                  transition: "color 150ms",
                }}
              >
                Services
                <ChevronDown
                  size={14}
                  style={{
                    transition: "transform 200ms",
                    transform: serviceMenuOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {serviceMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "680px",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "16px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                    padding: "24px",
                    animation: "fade-in-up 0.15s ease forwards",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 28px" }}>
                    {serviceCategories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/services#${cat.slug}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--accent)",
                            textDecoration: "none",
                            marginBottom: "8px",
                            fontFamily: '"Space Grotesk", sans-serif',
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          <Sparkles size={12} /> {cat.name}
                        </Link>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          {cat.services.slice(0, 3).map((svc) => (
                            <Link
                              key={svc.slug}
                              href={`/services/${svc.slug}`}
                              style={{
                                fontSize: "13px",
                                color: "var(--text-muted)",
                                textDecoration: "none",
                                padding: "4px 0",
                                transition: "color 150ms, transform 150ms",
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.color = "var(--text-primary)";
                                e.currentTarget.style.transform = "translateX(3px)";
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.color = "var(--text-muted)";
                                e.currentTarget.style.transform = "none";
                              }}
                            >
                              {svc.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>
                      7 specialized growth disciplines
                    </span>
                    <Link
                      href="/services"
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textDecoration: "none",
                      }}
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/work"
              style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Work
            </Link>
            <Link
              href="/journal"
              style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Journal
            </Link>
            <Link
              href="/team"
              style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Meet Our Team
            </Link>
            <Link
              href="/contact"
              style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions: Theme Toggle + WhatsApp + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Theme Toggle (Always visible on mobile & desktop) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--border-strong)",
                background: "var(--bg-card)",
                cursor: "pointer",
                color: "var(--text-primary)",
                transition: "border-color 150ms, color 150ms, transform 150ms",
                flexShrink: 0,
              }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={16} style={{ color: "var(--accent)" }} /> : <Moon size={16} style={{ color: "#3b82f6" }} />}
            </button>

            {/* WhatsApp (Desktop & Tablet) */}
            <a
              href="https://wa.me/917986408226?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
              style={{
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "9999px",
                background: "#25D366",
                color: "#0a0a0a",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>

            {/* Desktop Audit CTA */}
            <Link
              href="/contact"
              className="btn-primary hidden md:inline-flex"
              style={{ fontSize: "13px", padding: "8px 18px", flexShrink: 0 }}
            >
              Get a free audit →
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: "1px solid var(--border-strong)",
                background: mobileOpen ? "var(--accent)" : "var(--bg-card)",
                color: mobileOpen ? "#0a0a0a" : "var(--text-primary)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Fullscreen Navigation Drawer ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "64px",
            backgroundColor: "var(--bg)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            padding: "24px 20px 48px",
            animation: "fade-in 0.2s ease",
          }}
          className="lg:hidden"
        >
          {/* Quick theme status banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
              {theme === "dark" ? <Moon size={15} style={{ color: "var(--accent)" }} /> : <Sun size={15} style={{ color: "#f59e0b" }} />}
              <span>Mode: {theme === "dark" ? "Dark Theme" : "Light Theme"}</span>
            </div>

            <button
              onClick={toggleTheme}
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                background: "var(--accent-gradient)",
                color: "#0a0a0a",
                fontSize: "12px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              Switch to {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Nav list */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                background: pathname === "/" ? "rgba(245,185,46,0.1)" : "transparent",
                border: pathname === "/" ? "1px solid rgba(245,185,46,0.3)" : "1px solid transparent",
              }}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                background: pathname === "/about" ? "rgba(245,185,46,0.1)" : "transparent",
              }}
            >
              About Studio
            </Link>

            {/* Collapsible Services */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: mobileServicesOpen ? "var(--accent)" : "var(--text-primary)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span>Services ({serviceCategories.length} Disciplines)</span>
                <ChevronDown
                  size={18}
                  style={{
                    transition: "transform 200ms",
                    transform: mobileServicesOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {mobileServicesOpen && (
                <div
                  style={{
                    padding: "8px 12px 14px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    borderLeft: "2px solid var(--accent)",
                    marginLeft: "16px",
                    marginTop: "4px",
                  }}
                >
                  {serviceCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/services#${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        padding: "4px 0",
                      }}
                    >
                      • {cat.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "var(--accent)",
                      textDecoration: "none",
                      paddingTop: "6px",
                    }}
                  >
                    View All Services Directory →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/work"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                background: pathname === "/work" ? "rgba(245,185,46,0.1)" : "transparent",
              }}
            >
              Selected Work (12 Sectors)
            </Link>

            <Link
              href="/journal"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
              }}
            >
              Journal &amp; Insights
            </Link>

            <Link
              href="/team"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                background: pathname === "/team" ? "rgba(245,185,46,0.1)" : "transparent",
              }}
            >
              Meet Our Team
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
                background: pathname === "/contact" ? "rgba(245,185,46,0.1)" : "transparent",
              }}
            >
              Contact &amp; Audit
            </Link>
          </nav>

          {/* Bottom Action buttons */}
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              href="/contact"
              className="btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ justifyContent: "center", padding: "14px" }}
            >
              Get a Free Audit →
            </Link>

            <a
              href="https://wa.me/917986408226?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                borderRadius: "9999px",
                background: "#25D366",
                color: "#0a0a0a",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} /> Chat on WhatsApp (+91 79864 08226)
            </a>
          </div>
        </div>
      )}
    </>
  );
}
