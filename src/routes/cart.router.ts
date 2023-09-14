import { addToCart, getCart } from "controllers/cart.controller";
import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import validateSchema from "middlewares/validateSchema";
import { createOrderSchema } from "schemas/orders";

const cartRouter = Router();

cartRouter.post('/add', authMiddleware('user'), addToCart);
cartRouter.get('/view/:userId', authMiddleware('user'), getCart);

export default cartRouter;