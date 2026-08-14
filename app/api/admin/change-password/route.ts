import { NextRequest, NextResponse } from "next/server";
import { getAdminConfig, verifyPassword, updateAdminPassword, verifySessionToken } from "@/lib/storage";

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("shiyos_admin_session")?.value;
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || authHeader;

  if (!token) return false;
  const { valid } = verifySessionToken(token);
  return valid;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { currentPassword, newPassword, newUsername } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters long." }, { status: 400 });
    }

    const config = getAdminConfig();

    const isMatch = verifyPassword(currentPassword, config.passwordHash, config.salt);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    updateAdminPassword(newPassword, newUsername);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. Please log in with your new credentials next time.",
    });
  } catch (error) {
    console.error("[CHANGE PASSWORD ERROR]:", error);
    return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
  }
}
