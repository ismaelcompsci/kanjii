import { VocabularyPack } from "@prisma/client"
import { Circle, Star } from "lucide-react"

import { ExtendedVocabularyPack } from "@/types/types"

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface VocabularyCardProps {
  pack: ExtendedVocabularyPack
  handleClick: (pack: ExtendedVocabularyPack) => void
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  pack,
  handleClick,
}) => {
  return (
    <Card key={pack.id} className="col-span-full lg:col-span-2">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{pack.name}</CardTitle>
          <CardDescription>Count: {pack.vocabularyCount}</CardDescription>
        </div>
        <div className="flex items-center rounded-md text-secondary-foreground">
          <Button
            className="px-3"
            onClick={() => {
              handleClick(pack)
            }}
          >
            Start
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          {pack.pageInfo && (
            <div className="flex items-center">
              <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              {pack.pageInfo}
            </div>
          )}
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3" />
            10k
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VocabularyCard
