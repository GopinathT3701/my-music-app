const examModel = require("../models/examModel");
const questionModel = require("../models/questionModel");

async function getExams(req, res) {
  try {
    const exams = await examModel.getAllExams();
    return res.json(exams);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch exams", error: error.message });
  }
}

async function getExamById(req, res) {
  try {
    const examId = Number(req.params.id);
    const exam = await examModel.getExamById(examId);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questions = await questionModel.getQuestionsByExamId(examId);

    const sanitizedQuestions = questions.map(({ correct_option, ...question }) => question);
    return res.json({ ...exam, questions: sanitizedQuestions });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch exam", error: error.message });
  }
}

async function createExam(req, res) {
  try {
    const { title, category, duration_minutes, total_marks } = req.body;

    if (!title || !category || !duration_minutes || !total_marks) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exam = await examModel.createExam({
      title,
      category,
      duration_minutes,
      total_marks,
    });

    return res.status(201).json(exam);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create exam", error: error.message });
  }
}

module.exports = {
  getExams,
  getExamById,
  createExam,
};
