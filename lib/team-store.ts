import fs from "fs";
import path from "path";

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

const DATA_DIR = path.join(process.cwd(), "data");
const TEAM_FILE = path.join(DATA_DIR, "team.json");

const defaultTeamData: TeamStoreData = {
  founder: {
    name: "Shiyo",
    role: "Founder & CEO",
    tagline: "Visionary behind Shiyos. 3+ years building brands, automating growth, and engineering results.",
    initials: "S",
    gradient: "linear-gradient(135deg, #F5B92E 0%, #e8a010 100%)",
    image: "",
    experienceYears: "3+",
    brandsCount: "150+",
    teamSize: "15",
    storyTitle: "About Shiyos Technologies",
    storyParagraph1: "Shiyos Technologies was founded in 2021 with a single mission — to give growing brands access to the same level of strategic talent and technology that only large enterprises could afford.",
    storyParagraph2: "What started as a one-person operation quickly grew into a 15-member powerhouse serving 150+ brands across India and worldwide — spanning e-commerce, AI automation, performance marketing, influencer campaigns, web development, and browser extension tools.",
    storyParagraph3: "Every project at Shiyos is founder-led. Shiyo personally oversees strategy, quality, and outcomes — ensuring every client gets the same commitment as if it were our own brand on the line.",
    milestones: [
      { year: "2021", event: "Shiyos founded — first e-commerce client onboarded" },
      { year: "2022", event: "Team grew to 5 — launched performance marketing & SEO" },
      { year: "2023", event: "Crossed 100 brands — added AI automation & influencer services" },
      { year: "2024", event: "15-member team — Chrome & Edge extension division launched" },
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

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getTeamData(): TeamStoreData {
  ensureDataDir();
  if (!fs.existsSync(TEAM_FILE)) {
    fs.writeFileSync(TEAM_FILE, JSON.stringify(defaultTeamData, null, 2), "utf-8");
    return defaultTeamData;
  }

  try {
    const raw = fs.readFileSync(TEAM_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading team.json:", err);
    return defaultTeamData;
  }
}

export function saveTeamData(data: TeamStoreData): void {
  ensureDataDir();
  fs.writeFileSync(TEAM_FILE, JSON.stringify(data, null, 2), "utf-8");
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
  const initials = member.initials?.trim() || member.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "TM";
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
    updates.initials = updates.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
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
