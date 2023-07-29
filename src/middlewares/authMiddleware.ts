import { Response, Request, NextFunction } from "express"
import { excludeFromUser, getAuthTokenFromHeaders } from "helpers/utils"
import { prisma } from "services/db"
import jwt from 'jsonwebtoken'
import { UserRole } from "@prisma/client"

const authMiddleware = (role: UserRole) => async (req: Request, res: Response, next: NextFunction) => {
  const token = getAuthTokenFromHeaders(req)
  if (token) {
    const decodedToken = jwt.decode(token, { json: true })
    if (decodedToken) {
      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        }
      });
      if (user && user.role.includes(role)) {
        req.user = excludeFromUser(user, ['password'])
        return next()
      }
    }
  }
  return res.status(401).json({ detail: "Unauthorized" });
}

export default authMiddleware