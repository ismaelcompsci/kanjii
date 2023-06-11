import { NextResponse } from "next/server"

import { QueryOptions } from "@/types/types"
import prisma from "@/lib/prismadb"
import { _kanji } from "@/lib/utils"

interface IParams {
  packId: string
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const url = new URL(req.url)
    const take = url.searchParams.get("take")
    const lastCursor = url.searchParams.get("lastCursor")
    const first = url.searchParams.get("first")

    const queryOptions: QueryOptions = {
      where: {
        vocabularyPackId: params.packId,
      },
      take: take ? parseInt(take as string) : 5,
      skip: 0,
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

    const data = {
      data: kanji,
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
