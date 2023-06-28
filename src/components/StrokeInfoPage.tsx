"use client"

import { FC, startTransition, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useHotkeys } from "@mantine/hooks"
import { Vocabulary, VocabularyPack } from "@prisma/client"
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"

import getKanji from "../actions/getKanji"
import { VOCABULARY_PAGINATE_NUMBER } from "../config/site"
import { cn } from "../lib/utils"
import { CreateUpdateValidatorPayload } from "../lib/validators/updatePageValidator"
import MainKanji from "./MainKanji"
import MainKanjiSkeleton from "./skeletons/MainKanjiSkeleton"
import { Button } from "./ui/Button"
import { Skeleton } from "./ui/Skeleton"

interface StrokeInfoPageProps {
  pack: VocabularyPack
  currentPage?: number
}

type kanjiData = {
  page: number
  data: any
}

const StrokeInfoPage: FC<StrokeInfoPageProps> = ({
  pack,
  currentPage: initialPage,
}) => {
  const router = useRouter()

  const queryClient = useQueryClient()

  const [currentKIndex, setCurrentKIndex] = useState<number>(0)
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null)
  const [selectedButton, setSelectedButton] = useState<number>(0)

  const [currentPage, setCurrentPage] = useState<number>(initialPage || 0)
  const [fetchedPages, setFetchedPages] = useState<number[]>([initialPage || 0])

  const {
    isSuccess,
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["infinite-vocab-pack"],

    async ({ pageParam = initialPage }) => {
      const query = `/api/vocabulary?limit=${VOCABULARY_PAGINATE_NUMBER}&page=${pageParam}&vocabularyPackId=${pack.id}`
      const { data } = await getKanji({ query, page: pageParam })

      return { page: pageParam, data: data } as kanjiData
    },
    {
      getNextPageParam: (lastPage) => {
        // TODO: check end of pagination behavior
        if (lastPage.page >= Math.ceil(pack.vocabularyCount / 5)) {
          console.log("lastPage")
          return undefined
        }
        return lastPage.page + 1
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.page <= 0) {
          return undefined
        }
        return firstPage.page - 1
      },
    }
  )

  const vocabulary = data?.pages.sort((a, b) => a.page - b.page)

  // Prefetch next page on 3rd button
  useEffect(() => {
    if (selectedButton === 3 && hasNextPage) {
      const f = fetchedPages.find((page) => page === currentPage + 1)
      if (f) return

      const nextPage = currentPage + 1
      queryClient.prefetchInfiniteQuery(
        ["infinite-vocab-pack", { pageParam: nextPage }],
        () => fetchNextPage({ pageParam: nextPage })
      )
      setFetchedPages((prev) => [...prev, nextPage])
    }
  }, [selectedButton])

  useEffect(() => {
    if (vocabulary && currentKIndex < vocabulary.length) {
      setCurrentWord(vocabulary[currentKIndex].data[selectedButton])
      setCurrentPage(vocabulary[currentKIndex].page)
    }
  }, [currentKIndex, vocabulary, selectedButton])

  const handleClick = (vocab: Vocabulary, index: number) => {
    setSelectedButton(index)
    setCurrentWord(vocab)
  }

  const handleNext = () => {
    if (selectedButton < 4) {
      setSelectedButton((prev) => prev + 1)
      setCurrentWord(vocabulary?.[currentKIndex].data[selectedButton + 1])
      return
    }

    if (hasNextPage && currentKIndex < (vocabulary?.length || 0) - 1) {
      setCurrentKIndex((prev) => prev + 1)
      setSelectedButton(0)
    } else if (hasNextPage) {
      fetchNextPage()
      setCurrentKIndex((prev) => prev + 1)
      setSelectedButton(0)
    }
  }

  const handlePrev = () => {
    if (selectedButton > 0) {
      setSelectedButton((prev) => prev - 1)
      setCurrentWord(vocabulary?.[currentKIndex].data[selectedButton - 1])
      return
    }
    if (currentKIndex > 0) {
      setCurrentKIndex((prev) => prev - 1)
      setSelectedButton(4)
    } else if (hasPreviousPage) {
      fetchPreviousPage()
      setSelectedButton(4)
    }
  }

  const { mutate: updateUserPage } = useMutation({
    mutationFn: async () => {
      const payload: CreateUpdateValidatorPayload = {
        page: currentPage || 0,
        packId: pack.id,
      }

      const { data } = await axios.put(`/api/user/${pack.name}/page`, payload)

      console.log(data)
      return data
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
    },
  })

  useEffect(() => {
    updateUserPage()
  }, [currentPage, pack.id, router])

  useHotkeys([
    ["ArrowLeft", () => handlePrev()],
    ["ArrowRight", () => handleNext()],
  ])

  return (
    <div>
      <div className="w-full flex items-center justify-center gap-2 pt-2">
        {isSuccess && (
          <ChevronLeft
            onClick={handlePrev}
            className="hover:text-slate-500 duration-300 hover:scale-125 transition ease-in-out delay-150 cursor-pointer transform"
          />
        )}
        {isSuccess &&
          vocabulary?.[currentKIndex]?.data?.map(
            (vocab: Vocabulary, index: number) => (
              <Button
                onClick={() => handleClick(vocab, index)}
                key={index}
                variant="outline"
                className={cn(
                  "w-[62px] h-[40px] px-0",
                  selectedButton === index ? "bg-accent" : ""
                )}
              >
                <span className="w-full h-full overflow-hidden whitespace-nowrap text-ellipsis">
                  {vocab.word}
                </span>
              </Button>
            )
          )}

        {isSuccess && (
          <ChevronRight
            onClick={handleNext}
            className="hover:text-slate-500 duration-300 hover:scale-125  transition ease-in-out delay-150 cursor-pointer transform"
          />
        )}
      </div>
      {currentWord && (
        <MainKanji
          key={currentWord.id}
          word={currentWord.word}
          reading={currentWord.reading}
          meaning={currentWord.meaning}
          sentence={currentWord.sentence}
          englishSentence={currentWord.englishSentence}
        />
      )}
      {(isLoading || isFetchingNextPage) && (
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

export default StrokeInfoPage
