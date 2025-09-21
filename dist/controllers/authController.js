"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../utils/db");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
// helper function to generate token
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};
// ---------------- REGISTER ----------------
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = await db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = await db_1.prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        const token = generateToken(user.id);
        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    }
    catch (error) {
        console.error("❌ Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.register = register;
// ---------------- LOGIN ----------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // Find user
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Compare password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user.id);
        return res.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    }
    catch (error) {
        console.error("❌ Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
// ---------------- GET CURRENT USER ----------------
const getMe = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await db_1.prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, createdAt: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    }
    catch (error) {
        console.error("❌ getMe error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=authController.js.map