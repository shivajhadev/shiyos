import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { addLead } from "@/lib/storage";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Rate limiting — simple in-memory store
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(key);
  if (!limit || limit.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + 60_000 }); // 1 min window
    return true;
  }
  if (limit.count >= 10) return false; // Max 10 submissions/min per IP
  limit.count++;
  return true;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s+\-()]{7,20}$/.test(phone.trim());
}

export async function POST(req: NextRequest) {
  const ipKey = getRateLimitKey(req);
  if (!checkRateLimit(ipKey)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { full_name, work_email, phone, main_need, message, source_page } = body as {
    full_name?: string;
    work_email?: string;
    phone?: string;
    main_need?: string;
    message?: string;
    source_page?: string;
  };

  // Validation
  if (!full_name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!work_email?.trim() || !validateEmail(work_email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  if (!phone?.trim() || !validatePhone(phone)) return NextResponse.json({ error: "Valid phone is required." }, { status: 400 });
  if (!main_need?.trim()) return NextResponse.json({ error: "Main need is required." }, { status: 400 });

  // 1. Save locally to JSON database (permanent & instantly accessible in Admin Panel)
  let savedLead;
  try {
    savedLead = addLead({
      full_name: full_name.trim(),
      work_email: work_email.trim().toLowerCase(),
      phone: phone.trim(),
      main_need: main_need.trim(),
      message: (message || "").trim(),
      source_page: (source_page || "Website Form").trim(),
    });
  } catch (err) {
    console.error("[LEADS API] Local storage error:", err);
  }

  // 2. Optional Supabase insert if configured
  if (supabaseUrl && supabaseServiceKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase.from("leads").insert({
        full_name: full_name.trim(),
        work_email: work_email.trim().toLowerCase(),
        phone: phone.trim(),
        main_need: main_need.trim(),
        message: (message || "").trim() || null,
        source_page: (source_page || "unknown").trim(),
      });
    } catch (err) {
      console.warn("[LEADS API] Supabase sync skipped:", err);
    }
  }

  return NextResponse.json({ success: true, lead: savedLead });
}
