
/*Preface: This util uses Higher Order function concept. Basically higher order function either accepts a function as a param or returns a function or does both. in this case we create a higher order func that returns showperiod. This is done to provide showperiod with required variables from the main file.*/

export function higherOrderShowPeriod(dayindex, now, timeslots){
    return function showperiod(cls) {
        let timetablearray = cls.timetable[dayindex];
        let staffarr = cls.staffarr;
        let currentperiod;
        let staffname;
        let nextperiod;
    
        //For Loop
        for (const slot of timeslots) {
          //conversion of hours to mins to make conditionals based on time work.  
          const nowMinutes = now.getHours() * 60 + now.getMinutes();
          const startMinutes = slot.starthour * 60 + slot.startminute;
          const endMinutes = slot.endhour * 60 + slot.endminute;
    
          if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
            currentperiod = timetablearray[`period${slot.period}`];
            nextperiod = timetablearray[`period${slot.period+1}`];
            staffname = staffarr[currentperiod];
            break;
          } else if (
            now.getHours() === 9 &&
            now.getMinutes() >= 40 &&
            now.getMinutes() <= 50
          ) {
            currentperiod = "Break";
          } else if (
            now.getHours() === 11 &&
            now.getMinutes() >= 30 &&
            now.getMinutes() <= 40
          ) {
            currentperiod = "Lunch";
          } else {
            currentperiod = "No Period Found";
            staffname = "No one found.";
          }
        }
        //Returning an array with currentperiod and staffname.
        return [currentperiod, staffname, nextperiod];
}}
