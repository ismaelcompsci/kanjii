import { redirect } from "next/navigation"
import { DashboardNav } from "@/src/components/dashboard/DashboardNav"
import { dashboardConfig } from "@/src/config/dashboard"
import { getAuthSession } from "@/src/lib/auth"

interface DashboardLayoutProps {
  children?: React.ReactNode
}
// TODO : CHANGE USERNAME ADD UI
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getAuthSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="mt-4 hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="mt-4 flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
