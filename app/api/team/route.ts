import { NextResponse } from "next/server";
import { getTeamData } from "@/lib/team-store";

export async function GET() {
  const data = getTeamData();
  return NextResponse.json(data);
}
