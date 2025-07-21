import axios from "axios";

const putStaff = async (staffId, staffData, isLoading) => {
  try {
    const response = await axios.put(`/api/staffs/${staffId}`, staffData);
    isLoading(false);
    return response.data; // Return the updated staff data
  } catch (err) {
    console.error("Error updating staff data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}
 const putTimeslot = async (timeslotId, timeslotData, isLoading) => {
  try {
    const response = await axios.put(`/api/timeslots/${timeslotId}`, timeslotData);
    isLoading(false);
    return response.data; // Return the updated timeslot data
  } catch (err) {
    console.error("Error updating timeslot data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const putYear1 = async (year1Id, year1Data, isLoading) => {
  try {
    const response = await axios.put(`/api/year1/${year1Id}`, year1Data);
    isLoading(false);
    return response.data; // Return the updated year1 data
  } catch (err) {
    console.error("Error updating year1 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const putYear2 = async (year2Id, year2Data, isLoading) => {
  try {
    const response = await axios.put(`/api/year2/${year2Id}`, year2Data);
    isLoading(false);
    return response.data; // Return the updated year2 data
  } catch (err) {
    console.error("Error updating year2 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const putYear3 = async (year3Id, year3Data, isLoading) => {
  try {
    const response = await axios.put(`/api/year3/${year3Id}`, year3Data);
    isLoading(false);
    return response.data; // Return the updated year3 data
  } catch (err) {
    console.error("Error updating year3 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

export {putStaff, putTimeslot, putYear1, putYear2, putYear3};