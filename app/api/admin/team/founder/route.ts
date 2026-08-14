import { NextRequest, NextResponse } from "next/server";
import { updateFounderData, getTeamData } from "@/lib/team-store";
import { verifySessionToken } from "@/lib/storage";

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("shiyos_admin_session")?.value;
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || authHeader;
  if (!token) return false;
  return verifySessionToken(token).valid;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = getTeamData();
  return NextResponse.json({ founder: data.founder });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const updated = updateFounderData(body);
    return NextResponse.json({ success: true, founder: updated });
  } catch (err) {
    console.error("[FOUNDER UPDATE ERROR]:", err);
    return NextResponse.json({ error: "Failed to update founder profile." }, { status: 500 });
  }
}
