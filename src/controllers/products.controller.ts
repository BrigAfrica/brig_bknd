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