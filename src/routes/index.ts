import { Router } from "express"; 'express';
import authRouter from "./auth.router";
import validateSchema from 'middlewares/validateSchema';
import { emailSchema } from 'schemas/emails';
import { repairDetailsSchema } from 'schemas/repairs';
import { categorySchema, brandSchema, productSchema } from 'schemas/products';
import { addEmailToNewsletter } from 'controllers/emails.controller';
import { repairAppointmentForm } from 'controllers/repairs.controller';
import { addCategory, updateCategory, deleteCategory, getAllCategories } from 'controllers/category.controller';
import { addBrand, updateBrand, deleteBrand, getAllBrands } from 'controllers/brands.controller';
import { addProduct, updateProduct, deleteProduct, getAllProducts, getIdProducts, advancedSearchProducts } from 'controllers/products.controller';
import ordersRouter from "./orders.router";

const baseRouter = Router();
  baseRouter.use('/auth', authRouter);
  baseRouter.use('/orders', ordersRouter);
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
  baseRouter.post('/addProduct', validateSchema(productSchema), addProduct)
  baseRouter.put('/updateProduct/:id', validateSchema(productSchema), updateProduct)
  baseRouter.delete('/deleteProduct/:id', deleteProduct)
  baseRouter.get('/getAllProducts', getAllProducts)
  baseRouter.get('/getIdProducts/:id', getIdProducts)
  baseRouter.get('/products/search', advancedSearchProducts);

export default baseRouter;