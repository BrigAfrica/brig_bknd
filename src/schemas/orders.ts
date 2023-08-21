import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    products: z.array(z.object({
      product_id: z.number(),
      quantity: z.number()
    })),
    address: z.string(),
    phone_number: z.string(),
    order_type: z.enum(['pick_up', "delivery"])
  })
})