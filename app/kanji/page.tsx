"use client"

import getKanji from "@/actions/getKanji"
import { useInfiniteQuery } from "@tanstack/react-query"

import { ExtendedVocabulary } from "@/types/types"
import MainKanji from "@/components/main-kanji"
import MainKanjiSkeleton from "@/components/skeletons/main-kanji-skeleton"

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
      getKanji({ take: 5, lastCursor: pageParam }),
    queryKey: ["users"],
    getNextPageParam: (lastPage) => {
      return lastPage?.metadata.lastCursor
    },
  })

  return (
    <div className="mt-10">
      {isSuccess &&
        data?.pages.map((page) =>
          page.data.map((data: ExtendedVocabulary, index: number) => {
            return (
              <MainKanji
                key={data.id}
                kanjiDetails={data.kanjiDetails}
                word={data.word}
                reading={data.word}
                meaning={data.meaning}
                sentence={data.sentence}
                enSentence={data.englishSentence}
              />
            )
          })
        )}
      {(isLoading || isFetchingNextPage) && <MainKanjiSkeleton />}
    </div>
  )
}

export default Kanji
