import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal — Growth Insights from Shiyos Technologies",
  description:
    "Practical e-commerce, AI, SEO, and digital marketing insights from the Shiyos Technologies team.",
};

const posts = [
  {
    slug: "ai-seo-2025",
    title: "How AI is Changing Search in 2025: What E-commerce Brands Need to Know",
    excerpt: "Search engines now reward content that answers high-intent queries with empirical depth. Here is how AI-assisted content pipelines change organic rankings for e-commerce brands.",
    category: "AI & SEO",
    date: "August 2025",
    readTime: "6 min read",
  },
  {
    slug: "amazon-ads-acos",
    title: "The ACoS Illusion: Why Your Amazon Ads Look Profitable But Aren't",
    excerpt: "ACoS is the metric every marketplace seller watches, but it hides returns and ad spend cannibalization. Here is how to analyze true contribution margin.",
    category: "E-commerce",
    date: "July 2025",
    readTime: "5 min read",
  },
  {
    slug: "influencer-roi",
    title: "Measuring Influencer Marketing ROI: An Attribution Model That Works",
    excerpt: "Most influencer campaigns fail not from lack of reach, but because brands don't instrument post-campaign attribution before contracts are signed.",
    category: "Influencer Marketing",
    date: "July 2025",
    readTime: "7 min read",
  },
  {
    slug: "meta-ads-creative",
    title: "Why Your Meta Ads Decay — And Why It's Rarely a Targeting Problem",
    excerpt: "Creative fatigue is the single biggest bottleneck in Meta paid campaigns. Here is the exact creative testing framework we use to maintain stable ROAS.",
    category: "Performance Marketing",
    date: "June 2025",
    readTime: "8 min read",
  },
  {
    slug: "ecommerce-automation-tools",
    title: "The Multi-Channel Automation Stack We Run Across 150+ Accounts",
    excerpt: "Automation is only as effective as the underlying data architecture. We break down the exact triggers, repricing logic, and inventory webhooks we deploy.",
    category: "E-commerce",
    date: "June 2025",
    readTime: "9 min read",
  },
  {
    slug: "d2c-website-cro",
    title: "D2C Conversion Rate Optimization: 12 Changes That Move the Needle",
    excerpt: "After auditing and redesigning dozens of direct-to-consumer storefronts, these are the 12 UI changes that reliably increase purchase conversion rate.",
    category: "Website & CRO",
    date: "May 2025",
    readTime: "10 min read",
  },
];

export default function JournalPage() {
  return (
    <>
      <section
        style={{
          paddingTop: "150px",
          paddingBottom: "80px",
          position: "relative",
          borderBottom: "1px solid var(--border-card)",
        }}
      >
        <div className="container-custom">
          <span className="section-label" style={{ marginBottom: "20px", display: "inline-block" }}>
            FIELD NOTES & INSIGHTS
          </span>
          <h1
            style={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 800,
              fontSize: "clamp(40px, 5.5vw, 68px)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "24px",
              maxWidth: "750px",
            }}
          >
            Growth insights from the{" "}
            <span className="gradient-text">trenches.</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              maxWidth: "560px",
              lineHeight: "1.65",
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            Practical e-commerce, AI automation, SEO, and paid performance insights written by practitioners.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "64px", paddingBottom: "120px" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {posts.map((post) => (
              <article
                key={post.slug}
                className="card"
                style={{
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "20px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  minHeight: "320px",
                }}
              >
                <div>
                  <div style={{ marginBottom: "16px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        background: "rgba(245,185,46,0.1)",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(245,185,46,0.25)",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: '"Syne", sans-serif',
                      fontWeight: 800,
                      fontSize: "20px",
                      color: "var(--text-primary)",
                      lineHeight: "1.3",
                      marginBottom: "14px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      lineHeight: "1.65",
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "28px",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border-card)",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "var(--text-faint)" }}>
                    {post.date} · {post.readTime}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent)" }}>
                    Read article →
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "64px" }}>
            <Link href="/contact" className="btn-primary">
              Get Personalised Audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
