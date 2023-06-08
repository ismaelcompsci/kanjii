import { NextResponse } from "next/server"

import { QueryOptions } from "@/types/types"
import prisma from "@/lib/prismadb"
import { _kanji, findAll, getKanjiDetails } from "@/lib/utils"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const take = url.searchParams.get("take")
    const lastCursor = url.searchParams.get("lastCursor")

    const queryOptions: QueryOptions = {
      take: take ? parseInt(take as string) : 5,
      orderBy: {
        id: "asc",
      },
    }

    if (lastCursor) {
      queryOptions.skip = 1
      queryOptions.cursor = {
        id: lastCursor,
      }
    }

    const kanji = await prisma.vocabulary.findMany(queryOptions)

    if (kanji.length === 0) {
      const responseData = {
        data: [],
        metadata: {
          lastCursor: null,
          hasNextPage: false,
        },
      }
      return new NextResponse(JSON.stringify(responseData), { status: 200 })
    }

    const lastKanji = kanji[kanji.length - 1]
    const cursor = lastKanji.id

    const nextPage = await prisma.vocabulary.findMany({
      take: take ? parseInt(take) : 5,
      skip: 1,
      cursor: { id: cursor },
    })

    const finalDataKanji = []

    for (const kanjiData of kanji) {
      const kanjisInWord = findAll(_kanji, kanjiData.word)

      if (kanjisInWord.length > 0) {
        for (const kanjiInWord of kanjisInWord) {
          const extendedKanji = await getKanjiDetails(kanjiInWord)
          finalDataKanji.push({ ...kanjiData, kanjiDetails: extendedKanji })
        }
      }
    }
    const data = {
      data: finalDataKanji,
      metadata: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    }
    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
