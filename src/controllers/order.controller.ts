import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { createOrderSchema } from "schemas/orders";
import { prisma } from "services/db";
import { z } from "zod";

type CreateOrderSchema = z.infer<typeof createOrderSchema>

export const createOrder: RequestHandler = async (req, res) => {
  const { products, address, phone_number, order_type } = req.body as CreateOrderSchema['body']
  const user = req.user as User

  const order = prisma.order.create({
    data: {
      products: {
        createMany: {
          data: products.map(({ quantity, product_id }) => ({
            productId: product_id,
            quantity
          }))
        }
      },
      address,
      phone_number,
      userId: user?.id,
      type: order_type,
    }
  })
}