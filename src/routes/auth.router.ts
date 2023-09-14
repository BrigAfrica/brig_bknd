import { loginUser, signupUser, getUser } from "controllers/auth.controller";
import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import validateSchema from "middlewares/validateSchema";
import { loginSchema, signupSchema } from "schemas/auth";

const authRouter = Router();
authRouter.post('/login', validateSchema(loginSchema), loginUser)
authRouter.post('/register', validateSchema(signupSchema), signupUser)
authRouter.get('/user', authMiddleware('user'), getUser)
authRouter.get('/admin', authMiddleware('admin'), getUser)

export default authRouter;