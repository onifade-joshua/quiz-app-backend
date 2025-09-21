import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
import { verifyUser } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyUser, getMe);

export default router;
