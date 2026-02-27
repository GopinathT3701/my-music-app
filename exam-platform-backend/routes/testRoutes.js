const express = require("express");
const testController = require("../controllers/testController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", authMiddleware, testController.submitTest);
router.get("/results/:userId", authMiddleware, testController.getUserResults);

module.exports = router;
