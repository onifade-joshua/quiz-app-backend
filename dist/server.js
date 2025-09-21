"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = require("./middleware/cors");
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = require("./utils/db");
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
const questions_1 = __importDefault(require("./routes/questions"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
// CORS
app.use(cors_1.corsMiddleware);
// Logging
app.use((0, morgan_1.default)(process.env.NODE_ENV === "production" ? "combined" : "dev"));
// Body parser
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || "development",
    });
});
// API routes
app.use("/api/auth", auth_1.default);
app.use("/api/questions", questions_1.default);
app.use("/api/quiz", quiz_1.default);
// Root
app.get("/api", (req, res) => {
    res.json({
        message: "Quiz App API is running! 🚀",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            questions: "/api/questions",
            quiz: "/api/quiz",
            health: "/health",
        },
    });
});
// Error handling
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Graceful shutdown
const gracefulShutdown = async (signal) => {
    console.log(`\n🔄 Received ${signal}. Shutting down...`);
    try {
        await db_1.prisma.$disconnect();
        console.log("🔌 Database disconnected.");
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Shutdown error:", err);
        process.exit(1);
    }
};
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
// Start server
const startServer = async () => {
    try {
        await db_1.prisma.$connect();
        console.log("📊 Database connected.");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Env: ${process.env.NODE_ENV || "development"}`);
            console.log(`📝 API Docs: http://localhost:${PORT}/api`);
            console.log(`🏥 Health: http://localhost:${PORT}/health`);
        });
    }
    catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map