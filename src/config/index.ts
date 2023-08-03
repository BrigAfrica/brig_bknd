import { CorsOptions } from "cors"

export const PORT = process.env.PORT || 3000
export const DEBUG = process.env.NODE_ENV !== 'production'
export const JWT_SECRET = process.env.JWT_SECRET || ''

const whitelist = [
  'https://brigfrontend.onrender.com/signin',
  'http://localhost:3000'
]

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin || "") !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}