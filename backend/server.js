/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Importing year1, year2, year3 models (contains schema structure)
const year1 = require('./models/year1.model'); // lowercase 'year1'
const year2 = require('./models/year2.model'); // lowercase 'year2'
const year3 = require('./models/year3.model'); // lowercase 'year3'
const timeslots = require('./models/timeslots.model'); 
const staffs = require('./models/staffs.model'); // lowercase 'staffs'


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Your API routes will go here
app.get('/api/year1', async (req, res) => {
  try {
    const year1Data = await year1.find(); // lowercase 'year1'
    res.json(year1Data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//year2
app.get('/api/year2', async (req, res) => {
  try {
    const year2Data = await year2.find(); 
    res.json(year2Data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//year3
app.get('/api/year3', async (req, res) => {
  try {
    const year3Data = await year3.find(); 
    res.json(year3Data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//timeslots
app.get('/api/timeslots', async (req, res)=>{
  try{
    const timeslotsData =  await timeslots.find();
    res.json(timeslotsData);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//staffs
app.get('/api/staffs', async (req, res)=>{
  try{
    const staffsData=  await staffs.find();
    res.json(staffsData);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//staffs POST
app.post('/api/staffs', async (req, res) => {
  const newStaff = new staffs(req.body);
  try {
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//year1 POST
app.post('/api/year1', async (req, res) => {
  const newYear1 = new year1(req.body);
  try {
    const savedYear1 = await newYear1.save();
    res.status(201).json(savedYear1);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});