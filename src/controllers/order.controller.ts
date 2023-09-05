import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { createOrderSchema } from "schemas/orders";
import { prisma } from "services/db";
import { z } from "zod";

type CreateOrderSchema = z.infer<typeof createOrderSchema>

export const createOrder: RequestHandler = async (req, res) => {
  try{
    const { products, address, phone_number, order_type } = req.body as CreateOrderSchema['body']
    const user = req.user as User

    const order = prisma.order.create({
      data: {
        products: {
          create: products.map((product) => ({
            quantity: product.quantity,
            product: { connect: {id: product.product_id}},
          }))
        },
        address,
        phone_number,
        userId: user?.id,
        type: order_type,
      }
    });
    res.status(201).json({ success: true, message: 'Order created successfully', order: order });
  }catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
  
}