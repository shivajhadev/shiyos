"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { serviceCategories } from "@/lib/services-data";
import { Menu, X, Sun, Moon, ChevronDown, MessageCircle, Sparkles } from "lucide-react";

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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleServiceMouseEnter = () => {
    if (serviceTimerRef.current) clearTimeout(serviceTimerRef.current);
    setServiceMenuOpen(true);
  };

  const handleServiceMouseLeave = () => {
    serviceTimerRef.current = setTimeout(() => setServiceMenuOpen(false), 150);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled
          ? "var(--header-bg)"
          : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-card)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all 250ms ease",
        height: scrolled ? "70px" : "84px",
      }}
    >
      <div className="container-custom h-full flex items-center justify-between gap-4">
        {/* Logo — DigiHandler style sleek text logo with gold star */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
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
              fontSize: "20px",
              color: "var(--text-primary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            SHIYOS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden lg:flex">
          <Link
            href="/about"
            style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            About
          </Link>

          {/* Services Mega-Menu */}
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

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "9999px",
              border: "1px solid var(--border-strong)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "border-color 150ms, color 150ms",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* WhatsApp (desktop) — matching DigiHandler green pill */}
          <a
            href="https://wa.me/917986408226?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
            style={{
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              borderRadius: "9999px",
              background: "#25D366",
              color: "#0a0a0a",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "transform 150ms, box-shadow 150ms",
              boxShadow: "0 0 16px rgba(37, 211, 102, 0.25)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
            }}
          >
            <MessageCircle size={15} /> WhatsApp
          </a>

          {/* CTA — matching DigiHandler yellow pill */}
          <Link
            href="/contact"
            className="btn-primary hidden sm:inline-flex"
            style={{ fontSize: "13px", padding: "10px 20px" }}
          >
            Get a free audit →
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              border: "1px solid var(--border-strong)",
              background: "var(--bg-card)",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "70px",
            backgroundColor: "var(--bg)",
            zIndex: 99,
            overflowY: "auto",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container-custom" style={{ paddingTop: "24px", paddingBottom: "40px" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[
                { href: "/about", label: "About" },
                { href: "/work", label: "Work" },
                { href: "/journal", label: "Journal" },
                { href: "/team", label: "Meet Our Team" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "14px 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    fontFamily: '"Syne", sans-serif',
                  }}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Services accordion */}
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  fontFamily: '"Syne", sans-serif',
                  width: "100%",
                }}
              >
                Services
                <ChevronDown
                  size={18}
                  style={{ transition: "transform 200ms", transform: mobileServicesOpen ? "rotate(180deg)" : "none" }}
                />
              </button>

              {mobileServicesOpen && (
                <div style={{ paddingLeft: "16px", paddingTop: "12px" }}>
                  {serviceCategories.map((cat) => (
                    <div key={cat.slug} style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                        {cat.name}
                      </div>
                      {cat.services.slice(0, 3).map((svc) => (
                        <Link
                          key={svc.slug}
                          href={`/services/${svc.slug}`}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: "block", padding: "6px 0", fontSize: "14px", color: "var(--text-muted)", textDecoration: "none" }}
                        >
                          {svc.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link href="/services" onClick={() => setMobileOpen(false)} style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent)", textDecoration: "none" }}>
                    All services →
                  </Link>
                </div>
              )}
            </nav>

            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/contact" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ justifyContent: "center" }}>
                Get a free audit →
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
                  padding: "12px",
                  borderRadius: "9999px",
                  background: "#25D366",
                  color: "#0a0a0a",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
