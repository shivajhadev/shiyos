import { NextRequest, NextResponse } from "next/server";
import { getAdminConfig, verifyPassword, createSessionToken } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const config = getAdminConfig();

    if (username.trim() !== config.username) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isMatch = verifyPassword(password, config.passwordHash, config.salt);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = createSessionToken(config.username);

    const response = NextResponse.json({
      success: true,
      username: config.username,
      token,
    });

    // Set secure HTTP-only cookie for seamless authentication
    response.cookies.set("shiyos_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[ADMIN LOGIN ERROR]:", error);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
