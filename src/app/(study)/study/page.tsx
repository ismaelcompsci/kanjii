import StudyPacksFeed from "@/src/components/StudyPacksPage"
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
  return (
    <>
      <StudyPacksFeed initialPacks={studyPacks} userSeenPacks={userSeenPacks} />
    </>
  )
}

export default Page
