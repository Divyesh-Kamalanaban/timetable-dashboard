import axios from "axios";

const postStaff = async (staffData, isLoading) => {
  try {
    const response = await axios.post("/api/staffs", staffData);
    isLoading(false);
    return response.data; // Return the saved staff data
  } catch (err) {
    console.error("Error posting staff data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const postTimeslot = async (timeslotData, isLoading) => {
  try {
    const response = await axios.post("/api/timeslots", timeslotData);
    isLoading(false);
    return response.data; // Return the saved timeslot data
  } catch (err) {
    console.error("Error posting timeslot data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const postYear1 = async (year1Data, isLoading) => {
  try {
    const response = await axios.post("/api/year1", year1Data);
    isLoading(false);
    return response.data; // Return the saved year1 data
  } catch (err) {
    console.error("Error posting year1 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const postYear2 = async (year2Data, isLoading) => {
  try {
    const response = await axios.post("/api/year2", year2Data);
    isLoading(false);
    return response.data; // Return the saved year2 data
  } catch (err) {
    console.error("Error posting year2 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const postYear3 = async (year3Data, isLoading) => {
  try {
    const response = await axios.post("/api/year3", year3Data);
    isLoading(false);
    return response.data; // Return the saved year3 data
  } catch (err) {
    console.error("Error posting year3 data:", err);
    isLoading(true);
    throw err; // Re-throw the error for further handling if needed
  }
}

const postSubjects = async (subjectsData, isLoading) =>{
  try{
    const response = await axios.post('/api/subjects', subjectsData);
    isLoading(false);
    return response.data;
  }
  catch(err){
    console.error("Error posting subjects data:", err);
    isLoading(true);
    throw err;
  }
}

export { postStaff, postTimeslot, postYear1, postYear2, postYear3, postSubjects };