"use client";

import { dashboardMenu, DashboardSidebar } from "@/config";
import useAuth from "./use-auth";

export function useDashboardMenu(): DashboardSidebar | null {
  const { user } = useAuth();
  if (!user) return null;
  return dashboardMenu[user.role];
}
