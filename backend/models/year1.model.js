/* eslint-disable no-undef */
const mongoose = require('mongoose');

const year1Schema = new mongoose.Schema({
  class: String,
  timetable: [{
    day: String,
    period1: String,
    period2: String,
    period3: String,
    period4: String,
    period5: String,
    period6: String,
    period7: String,
    period8: String,
  }],
  staffs: {
    type: Map,
    of: String, // Assuming staff names are strings
  },
  staffSubjectLinks: [{
    subject: {
      type: String,
      required: true
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    class: {
      type: String,
      required: true
    }
  }],
});

const Year1 = mongoose.model('Year1', year1Schema);

module.exports = Year1;