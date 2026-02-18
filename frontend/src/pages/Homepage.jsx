import React from "react";
import {HeartPulse,Clock ,Workflow   } from "lucide-react";

import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#cfd8e2] ">
      <div className="flex justify-center items-center h-[600px] bg-no-repeat bg-center bg-cover bg-[#5f5b5b] bg-blend-multiply"
        style={{
    backgroundImage:
      "url('https://wallpapers.com/images/hd/physician-group-photo-ideas-pvxso3pip2x34ewg.jpg')",
  }}
      
      >
        <div className="bg-white h-[240px] w-[500px] rounded-[10px] p-[50px] max-[585px]:w-[90vw]">
          <div className="flex justify-around gap-5">
            <button onClick={()=>{navigate('/login')}} className="cursor-pointer hover:opacity-75  w-full text-[18px] rounded-[10px] bg-[#026cce] text-white">
              Login
            </button>
          </div>
          <div className="flex justify-center mt-[10px]">Or</div>
          <div className=" text-center text-[18px] font-bold mt-[10px] mb-[10px]">Register as</div>
          <div className="flex gap-5 justify-around">
            <button
              className="cursor-pointer hover:opacity-75  w-[150px] text-[14px] h-[30px] bg-[#026cce] text-white rounded-[10px]"
              onClick={() => {
                navigate("/register", {
                  state: { role: "receptionist" },
                });
              }}
            >
              Receptionist
            </button>
            <button
              className="cursor-pointer hover:opacity-75 w-[150px] text-[14px] h-[30px] bg-[#026cce] text-white rounded-[10px]"
              onClick={() => {
                navigate("/register", {
                  state: { role: "doctor" },
                });
              }}
            >
              Doctor
            </button>
          </div>
        </div>
      </div>
      <div className="max-[585px]:text-[30px] text-center text-blue-500 font-bold text-[40px] mt-[100px] mb-[100px] text-decoration: underline">OUR CAPABILITIES</div>
      <div className=" flex justify-center b">
        <div className=" max-[1040px]:pl-[20px] max-[1040px]:pr-[20px] w-[70vw] p-[50px] flex justify-center flex-col gap-[150px] pl-[200px] pr-[200px] pb-[200px]">
          <div className="max-[1040px]:w-full ">
            <div className="flex justify-center mb-[40px]"><HeartPulse className="h-25 w-25 text-blue-500"/></div>
            <div className="text-center text-blue-500 font-bold text-[20px]">Receptionists can register patients in seconds with a simple digital form</div>
          </div>
          <div className="">
            <div className="flex justify-center mb-[40px]"><Clock  className="h-25 w-25 text-blue-500"/></div>
            <div className="text-center text-blue-500 font-bold text-[20px]">Newly registered patients instantly appear on the doctor’s screen in real time</div>
          </div>
          <div className="">
            <div className="flex justify-center mb-[40px]"><Workflow  className="h-25 w-25 text-blue-500"/></div>
            <div className="text-center text-blue-500 font-bold text-[20px]">Smooth coordination between reception and doctors reduces waiting time</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Homepage;
