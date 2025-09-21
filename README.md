Quiz App Backend

This is the backend for the Quiz Application, built using Node.js, Express, TypeScript, and Prisma. It handles user authentication, question management, quiz sessions, and scoring.

🚀 Features

User authentication (JWT-based)

Create, read, and manage quiz questions

Start a quiz and submit answers

Track quiz scores per user

Type-safe backend with TypeScript

Database interactions via Prisma ORM

📦 Tech Stack

Node.js – JavaScript runtime

Express – Web framework

TypeScript – Static typing for safer code

Prisma – ORM for database queries

SQLite / PostgreSQL – Database (adjustable)

jsonwebtoken – JWT authentication

bcryptjs – Password hashing

⚙️ Installation

Clone the repo

git clone https://github.com/onifade-joshua/quiz-app-backend.git
cd quiz-app-backend


Install dependencies

npm install


Configure environment variables

Create a .env file in the root:

DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_super_secret_key"
PORT=5000


Run database migrations

npx prisma migrate dev --name init


Start the server (dev mode)

npm run dev


Build the project

npm run build


Run the compiled project

node dist/index.js

📝 API Endpoints
Auth

POST /auth/register – Register a new user

POST /auth/login – Login and get JWT token

Questions

POST /questions – Create a question (Protected)

GET /questions – Get all questions

Quiz

GET /quiz/start – Get all questions for a quiz

POST /quiz/submit – Submit answers and get score

🛡 Middleware

verifyUser – Protects routes, verifies JWT, attaches user info to request

💡 Notes

This backend is TypeScript-based. Make sure to build the project (npm run build) before deploying.

Prisma ORM is used for database management; change DATABASE_URL for different databases.

JWT authentication is required for quiz and question routes.

📂 Project Structure
quiz-app-backend/
├─ src/
│  ├─ controllers/   # API controllers
│  ├─ middleware/    # Authentication & validation middleware
│  ├─ routes/        # Express routes
│  ├─ utils/         # Helpers & DB connection (Prisma)
│  └─ index.ts       # App entry point
├─ prisma/
│  ├─ schema.prisma  # Prisma schema
│  └─ seed.ts        # Initial seed data
├─ tsconfig.json     # TypeScript config
├─ package.json
└─ .env.example      # Example env file

📬 Contact

Created by [Your Name] – feel free to reach out at onifadejoshua15.com
