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

/*
import { db } from "@/src/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
  const url = new URL(req.url)
  try {
    const { take, vocabularyPackId, lastCursor } = z
      .object({
        take: z.string(),
        vocabularyPackId: z.string(),
        lastCursor: z.string().optional().nullable(),
      })
      .parse({
        vocabularyPackId: url.searchParams.get("vocabularyPackId"),
        take: url.searchParams.get("take"),
        lastCursor: url.searchParams.get("lastCursor"),
      })

    const vocab = await db.vocabulary.findMany({
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        },
      }),
      orderBy: {
        id: "asc",
      },
      where: {
        vocabularyPackId: vocabularyPackId,
      },
    })

    if (vocab.length === 0) {
      return new Response(
        JSON.stringify({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
            hasPrevPage: lastCursor ? true : false,
          },
        }),
        { status: 200 }
      )
    }

    const lastVocabInResults = vocab[vocab.length - 1]
    const cursor = lastVocabInResults.id

    const nextPage = await db.vocabulary.findMany({
      take: take ? parseInt(take as string) : 10,
      skip: 1,
      cursor: {
        id: cursor,
      },
    })

    const data = {
      data: vocab,
      lastCursor: cursor,
      hasNextPage: nextPage.length > 0,
      hasPrevPage: lastCursor ? true : false,
    }

    return new Response(JSON.stringify(data), { status: 200 })
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


*/
