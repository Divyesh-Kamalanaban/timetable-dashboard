/* eslint-disable no-unused-vars */
 import axios from "axios";
 
 export const fetchData = async (setYear1, setYear2, setYear3, settimeslots, isLoading)=>{
    try {
        //promise all is a function that accepts and returns an array. accepts an array of requests and returns a single promise which is array destructured
        const [year1Response, year2Response, year3Response, timeslotsResponse] = await Promise.all(
          [
            axios.get("/api/year1"),
            axios.get("/api/year2"),
            axios.get("/api/year3"),
            axios.get("/api/timeslots")
          ]
        );

        //using usestate hooks to set the state variables value to response data value.
        setYear1(year1Response.data);
        setYear2(year2Response.data);
        setYear3(year3Response.data);
        settimeslots(timeslotsResponse.data);
        isLoading(false);
      } 
      
      //Default error handling
      catch (err) {
        console.error("Error fetching data:", err);
        isLoading(true);
      }
}