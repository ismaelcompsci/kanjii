import { FC } from "react"
import { notFound, redirect } from "next/navigation"
import CreatePackCardForm from "@/src/components/CreatePackCardForm"
import { Separator } from "@/src/components/ui/separator"
import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"

interface pageProps {
  params: {
    packId: string
  }
}

// @ts-ignore async componnet
const page: FC<pageProps> = async ({ params }) => {
  const session = getAuthSession()

  if (!session) {
    return redirect("/sign-in")
  }

  return notFound()

  const pack = await db.vocabularyPack.findUnique({
    where: {
      id: params.packId,
    },
    include: {
      vocabulary: true,
    },
  })

  if (!pack) {
    return notFound()
  }

  const jsonVocabulary = JSON.stringify(pack!.vocabulary)

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Edit your Vocabulary pack
        </h2>
        <p className="text-muted-foreground">
          Edit your vocabulary pack and the associated vocabulary words.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1">
          <CreatePackCardForm
            packName={pack?.name}
            packVocabulary={jsonVocabulary}
            method={"EDIT"}
          />
        </div>
      </div>
    </div>
  )
}

export default page
