import axios from "axios"

type KanjiParmas = {
  take?: number
  lastCursor?: string
}

const getKanji = async ({ take, lastCursor }: KanjiParmas) => {
  const response = await axios.get("/api/kanji", {
    params: { take, lastCursor },
  })

  return response?.data
}

export default getKanji
