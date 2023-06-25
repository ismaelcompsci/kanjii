type KanjiParmas = {
  query: string
  page: number
}

type kanjiData = {
  page: number
  data: any
}

const getKanji = async ({ query, page }: KanjiParmas): Promise<kanjiData> => {
  const response = await fetch(query)
  const data = await response.json()

  return { page: page, data: data }
}

export default getKanji
