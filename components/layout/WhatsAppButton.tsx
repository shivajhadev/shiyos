"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <a
      href="https://wa.me/917986408226?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={18} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
