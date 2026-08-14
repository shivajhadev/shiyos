import { NextRequest, NextResponse } from "next/server";
import { getLeads, verifySessionToken } from "@/lib/storage";
import * as XLSX from "xlsx";

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("shiyos_admin_session")?.value;
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || authHeader;

  if (!token) return false;
  const { valid } = verifySessionToken(token);
  return valid;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "All";
  const format = searchParams.get("format") || "xlsx";

  let leads = getLeads();

  if (status !== "All") {
    leads = leads.filter((l) => l.status === status);
  }

  // Map to clean spreadsheet rows
  const rows = leads.map((l, index) => ({
    "S.No": index + 1,
    "Lead ID": l.id,
    "Full Name": l.full_name,
    "Work Email": l.work_email,
    "Phone / WhatsApp": l.phone,
    "Service Requested": l.main_need,
    "Message / Details": l.message || "N/A",
    "Status": l.status,
    "Source Page": l.source_page || "Website Form",
    "Internal Notes": l.notes || "",
    "Submission Date": new Date(l.created_at).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths for beautiful excel formatting
  worksheet["!cols"] = [
    { wch: 6 },  // S.No
    { wch: 18 }, // Lead ID
    { wch: 22 }, // Full Name
    { wch: 28 }, // Work Email
    { wch: 18 }, // Phone
    { wch: 32 }, // Service Requested
    { wch: 40 }, // Message
    { wch: 14 }, // Status
    { wch: 18 }, // Source Page
    { wch: 30 }, // Internal Notes
    { wch: 22 }, // Submission Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Shiyos Leads");

  const today = new Date().toISOString().split("T")[0];

  if (format === "csv") {
    const csvBuffer = XLSX.write(workbook, { type: "buffer", bookType: "csv" });
    return new NextResponse(csvBuffer, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="shiyos-leads-${today}.csv"`,
      },
    });
  }

  const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(excelBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="shiyos-leads-${today}.xlsx"`,
    },
  });
}
