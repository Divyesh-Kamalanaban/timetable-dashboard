// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  sem1: {
    type: [String],
    required: true
  },
  sem2: {
    type: [String],
    required: true
  }
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('subjects', subjectSchema);
