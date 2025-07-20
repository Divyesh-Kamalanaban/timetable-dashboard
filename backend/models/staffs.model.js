// models/Staff.js
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Teacher', 'Admin', 'Staff']
  },
  designation: {
    type: String,
    required: false,
    trim: true
  },
  assigned_classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }]
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.model('staffs', StaffSchema);
