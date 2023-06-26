import { z } from "zod"

export const UpdatePageValidator = z.object({
  page: z.number(),
  packId: z.string(),
})

export type CreateUpdateValidatorPayload = z.infer<typeof UpdatePageValidator>
