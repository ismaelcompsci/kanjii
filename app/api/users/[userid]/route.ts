import { NextResponse } from "next/server"
import getCurrentUser from "@/actions/getCurrentUser"

import prisma from "@/lib/prismadb"

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.error()
    }

    const body = await req.json()
    const page = body.page
    const packId: string = body.packId
    const userId = currentUser.id

    const _page = await prisma.seenVocabularyPack.upsert({
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

    return NextResponse.json(_page)
  } catch (error) {
    console.log(error)

    return new Response(null, { status: 500 })
  }
}

// try {
//   const currentUser = await getCurrentUser()

//   if (!currentUser) {
//     return NextResponse.error()
//   }

//   const body = await req.json()

//   const _page = await prisma.user.update({
//     where: {
//       id: currentUser.id,
//     },
//     data: { page: body.page },
//   })

//   return NextResponse.json(_page)
// } catch (error) {
//   console.log(error)

//   return new Response(null, { status: 500 })
// }
