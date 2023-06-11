import getCurrentUser from "@/actions/getCurrentUser"
import getPackById from "@/actions/getPackById"

import KanjiPage from "@/components/kanji-page"

interface IParams {
  packId: string
}

const Package = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <KanjiPage packId={params.packId} currentUser={currentUser} />
    </div>
  )
}

export default Package
