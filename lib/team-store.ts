import fs from "fs";
import path from "path";
import os from "os";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  gradient?: string;
  image?: string;
  bio?: string;
  category?: string;
}

export interface FounderData {
  name: string;
  role: string;
  tagline: string;
  initials: string;
  gradient?: string;
  image?: string;
  experienceYears: string;
  brandsCount: string;
  teamSize: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  milestones: { year: string; event: string }[];
}

export interface TeamStoreData {
  founder: FounderData;
  members: TeamMember[];
}

const defaultTeamData: TeamStoreData = {
  founder: {
    name: "Shiva Jha",
    role: "Founder & CEO",
    tagline: "Visionary behind Shiyos. 2+ years building brands, automating growth, and engineering results.",
    initials: "SJ",
    gradient: "linear-gradient(135deg, #F5B92E 0%, #e8a010 100%)",
    image: "",
    experienceYears: "2+",
    brandsCount: "150+",
    teamSize: "15+",
    storyTitle: "About Shiyos Technologies",
    storyParagraph1: "Shiyos Technologies was founded with a single mission — to give growing brands access to the same level of strategic talent, custom engineering, and performance automation that only large enterprises could afford.",
    storyParagraph2: "What started as a focused operation quickly grew into a 15+ member powerhouse serving 150+ brands across India and worldwide — spanning e-commerce, AI automation, performance marketing, influencer campaigns, web development, and browser extension tools.",
    storyParagraph3: "Every project at Shiyos is founder-led. Shiva personally oversees strategy, quality, and outcomes — ensuring every client gets the same commitment as if it were our own brand on the line.",
    milestones: [
      { year: "2024", event: "Shiyos founded — first 25 e-commerce & technology clients onboarded" },
      { year: "2024", event: "Team grew to 8 — launched performance marketing & Advance AI automation" },
      { year: "2025", event: "Crossed 100+ projects — added AI UGC video ads & influencer pipelines" },
      { year: "2026", event: "15+ specialist team — full-stack digital growth & software engineering studio" },
    ],
  },
  members: [
    { id: "m_1", name: "Rahul K.", role: "E-commerce Lead", initials: "RK", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", category: "E-commerce" },
    { id: "m_2", name: "Priya S.", role: "Performance Marketer", initials: "PS", gradient: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)", category: "Marketing" },
    { id: "m_3", name: "Arjun M.", role: "AI & Automation", initials: "AM", gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", category: "AI & Tech" },
    { id: "m_4", name: "Sneha T.", role: "SEO Strategist", initials: "ST", gradient: "linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)", category: "SEO" },
    { id: "m_5", name: "Dev P.", role: "Full-Stack Developer", initials: "DP", gradient: "linear-gradient(135deg, #0f3460 0%, #533483 100%)", category: "Engineering" },
    { id: "m_6", name: "Neha R.", role: "Graphic Designer", initials: "NR", gradient: "linear-gradient(135deg, #533483 0%, #1a1a2e 100%)", category: "Design" },
    { id: "m_7", name: "Kartik B.", role: "Amazon Ads Specialist", initials: "KB", gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", category: "E-commerce" },
    { id: "m_8", name: "Ananya V.", role: "Video Editor", initials: "AV", gradient: "linear-gradient(135deg, #16213e 0%, #533483 100%)", category: "Content" },
    { id: "m_9", name: "Rohit J.", role: "Influencer Manager", initials: "RJ", gradient: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)", category: "Marketing" },
    { id: "m_10", name: "Meera C.", role: "Social Media Manager", initials: "MC", gradient: "linear-gradient(135deg, #533483 0%, #0f3460 100%)", category: "Content" },
    { id: "m_11", name: "Siddharth N.", role: "BuyBox Strategist", initials: "SN", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", category: "E-commerce" },
    { id: "m_12", name: "Pooja L.", role: "Content Writer", initials: "PL", gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)", category: "Content" },
    { id: "m_13", name: "Vivek A.", role: "Chrome Extension Dev", initials: "VA", gradient: "linear-gradient(135deg, #0f3460 0%, #533483 100%)", category: "Engineering" },
    { id: "m_14", name: "Tanvi G.", role: "Brand Onboarding", initials: "TG", gradient: "linear-gradient(135deg, #533483 0%, #1a1a2e 100%)", category: "Operations" },
  ],
};

// Global in-memory cache for ultra-fast response and serverless fallback
let inMemoryTeamData: TeamStoreData = JSON.parse(JSON.stringify(defaultTeamData));

function getWritableFilePath(): string {
  try {
    const localDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const testPath = path.join(localDir, ".test-write");
    fs.writeFileSync(testPath, "1");
    fs.unlinkSync(testPath);
    return path.join(localDir, "team.json");
  } catch {
    const tmpDir = path.join(os.tmpdir(), "shiyos-data");
    if (!fs.existsSync(tmpDir)) {
      try {
        fs.mkdirSync(tmpDir, { recursive: true });
      } catch {
        // ignore
      }
    }
    return path.join(tmpDir, "team.json");
  }
}

export function getTeamData(): TeamStoreData {
  const filePath = getWritableFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      inMemoryTeamData = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading team data from disk, using in-memory cache:", err);
  }

  // If not on disk yet, try to save default
  try {
    fs.writeFileSync(filePath, JSON.stringify(inMemoryTeamData, null, 2), "utf-8");
  } catch {
    // Ignore read-only errors
  }
  return inMemoryTeamData;
}

export function saveTeamData(data: TeamStoreData): void {
  inMemoryTeamData = data;
  try {
    const filePath = getWritableFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing team.json, retained in-memory:", err);
  }
}

export function updateFounderData(founderUpdates: Partial<FounderData>): FounderData {
  const data = getTeamData();
  data.founder = {
    ...data.founder,
    ...founderUpdates,
  };
  saveTeamData(data);
  return data.founder;
}

export function addTeamMember(member: Omit<TeamMember, "id">): TeamMember {
  const data = getTeamData();
  const initials =
    member.initials?.trim() ||
    member.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() ||
    "TM";

  const newMember: TeamMember = {
    id: `m_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...member,
    initials,
    gradient: member.gradient || "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  };
  data.members.push(newMember);
  saveTeamData(data);
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
  const data = getTeamData();
  const index = data.members.findIndex((m) => m.id === id);
  if (index === -1) return null;

  if (updates.name && !updates.initials) {
    updates.initials = updates.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  data.members[index] = {
    ...data.members[index],
    ...updates,
  };
  saveTeamData(data);
  return data.members[index];
}

export function deleteTeamMember(id: string): boolean {
  const data = getTeamData();
  const filtered = data.members.filter((m) => m.id !== id);
  if (filtered.length === data.members.length) return false;

  data.members = filtered;
  saveTeamData(data);
  return true;
}
