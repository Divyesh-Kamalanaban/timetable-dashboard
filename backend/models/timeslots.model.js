/* eslint-disable no-undef */
const mongoose = require('mongoose');

// Define the timeslots schema
const timeslotsSchema = new mongoose.Schema({
    period: {
        type: Number,
    },
    starthour: {
        type: Number,
    },
    startminute: {
        type: Number,
    },
    endhour: {
        type: Number,
    },
    endminute: {
        type: Number,
    },
});

// Create the model
const timeslots = mongoose.model('timeslots', timeslotsSchema);

// Export the model for use in other parts of your application
module.exports = timeslots;