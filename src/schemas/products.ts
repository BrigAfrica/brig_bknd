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

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    categoryId: z.number(),
    brandId: z.number(),
    quantity: z.number(),
    description: z.string().min(1),
    memory: z.string().min(1),
    storage: z.string().min(1),
    image1: z.string().optional(),
    image2: z.string().optional(),
    image3: z.string().optional(),
    boxImage: z.string().optional(),
  })
})