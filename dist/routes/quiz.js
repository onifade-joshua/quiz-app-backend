"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizController_1 = require("../controllers/quizController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/start', auth_1.verifyUser, quizController_1.startQuiz);
router.post('/submit', auth_1.verifyUser, quizController_1.submitQuiz);
exports.default = router;
//# sourceMappingURL=quiz.js.map