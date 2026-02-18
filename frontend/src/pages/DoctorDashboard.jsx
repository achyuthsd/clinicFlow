import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import icon from "../assets/undraw_relaxation_jsge.svg";
import FormattedDateIST from './FormattedDateIST';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {

const navigate = useNavigate()
const [userEmail, setuserEmail] = useState('')
const [userName, setuserName] = useState('')
const [userDept, setuserDept] = useState('')
const [userDept2, setuserDept2] = useState('')
const [relax, setrelax] = useState(false)
const [appo, setappo] = useState(false)
const [pat, setpat] = useState([])

const fetchInfo = async()=>{
    try {
        const user_id_f = localStorage.getItem("accid");
         const res = await axios.get(`https://clinicflow-n8xb.onrender.com/api/user/${user_id_f}`)
        console.log(res.data)
        setuserEmail(res.data.email)
        setuserName(res.data.name)
        setuserDept2(res.data.specialization)
        setuserDept(res.data.specialization.charAt(0).toUpperCase() + res.data.specialization.slice(1))
        
    } catch (error) {
        console.log(error)
    }

}

const fetchInfo2 = async()=>{
    try {
         const res2 = await axios.get(`https://clinicflow-n8xb.onrender.com/api/patient/${userDept2}`)
        console.log(res2.data)
 if (!res2.data || res2.data.length === 0) {
      setrelax(true);
    } else {
      // 🔹 FILTER FUTURE APPOINTMENTS ONLY
      const now = new Date();

const futureAppointments = res2.data
  .filter(item => new Date(item.datetime) > now)
  .sort((a, b) => new Date(a.datetime) - new Date(b.datetime)); // 👈 sort nearest first


      if (futureAppointments.length === 0) {
        setrelax(true);
      } else {
        setpat(futureAppointments);
      }
    }
        
    } catch (error) {
        console.log(error)
    }
    finally{
      setappo(true)
    }

}

useEffect(() => {
  fetchInfo()

}, [])


useEffect(() => {
  const handleBack = () => {
    localStorage.removeItem("accid");
    navigate("/login", { replace: true });
  };

  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, [navigate]);



  return (
    <div>
      <div className=' p-[40px] max-[880px]:p-[10px] '>
        <div className='text-[#026cce] text-[30px] max-[457px]:text-[22px]'>Welcome, <span className='font-bold'>{userName}</span></div>
        <div className='text-[#026cce] text-[18px] max-[457px]:text-[16px]'>Email: &nbsp;<span className='font-bold'>{userEmail}</span></div>
        <div className='text-[#026cce] text-[18px] max-[457px]:text-[16px]'>Specialization: &nbsp;<span className='font-bold'>{userDept}</span></div>
      </div>
      <div className=' flex justify-center min-h-[100vh]  '>
{
  appo ? <div className='w-[90vw] flex  flex-col'>
    {!relax ? <div>
<div className='text-blue-500 text-[30px] text-center font-bold mb-[40px] underline max-[457px]:text-[25px]'>
   Appointments
</div>
<div className='bg-blue-500 flex max-[880px]:w-[90vw]' >
  <div className='w-[25%] h-[30px] pt-[3px] border-r-[2px] border-white text-center text-white font-bold '>Name</div>
  <div className='w-[25%] h-[30px] pt-[3px] border-r-[2px] border-white text-center text-white font-bold'>Age</div>
  <div className='w-[25%] h-[30px] pt-[3px] border-r-[2px] border-white text-center text-white font-bold'>Gender</div>
  <div className='w-[25%] h-[30px] pt-[3px] border-r-[2px] border-white text-center text-white font-bold'>Time</div>
</div>
{pat.map((item, index) => (
  <div key={index} className='flex max-[880px]:w-[90vw]'>
    <div className='max-[880px]:text-[13px] w-[25%] min-h-[30px] pt-[3px] border-r-[2px] border-blue-500 flex justify-center text-blue-500 font-bold text-[20px] border-b-2 p-[40px] max-[710px]:p-[5px]'>{item.name}</div>
  <div className='max-[880px]:text-[13px] w-[25%] min-h-[30px] pt-[3px] border-r-[2px] border-blue-500 flex justify-center text-blue-500 font-bold text-[20px] border-b-2 p-[40px]'>{item.age}</div>
  <div className='max-[880px]:text-[13px] w-[25%] min-h-[30px] pt-[3px] border-r-[2px] border-blue-500 flex justify-center text-blue-500 font-bold text-[20px] border-b-2 p-[40px]'>{item.gender}</div>
  <div className='max-[880px]:text-[13px] w-[25%] min-h-[30px] pt-[3px]  text-center text-blue-500 font-bold text-[17px] border-b-2 p-[40px] max-[880px]:text-[13px] max-[710px]:p-[5px] flex justify-center'><FormattedDateIST value={item.datetime} /></div>
  </div>
))}
<div className='text-blue-500 font-bold mt-[20px] italic text-[14px]'>NOTE: Past appointments are not displayed</div>
</div>:<div className='flex justify-center'>
  <div>
    <img src={icon} className="w-80 h-50" />
    <div className='flex justify-center text-blue-500 font-bold text-[15px]'>No Appointments Today</div>
  </div>
</div>}
</div>:<div className='p-[40px]'>
  <button onClick={fetchInfo2} className='bg-blue-500 rounded rounded-[5px] text-white text-[20px] h-[40px] w-[300px] hover:opacity-90 cursor-pointer'>Fetch Appointments</button>
</div>
}
      </div>
             <ToastContainer />
      
    </div>
  )
}

export default DoctorDashboard
