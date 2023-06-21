import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addBrand: RequestHandler = async (req, res) => {
    const { name } = req.body;
    try {
      const count = await prisma.category.findFirst({
        where: {
          name: name
        }
      })
      if (count) {
        return res.status(400).json({ message: 'Brand already in db' });
      }
      await prisma.category.create({
        data: {
          name
        }
      })
      return res.status(201).json({ message: 'Brand added to database' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding brand to database' });
    }
  }

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    
    const count = await prisma.product.findFirst({
      where: {
        name: body.name
      }
    })
    if (count) {
      return res.status(400).json({ message: 'Product already in db' });
    }

    await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        categoryId: body.categoryId,
        brandId: body.brandId,
        quantity: body.quantity,
        description: body.description,
        memory: body.memory,
        storage: body.storage,
        image1: body.image1,
        image2: body.image2,
        image3: body.image3
      }
    })

    return res.status(201).json({ success: true, message: "Product created successfully"});
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(400).json({ success: false, message: "Error creating product"});
  }
};