import {
  Bell,
  Shield,
  Palette,
  Trash2,
  Lock,
} from "lucide-react";

export const settings = [
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage email and app notifications.",
    icon: Bell,
  },
  {
    id: "security",
    title: "Security",
    description: "Change password and account security.",
    icon: Lock,
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Control profile visibility and privacy.",
    icon: Shield,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize theme and display.",
    icon: Palette,
  },
  {
    id: "danger",
    title: "Danger Zone",
    description: "Delete your account permanently.",
    icon: Trash2,
  },
];