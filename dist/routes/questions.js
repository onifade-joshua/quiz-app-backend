"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionController_1 = require("../controllers/questionController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.verifyUser);
router.post('/', questionController_1.createQuestion);
router.get('/', questionController_1.getQuestions);
exports.default = router;
//# sourceMappingURL=questions.js.map