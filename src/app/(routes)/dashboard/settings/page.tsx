import { redirect } from "next/navigation"
import UserNameForm from "@/src/components/UserNameForm"
import { getAuthSession } from "@/src/lib/auth"

const Page = async () => {
  const session = await getAuthSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="grid items-start gap-8">
        <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>
        <div className="grid gap-10">
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
  )
}

export default Page
