const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', protect, (req, res) => {
  res.json([]);
});

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', protect, (req, res) => {
  const { amount, type, category, description, date } = req.body;
  res.status(201).json({
    _id: 'temp_id',
    amount,
    type,
    category,
    description,
    date,
    user: req.user._id
  });
});

module.exports = router; 