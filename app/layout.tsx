import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Shiyos Technologies — E-commerce Growth, AI & Digital Marketing Agency",
    template: "%s | Shiyos Technologies",
  },
  description:
    "Shiyos Technologies is a full-service IT, e-commerce growth, and digital marketing company. We deliver AI automation, performance marketing, influencer campaigns, and website development — founder-led, results-driven.",
  keywords: [
    "e-commerce growth",
    "AI automation",
    "performance marketing",
    "influencer marketing",
    "website development",
    "digital marketing India",
    "Shiyos Technologies",
    "Amazon ads",
    "SEO agency",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shiyostechnologies.com",
    siteName: "Shiyos Technologies",
    title: "Shiyos Technologies — E-commerce Growth, AI & Digital Marketing",
    description:
      "Full-service IT, e-commerce growth, and digital marketing. AI automation, ads, influencer campaigns, and website development — all founder-led.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiyos Technologies",
    description: "E-commerce Growth, AI Automation & Digital Marketing — Founder-led.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23F5B92E'/><text x='50%25' y='54%25' font-family='Syne,sans-serif' font-weight='800' font-size='20' fill='%23111214' text-anchor='middle' dominant-baseline='middle'>S</text></svg>",
        type: "image/svg+xml",
      },
    ],
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23F5B92E'/><text x='50%25' y='54%25' font-family='sans-serif' font-weight='900' font-size='20' fill='%23111214' text-anchor='middle' dominant-baseline='middle'>S</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts — Syne for display headings, Space Grotesk for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Inline SVG favicon — yellow S on amber background */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%23F5B92E'/><text x='16' y='22' font-family='Arial Black,sans-serif' font-weight='900' font-size='20' fill='%23111214' text-anchor='middle'>S</text></svg>"
        />
      </head>
      <body className="antialiased">
        {/* Anti-FOUC theme script — must be first thing in body */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('shiyos-theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
