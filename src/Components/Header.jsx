import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from "react-router-dom"


export default function Header() {
    const [pageState,setPageState]=useState("Sign in")
    const location = useLocation();
    const navigate = useNavigate(); 
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setPageState("Profile")
            }
            else {
                setPageState("Sign in")
            }
      })  
    },[auth])
     
    
    function pathMatchRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }
   
  return (
      <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
          <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
              <div>
                  <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo"  className='h-5 cursor-pointer' onClick={()=>navigate("/")}/>
              </div>
              <div>
                  <ul className='flex space-x-10'>
                      <li onClick={()=>navigate("/")} className={` cursor-pointer py-3 text-sm font-semibold text-gray-400  ${pathMatchRoute("/") && "border-b-[3px] border-b-red-500 text-gray-950"}`}>Home</li>
                      <li onClick={()=>navigate("/offers")} className={` cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMatchRoute("/offers") && "text-gray-950 border-b-[3px] border-b-red-500"} cursor-pointer `}>Offers</li>
                      <li onClick={() => navigate("/profile")} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-gray-950 border-b-[3px]  border-b-red-500"}`}>{ pageState}</li>
                  </ul>
              </div>
          </header>
    </div>
  )
}
