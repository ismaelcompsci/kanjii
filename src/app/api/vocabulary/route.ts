import { db } from "@/src/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
  const url = new URL(req.url)
  try {
    const { limit, page, vocabularyPackId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        vocabularyPackId: z.string(),
      })
      .parse({
        vocabularyPackId: url.searchParams.get("vocabularyPackId"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      })

    const vocab = await db.vocabulary.findMany({
      take: parseInt(limit),
      skip: parseInt(page) * parseInt(limit),
      orderBy: {
        id: "asc",
      },
      where: {
        vocabularyPackId: vocabularyPackId,
      },
    })

    return new Response(JSON.stringify(vocab))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response(
      "Could not fetch more vocabulary, please try again later",
      {
        status: 500,
      }
    )
  }
}
