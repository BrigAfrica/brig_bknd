import { Router } from "express"; 'express';
import validateSchema from 'middlewares/validateSchema';
import { emailSchema } from 'schemas/emails';
import { addEmailToNewsletter } from 'controllers/emails.controller';
import authRouter from "./auth.router";


const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.post('/emails', validateSchema(emailSchema), addEmailToNewsletter)

export default baseRouter;