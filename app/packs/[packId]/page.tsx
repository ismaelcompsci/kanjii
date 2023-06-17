import getCurrentUser from "@/actions/getCurrentUser"

import KanjiPage from "@/components/kanji-page"

interface IParams {
  packId: string
}

const Package = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()

  const currentPack = currentUser?.seenVocabularyPacks.find(
    (pack) => pack.vocabularyPackId === params.packId
  )

  return (
    <div>
      <KanjiPage
        packId={params.packId}
        currentUser={currentUser}
        currentPack={currentPack || null}
      />
    </div>
  )
}

export default Package
