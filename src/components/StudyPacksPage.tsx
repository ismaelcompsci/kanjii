"use client"

import { FC, useEffect, useRef } from "react"
import StudyPackCard from "@/src/components/StudyPackCard"
import { STUDY_PACK_PAGINATE_NUMBER } from "@/src/config/site"
import { useIntersection } from "@mantine/hooks"
import { Like, SeenVocabularyPack, VocabularyPack } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

export interface ExtendedStudyPack extends VocabularyPack {
  creator: {
    username: string | null
    image: string | null
    name: string | null
  }
  likes: Like[]
}

interface StudyPacksPageProps {
  initialPacks: ExtendedStudyPack[]
  userSeenPacks: SeenVocabularyPack[] | null
}

const StudyPacksFeed: FC<StudyPacksPageProps> = ({
  initialPacks,
  userSeenPacks,
}) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { data: session } = useSession()

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],

    async ({ pageParam = 1 }) => {
      const query = `/api/studypacks?limit=${STUDY_PACK_PAGINATE_NUMBER}&page=${pageParam}`

      const { data } = await axios.get(query)
      return data
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPacks], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const packs = data?.pages.flatMap((page) => page) ?? initialPacks

  return (
    <>
      <div className="mx-4 mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
        {packs?.map((pack: ExtendedStudyPack, index: number) => {
          const currentLike = pack.likes.find(
            (like) => like.userId === session?.user.id
          )

          const seenPack = userSeenPacks?.find(
            (seenPack) => seenPack.vocabularyPackId === pack.id
          )

          if (index === packs.length - 1) {
            return (
              <div
                ref={ref}
                className="col-span-full rounded-lg bg-secondary  lg:col-span-2"
              >
                <StudyPackCard
                  key={pack.id}
                  pack={pack}
                  currentLike={currentLike}
                  seenPack={seenPack}
                />
              </div>
            )
          } else {
            return (
              <div className="col-span-full rounded-lg  bg-secondary lg:col-span-2">
                <StudyPackCard
                  key={pack.id}
                  pack={pack}
                  currentLike={currentLike}
                  seenPack={seenPack}
                />
              </div>
            )
          }
        })}
      </div>
      {isFetchingNextPage && (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </div>
      )}
    </>
  )
}

export default StudyPacksFeed
