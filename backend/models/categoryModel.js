const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please specify category type'],
      enum: ['income', 'expense'],
    },
    color: {
      type: String,
      required: [true, 'Please specify a color'],
      default: '#000000',
    },
    icon: {
      type: String,
      default: 'default-icon',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add compound index for user and name to ensure unique categories per user
categorySchema.index({ user: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 