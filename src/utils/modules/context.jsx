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
    
      // State for time.
      const [now, setNow] = useState(new Date());

      return (
        <ContextData.Provider value={{year1, year2, year3, setYear1, setYear2, setYear3, timeslots, settimeslots, staffs, setstaffs, loading, isLoading, now, setNow}}>
            {children}
        </ContextData.Provider>
      )
}