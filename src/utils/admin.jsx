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
import { deleteStaff, deleteYear1, deleteYear2, deleteYear3, deleteTimeslot, deleteSubject } from "./modules/deletedata";
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
import { PlusCircleIcon, Trash } from "lucide-react";

function ClassList({ loading, year1, year2, year3, isLoading, subjects, setYear1, setYear2, setYear3, setsubjects }) {
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
                    <div>
                    <ClassPopOver cls={cls} isLoading={isLoading} yearindex={yearindex}></ClassPopOver>
                    <Button
                      variant="destructive" onClick={() => {
                        if (yearindex + 1 == 1) {
                          deleteYear1(cls._id, isLoading);
                        setYear1((prev) => prev.filter((c) => c._id !== cls._id));}
                        else if (yearindex + 1 == 2) 
                          deleteYear2(cls._id, isLoading);
                        else if (yearindex + 1 == 3) 
                          deleteYear3(cls._id, isLoading);
                        else 
                          console.error("Invalid year index for deletion:", yearindex + 1);
                        
                        toast.success("Class deleted successfully!");
                        if(yearindex + 1 == 1) {
                          setYear1((prev) => prev.filter((c) => c._id !== cls._id));
                        } else if(yearindex + 1 == 2) {
                          setYear2((prev) => prev.filter((c) => c._id !== cls._id));
                        } else if(yearindex + 1 == 3) {
                          setYear3((prev) => prev.filter((c) => c._id !== cls._id));
                        }
                      }}>Delete <Trash className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
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
        <Button variant="secondary" className=" p-3 m-1">
          Edit
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
      <div className="card !h-max !w-full flex flex-col justify-center text-[1.5rem] text-white">
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
                {slot.endhour}:{slot.endminute == 0 ? "00" : slot.endminute}
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

function SubjectList({ subjects }) {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // default to Year 1

  if (!Array.isArray(subjects)) {
    console.warn("SubjectList received invalid subjects:", subjects);
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load subjects.
      </div>
    );
  }

  const selectedYearSubjects = subjects[selectedYearIndex];

  return (
    <div className="card !h-fit !w-fit flex flex-col justify-center items-stretch text-[1.5rem] text-white">
      <div className="flex flex-row items-center justify-between p-2">
        <h1 className="!text-[1.99rem] !m-0 !p-0">Subjects by Year</h1>

        
      </div>

      <div className="text-left flex flex-col items-stretch justify-start h-full w-full px-4">
        <h2><Select
          value={String(selectedYearIndex)}
          onValueChange={(value) => setSelectedYearIndex(Number(value))}
        >
          <SelectTrigger className="bg-white text-black">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((_, index) => (
              <SelectItem key={index} value={String(index)}>
                Year {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select></h2>
        <div className="text-left w-full mt-2">
          {selectedYearSubjects?.sem1?.length > 0 ? (
            selectedYearSubjects.sem1.map((subject, subIndex) => (
              <div
                key={subIndex}
                className="bg-gradient-to-r from-[#9bd2f7] to-[#63e7b3] text-transparent bg-clip-text font-medium py-1 text-base"
              >
                {subject}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No subjects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StaffPopOver({ staff, isLoading }) {
  const [form, setForm] = useState({
    name: staff.name || "",
    email: staff.email || "",
    phone: staff.phone || "",
    dob: staff.dob ? staff.dob.substring(0, 10) : "",
    gender: staff.gender || "",
    role: staff.role || "",
    designation: staff.designation || ""
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit() {
    console.log("Submitting staff update", { id: staff._id, data: form });
    try {
      const response = await putStaff(staff._id, form, isLoading);
      if (!response) {
        console.warn("Staff update returned null or undefined. Check backend response.");
      } else {
        console.log("Staff update response:", response);
      }
      toast.success("Staff updated successfully!");
    } catch (err) {
      console.error("Staff update error:", err);
      toast.error("Failed to update staff.");
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="p-3 m-1">
          Edit 
          <MdModeEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px]">
        <div className="grid gap-4">
          <h4 className="font-medium">Edit Staff Details</h4>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} />
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={form.email} onChange={handleChange} />
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
            <Label htmlFor="dob">DOB</Label>
            <Input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} />
            <Label htmlFor="gender">Gender</Label>
            <Select value={form.gender} onValueChange={val => setForm(f => ({ ...f, gender: val }))}>
              <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="role">Role</Label>
            <Select value={form.role} onValueChange={val => setForm(f => ({ ...f, role: val }))}>
              <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Teacher">Teacher</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" name="designation" value={form.designation} onChange={handleChange} />
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function StaffList({ staffs, isLoading, loading, setstaffs }) {
  function handleDelete(staffId) {
    if (!staffId) {
      console.warn("No staff ID provided for deletion.");
      return;
    }
    console.log("Deleting staff with ID:", staffId);
    deleteStaff(staffId, isLoading);
    setstaffs((prev) => prev.filter(staff => staff._id !== staffId));
    toast.success("Staff deleted successfully!");
    
    // Call the delete API or function here
  }
  return (
    <div className="card !h-fit !w-full flex flex-col justify-center items-stretch text-[1.5rem] text-white">
      <div className="flex flex-row items-center justify-between">
        <h1 className="!text-[2rem] !m-0 !p-0">Staffs</h1>
        <AddStaffDialog setstaffs={setstaffs} isLoading={isLoading} />
      </div>
      {loading ? <Skeleton /> : (
        <div className="text-left flex flex-col gap-2">
          {staffs.map((staff, idx) => (
            <div key={staff._id || idx} className="flex flex-row items-center justify-between m-2 rounded-lg w-full">
              <span className="font-bold text-lg">{staff.name}</span>
              <div className="flex flex-row items-center gap-2">
              <StaffPopOver staff={staff} isLoading={isLoading} />
              <Button variant="destructive" onClick={() => handleDelete(staff._id)}>Delete
                <Trash></Trash>
              </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Dialog to add a new staff member
function AddStaffDialog({ setstaffs, isLoading }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    role: "",
    designation: ""
  });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit() {
    setLoading(true);
    try {
      // Basic validation
      if (!form.name || !form.email || !form.phone || !form.dob || !form.gender || !form.role || !form.designation) {
        toast.error("Please fill all fields.");
        setLoading(false);
        return;
      }
      const response = await postStaff(form, isLoading);
      if (response && response._id) {
        toast.success("Staff added successfully!");
        setstaffs((prev) => [...prev, response]);
        setOpen(false);
        setForm({ name: "", email: "", phone: "", dob: "", gender: "", role: "", designation: "" });
      } else if (response && response.error) {
        toast.error(response.error);
      } else {
        toast.error("Failed to add staff. Check backend response.");
      }
    } catch (err) {
      toast.error("Error adding staff.");
      console.error("Add staff error:", err);
    }
    setLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="p-2">Add Staff <PlusCircleIcon /></Button>
      </DialogTrigger>
      <DialogContent className="w-[340px]">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} />
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={form.email} onChange={handleChange} />
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          <Label htmlFor="dob">DOB</Label>
          <Input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} />
          <Label htmlFor="gender">Gender</Label>
          <Select value={form.gender} onValueChange={val => setForm(f => ({ ...f, gender: val }))}>
            <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="role">Role</Label>
          <Select value={form.role} onValueChange={val => setForm(f => ({ ...f, role: val }))}>
            <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="designation">Designation</Label>
          <Input id="designation" name="designation" value={form.designation} onChange={handleChange} />
          <Button onClick={handleSubmit} disabled={loading}>{loading ? "Adding..." : "Add"}</Button>
        </div>
      </DialogContent>
    </Dialog>
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
      <div className="bg-slate-950 h-max w-screen justify-center items-center flex">
        <div className="w-full m-2 p-2 flex flex-col items-center justify-items-end h-full">
        <ClassList
          loading={loading}
          year1={year1}
          year2={year2}
          year3={year3}
          isLoading={isLoading}
          subjects={subjects}
          setYear1={setYear1}
          setYear2={setYear2}
          setYear3={setYear3}
        />
        <StaffList
          loading={loading}
          isLoading={isLoading}
          staffs={staffs}
          setstaffs={setstaffs} />
        </div>
        
        <div>
        <TimeSlotsList
          loading={loading}
          timeslots={timeslots}
          isLoading={isLoading}
        />
        <SubjectList subjects={subjects} />
        </div>
        {console.log(subjects)}
      </div>
    </>
  );
}



export default AdminPanel;
