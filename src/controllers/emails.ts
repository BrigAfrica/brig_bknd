import { RequestHandler } from "express";
import { sql } from 'services/db';

export const addEmailToNewsletter: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const count = await sql`SELECT COUNT(email) FROM brig_newsletter WHERE email = (${email})`;
    console.log(count.length)
    if (count.length >= 1) {
      return res.status(400).json({ message: 'Email in db' });
    }
    await sql`INSERT INTO brig_newsletter (email) VALUES (${email})`;
    return res.status(201).json({ message: 'Email added to database' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error adding email to database' });
  }
}