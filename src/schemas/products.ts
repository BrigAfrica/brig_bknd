import { z } from "zod";

export const categorySchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export const brandSchema = z.object({
    body: z.object({
      name: z.string()
    })
  })