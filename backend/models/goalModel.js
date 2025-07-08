const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a goal title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please specify target amount'],
      min: [0, 'Target amount cannot be negative'],
    },
    savedAmount: {
      type: Number,
      default: 0,
      min: [0, 'Saved amount cannot be negative'],
    },
    deadline: {
      type: Date,
      required: [true, 'Please specify a deadline'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    autoSave: {
      enabled: {
        type: Boolean,
        default: false,
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 10,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for progress percentage
goalSchema.virtual('progress').get(function () {
  return ((this.savedAmount / this.targetAmount) * 100).toFixed(2);
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal; 