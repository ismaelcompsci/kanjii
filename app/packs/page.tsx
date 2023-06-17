import getUserSeenPacks from "@/actions/getUserSeenPacks"
import getVocabPacks from "@/actions/getVocabPacks"

import VocabularyPage from "@/components/vocab-page"

const Packages = async () => {
  const vocapPacakges = await getVocabPacks()
  const { userSeenPacks, user } = await getUserSeenPacks()

  return (
    <VocabularyPage
      vocabPackages={vocapPacakges}
      userSeenPackages={userSeenPacks}
      currentUser={user}
    />
  )
}

export default Packages
