import prisma from "@/lib/prismadb"

interface IParams {
  packId: string
}

export default async function getPackById(params: IParams) {
  try {
    const { packId } = params

    const vocab = await prisma.vocabularyPack.findUnique({
      where: {
        id: packId,
      },
      include: {
        Vocabulary: true,
      },
    })

    if (!vocab) {
      return null
    }

    return vocab
  } catch (error: any) {
    throw new Error(error)
  }
}
