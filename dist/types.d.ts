import { Request } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}
//# sourceMappingURL=types.d.ts.map