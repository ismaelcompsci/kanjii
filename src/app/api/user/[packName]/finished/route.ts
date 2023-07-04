import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { packId, finished } = body

    const userId = session.user.id

    if (!packId) {
      return new Response("Vocabulary pack id is required", { status: 400 })
    }
    await db.seenVocabularyPack.update({
      where: {
        userId_vocabularyPackId: {
          vocabularyPackId: packId,
          userId,
        },
      },
      data: {
        finished: finished,
      },
    })

    return new Response("Ok")
  } catch (error) {
    return new Response("Could not update current page at this time.", {
      status: 500,
    })
  }
}
