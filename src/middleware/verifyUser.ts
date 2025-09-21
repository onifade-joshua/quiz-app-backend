import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { id: decoded.id as string };
    next();
  } catch (error) {
    console.error("❌ verifyUser error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
