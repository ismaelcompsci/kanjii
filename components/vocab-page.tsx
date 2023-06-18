"use client"

import { useRouter } from "next/navigation"
import { SeenVocabularyPack, User, VocabularyPack } from "@prisma/client"
import queryString from "query-string"

import { ExtendedVocabularyPack } from "@/types/types"

import VocabularyCard from "./vocabulary-card"

interface VocabularyPageProps {
  vocabPackages: VocabularyPack[]
  userSeenPackages: SeenVocabularyPack[] | null
  currentUser: User | null
}

// TODO: add more stuff
const VocabularyPage: React.FC<VocabularyPageProps> = ({
  vocabPackages,
  userSeenPackages,
  currentUser,
}) => {
  const router = useRouter()

  const getUserMarkedPacks = (): ExtendedVocabularyPack[] => {
    if (currentUser) {
      const infoVocabPacks = vocabPackages.map((pack) => {
        const totalPages = Math.ceil(pack.vocabularyCount / 5)
        const seenPack = userSeenPackages?.find(
          (seenPack) => pack.id === seenPack.vocabularyPackId
        )

        if (seenPack) {
          return {
            ...pack,
            pageInfo: `${seenPack.currentPage}/${totalPages}`,
          }
        }
        return {
          ...pack,
          pageInfo: null,
        }
      })
      return infoVocabPacks
    }
    return vocabPackages
  }

  const userMarkedPacks = getUserMarkedPacks()

  const handleClick = (pack: VocabularyPack) => {
    const url = queryString.stringifyUrl({
      url: `/packs/${pack.id}`,
    })

    router.push(url)
  }

  return (
    // TODO : UPDATE STARS AND UPDATED AT
    <div
      className="grid 
    grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5 
    2xl:grid-cols-8 
    gap-4 
    mt-4
    mx-4
    "
    >
      {userMarkedPacks?.map((pack) => {
        return (
          <VocabularyCard key={pack.id} pack={pack} handleClick={handleClick} />
        )
      })}
    </div>
  )
}

export default VocabularyPage
