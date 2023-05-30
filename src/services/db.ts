import postgres from 'postgres'

const URL = process.env.PG_URI || "";

export const sql = postgres(URL, { ssl: 'require' })