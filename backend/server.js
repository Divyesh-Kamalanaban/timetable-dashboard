/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Importing year1, year2, year3 models (contains schema structure)
const year1 = require('./models/year1.model'); 
const year2 = require('./models/year2.model'); 
const year3 = require('./models/year3.model'); 
const timeslots = require('./models/timeslots.model'); 
const staffs = require('./models/staffs.model'); 
const subjects = require('./models/subjects.model')


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
// Link a staff to a subject for a class (year1)
app.post('/api/year1/link-staff-subject', async (req, res) => {
  try {
    const { className, subject, staffId } = req.body;
    const year1Class = await year1.findOne({ class: className });
    if (!year1Class) return res.status(404).json({ message: 'Class not found' });
    year1Class.staffSubjectLinks.push({ subject, staffId, class: className });
    await year1Class.save();
    res.json({ message: 'Staff linked to subject successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all staff-subject links for a class (year1)
app.get('/api/year1/staff-subject-links/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const year1Class = await year1.findOne({ class: className });
    if (!year1Class) return res.status(404).json({ message: 'Class not found' });
    res.json(year1Class.staffSubjectLinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlink a staff from a subject for a class (year1)
app.delete('/api/year1/unlink-staff-subject', async (req, res) => {
  try {
    const { className, subject, staffId } = req.body;
    const year1Class = await year1.findOne({ class: className });
    if (!year1Class) return res.status(404).json({ message: 'Class not found' });
    year1Class.staffSubjectLinks = year1Class.staffSubjectLinks.filter(link => !(link.subject === subject && link.staffId.toString() === staffId && link.class === className));
    await year1Class.save();
    res.json({ message: 'Staff unlinked from subject successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
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

// Link a staff to a subject for a class (year2)
app.post('/api/year2/link-staff-subject', async (req, res) => {
  try {
    const { className, subject, staffId } = req.body;
    const year2Class = await year2.findOne({ class: className });
    if (!year2Class) return res.status(404).json({ message: 'Class not found' });
    year2Class.staffSubjectLinks.push({ subject, staffId, class: className });
    await year2Class.save();
    res.json({ message: 'Staff linked to subject successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all staff-subject links for a class (year2)
app.get('/api/year2/staff-subject-links/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const year2Class = await year2.findOne({ class: className });
    if (!year2Class) return res.status(404).json({ message: 'Class not found' });
    res.json(year2Class.staffSubjectLinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlink a staff from a subject for a class (year2)
app.delete('/api/year2/unlink-staff-subject', async (req, res) => {
  try {
    const { className, subject, staffId } = req.body;
    const year2Class = await year2.findOne({ class: className });
    if (!year2Class) return res.status(404).json({ message: 'Class not found' });
    year2Class.staffSubjectLinks = year2Class.staffSubjectLinks.filter(link => !(link.subject === subject && link.staffId.toString() === staffId && link.class === className));
    await year2Class.save();
    res.json({ message: 'Staff unlinked from subject successfully' });
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

// Link a staff to a subject for a class (year3)
app.post('/api/year3/link-staff-subject', async (req, res) => {
  try {
    const { className, subject, staffId } = req.body;
    const year3Class = await year3.findOne({ class: className });
    if (!year3Class) return res.status(404).json({ message: 'Class not found' });
    year3Class.staffSubjectLinks.push({ subject, staffId, class: className });
    await year3Class.save();
    res.json({ message: 'Staff linked to subject successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all staff-subject links for a class (year3)
app.get('/api/year3/staff-subject-links/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const year3Class = await year3.findOne({ class: className });
    if (!year3Class) return res.status(404).json({ message: 'Class not found' });
    res.json(year3Class.staffSubjectLinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlink a staff from a subject for a class (year3)
app.delete('/api/year3/unlink-staff-subject', async (req, res) => {
  try {
    const { className, subject, staffId } = req.body;
    const year3Class = await year3.findOne({ class: className });
    if (!year3Class) return res.status(404).json({ message: 'Class not found' });
    year3Class.staffSubjectLinks = year3Class.staffSubjectLinks.filter(link => !(link.subject === subject && link.staffId.toString() === staffId && link.class === className));
    await year3Class.save();
    res.json({ message: 'Staff unlinked from subject successfully' });
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

//subjects
app.get('/api/subjects', async (req, res)=>{
  try{
    const subjectsData = await subjects.find();
    res.json(subjectsData)
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
})
//POST routes for year1, year2, year3, timeslots, and staffs.

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

//year2 POST
app.post('/api/year2', async (req, res) => {
  const newYear2 = new year2(req.body);
  try {
    const savedYear2 = await newYear2.save();
    res.status(201).json(savedYear2);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//year3 POST
app.post('/api/year3', async (req, res) => {
  const newYear3 = new year3(req.body);
  try {
    const savedYear3 = await newYear3.save();
    res.status(201).json(savedYear3);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//timeslots POST
app.post('/api/timeslots', async (req, res) => {
  const newTimeslot = new timeslots(req.body);
  try {
    const savedTimeslot = await newTimeslot.save();
    res.status(201).json(savedTimeslot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//subjects POST
app.post('/api/subjects', async (req, res)=>{
  try{
    const subjectsData = new subjects(req.body)
    res.status(201).json(subjectsData)
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})

//PUT routes for year1, year2, year3, timeslots, and staffs.
//Note PUT and DELETE routes have :id in the URL as static right now, but in frontend you will dynamically replace with actual IDs.
//year1 PUT
app.put('/api/year1/:id', async (req, res) => {
  try {
    const updatedYear1 = await year1.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedYear1); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  } 
});

//year2 PUT
app.put('/api/year2/:id', async (req, res) => {
  try {
    const updatedYear2 = await year2.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedYear2);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//year3 PUT
app.put('/api/year3/:id', async (req, res) => {
  try {
    const updatedYear3 = await year3.findByIdAndUpdate(req.params .id, req.body, { new: true });
    res.json(updatedYear3); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//timeslots PUT
app.put('/api/timeslots/:id', async (req, res) => {
  try {
    const updatedTimeslot = await timeslots.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTimeslot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//staffs PUT
app.put('/api/staffs/:id', async (req, res) => {
  try {
    const updatedStaff = await staffs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//subjects PUT
app.put('/api/subjects:id', async (req, res)=>{
  try{
    const subjectsData = await subjects.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(subjectsData)
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})

//DELETE routes for year1, year2, year3, timeslots, and staffs.

//year1 DELETE
app.delete('/api/year1/:id', async (req, res) => {
  try {
    await year1.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//year2 DELETE
app.delete('/api/year2/:id', async (req, res) => {
  try {
    await year2.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//year3 DELETE
app.delete('/api/year3/:id', async (req, res) => {
  try {
    await year3.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//timeslots DELETE
app.delete('/api/timeslots/:id', async (req, res) => {
  try {
    await timeslots.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//staffs DELETE
app.delete('/api/staffs/:id', async (req, res) => {
  try {
    await staffs.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//subjects DELETE
app.delete('/api/subjects/:id', async (req, res)=>{
  try{
    subjects.findByIdAndDelete(req.params.id)
    res.status(204).send(); // No content
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})


//PORT DEFINITION
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});