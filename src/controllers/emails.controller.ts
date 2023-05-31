import { RequestHandler } from "express";
import { prisma, sql } from 'services/db';

export const addEmailToNewsletter: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    // const count = await sql`SELECT COUNT(email) FROM brig_newsletter WHERE email = (${email})`;
    const count = await prisma.brig_newsletter.findFirst({
      where: {
        email: email
      }
    })
    if (count) {
      return res.status(400).json({ message: 'Email in db' });
    }
    // await sql`INSERT INTO brig_newsletter (email) VALUES (${email})`;
    await prisma.brig_newsletter.create({
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