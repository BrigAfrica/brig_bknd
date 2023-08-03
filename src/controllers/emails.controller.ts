import { RequestHandler } from "express";
import { prisma } from 'services/db';

export const addEmailToNewsletter: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const count = await prisma.newsletter.findFirst({
      where: {
        email: email
      }
    })
    if (count) {
      return res.status(400).json({ message: 'Email in db' });
    }
    await prisma.newsletter.create({
      data: {
        email
      }
    })
    return res.status(201).json({ message: 'Email added to database' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error adding email to database' });
  }
}