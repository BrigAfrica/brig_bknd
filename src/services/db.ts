import { PrismaClient } from '@prisma/client';
import postgres from 'postgres'

//LOCAL URL
//const URL = process.env.DATABASE_URL || "";

//DEPLOYED ON RENDER URL
const URL = process.env.DATABASE_URL_RENDER_DEPLOY || "";

export const sql = postgres(URL, { ssl: 'require' })
export const prisma = new PrismaClient()