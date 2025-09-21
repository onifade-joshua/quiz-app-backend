import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long')
    .refine(
      (password) => /[a-zA-Z]/.test(password) && /\d/.test(password),
      'Password must contain at least one letter and one number'
    )
})

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
})

export const questionSchema = z.object({
  question: z
    .string()
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question is too long')
    .trim(),
  option1: z
    .string()
    .min(1, 'Option 1 is required')
    .max(200, 'Option 1 is too long')
    .trim(),
  option2: z
    .string()
    .min(1, 'Option 2 is required')
    .max(200, 'Option 2 is too long')
    .trim(),
  option3: z
    .string()
    .min(1, 'Option 3 is required')
    .max(200, 'Option 3 is too long')
    .trim(),
  option4: z
    .string()
    .min(1, 'Option 4 is required')
    .max(200, 'Option 4 is too long')
    .trim(),
  correctAnswer: z
    .number()
    .int('Correct answer must be an integer')
    .min(1, 'Correct answer must be between 1 and 4')
    .max(4, 'Correct answer must be between 1 and 4')
})

export const quizSubmissionSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().cuid('Invalid question ID'),
      selectedAnswer: z
        .number()
        .int('Selected answer must be an integer')
        .min(1, 'Selected answer must be between 1 and 4')
        .max(4, 'Selected answer must be between 1 and 4')
    })
  ).min(1, 'At least one answer is required'),
  timeElapsed: z
    .number()
    .int('Time elapsed must be an integer')
    .min(0, 'Time elapsed cannot be negative')
    .max(7200, 'Quiz time cannot exceed 2 hours') // 2 hours max
})

// Validation middleware
export const validateSchema = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        })
      }
      next(error)
    }
  }
}