const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/budgets
// @desc    Get all budgets
// @access  Private
router.get('/', protect, (req, res) => {
  res.json([]);
});

// @route   POST /api/budgets
// @desc    Create a new budget
// @access  Private
router.post('/', protect, (req, res) => {
  const { category, amount, period } = req.body;
  res.status(201).json({
    _id: 'temp_id',
    category,
    amount,
    period,
    user: req.user._id
  });
});

module.exports = router; 