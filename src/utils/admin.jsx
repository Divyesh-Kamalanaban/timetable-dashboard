/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//importing axios for promises, hooks from react and css for styling.
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "../App.css";
import { useContextData } from "./modules/context";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchData } from "./modules/fetchdata";
import { Button } from "@/components/ui/button";
import { TiPlus } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdModeEdit } from "react-icons/md";
//Imports for Popover.
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  postStaff,
  postTimeslot,
  postYear1,
  postYear2,
  postYear3,
} from "@/postdata";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { object } from "zod"; 

function ClassList({ loading, year1, year2, year3, isLoading }) {
  const [dayDropDown, setDayDropDown] = useState(null);
  return (
    <>
      <div className="card !h-fit !w-full flex flex-col justify-center items-stretch text-[1.5rem] text-white">
        <h1 className="!text-[2rem] !m-0 !p-0">See All Classes</h1>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="text-left flex flex-row items-stretch justify-between h-full w-full">
            {/*Maps over Years first, then the classes in each year. Nested Map.*/}
            {[year1, year2, year3].map((year, yearindex) => (
              <div
                key={yearindex}
                className="flex flex-col items-center justify-start m-2 flex-1 p-2"
              >
                <h2>Year {yearindex + 1}</h2>
                <Separator></Separator>
                {year.map((cls, classindex) => (
                  <div
                    key={classindex}
                    className="flex flex-row items-center justify-between m-2 rounded-lg w-full"
                  >
                    <p
                      key={classindex}
                      className="bg-gradient-to-r from-[#7FF899] to-[#22AEF9] p-1 bg-clip-text text-transparent text-[1.25rem] font-bold rounded-[20px]"
                    >
                      {yearindex + 1 + cls.class}
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="secondary" className=" p-1">
                          <MdModeEdit />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px]">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="leading-none font-medium">
                              Edit Class {cls.class} Details
                            </h4>
                          </div>
                          <div className="grid gap-2">
                            
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="Section Name">Section Name</Label>
                              <Input
                                id="section-name"
                                defaultValue={`${cls.class}`}
                                className="col-span-2 h-8"
                              />
                            </div>
                            {/*Dropdown menu using shadCN select component; uses dayDropDown for state.*/}
                              <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor={`day`}>  
                                    Day 
                                  </Label>  
                                  <Select value={dayDropDown} onValueChange={(value) => setDayDropDown(value)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Day"/>
                                    </SelectTrigger>
                                    <SelectContent className="text-black">
                                      <SelectItem value={1}>1</SelectItem>
                                      <SelectItem value={2}>2</SelectItem>
                                      <SelectItem value={3}>3</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                                {dayDropDown == null ? (<p>Choose a day.</p>): (
                                  Object.entries(cls.timetable[dayDropDown-1]).map((period, index) => period[0].includes('period')?(
                                    <div key={index} className="grid grid-cols-3 items-center gap-4">
                                      {console.log('rerendering')}
                                      <Label htmlFor={`period${index-1}`}>
                                        Period {index-1}
                                      </Label>
                                      <Input 
                                        id={`period${index-1}`}
                                        value={period[1]}
                                        className="col-span-2 h-8"  
                                      />
                                    </div>
                                  ):null)
                                )}
                                <Button>Save</Button>
                              </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            ))}
            {/*Button is Outside the Map.*/}
            {/* <Button
              onClick={() => {
                postYear1(
                  {
                    class: "E",
                    timetable: [
                      {
                        day: "Day 1",
                        period1: "Chemistry Lab",
                        period2: "Chemistry Lab",
                        period3: "Communicative English",
                        period4: "Programming for Problem Solving lab",
                        period5: "Advanced Calculus and Complex Analysis",
                        period6: "Advanced Calculus and Complex Analysis",
                        period7: "Students mentoring",
                        period8: "unallocated",
                      },
                      {
                        day: "Day 2",
                        period1: "PPS/PCB Lab",
                        period2: "PPS/PCB Lab",
                        period3: "Advanced Calculus and Complex Analysis",
                        period4: "Programming for Problem Solving lab",
                        period5: "Chemistry Lab",
                        period6: "Chemistry",
                        period7: "Engineering Graphics and Design",
                        period8: "unallocated",
                      },
                      {
                        day: "Day 3",
                        period1: "Advanced Calculus and Complex Analysis",
                        period2: "Advanced Calculus and Complex Analysis",
                        period3: "LIB",
                        period4: "Biology",
                        period5: "Electronic System and PCB design",
                        period6: "Communicative English",
                        period7: "Environmental Science",
                        period8: "Seminar",
                      },
                      {
                        day: "Day 4",
                        period1: "Constitution of India",
                        period2: "Electronic System and PCB design",
                        period3: "Advanced Calculus and Complex Analysis",
                        period4: "Biology",
                        period5: "PPS/PCB Lab",
                        period6: "PPS/PCB Lab",
                        period7: "Chemistry Lab",
                        period8: "Seminar",
                      },
                      {
                        day: "Day 5",
                        period1: "Chemistry Lab",
                        period2: "Counselling",
                        period3: "General Aptitude",
                        period4: "Lunch",
                        period5: "Communicative English",
                        period6: "Programming for Problem Solving lab",
                        period7: "Project Discussion",
                        period8: "unallocated",
                      },
                    ],
                    staffs: {
                      "Communicative English": "Ms K Srividhya Lakshmi",
                      "Advanced Calculus and Complex Analysis": "Dr B Srirekha",
                      Chemistry: "Dr P Arthi",
                      "Chemistry Lab": "Dr P Arthi",
                      "Engineering Graphics and Design": "Dr N Parthipan",
                      "Electronic System and PCB design":
                        "Dr Christeena Joseph",
                      "Electronic System and PCB design lab":
                        "Dr Christeena Joseph",
                      "Programming for Problem Solving":
                        "Dr N Sree Rathna Lakshmi",
                      "Programming for Problem Solving lab": "Dr Aravindhan",
                      "Environmental Science": "Dr K Sambath Kumar",
                      "General Aptitude": "Mr Iyappan",
                      Biology: "Dr S Vasthi Gana Rani",
                      "Constitution of India": "Dr Diana",
                    },
                  },
                  isLoading
                );
              }}
            >
              Add sample class year 1
            </Button> */}
          </div>
        )}
      </div>
    </>
  );
}
function TimeSlotsList({ loading, timeslots, staffs }) {
  return (
    <>
      <div className="card !h-max !w-max flex flex-col justify-center text-[1.5rem] text-white">
        <h1 className="!text-[2rem] !m-0 !p-0">See All Time Slots</h1>
        {loading ? <Skeleton /> : console.log(staffs)}
        {loading ? (
          <Skeleton />
        ) : (
          <div className="text-left">
            {timeslots.map((slot, index) => (
              <p
                key={index}
                className="bg-gradient-to-r from-[#7FF899] to-[#22AEF9] p-1 bg-clip-text text-transparent text-2xl font-bold rounded-[20px]"
              >
                Period {slot.period}: {slot.starthour}:
                {slot.startminute == 0 ? "00" : slot.startminute} -{" "}
                {slot.endhour}:{slot.endminute}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
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
    staffs,
    setstaffs,
    loading,
    isLoading,
    now,
    setNow,
  } = useContextData();

  // useEffect to fetch data when the component loads.
  useEffect(() => {
    fetchData(setYear1, setYear2, setYear3, settimeslots, setstaffs, isLoading);
  }, [
    setYear1,
    setYear2,
    setYear3,
    settimeslots,
    setstaffs,
    isLoading,
    setNow,
  ]);
  return (
    <>
      <div className="bg-slate-950 h-screen w-screen justify-center items-center flex">
        <ClassList
          loading={loading}
          year1={year1}
          year2={year2}
          year3={year3}
          isLoading={isLoading}
        />
        <TimeSlotsList
          loading={loading}
          timeslots={timeslots}
          staffs={staffs}
        />
      </div>
    </>
  );
}

export default AdminPanel;
