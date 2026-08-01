import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  LogOut,
} from "lucide-react";

export const settings = [
  {
    title: "Profile",
    description: "Update your personal information.",
    icon: User,
  },
  {
    title: "Notifications",
    description: "Manage email and app notifications.",
    icon: Bell,
  },
  {
    title: "Security",
    description: "Password, OTP and login settings.",
    icon: Shield,
  },
  {
    title: "Appearance",
    description: "Customize theme and colors.",
    icon: Palette,
  },
  {
    title: "Language",
    description: "Choose your preferred language.",
    icon: Globe,
  },
  {
    title: "Logout",
    description: "Sign out from your account.",
    icon: LogOut,
  },
];