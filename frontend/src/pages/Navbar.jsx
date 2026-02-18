import React, {  useState } from "react";
import { Stethoscope } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const Navbar = () => {


const navigate = useNavigate();
  


const loggy = () => {
  localStorage.removeItem("accid");   
  toast.success("Logged out Successfully!");

  setTimeout(() => {
    navigate("/login", { replace: true });
  }, 3000); 
};


  return (
    <div>
      <div className="bg-[#026cce] h-[40px] p-[25px] text-white flex items-center justify-between">
        <div className="flex gap-2 pl-[30px]">
          <div className="">
            <Stethoscope size={32} />
          </div>
          <div className="font-bold text-[23px]">ClinicFlow</div>
        </div>
        <div className="">
          {localStorage.getItem("accid") && (
            <button className="cursor-pointer hover:opacity-75 bg-white text-black p-[2px] w-[80px] rounded rounded-[5pc] font-bold cursor-pointer" onClick={loggy}>
              Logout
            </button>
          )}
        </div>
      </div>
       <ToastContainer />
    </div>
  );
};

export default Navbar;
