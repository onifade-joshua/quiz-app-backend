"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Invalid token" });
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        console.error("❌ verifyUser error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=verifyUser.js.map