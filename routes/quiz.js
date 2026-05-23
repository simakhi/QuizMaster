const router = require('express').Router();
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const { auth, admin } = require('../middleware/auth');

// Quiz CRUD (Admin Only)
router.post('/create', auth, admin, async (req, res) => {
  try {
    const { title, category, numQuestions, pointPerQuestion, questions } = req.body;
    const quiz = new Quiz({ title, category, numQuestions, pointPerQuestion, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update/:id', auth, admin, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', auth, admin, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User & Admin: Get All Quizzes or Single Quiz
router.get('/all', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Stats
router.get('/stats/summary', auth, admin, async (req, res) => {
  try {
    const totalQuizzes = await Quiz.countDocuments();
    const User = require('../models/User');
    const totalUsers = await User.countDocuments({ role: 'user' });
    res.json({ totalQuizzes, totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
