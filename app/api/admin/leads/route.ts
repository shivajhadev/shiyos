import { NextRequest, NextResponse } from "next/server";
import { getLeads, updateLead, deleteLead, verifySessionToken } from "@/lib/storage";

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("shiyos_admin_session")?.value;
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || authHeader;

  if (!token) return false;
  const { valid } = verifySessionToken(token);
  return valid;
}

// GET all leads with optional search and status filter
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = (searchParams.get("search") || "").toLowerCase().trim();
  const status = searchParams.get("status") || "All";

  let leads = getLeads();

  if (status !== "All") {
    leads = leads.filter((l) => l.status === status);
  }

  if (search) {
    leads = leads.filter(
      (l) =>
        l.full_name.toLowerCase().includes(search) ||
        l.work_email.toLowerCase().includes(search) ||
        l.phone.toLowerCase().includes(search) ||
        l.main_need.toLowerCase().includes(search) ||
        (l.message && l.message.toLowerCase().includes(search)) ||
        (l.notes && l.notes.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    leads,
    total: leads.length,
    stats: {
      totalLeads: getLeads().length,
      newLeads: getLeads().filter((l) => l.status === "New").length,
      converted: getLeads().filter((l) => l.status === "Converted").length,
      inProgress: getLeads().filter((l) => l.status === "In Progress" || l.status === "Contacted").length,
    }
  });
}

// PATCH update status or notes
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
    }

    const updated = updateLead(id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}

// DELETE a lead
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
    }

    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete lead." }, { status: 500 });
  }
}
