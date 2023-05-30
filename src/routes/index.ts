import { Express, Router } from "express"; 'express';
import validateSchema from 'middlewares/validateSchema';
import { emailSchema } from 'schemas/emails';
import { addEmailToNewsletter } from 'controllers/emails';

const setupRoutes = (app: Express) => {
  const baseRouter = Router();
  baseRouter.post('/emails', validateSchema(emailSchema), addEmailToNewsletter)

  // apply routers
  app.use('/', baseRouter);
}

export default setupRoutes;