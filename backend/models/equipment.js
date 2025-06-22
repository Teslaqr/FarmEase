const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter equipment name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter equipment description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter equipment price per day'],
  },
  type: {
    type: String,
    required: [true, 'Please select equipment type'],
    enum: ['Tractor', 'Harvester', 'Cultivator', 'Irrigation', 'Other'],
  },
  location: {
    type: String,
    required: [true, 'Please enter equipment location'],
  },
  availability: {
    type: String,
    enum: ['Available', 'Unavailable', 'Rented'],
    default: 'Available',
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Equipment', equipmentSchema);