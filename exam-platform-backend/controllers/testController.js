const examModel = require("../models/examModel");
const questionModel = require("../models/questionModel");
const resultModel = require("../models/resultModel");
const userModel = require("../models/userModel");

async function submitTest(req, res) {
  try {
    const { examId, answers } = req.body;
    const userId = req.user.id;

    if (!examId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "examId and answers are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.subscription_active) {
      const todaysAttempts = await resultModel.countTodaysAttemptsByUserId(userId);
      if (todaysAttempts >= 2) {
        return res.status(403).json({
          message: "Free users can submit only 2 tests per day. Upgrade to premium for unlimited tests.",
        });
      }
    }

    const exam = await examModel.getExamById(Number(examId));
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questions = await questionModel.getQuestionsByExamId(Number(examId));
    const answerMap = new Map(answers.map((answer) => [Number(answer.questionId), answer.selectedOption]));

    let score = 0;

    questions.forEach((question) => {
      const selectedOption = answerMap.get(question.id);
      if (selectedOption && selectedOption.toUpperCase() === question.correct_option.toUpperCase()) {
        score += 1;
      }
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions === 0 ? 0 : Number(((score / totalQuestions) * 100).toFixed(2));

    const savedResult = await resultModel.createResult({
      user_id: userId,
      exam_id: Number(examId),
      score,
      percentage,
    });

    return res.status(201).json({
      resultId: savedResult.id,
      examId: Number(examId),
      score,
      totalQuestions,
      percentage,
      passed: percentage >= 35,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to submit test", error: error.message });
  }
}

async function getUserResults(req, res) {
  try {
    const userId = Number(req.params.userId);

    if (req.user.id !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const results = await resultModel.getResultsByUserId(userId);
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch results", error: error.message });
  }
}

module.exports = {
  submitTest,
  getUserResults,
};
