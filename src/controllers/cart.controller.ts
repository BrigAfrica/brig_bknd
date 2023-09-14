import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addToCart: RequestHandler = async (req, res) => {
    try {
        // Get the product and user information from the request body
        const { productId, userId, quantity } = req.body;
    
        // Check if the user already has a cart
        const existingCart = await prisma.cart.findFirst({
          where: {
            userId,
          },
        });
    
        if (!existingCart) {
          // If the user doesn't have an active cart, create one
          const newCart = await prisma.cart.create({
            data: {
              userId,
            },
          });
    
          // Create a new cart item
          const cartItem = await prisma.productCart.create({
            data: {
              productId,
              cartId: newCart.id,
              quantity: quantity,
            },
          });
    
          return res.status(201).json({ message: "Item added to cart", cartItem });
        } else {
          // If the user already has an active cart, check if the product is already in the cart
          const existingCartItem = await prisma.productCart.findFirst({
            where: {
              cartId: existingCart.id,
              productId,
            },
          });
    
          if (existingCartItem) {
            await prisma.productCart.update({
              where: {
                id: existingCartItem.id,
              },
              data: {
                quantity: existingCartItem.quantity + quantity,
              },
            });
            return res.status(200).json({ message: "Item quantity updated in cart" });
          } else {
            const cartItem = await prisma.productCart.create({
              data: {
                productId,
                cartId: existingCart.id,
                quantity: 1,
              },
            });
            return res.status(201).json({ message: "Item added to cart", cartItem });
          }
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
};


export const getCart: RequestHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
  
      // Fetch the user's cart with associated products
      const cart = await prisma.cart.findFirst({
        where: { userId: Number(userId) },
        include: { products: true },
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user.' });
      }
  
      return res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};
  