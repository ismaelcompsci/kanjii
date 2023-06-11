import prisma from "@/lib/prismadb"

export default async function getVocabPacks() {
  try {
    const packs = await prisma.vocabularyPack.findMany()

    return packs
  } catch (error: any) {
    throw new Error(error)
  }
}
