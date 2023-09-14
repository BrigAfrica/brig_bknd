import { RequestHandler } from "express";
import passport from "passport";
import { AuthenticateCallback } from "passport";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "config";
import * as argon from "argon2";
import { prisma } from "services/db";
import { User } from "@prisma/client";

export const loginUser: RequestHandler = async (req, res, next) => {
  passport.authenticate(
    'login',
    (async (err, _user) => {
      const user = _user as User;
      try {
        if (err) {
          const error = new Error('Something went wrong.');
          return next(error);
        }
        if (!user) {
          return res.status(401).json({ detail: "Invalid Username/password" })
        }
        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            const { email, id, role } = user
            const payload = {
              id,
              email,
              role,
              token: jwt.sign({ email, id }, JWT_SECRET)
            };

            return res.json(payload);
          }
        );
      } catch (error) {
        return next(error);
      }
    }) as AuthenticateCallback
  )(req, res, next);
}

export const signupUser: RequestHandler = async (req, res) => {
  const { email, name, password, role } = req.body;
  const hashedPassword = await argon.hash(password);
  let user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (user) {
    return res.status(400).json({ detail: "User already exists" })
  }
  user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: role || 'user',
    }
  })
  const accessToken = await jwt.sign({
    id: user.id,
    email,
    role
  }, JWT_SECRET);
  const payload = {
    email,
    id: user.id,
    token: accessToken,
    role: user.role
  }
  return res.status(200).json(payload);
}

export const getUser: RequestHandler = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
}