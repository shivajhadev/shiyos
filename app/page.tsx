import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import IndustriesMarquee from "@/components/home/Marquee";
import FlagshipServices from "@/components/home/FlagshipServices";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import WhyShiyos from "@/components/home/WhyShiyos";
import WorkTeaser from "@/components/home/WorkTeaser";
import LeadFormSection from "@/components/home/LeadFormSection";

export const metadata: Metadata = {
  title: "Shiyos Technologies — AI • Software • Automation • Growth",
  description:
    "Shiyos Technologies is a founder-led B2B growth and software engineering studio. Full-service IT, AI automation, custom web/app development, and high-ROI performance marketing.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesMarquee />
      <FlagshipServices />
      <ProcessTimeline />
      <WhyShiyos />
      <WorkTeaser />
      <LeadFormSection />
    </>
  );
}
