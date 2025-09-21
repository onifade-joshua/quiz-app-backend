# Quiz App Backend

A backend API for a quiz application built with **Node.js**, **TypeScript**, **Express**, and **Prisma**. This backend handles user authentication, quiz management, question creation, and score tracking.

---

## Features

- User authentication with JWT  
- Create, read, and manage quiz questions  
- Start a quiz and submit answers  
- Automatically calculate scores and percentages  
- Tracks quiz results per user  
- TypeScript for type safety  
- Prisma ORM with SQLite/PostgreSQL for database operations  

---

## Tech Stack

**Node.js** | **TypeScript** | **Express.js** | **Prisma** | **SQLite/PostgreSQL** | **jsonwebtoken**  

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/your-username/quiz-app-backend.git
cd quiz-app-backend

npm install

Create a .env file in the root directory:
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000

Run database migrations (if using Prisma):
npx prisma migrate dev --name init

(Optional) Seed your database:
npx prisma db seed

Scripts
Command	Description
npm run dev	Start server in development mode (nodemon)
npm run build	Compile TypeScript into JavaScript
npm start	Run compiled server from dist/
npm test	Run tests (if applicable)
API Endpoints
Auth

POST /auth/login - Login a user

POST /auth/register - Register a new user

Questions

POST /questions - Create a new question (protected)

GET /questions - Get all questions

Quiz

GET /quiz/start - Start a new quiz

POST /quiz/submit - Submit quiz answers and get results

Note: Protected routes require a valid JWT token in the Authorization header.

Project Structure
quiz-app-backend/
├─ src/
│  ├─ controllers/       # Route handlers
│  ├─ middleware/        # JWT verification & error handling
│  ├─ routes/            # Express routes
│  ├─ utils/             # Prisma client & helpers
│  └─ index.ts           # Entry point
├─ prisma/               # Prisma schema & seeds
├─ dist/                 # Compiled JS files (after build)
├─ tsconfig.json
├─ package.json
└─ .env                  # Environment variables

Start development server:
npm run dev

Build for production:
npm run build
npm start

Author

Onifade Joshua
