import { PrismaClient } from '@prisma/client';
import postgres from 'postgres'

const URL = process.env.DATABASE_URL || "";


export const sql = postgres(URL, { ssl: 'require' })
export const prisma = new PrismaClient()