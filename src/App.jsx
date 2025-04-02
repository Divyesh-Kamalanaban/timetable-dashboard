/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

//importing axios for promises, hooks from react and css for styling.
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "./App.css";
import {higherOrderShowPeriod} from "./utils/showperiod";
import { fetchData } from "./utils/fetchdata";

// const timeslots = [
//   { period: 1, starthour: 8, startminute: 0, endhour: 8, endminute: 50 },
//   { period: 2, starthour: 8, startminute: 50, endhour: 9, endminute: 40 },
//   { period: 3, starthour: 9, startminute: 50, endhour: 10, endminute: 40 },
//   { period: 4, starthour: 10, startminute: 40, endhour: 11, endminute: 30 },
//   { period: 5, starthour: 12, startminute: 20, endhour: 13, endminute: 10 },
//   { period: 6, starthour: 13, startminute: 10, endhour: 14, endminute: 0 },
//   { period: 7, starthour: 14, startminute: 0, endhour: 14, endminute: 50 },
//   { period: 8, starthour: 14, startminute: 50, endhour: 15, endminute: 40 },
// ];

function NavBar() {
  return (
    <>
      <div className="w-screen flex items-center h-max justify-around p-2 bg-[#1E1E1E]">
        <div className="flex flex-row items-center justify-center">
          <ul className="flex flex-row items-center justify-center text-[1.5em] tracking-tight">
            <li className="flex bg-gradient-to-r from-[#FFDE59] to-[#FF914D] bg-clip-text text-transparent font-semibold m-2">
              Timetable
            </li>
            <li className="flex bg-gradient-to-r from-[#FFDE59] to-[#FF914D] bg-clip-text text-transparent font-semibold m-2">
              Achievements
            </li>
            <li className="flex bg-gradient-to-r from-[#FFDE59] to-[#FF914D] bg-clip-text text-transparent font-semibold m-2">
              Login
            </li>
          </ul>
        </div>
        <input
          type="text"
          className="p-2 text-center rounded-full bg-[#D9D9D9]"
          placeholder="Search for Classes"
        ></input>
      </div>
    </>
  );
}

function ClassLayout() {
  //To ensure UI doesnt call the values before its initialised
  const [loading, isLoading] = useState(true);
  //Year1, year2, year3 api response init
  const [year1, setYear1] = useState();
  const [year2, setYear2] = useState();
  const [year3, setYear3] = useState();
  const [timeslots, settimeslots] = useState();

  // State for time.
  const [now, setNow] = useState(new Date());

  const dialogref = useRef(null);
  useEffect(() => {
    fetchData(setYear1, setYear2, setYear3, settimeslots, isLoading)

    // Update time every second.
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount.
  }, []);

  //getting current time with formatting.
  const formattedTime = now.toLocaleTimeString("en-GB");
  //index of day (since it starts from 0 so -1).
  let dayindex = now.getDay() - 1;
  //handling day index: if its greater than or equal to 0 then it remains as it is. if not then 6 added to dayindex.
  dayindex = dayindex >= 0 ? dayindex : dayindex + 6;

  const showperiod = higherOrderShowPeriod(dayindex, now, timeslots);
  return (
    <>
    
      <div className="flex flex-col items-center justify-center">
        <h1>1st Year</h1>
        <Year1TimeTable loading={loading} year1={year1} showperiod={showperiod}/>
        <h1>2nd Year</h1>
        <Year2TimeTable loading={loading} year2={year2} showperiod={showperiod}/>
        <h1>3rd Year</h1>
        <Year3TimeTable loading={loading} year3={year3} showperiod={showperiod}/>
      </div>
    </>
  );
}

function Year1TimeTable({loading, year1, showperiod}){
  return (
    <>
        <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1 overflow-y-hidden">
          {loading ? (
            <p>Loading</p>
          ) : (
            year1.map((cls, index) => (
              <div
                key={index}
                className="h-[14rem] w-[16.6vw] card"
              >
                <div>
                  <h2 className="bg-gradient-to-r from-[#FFDE59] to-[#FF914D] bg-clip-text text-transparent text-[1.23em] font-semibold mb-[0.2em]">
                    {showperiod(cls)[0]}
                  </h2>
                  <p className="text-[1em] text-white ">
                    {showperiod(cls)[1]}
                  </p>
                </div>
                <p className="text-[0.9em] text-white font-normal"><b>Next:</b> {showperiod(cls)[2]}</p>
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text text-transparent text-2xl font-bold">{`1${cls.class}`}</div>
              </div>
            ))
          )}
        </div>
    </>
  )
}
function Year2TimeTable({loading, year2, showperiod}){
  return (
    <>
    <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1 overflow-y-hidden">
  {loading ? (
    <p>Loading</p>
  ) : (
    year2.map((cls, index) => (
      <div
        key={index}
        className="h-[14rem] w-[33vw] m-2 card"
      >
         <div>
          <h2 className="bg-gradient-to-r from-[#FFDE59] to-[#FF914D] bg-clip-text text-transparent text-2xl font-semibold mb-1">
            {showperiod(cls)[0]}
          </h2>
          <p className="text-md text-white ">
            {showperiod(cls)[1]}
          </p>
        </div>
        <p className="text-[0.9em] text-white font-normal"><b>Next:</b> {showperiod(cls)[2]}</p>
        <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text text-transparent text-2xl font-bold">{`2${cls.class}`}</div>
        <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text text-transparent text-2xl font-bold">{`2${cls.class}`}</div>
      </div>
    ))
  )}
</div>
    </>
  )
}
function Year3TimeTable({loading, year3, showperiod}){
 return(
  <>
   <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1 overflow-y-hidden">
  {loading ? (
    <p>Loading</p>
  ) : (
    year3.map((cls, index) => (
      <div
        key={index}
        className="h-[14rem] w-[33vw] m-2 card"
      >
        <div>
          <h2 className="bg-gradient-to-r from-[#FFDE59] to-[#FF914D] bg-clip-text text-transparent text-2xl font-semibold mb-1">
            {showperiod(cls)[0]}
          </h2>
          <p className="text-md text-white ">
            {showperiod(cls)[1]}
          </p>
        </div>
        <p className="text-[0.9em] text-white font-normal"><b>Next:</b> {showperiod(cls)[2]}</p>
        <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text text-transparent text-2xl font-bold">{`3${cls.class}`}</div>
        <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text text-transparent text-2xl font-bold">{`3${cls.class}`}</div>
      </div>
    ))
  )}
</div>
  </>
 )
}
function App() {
  return (
    <>
      <NavBar />  
      <div className="bg-[#1E1E1E] h-max w-screen justify-center items-center flex">
        <ClassLayout />
      </div>
    </>
  );
}

export default App;
