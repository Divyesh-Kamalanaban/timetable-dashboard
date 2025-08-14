import axios from "axios";

const deleteStaff = async (staffId, isLoading) => {
  try {
    const response = await axios.delete(`/api/staffs/${staffId}`);
    isLoading(false);
    return response.data; // Return the updated staff data
  } catch (err) {
    console.error("Error updating staff data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const deleteTimeslot = async (timeslotId, isLoading) => {
  try {
    const response = await axios.delete(`/api/timeslots/${timeslotId}`);
    isLoading(false);
    return response.data; // Return the updated timeslot data
  } catch (err) {
    console.error("Error updating timeslot data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const deleteYear1 = async (year1Id, isLoading) => {
  try {
    const response = await axios.delete(`/api/year1/${year1Id}`);
    isLoading(false);
    return response.data; // Return the updated year1 data
  } catch (err) {
    console.error("Error updating year1 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const deleteYear2 = async (year2Id, isLoading) => {
  try {
    const response = await axios.delete(`/api/year2/${year2Id}`);
    isLoading(false);
    return response.data; // Return the updated year2 data
  } catch (err) {
    console.error("Error updating year2 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const deleteYear3 = async (year3Id, isLoading) => {
  try {
    const response = await axios.delete(`/api/year3/${year3Id}`);
    isLoading(false);
    return response.data; // Return the updated year3 data
  } catch (err) {
    console.error("Error updating year3 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const deleteSubject = async (subjectId, isLoading) => {
  try {
    const response = await axios.delete(`/api/subjects/${subjectId}`);
    isLoading(false);
    return response.data; // Return the updated subject data
  } catch (err) {
    console.error("Error updating subject data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

export {
  deleteStaff, deleteSubject,
  deleteTimeslot, deleteYear1, deleteYear2, deleteYear3
}
