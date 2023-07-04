import { DashboardConfig } from "../types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Likes",
      href: "/dashboard",
      icon: "like",
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
