import { redirect } from "next/navigation"
import UserNameForm from "@/src/components/UserNameForm"
import {
  DashboardHeader,
  DashboardShell,
} from "@/src/components/dashboard/DashboardShell"
import { getAuthSession } from "@/src/lib/auth"

const Page = async () => {
  const session = await getAuthSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="View and manage your settings"
      />
      <div className="mx-auto">
        <div className="grid items-end gap-8">
          <div className="grid ">
            <UserNameForm
              user={{
                // @ts-ignore
                username: session.user.username || "",
                // @ts-ignore
                id: session.user.id,
              }}
            />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default Page
