import { FC } from "react"
import { useRouter } from "next/navigation"
import { Like, VocabularyPack } from "@prisma/client"
import { Circle, Star } from "lucide-react"

import { formatTimeToNow } from "../lib/utils"
import { UserAvatar } from "./UserAvatar"
import { Button } from "./ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface StudyPackCardProps {
  pack: VocabularyPack & {
    creator: {
      name: string | null
      image: string | null
    }
    likes: Like[]
    _count: {
      vocabulary: number
      SeenVocabularyPack: number
      likes: number
    }
  }
}
//  TODO: add likes
const StudyPackCard: FC<StudyPackCardProps> = ({ pack }) => {
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
            <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            <div>{formatTimeToNow(new Date(pack.createdAt))}</div>
          </div>

          <div className="flex items-center">
            {/* TODO: MAKE A PACK POSTVOTECLIENT */}
            <Star className="mr-1 h-3 w-3 cursor-pointer" />
            {pack.likes.length}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudyPackCard
