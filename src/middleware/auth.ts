import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.user = { id: decoded.id }; // only store id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
