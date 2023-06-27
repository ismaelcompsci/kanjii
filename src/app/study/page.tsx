import StudyPacksFeed from "@/src/components/StudyPacksPage"
import { STUDY_PACK_PAGINATE_NUMBER } from "@/src/config/site"
import { db } from "@/src/lib/db"

const Page = async () => {
  const studyPacks = await db.vocabularyPack.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
      likes: true,
    },
    take: STUDY_PACK_PAGINATE_NUMBER,
  })

  return (
    <>
      <StudyPacksFeed initialPacks={studyPacks} />
    </>
  )
}

export default Page
