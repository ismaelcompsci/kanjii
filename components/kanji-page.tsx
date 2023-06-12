"use client"

import { useEffect, useState } from "react"
import getKanji from "@/actions/getKanji"
import { User, Vocabulary } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ExtendedVocabulary } from "@/types/types"
import MainKanji from "@/components/main-kanji"
import MainKanjiSkeleton from "@/components/skeletons/main-kanji-skeleton"

import { Button } from "./ui/button"

interface KanjiPageProps {
  currentUser: User | null
  packId: string
}

// TODO : Update user.first and lastcursor in db
// aka new route in /api/kanji.UPDATE

// TODO: UPDATE USERS CURRENT PAGE AND CURRENT KANJI [index in curretn page]
//  TODO: THINK OF EDGE CASES  FOR CAROUSEL
const KanjiPage: React.FC<KanjiPageProps> = ({ currentUser, packId }) => {
  const [navButtons, setNavButtons] = useState(null)
  const [currentKIndex, setCurrentKIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null)

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) =>
      getKanji({
        take: 5,
        page: pageParam,
        packId: packId,
      }),
    queryKey: ["kanji"],
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
  })

  const _kanji = data?.pages.map((page) => page)

  useEffect(() => {
    data && isSuccess && setCurrentWord(_kanji?.[currentKIndex][0])
  }, [currentKIndex])

  const handleClick = (k: Vocabulary, index: number) => {
    setCurrentWord(k)
  }

  const handleNext = async () => {
    hasNextPage && (await fetchNextPage())
    setCurrentKIndex((prev) => prev + 1)
  }
  const handlePrev = () => {
    if (currentKIndex === 0) {
      return
    }
    setCurrentKIndex((prev) => prev - 1)
  }

  return (
    <div>
      <div className="w-full flex items-center justify-center gap-2 pt-2">
        <ArrowLeft onClick={handlePrev} className="hover:text-slate-500" />
        {isSuccess &&
          _kanji?.[currentKIndex].map((k: Vocabulary, index: number) => (
            <Button onClick={() => handleClick(k, index)} key={index}>
              {k.word}
            </Button>
          ))}
        <ArrowRight onClick={handleNext} className="hover:text-slate-500" />
      </div>
      {currentWord && (
        <MainKanji
          key={currentWord.id}
          word={currentWord.word}
          reading={currentWord.reading}
          meaning={currentWord.meaning}
          sentence={currentWord.sentence}
          enSentence={currentWord.englishSentence}
        />
      )}

      {(isLoading || isFetchingNextPage) && <MainKanjiSkeleton />}
    </div>
  )
}

export default KanjiPage
