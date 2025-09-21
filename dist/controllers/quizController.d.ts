import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const startQuiz: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const submitQuiz: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=quizController.d.ts.map