import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const createQuestion: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getQuestions: (_req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=questionController.d.ts.map