import { z } from "zod"

export const LikingValidator = z.object({
  vocabularyPackId: z.string(),
})

export type LikingValidatorPayload = z.infer<typeof LikingValidator>
