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

export const getAllOrders: RequestHandler = async (req, res) => {
  try {
      const prod = await prisma.order.findMany();

      return res.status(201).json({ prod });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching products from database' });
  }
}

export const getOrdersById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.order.findUnique({
      where: { id: id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(201).json({ product });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching products from database' });
  }
}

