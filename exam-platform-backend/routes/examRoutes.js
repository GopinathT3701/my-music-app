const express = require("express");
const examController = require("../controllers/examController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", authMiddleware, examController.getExams);
router.get("/:id", authMiddleware, examController.getExamById);
router.post("/", authMiddleware, roleMiddleware("ADMIN"), examController.createExam);

module.exports = router;
