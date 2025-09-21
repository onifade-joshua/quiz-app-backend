import { Request, Response, NextFunction } from "express";

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
};

// Generic error handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
