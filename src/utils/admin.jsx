/* eslint-disable no-unused-vars */
//importing axios for promises, hooks from react and css for styling.
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "../App.css";

function AdminPanel(){
    useEffect(()=>{
        
    },[])
    return(
        <>
            <div className="bg-[#1E1E1E] h-screen w-screen justify-center items-center flex">
                <div>
                    <h1>Edit Timeslots</h1>
                    <div className="w-[33%] h-[50%] bg-yellow-300 rounded-xl">
                        
                    </div>
                </div>
             </div>
        </>
    )
}

export default AdminPanel;