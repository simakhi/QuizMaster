const router = require('express').Router();
const User = require('../models/User');
const Result = require('../models/Result');
const { auth, admin } = require('../middleware/auth');

// Get User Profile & History
router.get('/profile', auth, async (req, res) => {
  try {
    const history = await Result.find({ user: req.user._id }).populate('quiz', 'title category');
    res.json({ user: req.user, history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Password
router.put('/update-password', auth, async (req, res) => {
  try {
    const { password } = req.body;
    req.user.password = password;
    await req.user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit Quiz Result
router.post('/submit-quiz', auth, async (req, res) => {
  try {
    const { quizId, score, totalPoints, numCorrectAnswers, totalQuestions } = req.body;
    const result = new Result({
      user: req.user._id,
      quiz: quizId,
      score,
      totalPoints,
      numCorrectAnswers,
      totalQuestions
    });
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get All Users
router.get('/all', auth, admin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Edit User
router.put('/edit/:id', auth, admin, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, phone }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
