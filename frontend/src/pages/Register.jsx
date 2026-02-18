import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const { state } = useLocation();
  const roleFromRoute = state?.role || "";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    state: "",
    country: "",
    phno: "",
    gender: "",
    specialization: "none",
    role: "",
    email: "",
  });

  /* 🔹 Sync role safely */
  useEffect(() => {
    if (roleFromRoute) {
      const normalizedRole = roleFromRoute.toLowerCase();
      setFormData(prev => ({
        ...prev,
        role: normalizedRole,
      }));
    }
  }, [roleFromRoute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.username || !formData.password || !formData.role) {
      toast.info("Please fill out all details!");
      return;
    }
    
    if (formData.role === "doctor") {
      if (!formData.gender || !formData.specialization) {
        toast.info("Please fill out all details!");
        return;
      }
    }
    if (isNaN(formData.age)) {
     
        toast.info("Please enter a valid age!");
        return;
      
    }
    
    const payload = {
      ...formData,
      role: formData.role.toLowerCase(), // safety
    };

    console.log("FINAL PAYLOAD:", payload);
    
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/register",
        payload
      );
      
      toast.success('User Registered Successfully!')
      console.log(res.data);
      
      // Optional: reset form
      setFormData(prev => ({
        ...prev,
        username: "",
        password: "",
        name: "",
        age: "",
        state: "",
        country: "",
        phno: "",
        gender: "",
        specialization: "",
        email: "",
      }));
      
    } catch (err) {
      console.error(err);
      toast.info( "Please fill out all details!");
    } finally {
      setLoading(false);
    }
  };

  const isDoctor = formData.role === "doctor";

  return (
    <div className="flex justify-center mt-6 min-h-[100vh]">
      <div>
        <h2 className="text-[#026cce] font-bold text-[26px] text-center mb-4">
        Register as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}

        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" autoComplete="off">

          <input name="username" value={formData.username} onChange={handleChange}
            placeholder="Username" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <input type="password" name="password" value={formData.password}
            onChange={handleChange} placeholder="Password"
            className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <input name="name" value={formData.name} onChange={handleChange}
            placeholder="Name" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <input name="age" value={formData.age} onChange={handleChange}
            placeholder="Age" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <input name="phno" value={formData.phno} onChange={handleChange}
            placeholder="Phone" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          
            
              <select name="gender" value={formData.gender} onChange={handleChange}
                className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
{isDoctor && (
              <select name="specialization" value={formData.specialization}
                onChange={handleChange}
                className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]">
                <option value="">Select specialization</option>
                <option value="general">General</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="gynecology">Gynecology</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="ent">ENT</option>
                <option value="urology">Urology</option>
              </select>
            
)}      

          <input name="state" value={formData.state} onChange={handleChange}
            placeholder="State" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <input name="country" value={formData.country} onChange={handleChange}
            placeholder="Country" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <input name="email" value={formData.email} onChange={handleChange}
            placeholder="Email" className="border p-2 rounded w-[60vw] max-[817px]:w-[90vw]" />

          <button type="submit" disabled={loading}
            className="hover:opacity-75 cursor-pointer bg-[#026cce] text-white font-bold rounded h-[35px] mb-[100px] max-[817px]:w-[90vw]">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
             <ToastContainer />
      
    </div>
  );
};

export default Register;
