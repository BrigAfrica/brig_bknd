// import { loginUser, signupUser, getUser } from "controllers/auth.controller";
import { createOrder } from "controllers/order.controller";
import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import validateSchema from "middlewares/validateSchema";
import { orderSchema } from "schemas/orders";

const ordersRouter = Router();
ordersRouter.post('/', authMiddleware('user'), validateSchema(orderSchema), createOrder)

export default ordersRouter;