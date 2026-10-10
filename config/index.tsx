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

// Types

export interface SidebarItem {
  title: string;
  url: string;
  icon: ReactNode;
}

export interface DashboardSidebar {
  navMain: SidebarItem[];
  navSecondary: SidebarItem[];
}

// Public Navigation

export const PUBLIC_NAVIGATION = [
  { title: "Home", href: "/" },
  { title: "Blood Requests", href: "/find-requests" },
  { title: "Find Donors", href: "/find-donors" },
  { title: "Organizations", href: "/find-organizations" },
] as const;

// Form Options

export const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
] as const;

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

// Dashboard Routes

export const DASHBOARD_PATHS: Record<UserRole, string> = {
  [UserRole.USER]: "/dashboard",
  [UserRole.MODERATOR]: "/dashboard/moderator",
  [UserRole.ADMIN]: "/dashboard/admin",
};

// Shared dashboard pages available to every authenticated role.
export const SHARED_DASHBOARD_PATHS = [
  "/dashboard/profile",
  "/dashboard/settings",
] as const;

// Shared Sidebar Navigation

const createSecondaryNavigation = (): SidebarItem[] => [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Find Requests",
    url: "/find-requests",
    icon: <FaDroplet />,
  },
  {
    title: "Find Donors",
    url: "/find-donors",
    icon: <Search />,
  },
  {
    title: "Find Organizations",
    url: "/find-organizations",
    icon: <FaBuilding />,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: <User />,
  },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: <Settings />,
  // },
  // {
  //   title: "Help Center",
  //   url: "/help",
  //   icon: <CircleHelp />,
  // },
];

// User Dashboard Navigation

const userDashboard: DashboardSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Blood Requests",
      url: "/dashboard/blood-requests",
      icon: <FaDroplet />,
    },
    {
      title: "Responses",
      url: "/dashboard/responses",
      icon: <FileText />,
    },

    {
      title: "Donations",
      url: "/dashboard/donations",
      icon: <Heart />,
    },
    // {
    //   title: "Certificates",
    //   url: "/dashboard/certificates",
    //   icon: <FaFileCircleCheck />,
    // },
    // {
    //   title: "Milestones",
    //   url: "/dashboard/milestones",
    //   icon: <FaAward />,
    // },

    {
      title: "Organizations",
      url: "/dashboard/organizations",
      icon: <FaBuilding />,
    },
    // {
    //   title: "Messages",
    //   url: "/dashboard/messages",
    //   icon: <MessageCircle />,
    // },
    // {
    //   title: "Reviews",
    //   url: "/dashboard/reviews",
    //   icon: <Star />,
    // },
    // {
    //   title: "Notifications",
    //   url: "/dashboard/notifications",
    //   icon: <Bell />,
    // },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: <CreditCard />,
    },
  ],
  navSecondary: createSecondaryNavigation(),
};

// Moderator Dashboard Navigation

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
    // {
    //   title: "Reports",
    //   url: "/dashboard/moderator/reports",
    //   icon: <FaFlag />,
    // },
    {
      title: "Reviews",
      url: "/dashboard/moderator/reviews",
      icon: <Star />,
    },
    // {
    //   title: "Messages",
    //   url: "/dashboard/moderator/messages",
    //   icon: <MessageCircle />,
    // },
    // {
    //   title: "Notifications",
    //   url: "/dashboard/moderator/notifications",
    //   icon: <Bell />,
    // },
  ],
  navSecondary: createSecondaryNavigation(),
};

// Admin Dashboard Navigation

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
    // {
    //   title: "Milestones",
    //   url: "/dashboard/admin/milestones",
    //   icon: <FaAward />,
    // },
    // {
    //   title: "Reports",
    //   url: "/dashboard/admin/reports",
    //   icon: <FaFlag />,
    // },
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
    // {
    //   title: "Messages",
    //   url: "/dashboard/admin/messages",
    //   icon: <MessageCircle />,
    // },
    // {
    //   title: "Notifications",
    //   url: "/dashboard/admin/notifications",
    //   icon: <Bell />,
    // },
  ],
  navSecondary: createSecondaryNavigation(),
};

// Dashboard Menu Registry

export const dashboardMenu: Record<UserRole, DashboardSidebar> = {
  [UserRole.USER]: userDashboard,
  [UserRole.MODERATOR]: moderatorDashboard,
  [UserRole.ADMIN]: adminDashboard,
};

// Dashboard Helpers

export function getDashboardPath(role: UserRole): string {
  return DASHBOARD_PATHS[role];
}

export function getDashboardMenu(role: UserRole): DashboardSidebar {
  return dashboardMenu[role];
}

function isRouteMatch(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function hasRouteAccess(role: UserRole, pathname: string): boolean {
  const dashboardPath = DASHBOARD_PATHS[role];

  if (!dashboardPath) {
    return false;
  }

  // Allow the user's own dashboard and its nested pages.
  if (isRouteMatch(pathname, dashboardPath)) {
    return true;
  }

  // Allow shared profile and settings pages.
  return SHARED_DASHBOARD_PATHS.some((route) => isRouteMatch(pathname, route));
}
