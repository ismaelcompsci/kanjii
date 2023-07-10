import { redirect } from "next/navigation"
import StudyPackCard from "@/src/components/StudyPackCard"
import {
  DashboardHeader,
  DashboardShell,
} from "@/src/components/dashboard/DashboardShell"
import { Button } from "@/src/components/ui/Button"
import { EmptyPlaceholder } from "@/src/components/ui/EmptyPlaceholder"
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
              <div className="col-span-full">
                <div className="mb-2 flex items-center gap-x-4">
                  <Button variant="default" size="sm" className="relative">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="relative">
                    <Trash className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
                <StudyPackCard
                  pack={pack}
                  key={pack.id}
                  currentLike={currentLike}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="like" />
          <EmptyPlaceholder.Title>No liked packs</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any liked packs yet.{" "}
            <a
              href="/study"
              className="underline decoration-destructive underline-offset-2 transition duration-1000 ease-in-out hover:underline-offset-4"
            >
              Start browsing.
            </a>
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </DashboardShell>
  )
}

export default PacksPage
