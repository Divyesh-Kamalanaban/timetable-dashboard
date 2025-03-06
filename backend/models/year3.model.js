/* eslint-disable no-undef */
const mongoose = require('mongoose');

const year3Schema = new mongoose.Schema({
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
});

const Year1 = mongoose.model('Year3', year3Schema);

module.exports = Year1;