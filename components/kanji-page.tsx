"use client"

import { useEffect } from "react"
import { User, Vocabulary } from "@prisma/client"
import { ArrowLeft, ArrowRight } from "lucide-react"

import useKanjiData from "@/hooks/useKanjiData"
import MainKanji from "@/components/main-kanji"
import MainKanjiSkeleton from "@/components/skeletons/main-kanji-skeleton"

import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

interface KanjiPageProps {
  currentUser: User | null
  packId: string
}
// TODO: MIGRATE TO SUPABASE STRIPE HAVE VOCABULARY STAY IN MONGODB
// aka new route in /api/kanji.UPDATE
// TODO: UPDATE USERS CURRENT PAGE AND CURRENT KANJI [index in curretn page]
const KanjiPage: React.FC<KanjiPageProps> = ({ currentUser, packId }) => {
  const initialPage = currentUser?.page || 0
  // TODO: GET VOCABPACK MAX PAGES

  const {
    currentKIndex,
    currentWord,
    selectedButton,
    currentPage,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    _kanji,
    handleNext,
    handlePrev,
    handleClick,
  } = useKanjiData({ initialPage, packId })

  useEffect(() => {
    console.log("SENDD", currentPage)
  }, [currentPage])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev()
      } else if (event.key === "ArrowRight") {
        handleNext()
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handlePrev, handleNext])

  return (
    <div>
      <div className="w-full flex items-center justify-center gap-2 pt-2">
        {isSuccess && !isFetchingNextPage && (
          <ArrowLeft
            onClick={handlePrev}
            className="hover:text-slate-500 cursor-pointer transform"
          />
        )}
        {isSuccess &&
          !isFetchingNextPage &&
          _kanji?.[currentKIndex]?.data?.map((k: Vocabulary, index: number) => (
            <Button
              onClick={() => handleClick(k, index)}
              key={index}
              variant="outline"
              className={`${
                selectedButton === index ? "bg-accent" : ""
              } w-[62px] h-[40px] px-0`}
            >
              <span className="w-full h-full overflow-hidden whitespace-nowrap text-ellipsis">
                {k.word}
              </span>
            </Button>
          ))}

        {isSuccess && !isFetchingNextPage && (
          <ArrowRight
            onClick={handleNext}
            className="hover:text-slate-500 cursor-pointer"
          />
        )}
      </div>
      {currentWord && !isFetchingNextPage && (
        <MainKanji
          key={currentWord.id}
          word={currentWord.word}
          reading={currentWord.reading}
          meaning={currentWord.meaning}
          sentence={currentWord.sentence}
          enSentence={currentWord.englishSentence}
        />
      )}

      {(isFetchingNextPage || isLoading) && (
        <>
          <div className="w-full flex items-center justify-center gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className=" w-[62px] h-[40px] px-0" />
            ))}
          </div>
          <MainKanjiSkeleton />
        </>
      )}
    </div>
  )
}

export default KanjiPage

/* */
