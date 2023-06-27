import { FC } from "react"
import { useRouter } from "next/navigation"
import { Like, VocabularyPack } from "@prisma/client"
import { Circle } from "lucide-react"

import { formatTimeToNow } from "../lib/utils"
import PackLikeClient from "./PackLikeClient"
import { UserAvatar } from "./UserAvatar"
import { Button } from "./ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card"

interface StudyPackCardProps {
  pack: VocabularyPack & {
    creator: {
      name: string | null
      image: string | null
    }
    likes: Like[]
  }
  currentVote: Like | undefined
}
//  TODO: add likes
const StudyPackCard: FC<StudyPackCardProps> = ({ pack, currentVote }) => {
  const router = useRouter()

  return (
    <Card key={pack.id} className="col-span-full lg:col-span-2 bg-secondary">
      <div className="flex items-center mt-4 ml-4">
        <UserAvatar
          user={{ image: pack.creator.image, name: pack.creator.name }}
          className="h-6 w-6"
        />
        <span className="text-muted-foreground">
          &nbsp; {pack.creator.name}
        </span>
      </div>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{pack.name}</CardTitle>
          <CardDescription>Count: {pack.vocabularyCount}</CardDescription>
        </div>
        <div className="flex items-center rounded-md text-secondary-foreground">
          <Button
            className="px-3"
            onClick={() => router.push(`/study/${pack.name}`)}
          >
            <span>Start</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-sky-400 " />
            <div>{formatTimeToNow(new Date(pack.createdAt))}</div>
          </div>
          {/* Like */}
          <PackLikeClient currentVote={currentVote} pack={pack} />
        </div>
      </CardContent>
    </Card>
  )
}

export default StudyPackCard
