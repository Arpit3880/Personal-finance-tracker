const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/goals
// @desc    Get all financial goals
// @access  Private
router.get('/', protect, (req, res) => {
  res.json([]);
});

// @route   POST /api/goals
// @desc    Create a new financial goal
// @access  Private
router.post('/', protect, (req, res) => {
  const { name, targetAmount, deadline } = req.body;
  res.status(201).json({
    _id: 'temp_id',
    name,
    targetAmount,
    deadline,
    currentAmount: 0,
    user: req.user._id
  });
});

module.exports = router; 