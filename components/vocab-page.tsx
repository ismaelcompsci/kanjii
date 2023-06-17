"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SeenVocabularyPack, User, VocabularyPack } from "@prisma/client"
import { Circle, Star } from "lucide-react"
import queryString from "query-string"

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface VocabularyPageProps {
  vocabPackages: VocabularyPack[]
  userSeenPackages: SeenVocabularyPack[] | null
  currentUser: User | null
}

// TODO: add more stuff
const VocabularyPage: React.FC<VocabularyPageProps> = ({
  vocabPackages,
  userSeenPackages,
  currentUser,
}) => {
  const router = useRouter()

  const getUserMarkedPacks = () => {
    if (currentUser) {
      const infoVocabPacks = vocabPackages.map((pack) => {
        const totalPages = Math.ceil(pack.vocabularyCount / 5)
        const seenPack = userSeenPackages?.find(
          (seenPack) => pack.id === seenPack.vocabularyPackId
        )

        if (seenPack) {
          return {
            ...pack,
            pageInfo: `${seenPack.currentPage}/${totalPages}`,
          }
        }
        return {
          ...pack,
          pageInfo: null,
        }
      })
      return infoVocabPacks
    }
    return vocabPackages.map((pack) => {
      return { ...pack, pageInfo: null }
    })
  }

  const userMarkedPacks = getUserMarkedPacks()

  const handleClick = (pack: VocabularyPack) => {
    const url = queryString.stringifyUrl({
      url: `/packs/${pack.id}`,
    })

    router.push(url)
  }

  return (
    // TODO : UPDATE STARS AND UPDATED AT
    <div>
      {userMarkedPacks?.map((pack) => {
        return (
          <Card key={pack.id}>
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
                <div className="flex items-center">
                  <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                  {pack.pageInfo}
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-3 w-3" />
                  10k
                </div>
                <div>Updated April 2023</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default VocabularyPage

// {currentUser && pack?.pageInfo && (
//   <CardDescription>{pack.pageInfo}</CardDescription>
// )}
