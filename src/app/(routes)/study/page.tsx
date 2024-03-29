import StudyPacksFeed from "@/src/components/StudyPacksPage"
import { EmptyPlaceholder } from "@/src/components/ui/EmptyPlaceholder"
import { STUDY_PACK_PAGINATE_NUMBER } from "@/src/config/site"
import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"

const Page = async () => {
  const session = await getAuthSession()

  const studyPacks = await db.vocabularyPack.findMany({
    orderBy: {
      createdAt: "desc",
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
    take: STUDY_PACK_PAGINATE_NUMBER,
  })

  const userSeenPacks = session?.user
    ? await db.seenVocabularyPack.findMany({
        where: {
          userId: session.user.id,
        },
      })
    : null

  if (studyPacks.length === 0) {
    return (
      <EmptyPlaceholder className="border-none">
        <EmptyPlaceholder.Title>No study packs</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          This place is empty :/
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    )
  }

  return (
    <div className="mb-4">
      <StudyPacksFeed initialPacks={studyPacks} userSeenPacks={userSeenPacks} />
    </div>
  )
}

export default Page
