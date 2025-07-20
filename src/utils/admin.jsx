/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//importing axios for promises, hooks from react and css for styling.
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "../App.css";
import { useContextData } from "./modules/context";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../app/dashboard/data.json";
import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchData } from "./modules/fetchdata";
import { postStaff, postTimeslot, postYear1, postYear2, postYear3 } from "@/postdata";

function ClassList({ loading, year1, year2, year3, isLoading }) {
  return (
    <>
      <div className="card !h-max !w-max flex flex-col justify-center text-[1.5rem] text-white">
        <h1 className="!text-[2rem] !m-0 !p-0">See All Classes</h1>
        {loading ? (<Skeleton/>) : (
          <div className="text-left">
            {/*Maps over Years first, then the classes in each year. Nested Map.*/}
            {[year1, year2, year3].map((year, yearindex)=> (
              year.map((cls, classindex)=>(
                <p key={classindex} className="bg-gradient-to-r from-[#7FF899] to-[#22AEF9] p-1 bg-clip-text text-transparent text-2xl font-bold rounded-[20px]">{yearindex+1}{cls.class}</p>
              ))
            ))}
            <button onClick={()=>{postYear1({
 
  "class": "E",
  "timetable": [
    {
      "day": "Day 1",
      "period1": "Chemistry Lab",
      "period2": "Chemistry Lab",
      "period3": "Communicative English",
      "period4": "Programming for Problem Solving lab",
      "period5": "Advanced Calculus and Complex Analysis",
      "period6": "Advanced Calculus and Complex Analysis",
      "period7": "Students mentoring",
      "period8": "unallocated"
    },
    {
      "day": "Day 2",
      "period1": "PPS/PCB Lab",
      "period2": "PPS/PCB Lab",
      "period3": "Advanced Calculus and Complex Analysis",
      "period4": "Programming for Problem Solving lab",
      "period5": "Chemistry Lab",
      "period6": "Chemistry",
      "period7": "Engineering Graphics and Design",
      "period8": "unallocated"
    },
    {
      "day": "Day 3",
      "period1": "Advanced Calculus and Complex Analysis",
      "period2": "Advanced Calculus and Complex Analysis",
      "period3": "LIB",
      "period4": "Biology",
      "period5": "Electronic System and PCB design",
      "period6": "Communicative English",
      "period7": "Environmental Science",
      "period8": "Seminar"
    },
    {
      "day": "Day 4",
      "period1": "Constitution of India",
      "period2": "Electronic System and PCB design",
      "period3": "Advanced Calculus and Complex Analysis",
      "period4": "Biology",
      "period5": "PPS/PCB Lab",
      "period6": "PPS/PCB Lab",
      "period7": "Chemistry Lab",
      "period8": "Seminar"
    },
    {
      "day": "Day 5",
      "period1": "Chemistry Lab",
      "period2": "Counselling",
      "period3": "General Aptitude",
      "period4": "Lunch",
      "period5": "Communicative English",
      "period6": "Programming for Problem Solving lab",
      "period7": "Project Discussion",
      "period8": "unallocated"
    }
  ],
  "staffs": {
    "Communicative English": "Ms K Srividhya Lakshmi",
    "Advanced Calculus and Complex Analysis": "Dr B Srirekha",
    "Chemistry": "Dr P Arthi",
    "Chemistry Lab": "Dr P Arthi",
    "Engineering Graphics and Design": "Dr N Parthipan",
    "Electronic System and PCB design": "Dr Christeena Joseph",
    "Electronic System and PCB design lab": "Dr Christeena Joseph",
    "Programming for Problem Solving": "Dr N Sree Rathna Lakshmi",
    "Programming for Problem Solving lab": "Dr Aravindhan",
    "Environmental Science": "Dr K Sambath Kumar",
    "General Aptitude": "Mr Iyappan",
    "Biology": "Dr S Vasthi Gana Rani",
    "Constitution of India": "Dr Diana"
  }
}, isLoading)}}>Add sample class year 1</button>
          </div>)}
      </div>
  
    </>
  );
}
function TimeSlotsList({ loading,timeslots,staffs }) {
  return (
    <>
      <div className="card !h-max !w-max flex flex-col justify-center text-[1.5rem] text-white">
        <h1 className="!text-[2rem] !m-0 !p-0">See All Time Slots</h1>
        {loading ? (<Skeleton/>) : console.log(staffs) }
        {loading ? (<Skeleton/>) : (
          <div className="text-left">
          {timeslots.map((slot, index) => (
            <p key={index} className="bg-gradient-to-r from-[#7FF899] to-[#22AEF9] p-1 bg-clip-text text-transparent text-2xl font-bold rounded-[20px]">
              Period {slot.period}: {slot.starthour}:{slot.startminute==0 ? ('00') : slot.startminute} - {slot.endhour}:{slot.endminute}
            </p>
          ))}
        </div>
        ) }
        
      </div>
    </>
  )
}
function AdminPanel() {
  const {year1, year2, year3, setYear1, setYear2, setYear3, timeslots, settimeslots, staffs, setstaffs, loading, isLoading, now, setNow} = useContextData();

  // useEffect to fetch data when the component loads.
  useEffect(() => {
      fetchData(setYear1, setYear2, setYear3, settimeslots, setstaffs, isLoading);
    }, [setYear1, setYear2, setYear3, settimeslots, setstaffs, isLoading, setNow]);
  return (
    <>
      <div className="bg-slate-950 h-screen w-screen justify-center items-center flex">
        <ClassList loading={loading} year1={year1} year2={year2} year3={year3} isLoading={isLoading}/>
        <TimeSlotsList loading={loading} timeslots={timeslots} staffs={staffs}/>
      </div>
    </>
  );
}

export default AdminPanel;
