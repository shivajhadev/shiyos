import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team | Shiyos",
  description:
    "The people behind Shiyos — founder-led, results-driven. Meet the team powering 150+ brands across e-commerce, digital marketing, and tech.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
