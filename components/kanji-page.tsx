"use client"

import getKanji from "@/actions/getKanji"
import { User } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

import { ExtendedVocabulary } from "@/types/types"
import MainKanji from "@/components/main-kanji"
import MainKanjiSkeleton from "@/components/skeletons/main-kanji-skeleton"

interface KanjiPageProps {
  currentUser: User | null
  packId: string
}

// TODO : Update user.first and lastcursor in db
// aka new route in /api/kanji.UPDATE
const KanjiPage: React.FC<KanjiPageProps> = ({ currentUser, packId }) => {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = currentUser?.lastCursor || "" }) =>
      getKanji({
        take: 5,
        lastCursor: pageParam,
        first: currentUser?.first || true,
        packId: packId,
      }),
    queryKey: ["kanji"],
    getNextPageParam: (lastPage) => {
      return lastPage?.metadata.lastCursor
    },
  })

  isSuccess && console.log(data)
  return (
    <div className="mt-10">
      {isSuccess &&
        hasNextPage &&
        data?.pages.map((page) =>
          page.data.map((data: ExtendedVocabulary, index: number) => {
            return (
              <MainKanji
                key={data.id}
                word={data.word}
                reading={data.reading}
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

export default KanjiPage
