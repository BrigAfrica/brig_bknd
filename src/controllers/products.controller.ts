import { RequestHandler, Express } from "express";
import { prisma } from 'services/db';
import cloudinary from 'config/cloudinaryConfig';

const bufferToBase64 = (buffer: Buffer) => {
  return buffer.toString('base64');
};

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const { body } = req;

    console.log(body);
    
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
        image3: body.image3,
        boxImage: body.boxImage,
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
    const { name, category, brand, price } = req.query;

    const products = await prisma.product.findMany({
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

export const imageUpload: RequestHandler = async (req, res, next) => {
  try
  {
    if(!req.file){
      return res.status(400).json({ message: 'No image uploaded' });
    }
    const base64String = bufferToBase64(req.file.buffer);

    const result = await cloudinary.uploader.upload(base64String, { resource_type: 'image' })
    //console.log(result);

    res.json({ imageUrl: result.secure_url });
  }
  catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    // Handle the error and return an appropriate response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};