"use client"

import { FC, useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { Like, SeenVocabularyPack, VocabularyPack } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

import { STUDY_PACK_PAGINATE_NUMBER } from "../config/site"
import StudyPackCard from "./StudyPackCard"

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

// TODO : fix infinite query
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
    <div className="mx-4 mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {packs?.map((pack: ExtendedStudyPack) => {
        const currentLike = pack.likes.find(
          (like) => like.userId === session?.user.id
        )

        const seenPack = userSeenPacks?.find(
          (seenPack) => seenPack.vocabularyPackId === pack.id
        )

        return (
          <StudyPackCard
            key={pack.id}
            pack={pack}
            currentLike={currentLike}
            seenPack={seenPack}
          />
        )
      })}
    </div>
  )
}

export default StudyPacksFeed
