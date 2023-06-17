import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addBrand: RequestHandler = async (req, res) => {
    const { name }  = req.body;
    try {
      const count = await prisma.brand.findFirst({
        where: {
          name: name
        }
      })
      if (count) {
        return res.status(400).json({ message: 'Brand already in db' });
      }
      await prisma.brand.create({
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

export const updateBrand: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(id);

        const updatedBrand = await prisma.brand.update({
          where: { id: Number(id) },
          data: { name },
        });
        
        return res.status(201).json({ message: 'Brand updated', brand: updatedBrand });
    } catch (err) {
        console.error(err);
    return res.status(500).json({ message: 'Error updating brand to database' });
    }
}

export const deleteBrand: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
    
        await prisma.brand.delete({
            where: { id: Number(id) },
        });
        
        return res.status(201).json({ message: 'Brand deleted successfully' });
    } catch (err) {
        console.error(err);
    return res.status(500).json({ message: 'Error deleting brand from database' });
    }
}

export const getAllBrands: RequestHandler = async (req, res) => {
    try {
        const brand = await prisma.brand.findMany();

        return res.status(201).json({ brand });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching brands from database' });
    }
}