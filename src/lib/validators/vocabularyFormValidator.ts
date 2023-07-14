import { z } from "zod"

const VocabularyObjectSchema = z.strictObject({
  word: z.string().min(1).max(64),
  reading: z.string().min(1).max(128).optional(),
  meaning: z.string().min(1).max(254).optional(),
  sentence: z.string().min(1).max(254).optional(),
  englishSentence: z.string().min(1).max(254).optional(),
  sound: z.string().min(1).max(254).optional().nullable(),
  sentenceSound: z.string().min(1).max(254).optional().nullable(),
  hint: z.string().min(1).max(254).optional().nullable(),
})

const VocabularySchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50, { message: "Pack name must be no more than 50 characters" }),
  vocabulary: z.array(VocabularyObjectSchema),
  packId: z.string().optional(),
})

export { VocabularySchema, VocabularyObjectSchema }
