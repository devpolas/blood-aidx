import type { ReactNode } from "react";

import {
  Bell,
  CircleHelp,
  CreditCard,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  Search,
  Settings,
  Star,
  User,
} from "lucide-react";

import {
  FaAward,
  FaBuilding,
  FaDroplet,
  FaFileCircleCheck,
  FaFlag,
} from "react-icons/fa6";
import { UserRole } from "@/types/enum";

export const PUBLIC_NAVIGATION = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Find Donors",
    href: "/donors",
  },
  {
    title: "Blood Requests",
    href: "/blood-requests",
  },
  {
    title: "Organizations",
    href: "/organizations",
  },
] as const;

export const GENDERS = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
] as const;

export interface SidebarItem {
  title: string;
  url: string;
  icon: ReactNode;
}

export interface DashboardSidebar {
  navMain: SidebarItem[];
  navSecondary: SidebarItem[];
}

const commonSecondary = (): SidebarItem[] => [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: <User />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Help Center",
    url: "/help",
    icon: <CircleHelp />,
  },
];

const userDashboard: DashboardSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Blood Requests",
      url: "/dashboard/user/blood-requests",
      icon: <FaDroplet />,
    },
    {
      title: "My Responses",
      url: "/dashboard/user/responses",
      icon: <FileText />,
    },
    {
      title: "Find Donors",
      url: "/donors",
      icon: <Search />,
    },
    {
      title: "My Donations",
      url: "/dashboard/user/donations",
      icon: <Heart />,
    },
    {
      title: "Certificates",
      url: "/dashboard/user/certificates",
      icon: <FaFileCircleCheck />,
    },
    {
      title: "Milestones",
      url: "/dashboard/user/milestones",
      icon: <FaAward />,
    },
    {
      title: "Organizations",
      url: "/organizations",
      icon: <FaBuilding />,
    },
    {
      title: "Messages",
      url: "/dashboard/user/messages",
      icon: <MessageCircle />,
    },
    {
      title: "Reviews",
      url: "/dashboard/user/reviews",
      icon: <Star />,
    },
    {
      title: "Notifications",
      url: "/dashboard/user/notifications",
      icon: <Bell />,
    },
    {
      title: "Payments",
      url: "/dashboard/user/payments",
      icon: <CreditCard />,
    },
  ],

  navSecondary: commonSecondary(),
};

const moderatorDashboard: DashboardSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/moderator",
      icon: <LayoutDashboard />,
    },
    {
      title: "Donors",
      url: "/dashboard/moderator/donors",
      icon: <Heart />,
    },
    {
      title: "Blood Requests",
      url: "/dashboard/moderator/blood-requests",
      icon: <FaDroplet />,
    },
    {
      title: "Donations",
      url: "/dashboard/moderator/donations",
      icon: <FaFileCircleCheck />,
    },
    {
      title: "Organizations",
      url: "/dashboard/moderator/organizations",
      icon: <FaBuilding />,
    },
    {
      title: "Reports",
      url: "/dashboard/moderator/reports",
      icon: <FaFlag />,
    },
    {
      title: "Reviews",
      url: "/dashboard/moderator/reviews",
      icon: <Star />,
    },
    {
      title: "Messages",
      url: "/dashboard/moderator/messages",
      icon: <MessageCircle />,
    },
    {
      title: "Notifications",
      url: "/dashboard/moderator/notifications",
      icon: <Bell />,
    },
  ],

  navSecondary: commonSecondary(),
};

const adminDashboard: DashboardSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: <LayoutDashboard />,
    },

    {
      title: "Donors",
      url: "/dashboard/admin/donors",
      icon: <Heart />,
    },
    {
      title: "Blood Requests",
      url: "/dashboard/admin/blood-requests",
      icon: <FaDroplet />,
    },
    {
      title: "Donations",
      url: "/dashboard/admin/donations",
      icon: <FaFileCircleCheck />,
    },
    {
      title: "Organizations",
      url: "/dashboard/admin/organizations",
      icon: <FaBuilding />,
    },
    {
      title: "Milestones",
      url: "/dashboard/admin/milestones",
      icon: <FaAward />,
    },
    {
      title: "Reports",
      url: "/dashboard/admin/reports",
      icon: <FaFlag />,
    },
    {
      title: "Reviews",
      url: "/dashboard/admin/reviews",
      icon: <Star />,
    },
    {
      title: "Payments",
      url: "/dashboard/admin/payments",
      icon: <CreditCard />,
    },
    {
      title: "Messages",
      url: "/dashboard/admin/messages",
      icon: <MessageCircle />,
    },
    {
      title: "Notifications",
      url: "/dashboard/admin/notifications",
      icon: <Bell />,
    },
  ],

  navSecondary: commonSecondary(),
};

export const dashboardMenu: Record<UserRole, DashboardSidebar> = {
  [UserRole.USER]: userDashboard,
  [UserRole.MODERATOR]: moderatorDashboard,
  [UserRole.ADMIN]: adminDashboard,
};

export function getDashboardMenu(
  role: keyof typeof dashboardMenu,
): DashboardSidebar {
  return dashboardMenu[role];
}

export const BLOOD_GROUP_OPTIONS = [
  { label: "A+", value: "a_positive" },
  { label: "A−", value: "a_negative" },
  { label: "B+", value: "b_positive" },
  { label: "B−", value: "b_negative" },
  { label: "AB+", value: "ab_positive" },
  { label: "AB−", value: "ab_negative" },
  { label: "O+", value: "o_positive" },
  { label: "O−", value: "o_negative" },
] as const;

export const AVAILABILITY_OPTIONS = [
  {
    label: "Available",
    value: "available",
    description: "I'm currently available to donate blood.",
  },
  {
    label: "Temporarily unavailable",
    value: "temporarily_unavailable",
    description: "I'm temporarily unable to donate.",
  },
  {
    label: "Unavailable",
    value: "unavailable",
    description: "I'm currently not available to donate.",
  },
] as const;

export const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
] as const;
