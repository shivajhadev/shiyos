"use client";

import { useState } from "react";
import { serviceNeedsOptions } from "@/lib/services-data";
import { CheckCircle, Loader2 } from "lucide-react";

interface LeadFormProps {
  sourcePage?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

interface FormData {
  full_name: string;
  work_email: string;
  phone: string;
  main_need: string;
  message: string;
  hp_field: string;
}

interface FormErrors {
  full_name?: string;
  work_email?: string;
  phone?: string;
  main_need?: string;
}

export default function LeadForm({
  sourcePage = "homepage",
  compact = false,
}: LeadFormProps) {
  const [form, setForm] = useState<FormData>({
    full_name: "",
    work_email: "",
    phone: "",
    main_need: "",
    message: "",
    hp_field: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.full_name.trim()) newErrors.full_name = "Name is required";
    if (!form.work_email.trim()) newErrors.work_email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.work_email)) newErrors.work_email = "Invalid email address";
    if (!form.phone.trim()) newErrors.phone = "Phone/WhatsApp is required";
    else if (!/^[\d\s+\-()]{7,20}$/.test(form.phone)) newErrors.phone = "Invalid phone number";
    if (!form.main_need) newErrors.main_need = "Please select your main need";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.hp_field) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          work_email: form.work_email,
          phone: form.phone,
          main_need: form.main_need,
          message: form.message,
          source_page: sourcePage,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: compact ? "36px 20px" : "60px 40px",
          textAlign: "center",
          gap: "16px",
        }}
      >
        <div style={{ color: "#22c55e" }}>
          <CheckCircle size={48} />
        </div>
        <h3
          style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: "24px",
            color: "var(--text-primary)",
          }}
        >
          Thank you — we're on it.
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "340px", lineHeight: "1.6" }}>
          Expect a response within 4 hours. The founder reviews every submission personally.
        </p>
      </div>
    );
  }

  const inputStyle = (field: keyof FormErrors) => ({
    ...{ },
    borderColor: errors[field] ? "#ef4444" : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="hp_field"
        value={form.hp_field}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
        className="form-grid"
      >
        <div>
          <label htmlFor="full_name" className="form-label">Full Name *</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className={`form-input ${errors.full_name ? "error" : ""}`}
            style={inputStyle("full_name")}
            required
          />
          {errors.full_name && <p className="form-error">{errors.full_name}</p>}
        </div>

        <div>
          <label htmlFor="work_email" className="form-label">Work Email *</label>
          <input
            type="email"
            id="work_email"
            name="work_email"
            value={form.work_email}
            onChange={handleChange}
            placeholder="rahul@brand.com"
            className={`form-input ${errors.work_email ? "error" : ""}`}
            style={inputStyle("work_email")}
            required
          />
          {errors.work_email && <p className="form-error">{errors.work_email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="form-label">Phone / WhatsApp *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`form-input ${errors.phone ? "error" : ""}`}
            style={inputStyle("phone")}
            required
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="main_need" className="form-label">Main Need *</label>
          <select
            id="main_need"
            name="main_need"
            value={form.main_need}
            onChange={handleChange}
            className={`form-input ${errors.main_need ? "error" : ""}`}
            style={{ ...inputStyle("main_need"), cursor: "pointer" }}
            required
          >
            <option value="" style={{ backgroundColor: "#151515" }}>Select your primary goal…</option>
            {serviceNeedsOptions.map((opt) => (
              <option key={opt} value={opt} style={{ backgroundColor: "#151515" }}>{opt}</option>
            ))}
          </select>
          {errors.main_need && <p className="form-error">{errors.main_need}</p>}
        </div>
      </div>

      {!compact && (
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="message" className="form-label">Message (optional)</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us a bit more — current revenue, marketplaces, budget, timeline…"
            rows={4}
            className="form-input"
            style={{ resize: "vertical" }}
          />
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#ef4444",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          padding: "14px 28px",
          fontSize: "15px",
          opacity: status === "loading" ? 0.8 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            Sending…
          </>
        ) : (
          "Get a free audit →"
        )}
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
