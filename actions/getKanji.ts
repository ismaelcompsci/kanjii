import axios from "axios"

type KanjiParmas = {
  take?: number
  lastCursor?: string
  first?: boolean
  packId?: string
}

const getKanji = async ({ take, lastCursor, first, packId }: KanjiParmas) => {
  const response = await axios.get(`/api/packs/${packId}`, {
    params: { take, lastCursor, first },
  })

  return response?.data
}

export default getKanji
