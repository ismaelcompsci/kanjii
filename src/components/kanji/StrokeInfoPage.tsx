"use client"

import { FC, startTransition, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getKanji from "@/src/actions/getKanji"
import CompletePack from "@/src/components/CompletePack"
import MainKanji from "@/src/components/kanji/MainKanji"
import MainKanjiSkeleton from "@/src/components/skeletons/MainKanjiSkeleton"
import { Button } from "@/src/components/ui/Button"
import { Skeleton } from "@/src/components/ui/Skeleton"
import { VOCABULARY_PAGINATE_NUMBER } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { CreateUpdateValidatorPayload } from "@/src/lib/validators/updatePageValidator"
import { useHotkeys } from "@mantine/hooks"
import { Vocabulary, VocabularyPack } from "@prisma/client"
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    isFetchingPreviousPage,
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
      {finished && <CompletePack />}
      <div className="flex w-full items-center justify-center gap-2 pt-2">
        {!finished && isSuccess && (
          <ChevronLeft
            onClick={handlePrev}
            className="transform cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-125 hover:text-slate-500"
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
            className="transform cursor-pointer transition  delay-150 duration-300 ease-in-out hover:scale-125 hover:text-slate-500"
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
      {!finished && isLoading && (
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

// "use client"

// import { FC, useEffect, useRef, useState } from "react"
// import { Vocabulary, VocabularyPack } from "@prisma/client"
// import { useInfiniteQuery } from "@tanstack/react-query"
// import axios from "axios"
// import Swiper from "swiper"
// import { register } from "swiper/element/bundle"
// import { SwiperProps } from "swiper/react"

// import MainKanji from "./MainKanji"

// interface StrokeInfoPageProps {
//   pack: VocabularyPack
//   currentPage?: number
// }

// register()

// // help: https://dev.to/ivadyhabimana/customizing-swiperjs-prevnext-arrow-buttons-and-pagination-bullets-in-react-3gkh

// const StrokeInfoPage: FC<StrokeInfoPageProps> = ({ pack }) => {
//   const swiperRef = useRef<Swiper | null>(null)

//   const [currentPage, setCurrentPage] = useState(0)

//   const { data, hasNextPage, fetchNextPage, isSuccess } = useInfiniteQuery({
//     queryKey: ["vocab-query"],
//     queryFn: async ({ pageParam = "" }) => {
//       const response = await axios.get("/api/vocabulary", {
//         params: { take: 5, lastCursor: pageParam, vocabularyPackId: pack.id },
//       })
//       // console.log(response.data)
//       return response?.data
//     },
//     getNextPageParam: (lastPage) => {
//       return lastPage?.metaData?.lastCursor
//     },
//   })

//   isSuccess && console.log(data)
//   const vocabulary = data?.pages.sort((a, b) => a.page - b.page)

//   useEffect(() => {
//     const params: SwiperProps = {
//       pagination: {
//         clickable: true,
//         renderBullet: function (index: number, className: string) {
//           console.log(className)
//           return (
//             '<span class="' +
//             className +
//             '">' +
//             vocabulary?.[currentPage].data[index].word +
//             "</span>"
//           )
//         },
//       },
//       focusableElements:
//         "input, select, option, textarea, button, video, label",
//       grabCursor: true,
//       injectStyles: [
//         `
//         .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
//           height: 40px;
//           width: 62px;
//           display: inline-flex;
//           justify-content: center;
//           align-items: center;
//           background-color: hsl(var(--secondary));
//           border-radius: calc(var(--radius) - 2px);
//           border-color: red;
//           border-width: 1px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;

//         }

//         .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
//           bottom: initial;
//           top: 10px;
//         }
//         `,
//       ],
//       keyboard: { enabled: true },
//     }

//     // Assign it to swiper element
//     // @ts-ignore
//     Object.assign(swiperRef.current, params)

//     // @ts-ignore
//     swiperRef.current.initialize()
//   }, [vocabulary])

//   return (
//     <div>
//       <button
//         onClick={() => {
//           // fetchNextPage()
//           swiperRef.current?.addSlide(
//             1,
//             '<div class="swiper-slide">Slide 10"</div>'
//           )
//         }}
//       >
//         fetch
//       </button>
//       <swiper-container init={false} ref={swiperRef}>
//         {isSuccess
//           ? vocabulary?.map((page) =>
//               page.data.map((vocab: Vocabulary) => (
//                 <swiper-slide key={vocab.id}>
//                   <MainKanji {...vocab} />
//                 </swiper-slide>
//               ))
//             )
//           : ""}
//       </swiper-container>
//     </div>
//   )
// }

// export default StrokeInfoPage
