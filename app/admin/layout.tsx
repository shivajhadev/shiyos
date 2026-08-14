import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Shiyos Technologies",
  description: "Lead management and administration console for Shiyos Technologies.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
