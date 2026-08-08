import {
  LayoutDashboard,
  User,
  FolderKanban,
  Award,
  Code2,
  FileText,
  Zap,
  Target,
  Trophy,
  Bot,
  Settings,
  Medal,
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
    title: "Achievements",
    href: "/achievements",
    icon: Medal,
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
    icon: Zap,
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
    icon: Bot,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];