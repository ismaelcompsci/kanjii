import { db } from "@/src/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        subredditName: url.searchParams.get("subredditName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      })

    const packs = await db.vocabularyPack.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        creator: {
          select: {
            name: true,
            image: true,
          },
        },
        likes: true,
        _count: true,
      },
    })

    return new Response(JSON.stringify(packs))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response(
      "Could not fetch more study packs, please try again later",
      {
        status: 500,
      }
    )
  }
}
