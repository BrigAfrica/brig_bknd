import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const { body } = req;
    
    const count = await prisma.Product.findFirst({
      where: {
        name: body.name
      }
    })
    if (count) {
      return res.status(400).json({ message: 'Product already in db' });
    }

    await prisma.Product.create({
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
        image3: body.image3,
        //boxImage: body.boxImage,
      }
    })

    return res.status(201).json({ success: true, message: "Product created successfully"});
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(400).json({ success: false, message: "Error creating product"});
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
      const { id } = req.params;
      const { body } = req;

      const updatedProduct = await prisma.Product.update({
        where: { id: Number(id) },
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
          image3: body.image3,
          //boxImage: body.boxImage,
        },
      });
      
      return res.status(201).json({ message: 'Product updated', brand: updatedProduct });
  } catch (err) {
      console.error(err);
  return res.status(500).json({ message: 'Error updating product to database' });
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
      const { id } = req.params;
  
      await prisma.Product.delete({
          where: { id: Number(id) },
      });
      
      return res.status(201).json({ message: 'Product deleted successfully' });
  } catch (err) {
      console.error(err);
  return res.status(500).json({ message: 'Error deleting product from database' });
  }
}

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
      const prod = await prisma.Product.findMany();

      return res.status(201).json({ prod });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching products from database' });
  }
}

export const getIdProducts: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.Product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(201).json({ product });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching products from database' });
  }
}

export const advancedSearchProducts: RequestHandler = async (req, res) => {
  try {
    const { name, category, brand, price } = req.query;

    const products = await prisma.Product.findMany({
      where: {
        name: name ? { contains: name as string } : undefined,
        category: category ? { id: parseInt(category as string) } : undefined,
        brand: brand ? { id: parseInt(brand as string) } : undefined,
        price: price ? { equals: parseFloat(price as string) } : undefined,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return res.status(201).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching products from database' });
  }
};