import { Vocabulary } from "@prisma/client"

export interface Example {
  japanese: string
  meaning: {
    english: string
  }
  audio: {
    opus: string
    aac: string
    ogg: string
    mp3: string
  }
}

export interface KanjiDetails {
  character: string
  examples: Example[]
  strokes: {
    count: number
    timings: number[]
    images: string[]
  }
  video: {
    mp4: string
    webm: string
    poster: string
  }
}

export interface ExtendedVocabulary extends Vocabulary {
  kanjiDetails: KanjiDetails
}

export interface QueryOptions {
  take?: number
  skip?: number
  cursor?: {
    id: string
  }
  orderBy?: {
    id: "asc" | "desc"
  }
}

export interface StrokeGraphProps {
  kanjiDetails: KanjiDetails
}
