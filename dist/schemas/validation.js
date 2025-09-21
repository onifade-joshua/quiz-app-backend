"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.quizSubmissionSchema = exports.questionSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .trim(),
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long')
        .refine((password) => /[a-zA-Z]/.test(password) && /\d/.test(password), 'Password must contain at least one letter and one number')
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string()
        .min(1, 'Password is required')
});
exports.questionSchema = zod_1.z.object({
    question: zod_1.z
        .string()
        .min(5, 'Question must be at least 5 characters')
        .max(500, 'Question is too long')
        .trim(),
    option1: zod_1.z
        .string()
        .min(1, 'Option 1 is required')
        .max(200, 'Option 1 is too long')
        .trim(),
    option2: zod_1.z
        .string()
        .min(1, 'Option 2 is required')
        .max(200, 'Option 2 is too long')
        .trim(),
    option3: zod_1.z
        .string()
        .min(1, 'Option 3 is required')
        .max(200, 'Option 3 is too long')
        .trim(),
    option4: zod_1.z
        .string()
        .min(1, 'Option 4 is required')
        .max(200, 'Option 4 is too long')
        .trim(),
    correctAnswer: zod_1.z
        .number()
        .int('Correct answer must be an integer')
        .min(1, 'Correct answer must be between 1 and 4')
        .max(4, 'Correct answer must be between 1 and 4')
});
exports.quizSubmissionSchema = zod_1.z.object({
    answers: zod_1.z.array(zod_1.z.object({
        questionId: zod_1.z.string().cuid('Invalid question ID'),
        selectedAnswer: zod_1.z
            .number()
            .int('Selected answer must be an integer')
            .min(1, 'Selected answer must be between 1 and 4')
            .max(4, 'Selected answer must be between 1 and 4')
    })).min(1, 'At least one answer is required'),
    timeElapsed: zod_1.z
        .number()
        .int('Time elapsed must be an integer')
        .min(0, 'Time elapsed cannot be negative')
        .max(7200, 'Quiz time cannot exceed 2 hours') // 2 hours max
});
// Validation middleware
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            next(error);
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validation.js.map