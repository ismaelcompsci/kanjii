import axios from "axios"

type KanjiParmas = {
  take?: number
  lastCursor?: string
  first?: boolean
  packId?: string
  page?: number
}

const getKanji = async ({ take, page, packId }: KanjiParmas) => {
  const response = await axios.get(`/api/packs/${packId}`, {
    params: { take, page },
  })

  return response?.data
}

export default getKanji
