const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        description: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const dateFilter = {};
  if (req.query.startDate) {
    dateFilter.date = { $gte: new Date(req.query.startDate) };
  }
  if (req.query.endDate) {
    dateFilter.date = { ...dateFilter.date, $lte: new Date(req.query.endDate) };
  }

  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  const typeFilter = req.query.type ? { type: req.query.type } : {};

  const count = await Transaction.countDocuments({
    user: req.user._id,
    ...keyword,
    ...dateFilter,
    ...categoryFilter,
    ...typeFilter,
  });

  const transactions = await Transaction.find({
    user: req.user._id,
    ...keyword,
    ...dateFilter,
    ...categoryFilter,
    ...typeFilter,
  })
    .sort({ date: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    transactions,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = asyncHandler(async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  if (!type || !amount || !category || !description) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    category,
    description,
    date: date || Date.now(),
  });

  res.status(201).json(transaction);
});

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Make sure user owns transaction
  if (transaction.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.json(updatedTransaction);
});

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Make sure user owns transaction
  if (transaction.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await transaction.remove();

  res.json({ message: 'Transaction removed' });
});

// @desc    Get transaction statistics
// @route   GET /api/transactions/stats
// @access  Private
const getTransactionStats = asyncHandler(async (req, res) => {
  const stats = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  const monthlyStats = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        date: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          type: '$type',
        },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
  ]);

  const categoryStats = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        date: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    },
    {
      $group: {
        _id: {
          category: '$category',
          type: '$type',
        },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    overall: stats,
    monthly: monthlyStats,
    categories: categoryStats,
  });
});

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
}; 