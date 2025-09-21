import { Response } from 'express';
import { prisma } from '../utils/db';
import { AuthRequest } from '../types';

export const startQuiz = async (_req: AuthRequest, res: Response) => {
  try {
    const questions = await prisma.question.findMany();
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to start quiz', error });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { answers, timeElapsed } = req.body;
    const questionIds = answers.map((a: any) => a.questionId);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
    });

    let correctAnswers = 0;
    const detailedAnswers = questions.map(q => {
      const userAnswer = answers.find((a: any) => a.questionId === q.id);
      const isCorrect = userAnswer.selectedAnswer === q.correctAnswer;
      if (isCorrect) correctAnswers++;
      return {
        questionId: q.id,
        selectedAnswer: userAnswer.selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    await prisma.quiz.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit quiz', error });
  }
};
