import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { LikingValidator } from "@/src/lib/validators/LikingValidator"
import { z } from "zod"

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    const body = await req.json()

    const { vocabularyPackId } = LikingValidator.parse(body)

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const existingVote = await db.like.findFirst({
      where: {
        vocabularyPackId,
        userId: session.user.id,
      },
    })

    if (existingVote) {
      await db.like.delete({
        where: {
          userId_vocabularyPackId: {
            userId: session.user.id,
            vocabularyPackId,
          },
        },
      })

      return new Response("OK")
    } else {
      await db.like.create({
        data: {
          userId: session.user.id,
          vocabularyPackId,
        },
      })
      return new Response("OK")
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }
    return new Response("Could not like pack, please try again later", {
      status: 500,
    })
  }
}
