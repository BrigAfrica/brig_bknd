// import { loginUser, signupUser, getUser } from "controllers/auth.controller";
import { createOrder, getAllOrders, getOrdersById } from "controllers/order.controller";
import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import validateSchema from "middlewares/validateSchema";
import { createOrderSchema } from "schemas/orders";

const ordersRouter = Router();
ordersRouter.post('/', authMiddleware('admin'), validateSchema(createOrderSchema), createOrder)
ordersRouter.get('/getAllOrders', authMiddleware('admin'), getAllOrders);
ordersRouter.get('/getOrdersById/:id', authMiddleware('admin'), getOrdersById);

export default ordersRouter;