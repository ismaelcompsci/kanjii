import { notFound } from "next/navigation"
import CustomStrokePage from "@/src/components/strokepage/CustomStrokePage"
import GeneralStrokePage from "@/src/components/strokepage/GeneralStrokePage"
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
