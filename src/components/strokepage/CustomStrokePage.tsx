import { notFound } from "next/navigation"
import { VOCABULARY_PAGINATE_NUMBER } from "@/src/config/site"
import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { VocabularyPack } from "@prisma/client"

import StrokeInfoPage from "../StrokeInfoPage"

interface CustomStrokePageProps {
  pack: VocabularyPack
}

const CustomStrokePage = async ({ pack }: CustomStrokePageProps) => {
  const session = await getAuthSession()
  let currentPage = 0

  if (!session) return notFound()

  const seen = await db.seenVocabularyPack.findUnique({
    where: {
      userId_vocabularyPackId: {
        userId: session.user.id,
        vocabularyPackId: pack.id,
      },
    },
  })

  currentPage = seen?.currentPage || 0

  let skip = (currentPage - 1) * VOCABULARY_PAGINATE_NUMBER

  if (skip < 0) skip = 0

  if (!seen) {
    await db.seenVocabularyPack.create({
      data: {
        userId: session.user.id,
        vocabularyPackId: pack.id,
      },
    })

    currentPage = 0
  }

  return (
    <div>
      <StrokeInfoPage pack={pack} currentPage={currentPage} />
    </div>
  )
}

export default CustomStrokePage