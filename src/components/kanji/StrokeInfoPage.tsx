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

import getKanji from "../../actions/getKanji"
import { VOCABULARY_PAGINATE_NUMBER } from "../../config/site"
import { cn } from "../../lib/utils"
import { CreateUpdateValidatorPayload } from "../../lib/validators/updatePageValidator"
import MainKanjiSkeleton from "../skeletons/MainKanjiSkeleton"
import { Button } from "../ui/Button"
import { Skeleton } from "../ui/Skeleton"
import MainKanji from "./MainKanji"

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
  const [done, setDone] = useState<number>(0)
  const [authorized, setAuthorized] = useState<boolean>(true)
  const [finished, setFinished] = useState<boolean>(false)

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
        if (lastPage.page >= Math.ceil(pack.vocabularyCount / 5)) {
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

  useEffect(() => {
    if (
      selectedButton === vocabulary?.[currentKIndex]?.data?.length - 1 &&
      hasNextPage
    ) {
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
    if (data?.pages[data.pages.length - 1].data.length === 0) {
      setDone((x) => x + 1)
      if (done === 1) {
        setFinished(true)
        const payload = {
          packId: pack.id,
          finished: true,
        }
        axios.post(`/api/user/${pack.name}/finished`, payload)
        setCurrentPage(0)
      }
    }

    if (selectedButton < vocabulary?.[currentKIndex]?.data?.length - 1) {
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

      try {
        const { data } = await axios.put(`/api/user/${pack.name}/page`, payload)
        return data
      } catch (err: any) {
        if (err.response.status === 401) {
          setAuthorized(false)
        }
      }
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
    },
  })

  useEffect(() => {
    if (!authorized) {
      return
    }
    const data = updateUserPage()
    console.log("dtat", data)
    if (currentPage === 1) {
      const payload = {
        packId: pack.id,
        finished: false,
      }
      axios.post(`/api/user/${pack.name}/finished`, payload)
    }
  }, [currentPage, pack.id, router])

  useHotkeys([
    ["ArrowLeft", () => handlePrev()],
    ["ArrowRight", () => handleNext()],
  ])

  return (
    <div>
      {finished && <div className="text-lg">DONE</div>}
      <div className="flex w-full items-center justify-center gap-2 pt-2">
        {!finished && isSuccess && (
          <ChevronLeft
            onClick={handlePrev}
            className="transform cursor-pointer transition duration-300 delay-150 ease-in-out hover:scale-125 hover:text-slate-500"
          />
        )}
        {!finished &&
          isSuccess &&
          vocabulary?.[currentKIndex]?.data?.map(
            (vocab: Vocabulary, index: number) => (
              <Button
                onClick={() => handleClick(vocab, index)}
                key={index}
                variant="outline"
                className={cn(
                  "h-[40px] w-[62px] px-0",
                  selectedButton === index ? "bg-accent" : ""
                )}
              >
                <span className="h-full w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {vocab.word}
                </span>
              </Button>
            )
          )}

        {!finished && isSuccess && (
          <ChevronRight
            onClick={handleNext}
            className="transform cursor-pointer transition  duration-300 delay-150 ease-in-out hover:scale-125 hover:text-slate-500"
          />
        )}
      </div>
      {!finished && currentWord && (
        <MainKanji
          key={currentWord.id}
          word={currentWord.word}
          reading={currentWord.reading}
          meaning={currentWord.meaning}
          sentence={currentWord.sentence}
          englishSentence={currentWord.englishSentence}
        />
      )}
      {!finished && (isLoading || isFetchingNextPage) && (
        <>
          <div className="flex w-full items-center justify-center gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className=" h-[40px] w-[62px] px-0" />
            ))}
          </div>
          <MainKanjiSkeleton />
        </>
      )}
    </div>
  )
}

export default StrokeInfoPage
