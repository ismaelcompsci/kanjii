import prisma from "@/lib/prismadb"

import getCurrentUser from "./getCurrentUser"

export default async function getUserSeenPacks() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { userSeenPacks: null, user: null }
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: user?.id },
      include: { seenVocabularyPacks: true },
    })

    if (currentUser) {
      const seenPacks = currentUser.seenVocabularyPacks
      return { userSeenPacks: seenPacks, user: user }
    } else {
      return { userSeenPacks: null, user: null }
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
