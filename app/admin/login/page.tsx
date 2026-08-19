"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid username or password.");
        setLoading(false);
        return;
      }

      // Success
      if (data.token) {
        localStorage.setItem("shiyos_admin_auth", data.token);
      }
      router.push("/admin");
    } catch {
      setError("Unable to connect. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,185,46,0.14) 0%, transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Login Card */}
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "44px 36px",
          borderRadius: "24px",
          border: "1px solid var(--border-strong)",
          background: "var(--bg-card)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 50px rgba(245,185,46,0.08)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: "28px",
              color: "#ffffff",
              margin: "0 auto 16px",
              boxShadow: "0 0 30px rgba(37, 99, 235, 0.4)",
            }}
          >
            S
          </div>

          <h1
            style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: "26px",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "6px",
            }}
          >
            Shiyos <span className="gradient-text">Console</span>
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: '"Space Grotesk", sans-serif' }}>
            Admin Portal &amp; Lead Management
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "24px",
              fontFamily: '"Space Grotesk", sans-serif',
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Username */}
          <div>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={13} style={{ color: "var(--accent)" }} /> Username
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              style={{ paddingLeft: "14px" }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Lock size={13} style={{ color: "var(--accent)" }} /> Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{ paddingRight: "44px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-faint)",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "8px",
              padding: "14px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              "Authenticating..."
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>Sign In to Admin</span>
                <ArrowIcon size={14} />
              </span>
            )}
          </button>
        </form>

        {/* Security badge info */}
        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "var(--text-faint)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={14} style={{ color: "#22c55e" }} />
            <span>256-bit Encrypted Session</span>
          </div>

          <Link
            href="/"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}
