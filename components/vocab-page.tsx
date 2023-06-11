"use client"

import { useRouter } from "next/navigation"
import { VocabularyPack } from "@prisma/client"
import { Star } from "lucide-react"
import queryString from "query-string"

import { Button } from "./ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface VocabularyPageProps {
  vocabPackages: VocabularyPack[]
}

// TODO: add more stuff

const VocabularyPage: React.FC<VocabularyPageProps> = ({ vocabPackages }) => {
  const router = useRouter()
  const handleClick = (pack: VocabularyPack) => {
    const url = queryString.stringifyUrl({
      url: `/packs/${pack.id}`,
    })

    router.push(url)
  }

  return (
    <div>
      {vocabPackages.map((pack) => (
        <Card>
          <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div>
              <CardTitle>{pack.name}</CardTitle>
              <CardDescription>Count: {pack.vocabularyCount}</CardDescription>
            </div>
            <div className="flex items-center space-x-1 rounded-md ">
              <Button
                className="px-3"
                onClick={() => {
                  handleClick(pack)
                }}
              >
                {/* <Star className="mr-2 h-4 w-4" /> */}
                Start
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default VocabularyPage
