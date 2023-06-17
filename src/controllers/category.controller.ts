import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addCategory: RequestHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const count = await prisma.category.findFirst({
      where: {
        name: name
      }
    })
    if (count) {
      return res.status(400).json({ message: 'Category in db' });
    }
    await prisma.category.create({
      data: {
        name
      }
    })
    return res.status(201).json({ message: 'Category added to database' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error adding category to database' });
  }
}

export const updateCategory: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(id);

        const updatedCategory = await prisma.category.update({
          where: { id: Number(id) },
          data: { name },
        });
        
        return res.status(201).json({ message: 'Category updated', category: updatedCategory });
    } catch (err) {
        console.error(err);
    return res.status(500).json({ message: 'Error updating category to database' });
    }
}

export const deleteCategory: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
    
        await prisma.category.delete({
            where: { id: Number(id) },
        });
        
        return res.status(201).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
    return res.status(500).json({ message: 'Error deleting category from database' });
    }
}

export const getAllCategories: RequestHandler = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        console.log(categories);

        return res.status(201).json({ categories });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching categories from database' });
    }
}