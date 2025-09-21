import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors"; 

import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";
import questionRoutes from "./routes/questions";
import quizRoutes from "./routes/quiz";

dotenv.config();
const app = express();

//  Security & logging middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//  CORS config using FRONTEND_URL from .env
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

//  API routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quiz", quizRoutes);

//  Error handler (last middleware)
app.use(errorHandler);

export default app;
