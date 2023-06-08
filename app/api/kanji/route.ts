import { NextResponse } from "next/server"

import prisma from "@/lib/prismadb"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    const take = url.searchParams.get("take")
    const lastCursor = url.searchParams.get("lastCursor")

    const kanji = await prisma.vocabulary.findMany({
      take: take ? parseInt(take as string) : 5,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        },
      }),
      orderBy: {
        id: "asc",
      },
    })

    if (kanji.length === 0) {
      return new NextResponse(
        JSON.stringify({
          data: [],
          metadata: {
            lastCursor: null,
            hasNextPage: false,
          },
        }),
        { status: 200 }
      )
    }

    const lastKanji = kanji[kanji.length - 1]
    const cursor = lastKanji.id

    const nextPage = await prisma.vocabulary.findMany({
      take: take ? +take : 5,
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
