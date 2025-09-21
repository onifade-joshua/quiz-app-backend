import cors from "cors";

export const corsOptions = {
  origin: "https://quiz-app-assessment.netlify.app", 
  credentials: true,
};

export const corsMiddleware = cors(corsOptions); 
