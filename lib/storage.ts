import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface Lead {
  id: string;
  full_name: string;
  work_email: string;
  phone: string;
  main_need: string;
  message?: string;
  source_page?: string;
  status: "New" | "Contacted" | "In Progress" | "Converted" | "Archived";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminConfig {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin-config.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Password hashing helpers
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 1000, 64, "sha512").toString("hex");
  return { hash, salt: generatedSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computedHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return computedHash === hash;
}

// Initial default seed leads
const initialDemoLeads: Lead[] = [
  {
    id: "lead_demo_1",
    full_name: "Aman Singhania",
    work_email: "aman@zencare.in",
    phone: "+91 98765 43210",
    main_need: "E-commerce Automation",
    message: "Looking to automate our Shopify and Amazon BuyBox repricing and order sync.",
    source_page: "Home Page",
    status: "New",
    notes: "High priority D2C brand",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "lead_demo_2",
    full_name: "Sarah Jenkins",
    work_email: "sarah@luminahealth.com",
    phone: "+1 415 890 1234",
    main_need: "Chrome & Edge Extension Development",
    message: "Need a custom browser extension to extract competitive product pricing in 1-click.",
    source_page: "Services / Extension",
    status: "Contacted",
    notes: "Sent introductory proposal on WhatsApp",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "lead_demo_3",
    full_name: "Rohan Varma",
    work_email: "rohan@urbankraft.co",
    phone: "+91 91234 56789",
    main_need: "Performance Marketing (Meta & Google)",
    message: "Current ROAS is 2.1x, looking to scale to 4x+ with paid ads.",
    source_page: "Audit Form",
    status: "In Progress",
    notes: "Audit call scheduled for tomorrow 3 PM",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "lead_demo_4",
    full_name: "Vikram Malhotra",
    work_email: "vikram@malhotratex.com",
    phone: "+91 99887 76655",
    main_need: "Website Design & Development",
    message: "Need a complete rebrand and Next.js high performance website for our export business.",
    source_page: "Contact Page",
    status: "Converted",
    notes: "Proposal accepted, onboarding underway",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  }
];

// Admin configuration
export function getAdminConfig(): AdminConfig {
  ensureDataDir();
  if (!fs.existsSync(ADMIN_FILE)) {
    // Default credentials: admin.shiyos@gmail.com
    const { hash, salt } = hashPassword("$hivaJha2003@Jha");
    const defaultConfig: AdminConfig = {
      username: "admin.shiyos@gmail.com",
      passwordHash: hash,
      salt: salt,
      lastPasswordChange: new Date().toISOString(),
    };
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(defaultConfig, null, 2), "utf-8");
    return defaultConfig;
  }

  try {
    const raw = fs.readFileSync(ADMIN_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    const { hash, salt } = hashPassword("shiyos@admin123");
    const fallback: AdminConfig = {
      username: "admin",
      passwordHash: hash,
      salt: salt,
      lastPasswordChange: new Date().toISOString(),
    };
    return fallback;
  }
}

export function updateAdminPassword(newPassword: string, newUsername?: string): boolean {
  ensureDataDir();
  const current = getAdminConfig();
  const { hash, salt } = hashPassword(newPassword);
  const updated: AdminConfig = {
    username: newUsername?.trim() || current.username,
    passwordHash: hash,
    salt: salt,
    lastPasswordChange: new Date().toISOString(),
  };
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return true;
}

// Leads Store
export function getLeads(): Lead[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(initialDemoLeads, null, 2), "utf-8");
    return initialDemoLeads;
  }

  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error reading leads file:", err);
    return [];
  }
}

export function addLead(leadData: Omit<Lead, "id" | "created_at" | "updated_at" | "status">): Lead {
  ensureDataDir();
  const leads = getLeads();
  const now = new Date().toISOString();
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...leadData,
    status: "New",
    created_at: now,
    updated_at: now,
  };

  leads.unshift(newLead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return leads[index];
}

export function deleteLead(id: string): boolean {
  ensureDataDir();
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;

  fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

// Secret key for admin session token
const JWT_SECRET = process.env.ADMIN_SESSION_SECRET || "shiyos-super-secret-admin-session-token-key-2025";

export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): { valid: boolean; username?: string } {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };
    const [encodedPayload, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", JWT_SECRET).update(encodedPayload).digest("base64url");
    if (signature !== expectedSig) return { valid: false };

    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"));
    if (payload.exp < Date.now()) return { valid: false };

    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}
