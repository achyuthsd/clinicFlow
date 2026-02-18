import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from "jspdf";

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'


const PatientRegister = () => {

const navigate  = useNavigate()
const [userName, setuserName] = useState('')
const [userEmail, setuserEmail] = useState('')



const downloadPDF = () => {
  const doc = new jsPDF();

  if (!formData.name || !formData.age || !formData.gender || !formData.phno || !formData.email || !formData.category || !formData.state || !formData.country)
{
  toast.info('Pls fill all details!')
}
else{
  let y = 20;

  // ===== HEADER =====
  doc.setFont("helvetica", "bold");
  doc.setTextColor(2, 108, 206); 
  doc.setFontSize(30);
const pageWidth = doc.internal.pageSize.getWidth();

doc.text("ClinicFlow", pageWidth / 2, y, {
  align: "center"
});

  // underline
  doc.setLineWidth(0.5);
  doc.line(20, y + 3, 190, y + 3);

  y += 15;

  // ===== CONTENT =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(15);
    doc.setTextColor(0, 0, 0); 

  const addLeftText = (label, value) => {
    doc.text(`${label}: ${value}`, 20, y);
    y += 8;
  };

  addLeftText("Name", formData.name);
  addLeftText("Age", formData.age);
  addLeftText("Gender", formData.gender.toUpperCase());
  addLeftText("Phone", formData.phno);
  addLeftText("Email", formData.email);
  addLeftText("Department", formData.category.toUpperCase());
  addLeftText("State", formData.state);
  addLeftText("Country", formData.country);

  // ===== DATE & TIME (IST) =====
  const dateObj = new Date(formData.datetime);

  const appointmentDate = dateObj.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  const appointmentTime = dateObj.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit"
  });

  y += 5;
  addLeftText("Appointment Date", appointmentDate);
  addLeftText("Appointment Time", appointmentTime);

  // ===== SAVE =====
  doc.save("appointment.pdf");
}
};




  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phno: "",
    state: "",
    country: "",
    category: "",
    datetime: "",
    email: ""
  });


// const navigate = useNavigate()

const fetchInfo = async()=>{
    try {
        const user_id_f = localStorage.getItem("accid");
         const res = await axios.get(`http://localhost:5000/api/user/${user_id_f}`)
        console.log(res.data)
        setuserEmail(res.data.email)
        setuserName(res.data.name)
        
    } catch (error) {
        console.log(error)
    }

}

useEffect(() => {
  fetchInfo()
}, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:5000/api/patient", formData);
    toast.success("Patient created successfully!")
  } catch (err) {
    
    toast.error("Something went wrong")
    console.error(err);
  }
};

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
      <div className=' p-[40px]'>
        <div className='text-[#026cce] text-[30px]'>Welcome, <span className='font-bold'>{userName}</span></div>
        <div className='text-[#026cce] text-[18px]'>Email: &nbsp;<span className='font-bold'>{userEmail}</span></div>
      </div>
      <div className=''>
        <div className='text-center text-[#026cce] font-bold text-[30px]'>Patient Registration</div>
      </div>
      <div className='mt-[40px] flex justify-center mb-[20px]'>
        <div className=' w-[70vw] flex justify-center'>
            <div className='flex flex-col justify-center [&_input]:border [&_input]:border-black [&_input]:h-[35px] [&_input]:rounded-[5px] gap-[35px] [&_input]:w-[60vw] max-[817px]:[&_input]:w-[90vw] [&_input]:p-[10px] [&_select]:border [&_select]:p-[5px] max-[817px]:[&_select]:w-[90vw] [&_select]:border-black [&_select]:rounded-[5px] [&_select]:h-[35px] [&_select]:w-[60vw] pb-[150px]'>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input
  name="age"
  type="number"
  value={formData.age}
  onChange={handleChange}
  placeholder="Age"
/>

<select name="gender" value={formData.gender} onChange={handleChange}>
  <option value="" disabled>Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>

<input
  name="phno"
  value={formData.phno}
  onChange={handleChange}
  placeholder="Phone Number"
/>

<input
  name="state"
  value={formData.state}
  onChange={handleChange}
  placeholder="State"
/>

<input
  name="country"
  value={formData.country}
  onChange={handleChange}
  placeholder="Country"
/>

<select name="category" value={formData.category} onChange={handleChange}>
  <option value="" disabled>Select Department</option>
  <option value="general">General</option>
  <option value="pediatrics">Pediatrics</option>
  <option value="gynecology">Gynecology</option>
  <option value="cardiology">Cardiology</option>
  <option value="neurology">Neurology</option>
  <option value="ent">ENT</option>
  <option value="urology">Urology</option>
</select>


<div>
  <div className='text-gray-600 text-[15px] mb-[7px]'>Select Appointment Date & Time:</div>
<input
  type="datetime-local"
  name="datetime"
  value={formData.datetime}
  onChange={handleChange}
  placeholder=""
/>
</div>


<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email"
/>

      <div className='flex flex-col gap-3'>
        <button className='bg-[#026cce] text-white font-bold rounded h-[35px] hover:opacity-80 cursor-pointer' onClick={handleSubmit}>Register</button>
      <button className='bg-[#026cce] text-white font-bold rounded h-[35px] hover:opacity-80 cursor-pointer' onClick={downloadPDF}>Download Appointment</button>
      </div>
      <div className=' text-[#026cce] font-bold italic text-[14px]'>
        NOTE: It is recommended to Download Appointment first before Registering
      </div>
      
    </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default PatientRegister
