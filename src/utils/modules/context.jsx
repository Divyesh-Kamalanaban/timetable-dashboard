/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
export const ContextData = createContext();
export const useContextData = () =>{
    return useContext(ContextData)
};
export const ContextDataWrapper = ({children}) => {
      //To ensure UI doesnt call the values before its initialised
      const [loading, isLoading] = useState(true);
      //Year1, year2, year3 api response init
      const [year1, setYear1] = useState();
      const [year2, setYear2] = useState();
      const [year3, setYear3] = useState();
      const [timeslots, settimeslots] = useState();
      const [staffs, setstaffs] = useState();
      const [subjects, setSubjects] = useState();
      // State for time.
      const [now, setNow] = useState(new Date());
      // Global semester selection (persistent)
      const [selectedSemester, setSelectedSemesterState] = useState(() => {
        return localStorage.getItem('selectedSemester') || 'odd';
      });
      function setSelectedSemester(val) {
        setSelectedSemesterState(val);
        localStorage.setItem('selectedSemester', val);
      }
      function getSemesterKey(yearIdx) {
        if (selectedSemester === 'odd') return 'sem' + (yearIdx * 2 + 1);
        else return 'sem' + (yearIdx * 2 + 2);
      }
      return (
        <ContextData.Provider value={{year1, year2, year3, setYear1, setYear2, setYear3, timeslots, settimeslots, staffs, setstaffs, subjects, setSubjects, loading, isLoading, now, setNow, selectedSemester, setSelectedSemester, getSemesterKey}}>
            {children}
        </ContextData.Provider>
      )
}