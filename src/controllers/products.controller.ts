import { RequestHandler, Express } from "express";
import { prisma } from 'services/db';
import cloudinary from 'config/cloudinaryConfig';
import upload from '../middlewares/multerMiddleware';
//import toStream from 'buffer'

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
    console.log(count);
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

export const getProductByCategory: RequestHandler = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const prod = await prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return res.json({ prod });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const advancedSearchProducts: RequestHandler = async (req, res) => {
  try {
    const { search, page, perPage } = req.query;
    const pageNumber = parseInt(page as string) || 1; // Current page number, default to 1
    const itemsPerPage = parseInt(perPage as string) || 10;

    const skip = (pageNumber - 1) * itemsPerPage;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search as string,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            description: {
              contains: search as string,
              mode: 'insensitive',
            },
          },
          {
            memory: {
              contains: search as string,
              mode: 'insensitive',
            },
          },
          {
            storage: {
              contains: search as string,
              mode: 'insensitive',
            },
          },
          // Add more fields to search if needed
        ],
      },
      skip, // Number of items to skip
      take: itemsPerPage, // Number of items to take
      include: {
        category: true,
        brand: true,
        // Include other related data as needed
      },
    });

    // const products = await prisma.product.findMany({
    //   where: {
    //     name: name ? { contains: name as string } : undefined,
    //     category: category ? { id: parseInt(category as string) } : undefined,
    //     brand: brand ? { id: parseInt(brand as string) } : undefined,
    //     price: price ? { equals: parseFloat(price as string) } : undefined,
    //   },
    //   include: {
    //     category: true,
    //     brand: true,
    //   },
    // });

    return res.status(201).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching products from database' });
  }
};

export const imageUpload: RequestHandler = async (req, res) => {
  try
  {
    console.log('Request received');
    console.log(req.file);

    const imageBuffer = req.file?.buffer;

    if(!req.file){
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }
    else{
      cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          console.error('Error uploading image to Cloudinary:', error);
          res.status(500).json({ success: false, message: 'Error uploading image' });
        } else {
          console.log('Image uploaded to Cloudinary:', result);
          const imageUrl = result?.secure_url;
          res.status(200).json({ success: true, message: 'Image uploaded successfully', imageUrl });
        }
      }).end(imageBuffer)
    }
    return res;
  }
  catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMultipleProducts: RequestHandler = async (req, res) => {
  try {
    const idsParam = req.query.ids as string; // Explicitly cast to string
    console.log(idsParam);
    const productIds = idsParam.split(',').map((id) => parseInt(id.trim(), 10));

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Products not found' });
    }

    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching products from the database' });
  }
};

