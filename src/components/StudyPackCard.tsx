"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import PackLikeClient from "@/src/components/PackLikeClient"
import { UserAvatar } from "@/src/components/UserAvatar"
import { Button } from "@/src/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card"
import { Like, SeenVocabularyPack, VocabularyPack } from "@prisma/client"
import { Circle } from "lucide-react"

import { formatTimeToNow } from "../lib/utils"

interface StudyPackCardProps {
  pack: VocabularyPack & {
    creator: {
      username: string | null
      image: string | null
      name: string | null
    }
    likes: Like[]
  }
  currentLike?: Like | undefined
  seenPack?: SeenVocabularyPack | undefined
  showButton?: boolean
}
const StudyPackCard: FC<StudyPackCardProps> = ({
  pack,
  currentLike,
  seenPack,
  showButton = true,
}) => {
  const router = useRouter()

  return (
    <Card key={pack.id} className="col-span-full bg-secondary lg:col-span-2">
      <div className="ml-4 mt-4 flex items-center">
        <UserAvatar
          user={{
            image: pack.creator.image,
            username: pack.creator.username,
            name: pack.creator.name,
          }}
          className="h-6 w-6"
        />
        <span className="text-muted-foreground">
          &nbsp; {pack.creator.username}
        </span>
      </div>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{pack.name}</CardTitle>
          <CardDescription>Count: {pack.vocabularyCount}</CardDescription>
        </div>

        {showButton && (
          <div className="flex items-center rounded-md text-secondary-foreground">
            <Button
              className="px-3"
              onClick={() => router.push(`/study/${pack.name}`)}
            >
              {seenPack ? <span>Continue</span> : <span>Start</span>}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-row space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            <div>{formatTimeToNow(new Date(pack.createdAt))}</div>
          </div>
          {/* Like */}
          <PackLikeClient currentLike={currentLike} pack={pack} />
          {seenPack && (
            <span>{`${seenPack?.currentPage}/${Math.ceil(
              pack.vocabularyCount / 5
            )}`}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StudyPackCard
