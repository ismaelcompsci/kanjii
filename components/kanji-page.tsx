"use client"

import { useEffect } from "react"
import { SeenVocabularyPack, User, Vocabulary } from "@prisma/client"
import { ArrowLeft, ArrowRight } from "lucide-react"

import useKanjiData from "@/hooks/useKanjiData"
import MainKanji from "@/components/main-kanji"
import MainKanjiSkeleton from "@/components/skeletons/main-kanji-skeleton"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

interface KanjiPageProps {
  currentUser: User | null
  currentPack: SeenVocabularyPack | null
  packId: string
}
// TODO: UPDATE USERS CURRENT PAGE AND CURRENT KANJI [index in current page]
const KanjiPage: React.FC<KanjiPageProps> = ({
  currentUser,
  currentPack,
  packId,
}) => {
  const initialPage = currentPack?.currentPage || 0

  // TODO: GET VOCABPACK MAX PAGES
  const {
    currentKIndex,
    currentWord,
    selectedButton,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    _kanji,
    handleNext,
    handlePrev,
    handleClick,
  } = useKanjiData({ initialPage, packId, currentUser })

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
          <Icons.left
            onClick={handlePrev}
            className="hover:text-slate-500 duration-300 hover:scale-125 transition ease-in-out delay-150 cursor-pointer transform"
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
          <Icons.right
            onClick={handleNext}
            className="hover:text-slate-500 duration-300 hover:scale-125  transition ease-in-out delay-150 cursor-pointer transform"
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
