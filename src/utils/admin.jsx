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

function ClassList({ loading, year1, year2, year3 }) {
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
          </div>)}
      </div>
  
    </>
  );
}
function TimeSlotsList({ loading,timeslots }) {
  return (
    <>
      <div className="card !h-max !w-max flex flex-col justify-center text-[1.5rem] text-white">
        <h1 className="!text-[2rem] !m-0 !p-0">See All Time Slots</h1>
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
  const {
    year1,
    year2,
    year3,
    setYear1,
    setYear2,
    setYear3,
    timeslots,
    settimeslots,
    loading,
    isLoading,
    now,
    setNow,
  } = useContextData();

  // useEffect to fetch data when the component loads.
  useEffect(() => {
      fetchData(setYear1, setYear2, setYear3, settimeslots, isLoading);
    }, [setYear1, setYear2, setYear3, settimeslots, isLoading, setNow]);
  return (
    <>
      <div className="bg-slate-950 h-screen w-screen justify-center items-center flex">
        <ClassList loading={loading} year1={year1} year2={year2} year3={year3}/>
        <TimeSlotsList loading={loading} timeslots={timeslots}/>
      </div>
    </>
  );
}

export default AdminPanel;
