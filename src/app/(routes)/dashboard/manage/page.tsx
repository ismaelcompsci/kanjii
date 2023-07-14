import { redirect } from "next/navigation"
import ManagePacks from "@/src/components/ManagePacks"
import StudyPackCard from "@/src/components/StudyPackCard"
import {
  DashboardHeader,
  DashboardShell,
} from "@/src/components/dashboard/DashboardShell"
import { Button } from "@/src/components/ui/Button"
import { EmptyPlaceholder } from "@/src/components/ui/EmptyPlaceholder"
import { Separator } from "@/src/components/ui/separator"
import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { Edit, Trash } from "lucide-react"

const PacksPage = async () => {
  const session = await getAuthSession()

  if (!session) {
    redirect("/sign-in")
  }

  const myPacks = await db.vocabularyPack.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      creator: {
        select: {
          username: true,
          name: true,
          image: true,
        },
      },
      likes: true,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage"
        text="View and manage your Vocabulary Packs"
      />
      {myPacks?.length ? (
        <div className="mx-4 mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {myPacks.map((pack) => {
            const currentLike = pack.likes.find(
              (like) => like.userId === session?.user.id
            )
            // TODO : make a new component
            // add edit form
            // add delete api and edit api

            return (
              <div className="col-span-full" key={pack.id}>
                <Separator className="mb-4" />
                <div className="mb-2 flex items-center gap-x-4">
                  <ManagePacks pack={pack} />
                </div>
                <StudyPackCard
                  pack={pack}
                  key={pack.id}
                  currentLike={currentLike}
                  showButton={false}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="package" />
          <EmptyPlaceholder.Title>Empty :/</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any packs to manage yet.{" "}
            <a
              href="/create"
              className="underline decoration-destructive underline-offset-2 transition duration-1000 ease-in-out hover:underline-offset-4"
            >
              Create one!.
            </a>
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </DashboardShell>
  )
}

export default PacksPage
