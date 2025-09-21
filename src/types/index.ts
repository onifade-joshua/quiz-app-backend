export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correctAnswer: number
  userId: string
  createdAt: Date
  updatedAt: Date
}
export interface CreateQuestionData {
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correctAnswer: number | string // Accept string for easier parsing from req.body
}


export interface QuizAnswer {
  questionId: string
  selectedAnswer: number
}

export interface QuizResult {
  id: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeElapsed: number
  answers: QuizAnswer[]
  userId: string
  createdAt: Date
}

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
  }
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: string[]
}