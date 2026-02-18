import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import { useLocation } from 'react-router-dom'
const Login = () => {
    const [user, setuser] = useState('')
    const [pass, setpass] = useState('')
    const navigate = useNavigate()
const [checked, setChecked] = useState(false)
// const { state } = useLocation();
// const role = state?.role;
{/* <div>
        <input type="text" onChange={(e)=>{setuser(e.target.value)}} />
        <input type="text" onChange={(e)=>{setpass(e.target.value)}}/>
        <button onClick={handlelogin}>Login</button>
      </div>
      <ToastContainer /> */}

 const handlelogin = async ()=>{
    try {
       const res = await axios.post('http://localhost:5000/api/login',{
        username:user,
        password:pass
    })
    console.log(res.data) 
    if (res.data.msg == "No such user exists")
    {
      toast.info("No such user exists")
    }
    else if(res.data.msg == "Check your password & try again")
    {
      toast.info("Check your password & try again")
    }
    else{
      localStorage.setItem("accid", res.data.userId);
      toast.success("Logged in successfully!")
     setTimeout(() => {
  if(res.data.role === 'receptionist') navigate('/receptionist-dashboard', { replace: true });
  else if(res.data.role === 'doctor') navigate('/doctor-dashboard', { replace: true });
}, 3000)
  

    }
    } catch (error) {
        console.log(error)
    }
 }



  return (
    <div>
      <div className="flex justify-center items-center h-[100vh] bg-no-repeat bg-center bg-cover bg-[#5f5b5b] bg-blend-multiply"
        style={{
    backgroundImage:
      "url('https://wallpapers.com/images/hd/physician-group-photo-ideas-pvxso3pip2x34ewg.jpg')",
  }}
      
      >
        <div className='bg-white h-[240px] w-[500px] rounded-[10px] p-[40px] max-[556px]:w-[93vw]'>
  <div className='text-[#026cce] font-bold text-[23px] text-center'>
    Welcome Back!
  </div>
  <div>
    <input type="text" onChange={(e)=>{setuser(e.target.value)}}  className='w-full pl-[15px] pr-[15px] border rounded-[10px] mt-[10px]' placeholder='username'/>
  </div>
  <div>
    <input type={checked ? 'text' : 'password'} onChange={(e)=>{setpass(e.target.value)}}  className='w-full pl-[15px] pr-[15px] border rounded-[10px] mt-[15px]' placeholder='password'/>
  </div>
   <div className='text-gray-600 flex gap-[10px] mt-[5px]'>
    <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-[14px] h-[14px] mt-[5px] cursor-pointer"
        />
        <div className='text-[13px] mt-[2px]'>Show password</div>
   </div>
  <div className='flex mt-[15px] justify-around'>
    <button onClick={handlelogin} className='cursor-pointer hover:opacity-75 w-[140px] bg-[#026cce] rounded-[10px] text-white text-[14px] h-[25px]'>Login</button>
    <button onClick={()=>{navigate('/')}} className='cursor-pointer hover:opacity-75 w-[140px] bg-[#026cce] rounded-[10px] text-white text-[14px] h-[25px]'>&lt; Go back</button>
    
  </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  )
}

export default Login
