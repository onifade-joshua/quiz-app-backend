import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const questionSchema: z.ZodObject<{
    question: z.ZodString;
    option1: z.ZodString;
    option2: z.ZodString;
    option3: z.ZodString;
    option4: z.ZodString;
    correctAnswer: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: number;
}, {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: number;
}>;
export declare const quizSubmissionSchema: z.ZodObject<{
    answers: z.ZodArray<z.ZodObject<{
        questionId: z.ZodString;
        selectedAnswer: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        questionId: string;
        selectedAnswer: number;
    }, {
        questionId: string;
        selectedAnswer: number;
    }>, "many">;
    timeElapsed: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    answers: {
        questionId: string;
        selectedAnswer: number;
    }[];
    timeElapsed: number;
}, {
    answers: {
        questionId: string;
        selectedAnswer: number;
    }[];
    timeElapsed: number;
}>;
export declare const validateSchema: (schema: z.ZodSchema) => (req: any, res: any, next: any) => any;
//# sourceMappingURL=validation.d.ts.map