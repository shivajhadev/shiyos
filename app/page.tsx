import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import IndustriesMarquee from "@/components/home/Marquee";
import PainPoints from "@/components/home/PainPoints";
import ServicesOverview from "@/components/home/ServicesOverview";
import FlagshipServices from "@/components/home/FlagshipServices";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import WhyShiyos from "@/components/home/WhyShiyos";
import WorkTeaser from "@/components/home/WorkTeaser";
import LeadFormSection from "@/components/home/LeadFormSection";

export const metadata: Metadata = {
  title: "Shiyos Technologies — E-commerce Growth, AI Automation & Digital Marketing Agency",
  description:
    "Shiyos Technologies is a full-service IT, e-commerce growth, and digital marketing company. AI automation, performance marketing, influencer campaigns, and website development — all founder-led.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesMarquee />
      <PainPoints />
      <ServicesOverview />
      <FlagshipServices />
      <ProcessTimeline />
      <WhyShiyos />
      <WorkTeaser />
      <LeadFormSection />
    </>
  );
}
