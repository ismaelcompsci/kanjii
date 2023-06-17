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
    const take = url.searchParams.get("take") || "5"
    const currentPageNumber = url.searchParams.get("page")

    const queryOptions: QueryOptions = {
      where: {
        vocabularyPackId: params.packId,
      },
      take: parseInt(take || "5"),
      skip: currentPageNumber ? +currentPageNumber * +take : 1,
      orderBy: {
        id: "asc",
      },
    }

    const kanji = await prisma.vocabulary.findMany(queryOptions)

    return new NextResponse(JSON.stringify(kanji), { status: 200 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
