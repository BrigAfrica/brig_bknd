import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addProduct: RequestHandler = async (req, res) => {
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
        category: {
          connect: { id: body.categoryId}
        },
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

export const updateProduct: RequestHandler = async (req, res) => {
  try {
      const { id } = req.params;
      const { body } = req;

      const updatedProduct = await prisma.product.update({
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
          image3: body.image3
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
  
      await prisma.product.delete({
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
      const prod = await prisma.product.findMany();

      return res.status(201).json({ prod });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching products from database' });
  }
}

export const getIdProducts: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
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
    const { keyword, category, brand, minPrice, maxPrice } = req.query;

    // Build the search filters based on the provided criteria
    const filters = {
      name: keyword ? { contains: keyword } : undefined,
      category: category ? { equals: category } : undefined,
      brand: brand ? { equals: brand } : undefined,
      price: {
        gte: minPrice ? parseFloat(minPrice.toString()) : undefined,
        lte: maxPrice ? parseFloat(maxPrice.toString()) : undefined,
      },
    };

    // Find products matching the search filters
    const products = await prisma.product.findMany({
      where: filters,
    });

    return res.status(201).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error performing advanced search' });
  }
};