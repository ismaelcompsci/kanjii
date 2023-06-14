type KanjiParmas = {
  take: number
  lastCursor?: string
  first?: boolean
  packId?: string
  page: number
}

type kanjiData = {
  page: number
  data: any
}

const getKanji = async ({
  take,
  page,
  packId,
}: KanjiParmas): Promise<kanjiData> => {
  const response = await fetch(`/api/packs/${packId}?take=${take}&page=${page}`)
  const data = await response.json()

  return { page: page, data: data }
}

export default getKanji
