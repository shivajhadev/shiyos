"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import {
  Search,
  Download,
  FileSpreadsheet,
  RefreshCw,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Key,
  LogOut,
  Eye,
  X,
  Users,
  Inbox,
  UserCheck,
  Plus,
  Edit2,
  Upload,
  Check,
  Sparkles,
} from "lucide-react";
import type { Lead } from "@/lib/storage";
import type { TeamMember, FounderData } from "@/lib/team-store";

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: "rgba(34, 197, 94, 0.12)", text: "#22c55e", border: "rgba(34, 197, 94, 0.3)" },
  Contacted: { bg: "rgba(59, 130, 246, 0.12)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" },
  "In Progress": { bg: "rgba(245, 185, 46, 0.14)", text: "#f5b92e", border: "rgba(245, 185, 46, 0.35)" },
  Converted: { bg: "rgba(168, 85, 247, 0.12)", text: "#a855f7", border: "rgba(168, 85, 247, 0.3)" },
  Archived: { bg: "rgba(156, 163, 175, 0.12)", text: "#9ca3af", border: "rgba(156, 163, 175, 0.3)" },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"leads" | "team">("leads");

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState("");

  // Team & Founder State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [founder, setFounder] = useState<FounderData | null>(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [savingMember, setSavingMember] = useState(false);
  const [savingFounder, setSavingFounder] = useState(false);

  // Change Password Modal State
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMessage, setPwdMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const founderFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch Leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.status === 401) {
        setIsAuthenticated(false);
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setIsAuthenticated(true);
      }
    } catch {
      showToast("Failed to fetch leads.");
      setIsAuthenticated(false);
      router.replace("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Fetch Team & Founder
  const fetchTeamData = useCallback(async () => {
    setTeamLoading(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (data.founder) setFounder(data.founder);
      if (data.members) setTeamMembers(data.members);
    } catch {
      showToast("Failed to fetch team data.");
    } finally {
      setTeamLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    fetchTeamData();
  }, [fetchLeads, fetchTeamData]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = statusFilter === "All" || l.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.full_name.toLowerCase().includes(q) ||
        l.work_email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.main_need.toLowerCase().includes(q) ||
        (l.message && l.message.toLowerCase().includes(q)) ||
        (l.notes && l.notes.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [leads, search, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "New").length;
    const inProgress = leads.filter((l) => l.status === "In Progress" || l.status === "Contacted").length;
    const converted = leads.filter((l) => l.status === "Converted").length;
    const rate = total > 0 ? ((converted / total) * 100).toFixed(0) : "0";
    return { total, newCount, inProgress, converted, rate };
  }, [leads]);

  // Update Status
  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
        showToast(`Status updated to ${newStatus}`);
      }
    } catch {
      showToast("Failed to update status.");
    }
  };

  // Save Notes
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, notes: editNotes }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: editNotes } : l)));
        setSelectedLead((prev) => (prev ? { ...prev, notes: editNotes } : null));
        showToast("Notes saved successfully.");
      }
    } catch {
      showToast("Failed to save notes.");
    }
  };

  // Delete Lead
  const handleDeleteLead = async (leadId: string, leadName: string) => {
    if (!confirm(`Are you sure you want to delete lead: "${leadName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLead?.id === leadId) setSelectedLead(null);
        showToast("Lead deleted successfully.");
      }
    } catch {
      showToast("Failed to delete lead.");
    }
  };

  // Export to Excel
  const handleExport = (format: "xlsx" | "csv") => {
    const url = `/api/admin/export?format=${format}&status=${statusFilter}`;
    window.open(url, "_blank");
    showToast(`Exporting leads to ${format.toUpperCase()}...`);
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("shiyos_admin_auth");
    router.push("/admin/login");
  };

  // Handle Image Upload Helper
  const handleUploadImage = async (file: File): Promise<string | null> => {
    setUploadingImg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        showToast("Image uploaded successfully!");
        return data.url;
      } else {
        showToast("Image upload failed.");
        return null;
      }
    } catch {
      showToast("Image upload error.");
      return null;
    } finally {
      setUploadingImg(false);
    }
  };

  // Update Founder Profile
  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!founder) return;

    setSavingFounder(true);
    try {
      const res = await fetch("/api/admin/team/founder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(founder),
      });
      if (res.ok) {
        showToast("Founder profile updated successfully!");
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || `Failed to update founder profile (${res.status}).`);
      }
    } catch {
      showToast("Error updating founder profile.");
    } finally {
      setSavingFounder(false);
    }
  };

  // Save / Add Team Member
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name?.trim() || !editingMember.role?.trim()) {
      showToast("Please enter member Name and Role.");
      return;
    }

    setSavingMember(true);
    try {
      if (editingMember.id) {
        // Edit
        const res = await fetch("/api/admin/team/member", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingMember),
        });
        if (res.ok) {
          const data = await res.json();
          setTeamMembers((prev) => prev.map((m) => (m.id === editingMember.id ? data.member : m)));
          showToast("Team member updated!");
          setEditMemberModalOpen(false);
        } else {
          const err = await res.json().catch(() => ({}));
          showToast(err.error || `Failed to update member (${res.status}).`);
        }
      } else {
        // Add new
        const res = await fetch("/api/admin/team/member", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingMember),
        });
        if (res.ok) {
          const data = await res.json();
          setTeamMembers((prev) => [...prev, data.member]);
          showToast("New team member added!");
          setEditMemberModalOpen(false);
        } else {
          const err = await res.json().catch(() => ({}));
          showToast(err.error || `Failed to add member (${res.status}).`);
        }
      }
    } catch {
      showToast("Failed to save team member.");
    } finally {
      setSavingMember(false);
    }
  };

  // Delete Member
  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from team?`)) return;

    try {
      const res = await fetch(`/api/admin/team/member?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
        showToast("Member removed from team.");
      }
    } catch {
      showToast("Failed to remove member.");
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPwdMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setPwdLoading(true);
    setPwdMessage(null);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          newUsername: newUsername.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPwdMessage({ type: "error", text: data.error || "Failed to update password." });
        setPwdLoading(false);
        return;
      }

      setPwdMessage({ type: "success", text: "Password updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setNewUsername("");
      setTimeout(() => {
        setPasswordModalOpen(false);
        setPwdMessage(null);
      }, 1500);
    } catch {
      setPwdMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setPwdLoading(false);
    }
  };

  // Auth gate — Never render dashboard if unauthenticated
  if (isAuthenticated !== true) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "var(--accent-gradient)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "22px",
            color: "#0a0a0a",
            boxShadow: "0 0 24px rgba(245,185,46,0.3)",
          }}
        >
          S
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "14px", fontWeight: 600 }}>
          Authenticating admin access…
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "var(--accent-gradient)",
            color: "#0a0a0a",
            padding: "12px 24px",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(245,185,46,0.5)",
            zIndex: 1000,
            animation: "fade-in 0.2s ease",
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          ✓ {toast}
        </div>
      )}

      {/* ── Top Bar ── */}
      <header
        style={{
          borderBottom: "1px solid var(--border-strong)",
          background: "var(--header-bg)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "16px 0",
        }}
      >
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          {/* Logo & Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--accent-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: "18px",
                color: "#0a0a0a",
              }}
            >
              S
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "18px", letterSpacing: "0.02em" }}>
                  SHIYOS
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#0a0a0a",
                    background: "var(--accent)",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Admin Console
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-card)", padding: "4px", borderRadius: "9999px", border: "1px solid var(--border)" }}>
            <button
              onClick={() => setActiveTab("leads")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "none",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: '"Space Grotesk", sans-serif',
                background: activeTab === "leads" ? "var(--accent-gradient)" : "transparent",
                color: activeTab === "leads" ? "#0a0a0a" : "var(--text-muted)",
                transition: "all 150ms ease",
              }}
            >
              <Inbox size={14} /> Leads ({leads.length})
            </button>

            <button
              onClick={() => setActiveTab("team")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "none",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: '"Space Grotesk", sans-serif',
                background: activeTab === "team" ? "var(--accent-gradient)" : "transparent",
                color: activeTab === "team" ? "#0a0a0a" : "var(--text-muted)",
                transition: "all 150ms ease",
              }}
            >
              <Users size={14} /> Team &amp; Founder ({teamMembers.length + 1})
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href="/"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "9999px",
                border: "1px solid var(--border-strong)",
                fontWeight: 600,
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              <ExternalLink size={13} /> View Website
            </Link>

            <button
              onClick={() => {
                setPasswordModalOpen(true);
                setPwdMessage(null);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-primary)",
                background: "var(--bg-card)",
                padding: "8px 14px",
                borderRadius: "9999px",
                border: "1px solid var(--border-strong)",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              <Key size={13} style={{ color: "var(--accent)" }} /> Change Password
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#ef4444",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                padding: "8px 14px",
                borderRadius: "9999px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="container-custom" style={{ paddingTop: "36px", paddingBottom: "80px" }}>
        {/* ========================================================================= */}
        {/* TAB 1: LEADS & ENQUIRIES */}
        {/* ========================================================================= */}
        {activeTab === "leads" && (
          <>
            {/* Page Title & Metrics */}
            <div style={{ marginBottom: "32px" }}>
              <h1
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Leads &amp; Client <span className="gradient-text">Enquiries</span>
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", fontFamily: '"Space Grotesk", sans-serif' }}>
                Real-time inquiries captured across website contact forms and audit widgets.
              </p>
            </div>

            {/* Metrics Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "36px",
              }}
            >
              {[
                { label: "TOTAL LEADS", value: stats.total, sub: "All time captured", color: "var(--text-primary)", icon: "📊" },
                { label: "NEW INQUIRIES", value: stats.newCount, sub: "Pending review", color: "#22c55e", icon: "🟢" },
                { label: "IN PROGRESS", value: stats.inProgress, sub: "Call or proposal active", color: "var(--accent)", icon: "🟡" },
                { label: "CONVERTED CLIENTS", value: `${stats.converted} (${stats.rate}%)`, sub: "Successfully closed", color: "#a855f7", icon: "🟣" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: "20px 24px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "26px", color: m.color, lineHeight: 1.1, marginBottom: "4px" }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{m.sub}</div>
                  </div>
                  <span style={{ fontSize: "20px" }}>{m.icon}</span>
                </div>
              ))}
            </div>

            {/* Action Toolbar */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "16px",
                padding: "16px 20px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {/* Search bar */}
              <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "420px" }}>
                <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by name, email, phone, or service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: "40px", fontSize: "14px", height: "42px" }}
                />
              </div>

              {/* Status Tabs */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                {["All", "New", "Contacted", "In Progress", "Converted", "Archived"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: statusFilter === st ? "1px solid var(--accent)" : "1px solid var(--border)",
                      background: statusFilter === st ? "var(--accent-gradient)" : "transparent",
                      color: statusFilter === st ? "#0a0a0a" : "var(--text-muted)",
                      fontFamily: '"Space Grotesk", sans-serif',
                      transition: "all 150ms ease",
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Export & Refresh */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => handleExport("xlsx")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, #107c41 0%, #15803d 100%)",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: '"Space Grotesk", sans-serif',
                    boxShadow: "0 2px 8px rgba(16, 124, 65, 0.3)",
                  }}
                >
                  <FileSpreadsheet size={15} /> Export Excel (.xlsx)
                </button>

                <button
                  onClick={() => handleExport("csv")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "9999px",
                    background: "transparent",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "1px solid var(--border-strong)",
                    cursor: "pointer",
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}
                >
                  <Download size={14} /> CSV
                </button>

                <button
                  onClick={fetchLeads}
                  title="Refresh table"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "9999px",
                    background: "transparent",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-strong)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="card" style={{ borderRadius: "18px", border: "1px solid var(--border-strong)", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border-strong)" }}>
                      <th style={{ padding: "16px 20px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Lead Name</th>
                      <th style={{ padding: "16px 20px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Contact Details</th>
                      <th style={{ padding: "16px 20px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Service Requested</th>
                      <th style={{ padding: "16px 20px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Date &amp; Source</th>
                      <th style={{ padding: "16px 20px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Status</th>
                      <th style={{ padding: "16px 20px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} style={{ padding: "48px", textAlign: "center", color: "var(--text-muted)" }}>
                          <RefreshCw size={24} className="animate-spin" style={{ margin: "0 auto 12px", color: "var(--accent)" }} />
                          Loading submissions...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: "60px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                          <div style={{ fontSize: "36px", marginBottom: "12px" }}>📭</div>
                          <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-primary)", marginBottom: "4px" }}>No leads match your filter</div>
                          <div style={{ fontSize: "13px" }}>Try changing your search term or status filter.</div>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const statusStyle = STATUS_COLORS[lead.status] || STATUS_COLORS.New;
                        const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

                        return (
                          <tr
                            key={lead.id}
                            style={{ borderBottom: "1px solid var(--border)", transition: "background 150ms ease" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.backgroundColor = "rgba(245,185,46,0.03)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent")}
                          >
                            <td style={{ padding: "18px 20px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--accent-gradient)", color: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "15px", fontFamily: '"Syne", sans-serif', flexShrink: 0 }}>
                                  {lead.full_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: '"Space Grotesk", sans-serif' }}>{lead.full_name}</div>
                                  {lead.notes && (
                                    <div style={{ fontSize: "11px", color: "var(--accent)", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                                      📝 {lead.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td style={{ padding: "18px 20px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <a href={`mailto:${lead.work_email}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
                                  <Mail size={12} style={{ color: "var(--text-faint)" }} /> {lead.work_email}
                                </a>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <a href={`tel:${lead.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", textDecoration: "none", fontSize: "13px" }}>
                                    <Phone size={12} style={{ color: "var(--text-faint)" }} /> {lead.phone}
                                  </a>
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(lead.full_name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Shiyos%20Technologies.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "#25D366", color: "#ffffff", padding: "2px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}
                                  >
                                    <MessageCircle size={10} /> Chat
                                  </a>
                                </div>
                              </div>
                            </td>

                            <td style={{ padding: "18px 20px" }}>
                              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "9999px", background: "rgba(245,185,46,0.08)", border: "1px solid rgba(245,185,46,0.25)", color: "var(--accent)", fontSize: "12px", fontWeight: 600 }}>
                                {lead.main_need}
                              </span>
                            </td>

                            <td style={{ padding: "18px 20px" }}>
                              <div style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 500 }}>
                                {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </div>
                              <div style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "2px" }}>
                                {new Date(lead.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · {lead.source_page || "Form"}
                              </div>
                            </td>

                            <td style={{ padding: "18px 20px" }}>
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                                style={{
                                  background: statusStyle.bg,
                                  color: statusStyle.text,
                                  border: `1px solid ${statusStyle.border}`,
                                  borderRadius: "9999px",
                                  padding: "4px 10px",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  outline: "none",
                                  fontFamily: '"Space Grotesk", sans-serif',
                                }}
                              >
                                <option value="New" style={{ background: "#111", color: "#22c55e" }}>🟢 New</option>
                                <option value="Contacted" style={{ background: "#111", color: "#3b82f6" }}>🔵 Contacted</option>
                                <option value="In Progress" style={{ background: "#111", color: "#f5b92e" }}>🟡 In Progress</option>
                                <option value="Converted" style={{ background: "#111", color: "#a855f7" }}>🟣 Converted</option>
                                <option value="Archived" style={{ background: "#111", color: "#9ca3af" }}>⚪ Archived</option>
                              </select>
                            </td>

                            <td style={{ padding: "18px 20px", textAlign: "right" }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                <button
                                  onClick={() => { setSelectedLead(lead); setEditNotes(lead.notes || ""); }}
                                  style={{ padding: "6px 12px", borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border-strong)", color: "var(--text-primary)", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                                >
                                  <Eye size={13} /> View
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id, lead.full_name)}
                                  style={{ padding: "6px 8px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer" }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TEAM & FOUNDER MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "team" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {/* Header */}
            <div>
              <h1 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 36px)", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                Team &amp; Founder <span className="gradient-text">Management</span>
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", fontFamily: '"Space Grotesk", sans-serif' }}>
                Manage your founder card, story timeline, and all team members. Changes reflect instantly on the live <code>/team</code> page.
              </p>
            </div>

            {/* SECTION 1: FOUNDER PROFILE */}
            {founder && (
              <div className="card" style={{ padding: "36px", borderRadius: "24px", border: "1px solid var(--border-strong)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--accent-gradient)", color: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "20px" }}>
                      ★
                    </div>
                    <div>
                      <h2 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "22px" }}>Founder Profile &amp; Story</h2>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Control the main founder showcase card and company story</p>
                    </div>
                  </div>

                  <Link href="/team" target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>
                    <span>Preview /team page</span>
                    <ArrowIcon size={12} />
                  </Link>
                </div>

                <form onSubmit={handleSaveFounder} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Founder Card Info */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                      <label className="form-label">Founder Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={founder.name}
                        onChange={(e) => setFounder({ ...founder, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">Role / Designation *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={founder.role}
                        onChange={(e) => setFounder({ ...founder, role: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Founder Tagline (displayed on card) *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={founder.tagline}
                      onChange={(e) => setFounder({ ...founder, tagline: e.target.value })}
                      required
                    />
                  </div>

                  {/* Picture Upload & URL */}
                  <div>
                    <label className="form-label">Founder Picture (Upload or enter image URL)</label>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. /uploads/founder.jpg or https://..."
                        value={founder.image || ""}
                        onChange={(e) => setFounder({ ...founder, image: e.target.value })}
                        style={{ flex: 1 }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        ref={founderFileInputRef}
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleUploadImage(file);
                            if (url) setFounder({ ...founder, image: url });
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => founderFileInputRef.current?.click()}
                        disabled={uploadingImg}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "12px 18px",
                          borderRadius: "8px",
                          background: "var(--bg-card-high)",
                          border: "1px solid var(--border-strong)",
                          color: "var(--text-primary)",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Upload size={14} /> {uploadingImg ? "Uploading..." : "Upload Photo"}
                      </button>
                    </div>
                    {founder.image && (
                      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={founder.image} alt="Founder Preview" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }} />
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Current photo loaded</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    <div>
                      <label className="form-label">Years of Experience</label>
                      <input
                        type="text"
                        className="form-input"
                        value={founder.experienceYears}
                        onChange={(e) => setFounder({ ...founder, experienceYears: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Brands Count</label>
                      <input
                        type="text"
                        className="form-input"
                        value={founder.brandsCount}
                        onChange={(e) => setFounder({ ...founder, brandsCount: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Team Members Count</label>
                      <input
                        type="text"
                        className="form-input"
                        value={founder.teamSize}
                        onChange={(e) => setFounder({ ...founder, teamSize: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Story Text */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                    <h3 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "16px", marginBottom: "12px" }}>
                      About Shiyos Story
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <label className="form-label">Paragraph 1 (Founding Mission)</label>
                        <textarea
                          className="form-input"
                          rows={2}
                          value={founder.storyParagraph1}
                          onChange={(e) => setFounder({ ...founder, storyParagraph1: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="form-label">Paragraph 2 (Growth &amp; Scale)</label>
                        <textarea
                          className="form-input"
                          rows={2}
                          value={founder.storyParagraph2}
                          onChange={(e) => setFounder({ ...founder, storyParagraph2: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="form-label">Paragraph 3 (Founder Commitment)</label>
                        <textarea
                          className="form-input"
                          rows={2}
                          value={founder.storyParagraph3}
                          onChange={(e) => setFounder({ ...founder, storyParagraph3: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="btn-primary" style={{ padding: "12px 28px" }}>
                      Save Founder Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECTION 2: TEAM MEMBERS LIST & ADD/EDIT */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "24px" }}>
                    Team Members ({teamMembers.length})
                  </h2>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                    Add, edit, change pictures, or remove team members displayed on the website.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingMember({
                      name: "",
                      role: "",
                      category: "General",
                      initials: "",
                      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                      image: "",
                    });
                    setEditMemberModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px" }}
                >
                  <Plus size={16} /> Add New Member
                </button>
              </div>

              {/* Members Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="card"
                    style={{
                      padding: "24px",
                      borderRadius: "18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                    }}
                  >
                    <div>
                      {/* Avatar */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                        {member.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid var(--accent)",
                              boxShadow: "0 0 16px rgba(245,185,46,0.2)",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              background: member.gradient || "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: '"Syne", sans-serif',
                              fontWeight: 800,
                              fontSize: "18px",
                              color: "#ffffff",
                              border: "1px solid var(--border-strong)",
                            }}
                          >
                            {member.initials || member.name.charAt(0)}
                          </div>
                        )}

                        <div>
                          <h4 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "17px", color: "var(--text-primary)", marginBottom: "2px" }}>
                            {member.name}
                          </h4>
                          <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {member.category && (
                        <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "16px" }}>
                          Department: {member.category}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                      <button
                        onClick={() => {
                          setEditingMember(member);
                          setEditMemberModalOpen(true);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "var(--bg-card-high)",
                          border: "1px solid var(--border-strong)",
                          color: "var(--text-primary)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <Edit2 size={12} /> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteMember(member.id, member.name)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL: ADD / EDIT TEAM MEMBER ── */}
      {editMemberModalOpen && editingMember && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 200,
          }}
          onClick={() => setEditMemberModalOpen(false)}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "36px",
              borderRadius: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "20px" }}>
                {editingMember.id ? "Edit Team Member" : "Add New Team Member"}
              </h3>
              <button onClick={() => setEditMemberModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMember} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label className="form-label">Member Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={editingMember.name || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Role / Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. E-commerce Lead, Video Editor"
                  value={editingMember.role || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Department / Specialty</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. E-commerce, Engineering, Marketing, Design"
                  value={editingMember.category || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, category: e.target.value })}
                />
              </div>

              {/* Photo Upload & Preview */}
              <div>
                <label className="form-label">Member Photo (Upload from device or URL)</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="/uploads/pic.jpg or URL"
                    value={editingMember.image || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleUploadImage(file);
                        if (url) setEditingMember({ ...editingMember, image: url });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImg}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: "var(--bg-card-high)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Upload size={14} /> {uploadingImg ? "Uploading..." : "Upload Photo"}
                  </button>
                </div>

                {editingMember.image && (
                  <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingMember.image}
                      alt="Preview"
                      style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setEditingMember({ ...editingMember, image: "" })}
                      style={{ fontSize: "12px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Remove photo
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditMemberModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "9999px",
                    border: "1px solid var(--border-strong)",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={savingMember}
                  style={{
                    padding: "10px 24px",
                    opacity: savingMember ? 0.7 : 1,
                    cursor: savingMember ? "not-allowed" : "pointer",
                  }}
                >
                  {savingMember ? "Saving…" : editingMember.id ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: LEAD DETAIL & NOTES ── */}
      {selectedLead && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 200,
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "560px",
              padding: "32px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--accent-gradient)", color: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", fontFamily: '"Syne", sans-serif' }}>
                  {selectedLead.full_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "20px" }}>{selectedLead.full_name}</h3>
                  <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>Submitted {new Date(selectedLead.created_at).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Work Email</div>
                <div style={{ fontSize: "13px", fontWeight: 600, wordBreak: "break-all" }}>{selectedLead.work_email}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Phone / WhatsApp</div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{selectedLead.phone}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Main Requirement</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent)" }}>{selectedLead.main_need}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Source Page</div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{selectedLead.source_page || "Website Form"}</div>
              </div>
            </div>

            {selectedLead.message && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, marginBottom: "6px" }}>Client Message / Notes:</div>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", padding: "14px 16px", borderRadius: "12px", fontSize: "14px", lineHeight: 1.6, color: "var(--text-primary)" }}>
                  {selectedLead.message}
                </div>
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, marginBottom: "6px" }}>Admin Internal Notes:</div>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Add follow-up notes, call summary, pricing agreed, etc..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                style={{ resize: "vertical", fontSize: "13px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setSelectedLead(null)} style={{ padding: "10px 18px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                Close
              </button>
              <button onClick={handleSaveNotes} className="btn-primary" style={{ padding: "10px 22px" }}>
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: CHANGE PASSWORD ── */}
      {passwordModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 200,
          }}
          onClick={() => setPasswordModalOpen(false)}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "460px",
              padding: "36px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Key size={20} style={{ color: "var(--accent)" }} />
                <h3 style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: "20px" }}>Change Credentials</h3>
              </div>
              <button onClick={() => setPasswordModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {pwdMessage && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  marginBottom: "18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: pwdMessage.type === "success" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  color: pwdMessage.type === "success" ? "#22c55e" : "#ef4444",
                  border: `1px solid ${pwdMessage.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                }}
              >
                {pwdMessage.text}
              </div>
            )}

            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label">Current Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">New Username (Email)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="admin.shiyos@gmail.com"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">New Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Confirm New Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "9999px",
                    border: "1px solid var(--border-strong)",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button type="submit" disabled={pwdLoading} className="btn-primary" style={{ padding: "10px 22px" }}>
                  {pwdLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
