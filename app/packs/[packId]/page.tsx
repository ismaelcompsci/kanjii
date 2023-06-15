import getCurrentUser from "@/actions/getCurrentUser"

import KanjiPage from "@/components/kanji-page"

interface IParams {
  packId: string
}

const Package = async ({ params }: { params: IParams }) => {
  const currentUser = null

  return (
    <div>
      <KanjiPage packId={params.packId} currentUser={currentUser} />
    </div>
  )
}

export default Package
