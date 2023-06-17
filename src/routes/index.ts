import { Express, Router } from "express"; 'express';
import validateSchema from 'middlewares/validateSchema';
import { emailSchema } from 'schemas/emails';
import { repairDetailsSchema } from 'schemas/repairs';
import { categorySchema, brandSchema } from 'schemas/products';
import { addEmailToNewsletter } from 'controllers/emails.controller';
import { repairAppointmentForm } from 'controllers/repairs.controller';
import { addCategory, updateCategory, deleteCategory, getAllCategories } from 'controllers/category.controller';
import {  addBrand, updateBrand, deleteBrand, getAllBrands } from 'controllers/brands.controller';

const setupRoutes = (app: Express) => {
  const baseRouter = Router();
  baseRouter.post('/emails', validateSchema(emailSchema), addEmailToNewsletter)
  baseRouter.post('/bookRepairAppointment', validateSchema(repairDetailsSchema), repairAppointmentForm)
  baseRouter.post('/addCategory', validateSchema(categorySchema), addCategory)
  baseRouter.put('/updateCategory/:id', validateSchema(categorySchema), updateCategory)
  baseRouter.delete('/deleteCategory/:id', deleteCategory)
  baseRouter.get('/getAllCategories', getAllCategories)
  baseRouter.post('/addBrand', validateSchema(brandSchema), addBrand)
  baseRouter.put('/updateBrand/:id', validateSchema(brandSchema), updateBrand)
  baseRouter.delete('/deleteBrand/:id', deleteBrand)
  baseRouter.get('/getAllBrands', getAllBrands)


  // apply routers
  app.use('/', baseRouter);
}

export default setupRoutes;