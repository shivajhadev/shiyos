import { NextRequest, NextResponse } from "next/server";
import { addTeamMember, updateTeamMember, deleteTeamMember, getTeamData } from "@/lib/team-store";
import { verifySessionToken } from "@/lib/storage";

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("shiyos_admin_session")?.value;
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || authHeader;
  if (!token) return false;
  return verifySessionToken(token).valid;
}

// GET all team members
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = getTeamData();
  return NextResponse.json({ members: data.members });
}

// POST add new member
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, role, initials, gradient, image, bio, category } = body;

    if (!name?.trim() || !role?.trim()) {
      return NextResponse.json({ error: "Name and Role are required." }, { status: 400 });
    }

    const member = addTeamMember({
      name: name.trim(),
      role: role.trim(),
      initials: initials?.trim() || "",
      gradient: gradient || "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      image: image?.trim() || "",
      bio: bio?.trim() || "",
      category: category?.trim() || "General",
    });

    return NextResponse.json({ success: true, member });
  } catch (err) {
    console.error("[ADD MEMBER ERROR]:", err);
    return NextResponse.json({ error: "Failed to add team member." }, { status: 500 });
  }
}

// PUT update member
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    const updated = updateTeamMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, member: updated });
  } catch (err) {
    console.error("[UPDATE MEMBER ERROR]:", err);
    return NextResponse.json({ error: "Failed to update member." }, { status: 500 });
  }
}

// DELETE member
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    const deleted = deleteTeamMember(id);
    if (!deleted) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE MEMBER ERROR]:", err);
    return NextResponse.json({ error: "Failed to delete member." }, { status: 500 });
  }
}
