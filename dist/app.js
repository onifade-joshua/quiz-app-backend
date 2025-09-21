"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const auth_1 = __importDefault(require("./routes/auth"));
const questions_1 = __importDefault(require("./routes/questions"));
const quiz_1 = __importDefault(require("./routes/quiz"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//  Security & logging middleware
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//  CORS config using FRONTEND_URL from .env
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "https://quiz-app-assessment.netlify.app",
    credentials: true,
}));
//  API routes
app.use("/api/auth", auth_1.default);
app.use("/api/questions", questions_1.default);
app.use("/api/quiz", quiz_1.default);
//  Error handler (last middleware)
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map