/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//importing axios for promises, hooks from react and css for styling.
import axios from "axios";
import { useRef, useState, useEffect, use } from "react";
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
} from "@/utils/modules/postdata";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  putStaff,
  putTimeslot,
  putYear1,
  putYear2,
  putYear3,
  putSubjects
} from "./modules/putdata";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function ClassList({ loading, year1, year2, year3, isLoading, subjects }) {
  return (
    <>
      <div className="card !h-fit !w-full flex flex-col justify-center items-stretch text-[1.5rem] text-white">
        <Toaster />
        <div className="flex flex-row items-center justify-between p-2">
          <h1 className="!text-[2rem] !m-0 !p-0">See All Classes</h1>
        {/*Need to insert Popover here */}
        <AddClassDialog year1={year1} year2={year2} year3={year3} subjects={subjects}></AddClassDialog >
        </div>
        
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
                    <ClassPopOver cls={cls} isLoading={isLoading} yearindex={yearindex}></ClassPopOver>
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
// ClassPopOver component is used to edit the class details in the edit popover.
function ClassPopOver({ cls, yearindex, isLoading }) {
  const [dayDropDown, setDayDropDown] = useState(null);
  const [periodsList, setPeriodsList] = useState({});

  useEffect(() => {
    if (dayDropDown !== null) {
      const defaulttimetable = cls.timetable[dayDropDown - 1];
      //copying the default timetable to a temporary object.
      const tempPeriodsList = {};
      for (const [key, value] of Object.entries(defaulttimetable)) {
        if (key.includes("period")){
          tempPeriodsList[key] = value;
        }
      }
      console.log(tempPeriodsList);
      setPeriodsList(tempPeriodsList);
    }
  }, [dayDropDown, cls.timetable])

  function handleSubmit(){
    const finaldata = {...cls}
    delete finaldata._id; //removing the _id field from the class object to avoid conflicts.
    finaldata.timetable[dayDropDown - 1] = periodsList;
    if (yearindex + 1 == 1) {
      putYear1(cls._id, finaldata, isLoading);
    } else if (yearindex + 1 == 2) {
      putYear2(cls._id, finaldata, isLoading);
    } else if (yearindex + 1 == 3) {
      putYear3(cls._id, finaldata, isLoading);
    }
    
  }
  return (
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
                <Label htmlFor={`day`}>Day</Label>
                <Select
                  value={dayDropDown}
                  onValueChange={(value) => setDayDropDown(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    <SelectItem value={1}>1</SelectItem>
                    <SelectItem value={2}>2</SelectItem>
                    <SelectItem value={3}>3</SelectItem>
                    <SelectItem value={4}>4</SelectItem>
                    <SelectItem value={5}>5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {dayDropDown == null ? (
                <p>Choose a day.</p>
              ) : (
                Object.entries(cls.timetable[dayDropDown - 1]).map(
                  (period, index) =>
                    period[0].includes("period") ? (
                      <div
                        key={index}
                        className="grid grid-cols-3 items-center gap-4"
                      >
                        {console.log("rerendering")}
                        <Label htmlFor={`period${index}`}>
                          Period {index+1}
                        </Label>
                        {/*using nullish coalescing operator -  this returns rhs of ?? if lhs of ?? is undefined. so by default the inputs are undefined hence you get it prefilled with the period[1] value.*/}
                        <Input
                          id={`period${index+1}`}
                          value={periodsList[`period${index+1}`] ?? period[1]}
                          onChange={(e) => {
                            e.preventDefault();
                            setPeriodsList((prev) => ({
                              ...prev,
                              ['day']: `Day ${dayDropDown}`,
                              [`period${index+1}`]: e.target.value,
                            }));
                            console.log(periodsList);
                          }}
                          className="col-span-2 h-8"
                        />
                      </div>
                    ) : null
                )
              )}
              <Button
                onClick={() => {

                  handleSubmit()
                  setDayDropDown(null);
                  toast.success("Class updated successfully!");
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AddClassDialog({ year1, year2, year3, subjects }) {
  const years = [year1, year2, year3];
  const [yearDropDown, setYearDropDown] = useState(null);
  const [dayDropDown, setDayDropDown] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [periodDropDown, setPeriodDropDown] = useState({});

  const periods = ['period 1','period 2','period 3','period 4','period 5','period 6','period 7','period 8']

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="p-3">
          <TiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new class.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="col-span-2 h-8"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="year">Choose Year</Label>
            <Select value={yearDropDown} onValueChange={(value) => setYearDropDown(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="0">1st Year</SelectItem>
                <SelectItem value="1">2nd Year</SelectItem>
                <SelectItem value="2">3rd Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="day">Day</Label>
            <Select value={dayDropDown} onValueChange={(value) => setDayDropDown(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {dayDropDown == null ? (
            <p className="text-sm text-muted-foreground">Choose a day.</p>
          ) : (
            yearDropDown !== null &&
            periods.map((period, pindex)=>{
              return(
                <div className="grid grid-cols-3 items-center gap-4" key={pindex}>
            <Label htmlFor={`${period}`}>{period}</Label>
            {/*Again using nullish coalescing; i am just initializing with an empty string to keep the component in always controlled state.*/}
             <Select value={periodDropDown[`period${pindex+1}`]??''} onValueChange={(value) => {
                            setPeriodDropDown((prev) => ({
                              ...prev,
                              ['day']: `Day ${dayDropDown}`,
                              [`period${pindex+1}`]: value,
                            }));
                            console.log(periodDropDown);
                          }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent className="text-black">
                {Object.entries(subjects[yearDropDown]['sem1']).map(([subkey, subval], subind)=>{
                  return(
                    <SelectItem key={subind} value={`${subval}`}>
                      {subval}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
              )
            })
            // Object.entries(subjects[parseInt(yearDropDown)]).map(([subentry, subval], subindex) =>
            //   subentry !== "_id" ? (
            //     Object.values(subval).map((subject, subjectindex) => (
            //       <div className="grid grid-cols-3 items-center gap-4" key={`${subentry}-${subjectindex}`}>
            //         <Label htmlFor={`${subject}`}>{subject}</Label>
            //         <Input id={`${subject}`} className="col-span-2 h-8" />
            //       </div>
            //     ))
            //   ) : null
            // )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
function TimeSlotsList({ loading, timeslots, isLoading }) {
  return (
    <>
      <div className="card !h-max !w-max flex flex-col justify-center text-[1.5rem] text-white">
        <h1 className="!text-[2rem] !m-0 !p-0">See All Time Slots</h1>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="text-left">
            {timeslots.map((slot, index) => (
              <>
              <div
                    key={index}
                    className="flex flex-row items-center justify-between m-2 rounded-lg w-full"
                  >
              <p
                key={index}
                className="bg-gradient-to-r from-[#7FF899] to-[#22AEF9] p-1 bg-clip-text text-transparent text-2xl font-bold rounded-[20px]"
              >
                {slot.starthour}:
                {slot.startminute == 0 ? "00" : slot.startminute} -{" "}
                {slot.endhour}:{slot.endminute}
              </p>
              <TimeSlotPopOver slot={slot} isLoading={isLoading} />
              </div>
              <Separator className="bg-gray-600"/>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

//TimeSlotPopOver component is used to edit the timeslot details in the edit popover.
function TimeSlotPopOver({ slot, isLoading }) {
  const [startHour, setStartHour] = useState(slot.starthour);
  const [startMinute, setStartMinute] = useState(slot.startminute);
  const [endHour, setEndHour] = useState(slot.endhour);
  const [endMinute, setEndMinute] = useState(slot.endminute);
  const [period, setPeriod] = useState(slot.period);

  function handleSubmit() {
    const updatedSlot = {
      starthour: startHour,
      startminute: startMinute,
      endhour: endHour,
      endminute: endMinute,
      period: period,
    };
    putTimeslot(slot._id, updatedSlot, isLoading);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className=" p-1">
          <MdModeEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edit Time Slot</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="start-hour">Start Hour</Label>
              <Input
                id="start-hour"
                type="number"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="start-minute">Start Minute</Label>
              <Input
                id="start-minute"
                type="number"
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="end-hour">End Hour</Label>
              <Input
                id="end-hour"
                type="number"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="end-minute">End Minute</Label> 
              <Input
                id="end-minute"
                type="number"
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                type="number"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <Button
              onClick={() => {
                handleSubmit();
                toast.success("Time slot updated successfully!");
              }}
            >
              Save 
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
function AdminPanel() {
  const {year1, year2, year3, setYear1, setYear2, setYear3, timeslots, settimeslots, staffs, setstaffs, subjects, setSubjects, loading, isLoading, now, setNow} = useContextData();

  // useEffect to fetch data when the component loads.
  useEffect(() => {
    fetchData(setYear1, setYear2, setYear3, settimeslots, setstaffs, setSubjects, isLoading);
  }, [
    setYear1,
    setYear2,
    setYear3,
    settimeslots,
    setstaffs,
    setSubjects,
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
          subjects={subjects}
        />
        <TimeSlotsList
          loading={loading}
          timeslots={timeslots}
          isLoading={isLoading}
        />
        {console.log(subjects)}
      </div>
    </>
  );
}



export default AdminPanel;
