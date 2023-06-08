"use client"

import getKanji from "@/actions/getKanji"
import { Vocabulary } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

import MainKanji from "@/components/kanji/main-kanji"

const Kanji = () => {
  // useInfiniteQuery is a hook that accepts a queryFn and queryKey and returns the result of the queryFn
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = "" }) =>
      getKanji({ take: 10, lastCursor: pageParam }),
    queryKey: ["users"],
    getNextPageParam: (lastPage) => {
      return lastPage?.metadata.lastCursor
    },
  })

  return (
    <div className="mt-10">
      {isSuccess &&
        data?.pages.map((page) =>
          page.data.map((data: Vocabulary, index: number) => {
            // if the last element in the page is in view, add a ref to it

            return (
              <MainKanji
                word={data.word}
                reading={data.word}
                meaning={data.meaning}
                sentence={data.sentence}
                enSentence={data.englishSentence}
              />
            )
          })
        )}
      {(isLoading || isFetchingNextPage) && <p className="mb-4">Loading...</p>}
    </div>
  )
}

export default Kanji
