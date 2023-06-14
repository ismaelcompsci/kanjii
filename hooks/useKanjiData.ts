import { useEffect, useState } from "react"
import getKanji from "@/actions/getKanji"
import { Vocabulary } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

interface KanjiData {
  currentKIndex: number
  currentWord: Vocabulary | null
  selectedButton: number
  hasNextPage: boolean | undefined
  hasPreviousPage: boolean | undefined
  currentPage: number
  isLoading: boolean
  isFetchingNextPage: boolean
  _kanji: any[] | undefined
  isSuccess: boolean
  handleNext: () => void
  handlePrev: () => void
  handleClick: (k: Vocabulary, index: number) => void
}

const useKanjiData = ({
  initialPage,
  packId,
}: {
  initialPage: number
  packId: string
}): KanjiData => {
  const [currentKIndex, setCurrentKIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null)
  const [selectedButton, setSelectedButton] = useState(0)

  const [currentPage, setCurrentPage] = useState(initialPage)

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isError,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = initialPage }) =>
      getKanji({
        take: 5,
        page: pageParam,
        packId: packId,
      }),
    queryKey: ["kanji"],
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 >= 300) {
        return undefined // No more next pages available
      }
      return lastPage.page + 1 // Increment the page number for the next page
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page <= 0) {
        return undefined // No more previous pages available
      }
      return firstPage.page - 1 // Decrement the page number for the previous page
    },
  })

  if (isError) {
    console.log(error)
  }

  const _kanji = data?.pages.sort((a, b) => a.page - b.page)

  useEffect(() => {
    if (_kanji && currentKIndex < _kanji.length) {
      setCurrentWord(_kanji[currentKIndex].data[selectedButton])
      setCurrentPage(_kanji[currentKIndex].page)
    }
  }, [currentKIndex, _kanji])

  const handleClick = (k: Vocabulary, index: number) => {
    setSelectedButton(index)
    setCurrentWord(k)
  }

  const handleNext = () => {
    if (selectedButton < 4) {
      setSelectedButton((prev) => prev + 1)
      setCurrentWord(_kanji?.[currentKIndex].data[selectedButton + 1])
      return
    }

    if (hasNextPage && currentKIndex < (_kanji?.length || 0) - 1) {
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
      setCurrentWord(_kanji?.[currentKIndex].data[selectedButton - 1])
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

  return {
    currentPage,
    currentKIndex,
    currentWord,
    selectedButton,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isFetchingNextPage,
    _kanji,
    handleNext,
    handlePrev,
    handleClick,
    isSuccess,
  }
}

export default useKanjiData
