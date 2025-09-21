import cors from "cors";

export const corsOptions = {
  origin: "https://localhost:5173", // Replace with your frontend URL
  credentials: true,
};

export const corsMiddleware = cors(corsOptions); 
