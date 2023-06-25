import { notFound } from "next/navigation"
import StrokeInfoPage from "@/src/components/StrokeInfoPage"
import CustomStrokePage from "@/src/components/strokepage/CustomStrokePage"
import GeneralStrokePage from "@/src/components/strokepage/GeneralStrokePage"
import { VOCABULARY_PAGINATE_NUMBER } from "@/src/config/site"
import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"

interface pageProps {
  params: {
    packName: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const page = async ({ params }: pageProps) => {
  const pack = await db.vocabularyPack.findUnique({
    where: {
      name: params.packName,
    },
  })

  if (!pack) return notFound()
  const session = await getAuthSession()

  return (
    <div>
      {session ? (
        <CustomStrokePage pack={pack} />
      ) : (
        <GeneralStrokePage pack={pack} />
      )}
    </div>
  )
}

export default page
// const initialVocab = await db.vocabulary.findMany({
//   take: VOCABULARY_PAGINATE_NUMBER,
//   where: {
//     vocabularyPackId: pack.id,
//   },
// })

// if (session?.user) {
//   const currentPage = await db.seenVocabularyPack.findUnique({
//     where: {
//       userId_vocabularyPackId: {
//         userId: session.user.id,
//         vocabularyPackId: pack.id,
//       },
//     },
//   })
//   if (!currentPage) {
//     return
//   }  // }
