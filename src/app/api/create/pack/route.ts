import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { VocabularySchema } from "@/src/lib/validators/vocabularyFormValidator"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const body = await req.json()

    const { name, vocabulary } = VocabularySchema.parse(body)

    const count = vocabulary.length

    const vocabularyPack = await db.vocabularyPack.create({
      data: {
        name: name,
        creatorId: session.user.id,
        vocabularyCount: count,
        counted: true,
      },
    })

    const validVocabulary = vocabulary.map((vocab) => ({
      ...vocab,
      vocabularyPackId: vocabularyPack.id,
    }))

    await db.vocabulary.createMany({
      data: validVocabulary,
    })

    return new Response("Ok", { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      "Could not create a new vocabulary pack at this time.",
      {
        status: 500,
      }
    )
  }
}
