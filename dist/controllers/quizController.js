"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuiz = exports.startQuiz = void 0;
const db_1 = require("../utils/db");
const startQuiz = async (_req, res) => {
    try {
        const questions = await db_1.prisma.question.findMany();
        const formatted = questions.map(q => ({
            id: q.id,
            question: q.text,
            option1: JSON.parse(q.options)[0],
            option2: JSON.parse(q.options)[1],
            option3: JSON.parse(q.options)[2],
            option4: JSON.parse(q.options)[3],
            correctAnswer: q.correctAnswer,
        }));
        res.json(formatted);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to start quiz', error });
    }
};
exports.startQuiz = startQuiz;
const submitQuiz = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { answers, timeElapsed } = req.body;
        const questionIds = answers.map((a) => a.questionId);
        const questions = await db_1.prisma.question.findMany({
            where: { id: { in: questionIds } },
        });
        let correctAnswers = 0;
        const detailedAnswers = questions.map(q => {
            const userAnswer = answers.find((a) => a.questionId === q.id);
            const isCorrect = userAnswer.selectedAnswer === q.correctAnswer;
            if (isCorrect)
                correctAnswers++;
            return {
                questionId: q.id,
                selectedAnswer: userAnswer.selectedAnswer,
                correctAnswer: q.correctAnswer,
                isCorrect,
            };
        });
        await db_1.prisma.quiz.create({
            data: {
                score: correctAnswers,
                userId,
            },
        });
        res.json({
            correctAnswers,
            totalQuestions: questions.length,
            percentage: (correctAnswers / questions.length) * 100,
            timeElapsed,
            answers: detailedAnswers,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit quiz', error });
    }
};
exports.submitQuiz = submitQuiz;
//# sourceMappingURL=quizController.js.map