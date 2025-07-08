const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Private
router.get('/', protect, (req, res) => {
  res.json([
    { id: 1, name: 'Food', type: 'expense' },
    { id: 2, name: 'Transportation', type: 'expense' },
    { id: 3, name: 'Salary', type: 'income' }
  ]);
});

module.exports = router; 