import { Request } from "express";

export const getAuthTokenFromHeaders = (request: Request) => {
  const { headers: { authorization } } = request;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

export function excludeFromUser<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key]
  }
  return user
}
