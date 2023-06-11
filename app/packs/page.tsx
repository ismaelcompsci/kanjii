import getVocabPacks from "@/actions/getVocabPacks"

import VocabularyPage from "@/components/vocab-page"

const Packages = async () => {
  const vocapPacakges = await getVocabPacks()

  return <VocabularyPage vocabPackages={vocapPacakges} />
}

export default Packages
