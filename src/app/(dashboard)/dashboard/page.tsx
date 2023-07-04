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

export const metadata = {
  title: "Dashboard",
}

const DashboardPage = async ({}) => {
  const session = await getAuthSession()

  if (!session) {
    return redirect("/sign-in")
  }

  const likedPacks = await db.vocabularyPack.findMany({
    where: {
      likes: { some: { userId: session.user.id } },
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

  const userSeenPacks = await db.seenVocabularyPack.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Likes" text="View and manage your likes" />
      {likedPacks?.length ? (
        <div className="mx-4 mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {likedPacks.map((likePack) => {
            const currentLike = likePack.likes.find(
              (like) => like.userId === session?.user.id
            )

            const seenPack = userSeenPacks.find(
              (seenPack) => seenPack.vocabularyPackId === likePack.id
            )

            return (
              <StudyPackCard
                pack={likePack}
                key={likePack.id}
                currentLike={currentLike}
                seenPack={seenPack}
              />
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

export default DashboardPage
