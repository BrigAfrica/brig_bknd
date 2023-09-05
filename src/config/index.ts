import { CorsOptions } from "cors"

export const PORT = process.env.PORT || 3000
export const DEBUG = process.env.NODE_ENV !== 'production'
export const JWT_SECRET = process.env.JWT_SECRET || ''

const whitelist = [
  'https://brigfrontend.onrender.com',
  'http://localhost:3000'
]

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    if (whitelist.indexOf(origin?.toLowerCase() || '*') !== -1) {
      console.log('Allowed by CORS');
      callback(null, true);
    } else {
      console.log('Not allowed by CORS');
      callback(new Error('Not allowed by CORS'));
    }
  }
};