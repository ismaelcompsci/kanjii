import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { UpdatePageValidator } from "@/src/lib/validators/updatePageValidator"
import { z } from "zod"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { packId, page } = UpdatePageValidator.parse(body)
    const userId = session.user.id

    await db.seenVocabularyPack.upsert({
      where: {
        userId_vocabularyPackId: {
          userId,
          vocabularyPackId: packId,
        },
      },
      update: {
        currentPage: page,
      },
      create: {
        user: { connect: { id: userId } },
        vocabularyPack: { connect: { id: packId } },
        currentPage: page,
      },
    })

    return new Response("Ok")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("Could not update current page at this time.", {
      status: 500,
    })
  }
}
