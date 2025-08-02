import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

export const generateToken = (userId: number): string => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET has not been defined");
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET has not been defined");
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
