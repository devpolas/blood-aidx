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
  Users,
} from "lucide-react";

import {
  FaAward,
  FaBuilding,
  FaDroplet,
  FaFileCircleCheck,
  FaFlag,
  FaPeopleGroup,
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

const commonSecondary = (dashboardPath: string): SidebarItem[] => [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Profile",
    url: `${dashboardPath}/profile`,
    icon: <User />,
  },
  {
    title: "Settings",
    url: `${dashboardPath}/settings`,
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

  navSecondary: commonSecondary("/dashboard/user"),
};

const moderatorDashboard: DashboardSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/moderator",
      icon: <LayoutDashboard />,
    },
    {
      title: "Users",
      url: "/dashboard/moderator/users",
      icon: <FaPeopleGroup />,
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

  navSecondary: commonSecondary("/dashboard/moderator"),
};

const adminDashboard: DashboardSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: <LayoutDashboard />,
    },
    {
      title: "Users",
      url: "/dashboard/admin/users",
      icon: <Users />,
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

  navSecondary: commonSecondary("/dashboard/admin"),
};

export const dashboardMenu: Record<UserRole, DashboardSidebar> = {
  [UserRole.USER]: userDashboard,
  [UserRole.MODERATOR]: moderatorDashboard,
  [UserRole.ADMIN]: adminDashboard,
};
