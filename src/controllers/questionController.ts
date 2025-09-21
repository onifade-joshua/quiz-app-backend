import { Response } from 'express';
import { prisma } from '../utils/db';
import { AuthRequest } from '../types';

export const createQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { question, option1, option2, option3, option4, correctAnswer } = req.body;
    const options = [option1, option2, option3, option4];

    if (options.some(o => !o?.trim()) || options.length < 2) {
      return res.status(400).json({ message: 'Options must be valid and at least 2' });
    }

    const newQuestion = await prisma.question.create({
      data: {
        text: question,
        options: JSON.stringify(options),
        correctAnswer,
        userId
      },
    });

    res.status(201).json({
      id: newQuestion.id,
      question: newQuestion.text,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      correctAnswer: newQuestion.correctAnswer,
      createdAt: newQuestion.createdAt,
      updatedAt: newQuestion.updatedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create question', error });
  }
};

export const getQuestions = async (_req: AuthRequest, res: Response) => {
  try {
    const questions = await prisma.question.findMany();

    const formatted = questions.map(q => {
      const opts = JSON.parse(q.options);
      return {
        id: q.id,
        question: q.text,
        option1: opts[0],
        option2: opts[1],
        option3: opts[2],
        option4: opts[3],
        correctAnswer: q.correctAnswer,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch questions', error });
  }
};
