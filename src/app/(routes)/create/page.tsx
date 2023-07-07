import { redirect } from "next/navigation"
import CreatePackCardForm from "@/src/components/CreatePackCardForm"
import { getAuthSession } from "@/src/lib/auth"

const CreatePage = async () => {
  const session = await getAuthSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="space-y-6">
      <CreatePackCardForm />
    </div>
  )
}

export default CreatePage
