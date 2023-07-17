import { DashboardConfig } from "@/src/types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Likes",
      href: "/dashboard",
      icon: "like",
    },
    {
      title: "Manage",
      href: "/dashboard/manage",
      icon: "package",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
