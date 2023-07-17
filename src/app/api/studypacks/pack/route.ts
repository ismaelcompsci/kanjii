import { getAuthSession } from "@/src/lib/auth"
import { db } from "@/src/lib/db"

// export async function PATCH(req: Request) {
//   try {
//     const session = await getAuthSession()

//     if (!session) {
//       return new Response("Unauthenticated", { status: 403 })
//     }

//     const body = await req.json()

//     const { packId, vocabulary } = VocabularySchema.parse(body)

//     const count = vocabulary.length

//     if (!packId) {
//       return new Response("pack id is required", { status: 400 })
//     }

//     if (!vocabulary) {
//       return new Response("vocabulary is required", { status: 400 })
//     }

//     const packBySessionId = await db.vocabularyPack.findFirst({
//       where: {
//         id: packId,
//         creatorId: session.user.id,
//       },
//     })

//     if (!packBySessionId) {
//       return new Response("Unauthorized", { status: 405 })
//     }

//     const updatedPack = await db.vocabularyPack.update({
//       where: {
//         id: packId,
//       },
//       data: {
//         vocabulary: vocabulary
//       }
//     })

//     return Response.json("Ok")
//   } catch (error) {
//     console.log(error)
//     return new Response("Internal error", { status: 500 })
//   }
// }

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response("Unauthenticated", { status: 403 })
    }

    const body = await req.json()

    const { packId } = body

    if (!packId) {
      return new Response("packId is required", { status: 400 })
    }

    const packBySessionId = await db.vocabularyPack.findFirst({
      where: {
        id: packId,
        creatorId: session.user.id,
      },
    })

    if (!packBySessionId) {
      return new Response("Unauthorized", { status: 405 })
    }

    const deletedPack = await db.vocabularyPack.delete({
      where: {
        id: packId,
      },
    })

    return new Response("Ok")
  } catch (error) {
    console.log(error)
    return new Response("Internal error", { status: 500 })
  }
}
