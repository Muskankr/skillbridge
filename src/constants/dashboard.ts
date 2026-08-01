import {
  LayoutDashboard,
  User,
  FolderKanban,
  Award,
  Trophy,
  Code2,
  FileText,
  Settings,
  Sparkles,
  Target,
  Brain,
} from "lucide-react";

export const dashboardLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: Award,
  },
  {
    title: "Developer Hub",
    href: "/developer-hub",
    icon: Code2,
  },
  {
    title: "Resume Builder",
    href: "/resume-builder",
    icon: FileText,
  },
  {
    title: "XP System",
    href: "/xp",
    icon: Sparkles,
  },
  {
    title: "Daily Challenges",
    href: "/daily-challenges",
    icon: Target,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "AI Toolkit",
    href: "/ai-toolkit",
    icon: Brain,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];