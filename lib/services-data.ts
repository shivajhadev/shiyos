export interface Service {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  isFlagship?: boolean;
  category: string;
  categorySlug: string;
  iconName: string;
}

export interface ServiceCategory {
  name: string;
  slug: string;
  description: string;
  iconName: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: "E-commerce Growth & Automation",
    slug: "ecommerce-growth",
    description: "Scale your e-commerce operations with automation pipelines, marketplace ads, and revenue growth strategy.",
    iconName: "ShoppingCart",
    services: [
      {
        name: "E-commerce Automation",
        slug: "ecommerce-automation",
        tagline: "Automate",
        description: "End-to-end automation for your e-commerce operations — from inventory sync to order fulfillment and dynamic repricing, scaling without adding headcount.",
        isFlagship: true,
        category: "E-commerce Growth & Automation",
        categorySlug: "ecommerce-growth",
        iconName: "Zap",
      },
      {
        name: "E-commerce Ads",
        slug: "ecommerce-ads",
        tagline: "Amazon · Flipkart · Quick Commerce",
        description: "Data-driven ad campaigns on Amazon, Flipkart, Blinkit, Zepto, and Swiggy Instamart — optimized for ACoS, visibility, and profitable growth.",
        isFlagship: true,
        category: "E-commerce Growth & Automation",
        categorySlug: "ecommerce-growth",
        iconName: "Package",
      },
      {
        name: "E-commerce BuyBox Management",
        slug: "ecommerce-buybox",
        tagline: "Win the BuyBox",
        description: "Systematic BuyBox winning strategy through pricing intelligence, inventory management, and seller performance optimization.",
        category: "E-commerce Growth & Automation",
        categorySlug: "ecommerce-growth",
        iconName: "Trophy",
      },
      {
        name: "E-commerce Brand Onboarding",
        slug: "ecommerce-brand-onboarding",
        tagline: "Launch right",
        description: "Complete brand onboarding on Amazon, Flipkart, and marketplaces — catalog setup, A+ content, brand registry, and launch velocity strategy.",
        category: "E-commerce Growth & Automation",
        categorySlug: "ecommerce-growth",
        iconName: "Rocket",
      },
      {
        name: "Sales Growth Strategy",
        slug: "sales-growth-strategy",
        tagline: "Grow revenue",
        description: "Holistic revenue growth strategy combining pricing, promotions, channel mix, and demand generation to compound your e-commerce results.",
        category: "E-commerce Growth & Automation",
        categorySlug: "ecommerce-growth",
        iconName: "TrendingUp",
      },
      {
        name: "On-Demand Extension Services",
        slug: "on-demand-extension",
        tagline: "Your flex team",
        description: "A skilled extension of your internal team, on demand. Get senior e-commerce talent for sprints, launches, or ongoing support without hiring.",
        isFlagship: true,
        category: "E-commerce Growth & Automation",
        categorySlug: "ecommerce-growth",
        iconName: "Users",
      },
    ],
  },
  {
    name: "AI Automation & Intelligence",
    slug: "ai-automation",
    description: "Harness AI to automate repetitive workflows, generate creatives, and rank smarter in search.",
    iconName: "Cpu",
    services: [
      {
        name: "AI Automation",
        slug: "ai-automation",
        tagline: "Work smarter",
        description: "Custom AI workflows and automation pipelines that eliminate manual tasks, surface insights from your data, and let your team focus on high-value work.",
        isFlagship: true,
        category: "AI Automation & Intelligence",
        categorySlug: "ai-automation",
        iconName: "Cpu",
      },
      {
        name: "AI-Assisted SEO",
        slug: "ai-assisted-seo",
        tagline: "Search",
        description: "Technical SEO fixes, AI-powered content built around what people actually search, and reporting that shows exactly where traffic came from.",
        isFlagship: true,
        category: "AI Automation & Intelligence",
        categorySlug: "ai-automation",
        iconName: "Search",
      },
      {
        name: "AI Video Making",
        slug: "ai-video-making",
        tagline: "AI-powered video",
        description: "High-volume, on-brand video content produced with AI tools — product demos, ad creatives, explainers — at a fraction of traditional production cost.",
        category: "AI Automation & Intelligence",
        categorySlug: "ai-automation",
        iconName: "Video",
      },
    ],
  },
  {
    name: "Performance Marketing & Ads",
    slug: "performance-marketing",
    description: "Meta & Google campaigns judged on what they return, not what they spend.",
    iconName: "Target",
    services: [
      {
        name: "Performance Marketing",
        slug: "performance-marketing",
        tagline: "Meta & Google Ads",
        description: "Meta and Google campaigns that are judged on what they return, not what they spend. Creative and targeting iterated against real numbers every week.",
        isFlagship: true,
        category: "Performance Marketing & Ads",
        categorySlug: "performance-marketing",
        iconName: "Target",
      },
      {
        name: "Amazon Ads Video Making",
        slug: "amazon-ads-video",
        tagline: "Amazon video ads",
        description: "Sponsored brand videos and streaming TV ads on Amazon — produced, scripted, and optimized to drive consideration and conversion at scale.",
        category: "Performance Marketing & Ads",
        categorySlug: "performance-marketing",
        iconName: "PlayCircle",
      },
    ],
  },
  {
    name: "SEO & Digital Marketing",
    slug: "seo-digital-marketing",
    description: "Organic growth through SEO and full-funnel digital strategy.",
    iconName: "Radio",
    services: [
      {
        name: "SEO",
        slug: "seo",
        tagline: "Organic growth",
        description: "On-page, technical, and off-page SEO that compounds over time — structured data, Core Web Vitals, link building, and content strategy aligned to real search intent.",
        category: "SEO & Digital Marketing",
        categorySlug: "seo-digital-marketing",
        iconName: "Search",
      },
      {
        name: "Digital Marketing",
        slug: "digital-marketing",
        tagline: "Full-funnel strategy",
        description: "Integrated digital marketing strategy across channels — combining SEO, paid, social, and email into one coherent growth plan with unified reporting.",
        category: "SEO & Digital Marketing",
        categorySlug: "seo-digital-marketing",
        iconName: "Compass",
      },
    ],
  },
  {
    name: "Creative & Content Production",
    slug: "creative-content",
    description: "Premium visuals, vertical videos, and design that make your brand impossible to scroll past.",
    iconName: "Palette",
    services: [
      {
        name: "Premium Video Editing",
        slug: "premium-video-editing",
        tagline: "Vertical video",
        description: "Concepting, scripting, and editing for the format that carries reach right now. Built to be watched to the end, not scrolled past.",
        category: "Creative & Content Production",
        categorySlug: "creative-content",
        iconName: "Film",
      },
      {
        name: "UGC Ads Making",
        slug: "ugc-ads",
        tagline: "UGC creatives",
        description: "Authentic, high-converting UGC-style ad creatives — scripted, produced, and delivered for Meta, TikTok, and Amazon — that feel native, not promotional.",
        category: "Creative & Content Production",
        categorySlug: "creative-content",
        iconName: "Smartphone",
      },
      {
        name: "Graphic Design",
        slug: "graphic-design",
        tagline: "Brand design",
        description: "Brand identity, marketing collateral, and digital assets that are visually consistent and built to convert — from logo systems to full campaign assets.",
        category: "Creative & Content Production",
        categorySlug: "creative-content",
        iconName: "PenTool",
      },
      {
        name: "3D Image Making",
        slug: "3d-image-making",
        tagline: "3D product renders",
        description: "Photorealistic 3D product renders and lifestyle images — deliver studio-quality visuals for any background, angle, or scene without a physical shoot.",
        category: "Creative & Content Production",
        categorySlug: "creative-content",
        iconName: "Box",
      },
      {
        name: "Packaging Design",
        slug: "packaging-design",
        tagline: "Boxes · Pouches · Labels",
        description: "Retail and D2C custom packaging design — luxury boxes, pouches, labels, die-lines, and unboxing experiences engineered to make your product impossible to ignore.",
        category: "Creative & Content Production",
        categorySlug: "creative-content",
        iconName: "Package",
      },
      {
        name: "Listing Image Design",
        slug: "listing-image-design",
        tagline: "Marketplace images",
        description: "Amazon, Flipkart, and D2C listing images designed to maximize click-through and conversion — main images, infographics, lifestyle, and comparison charts.",
        category: "Creative & Content Production",
        categorySlug: "creative-content",
        iconName: "Image",
      },
    ],
  },
  {
    name: "Social & Influencer Marketing",
    slug: "social-influencer",
    description: "Build audiences and trust through creators, personal branding, and always-on social management.",
    iconName: "Megaphone",
    services: [
      {
        name: "Influencer Marketing",
        slug: "influencer-marketing",
        tagline: "YouTube · Instagram · Facebook",
        description: "End-to-end influencer campaigns on YouTube, Instagram, and Facebook — from creator sourcing and briefing to content review, publishing, and performance tracking.",
        isFlagship: true,
        category: "Social & Influencer Marketing",
        categorySlug: "social-influencer",
        iconName: "Star",
      },
      {
        name: "Social Media Management",
        slug: "social-media-management",
        tagline: "Always-on",
        description: "Full account ownership — strategy, creative calendar, community management, and monthly reporting across Instagram, LinkedIn, YouTube, and Facebook.",
        category: "Social & Influencer Marketing",
        categorySlug: "social-influencer",
        iconName: "Share2",
      },
      {
        name: "Personal Branding",
        slug: "personal-branding",
        tagline: "Founder-led",
        description: "Building a founder or expert into a recognised voice on LinkedIn, YouTube, and Instagram — so the person becomes the reason people trust the company.",
        category: "Social & Influencer Marketing",
        categorySlug: "social-influencer",
        iconName: "UserCheck",
      },
    ],
  },
  {
    name: "Web, App & Software",
    slug: "web-app-software",
    description: "Build ultra-fast, conversion-focused websites, mobile apps, and custom software systems.",
    iconName: "Globe",
    services: [
      {
        name: "Website Design & Development",
        slug: "website-design-development",
        tagline: "Build",
        description: "Sites that load fast, read clearly on a phone, and make the next step obvious. Built to be found and to convert — not just to look good.",
        isFlagship: true,
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "Globe",
      },
      {
        name: "Android App Development",
        slug: "android-app-development",
        tagline: "Android apps",
        description: "Native and cross-platform Android applications built with modern architecture — from MVP to production-ready, optimized for the mobile market.",
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "Smartphone",
      },
      {
        name: "E-commerce App Development",
        slug: "ecommerce-app-development",
        tagline: "Shopping apps",
        description: "Custom e-commerce mobile apps with seamless checkout, push notifications, loyalty features, and deep integrations with your existing backend.",
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "ShoppingBag",
      },
      {
        name: "Shopify Website Making",
        slug: "shopify-website",
        tagline: "Shopify stores",
        description: "Custom Shopify stores built to convert — bespoke themes, app integrations, conversion rate optimization, and ongoing performance improvements.",
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "Store",
      },
      {
        name: "Chrome & Edge Extension Development",
        slug: "chrome-edge-extension",
        tagline: "One-click data fetching",
        description: "On-demand browser extensions for Chrome & Edge — fetch live product data (price, availability, rank, BuyBox status) from Amazon & Flipkart with one click. Built for power sellers, brands, and e-commerce teams who need real-time marketplace intelligence.",
        isFlagship: true,
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "Puzzle",
      },
      {
        name: "IT Services",
        slug: "it-services",
        tagline: "IT infrastructure",
        description: "Cloud infrastructure, server setup, DevOps, and IT support — the technical backbone your growing business needs to stay fast, secure, and scalable.",
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "Server",
      },
      {
        name: "Software Support",
        slug: "software-support",
        tagline: "Ongoing support",
        description: "Dedicated technical support, maintenance, and enhancement for your existing web and software products — so your systems never slow your business down.",
        category: "Web, App & Software",
        categorySlug: "web-app-software",
        iconName: "Wrench",
      },
    ],
  },
];

export const flagshipServices = serviceCategories
  .flatMap((cat) => cat.services)
  .filter((s) => s.isFlagship);

export const allServices = serviceCategories.flatMap((cat) => cat.services);

export const rotatingWords = [
  "Influencer Marketing",
  "Website Development",
  "AI-Assisted SEO",
  "Ecommerce Ads",
  "On-Demand Extension",
  "AI Automation",
  "Performance Marketing",
  "Extension Making",
];

export const serviceNeedsOptions = [
  "E-commerce Automation",
  "E-commerce Ads (Amazon / Flipkart)",
  "AI Automation",
  "AI-Assisted SEO",
  "Performance Marketing (Meta & Google)",
  "Influencer Marketing",
  "Packaging Design",
  "Website Design & Development",
  "Chrome & Edge Extension Development",
  "Social Media Management",
  "Premium Video Editing",
  "Personal Branding",
  "Other / Multiple Services",
];
