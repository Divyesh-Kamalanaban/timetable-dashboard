/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

//importing axios for promises, hooks from react and css for styling.
import { useRef, useState, useEffect } from "react";
import "./App.css";
import { higherOrderShowPeriod } from "./utils/modules/showperiod";
import { fetchData } from "./utils/modules/fetchdata";
import { useContextData } from "./utils/modules/context";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
      <div className="w-screen flex items-center h-max justify-around p-2 bg-slate-950">
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
        <Input
        type="text"
          className="w-fit"
          placeholder="Search for Classes"
        />
      </div>
    </>
  );
}

function ClassLayout() {
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

  const dialogref = useRef(null);
  useEffect(() => {
    fetchData(setYear1, setYear2, setYear3, settimeslots, isLoading);

    // Update time every second.
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount.
  }, [setYear1, setYear2, setYear3, settimeslots, isLoading, setNow]);

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
        <br />
        <br />
        <h1>
          1<sup>st</sup> year
        </h1>
        <Year1TimeTable
          loading={loading}
          year1={year1}
          showperiod={showperiod}
        />
        <h1>
          2<sup>nd</sup> year
        </h1>
        <Year2TimeTable
          loading={loading}
          year2={year2}
          showperiod={showperiod}
        />
        <h1>
          3<sup>rd</sup> year
        </h1>
        <Year3TimeTable
          loading={loading}
          year3={year3}
          showperiod={showperiod}
        />
      </div>
    </>
  );
}

function Year1TimeTable({ loading, year1, showperiod }) {
  return (
    <>
      {/*Added carousel with basis-1/3 to view 3 classes at once. Carousel will be used for other years if classes count > 3*/}
      <div className="flex flex-row items-center justify-center w-screen p-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-[93vw] mx-auto"
        >
          <CarouselContent className="">
            {loading ? (
              <SkeletonLoader />
            ) : (
              year1.map((cls, index) => (
                <CarouselItem key={index} className="card basis-1/3">
                  <div>
                    <h2 className="text-[1.5em] font-bold mb-[0.2em]">
                      {showperiod(cls)[0]}
                    </h2>
                    <p className="text-[1em] text-white">
                      {showperiod(cls)[1]}
                    </p>
                  </div>
                    <p className="text-[1.1em] font-normal">
                      <b>Next:</b> {showperiod(cls)[2]}
                    </p>
                  <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] p-1 bg-clip-text text-transparent text-3xl font-bold rounded-[20px]">{`${cls.class}`}</div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext />
        </Carousel>
      </div>
      {/* <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1">
          {loading ? (
            <SkeletonLoader />
          ) : (
            year1.map((cls, index) => (
              <div
                key={index}
                className="card"
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
        </div> */}
    </>
  );
}

function Year2TimeTable({ loading, year2, showperiod }) {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1 overflow-y-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          year2.map((cls, index) => (
            <div key={index} className="h-[14rem] w-[33vw] m-2 card">
              <div>
                <h2 className="text-[1.5em] font-bold mb-[0.2em]">
                  {showperiod(cls)[0]}
                </h2>
                <p className="text-[1em] text-white">{showperiod(cls)[1]}</p>
              </div>
                <p className="text-[1.1em] text-white font-normal">
                  <b>Next:</b> {showperiod(cls)[2]}
                </p>
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text p-1 text-transparent text-3xl font-bold">{`${cls.class}`}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function Year3TimeTable({ loading, year3, showperiod }) {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1 overflow-y-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          year3.map((cls, index) => (
            <div key={index} className="h-[14rem] w-[33vw] m-2 card">
              <div>
                <h2 className="text-[1.5em] font-bold mb-1">
                  {showperiod(cls)[0]}
                </h2>
                <p className="text-md text-white ">{showperiod(cls)[1]}</p>
              </div>
              <p className="text-[1.1em] text-white font-normal">
                <b>Next:</b> {showperiod(cls)[2]}
              </p>
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7FF899] to-[#22AEF9] bg-clip-text p-1 text-transparent text-3xl font-bold">{`${cls.class}`}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function SkeletonLoader() {
  return (
    <div className="flex flex-row items-center justify-center w-screen h-[33vh] px-1 overflow-y-hidden">
      <div className="space-y-2 m-2">
        <Skeleton className="h-4 w-[250px] bg-muted/10" />
        <Skeleton className="h-4 w-[200px] bg-muted/10" />
      </div>
      <div className="space-y-2 m-2">
        <Skeleton className="h-4 w-[250px] bg-muted/10" />
        <Skeleton className="h-4 w-[200px] bg-muted/10" />
      </div>
      <div className="space-y-2 m-2">
        <Skeleton className="h-4 w-[250px] bg-muted/10" />
        <Skeleton className="h-4 w-[200px] bg-muted/10" />
      </div>
    </div>
  );
}
function App() {
  return (
    <>
      <NavBar />

      <div className="bg-slate-950 h-max w-screen justify-center items-center flex">
        <ClassLayout />
      </div>
    </>
  );
}

export default App;
