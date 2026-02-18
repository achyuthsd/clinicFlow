import Patient from "../models/patients.js";


export const postPatient = async (req, res) => {
  const {
    name,
    age,
    state,
    country,
    phno,
    gender,
    category,
    datetime,
    email,
  } = req.body;


  try {

    const patient = new Patient({
      name,
      age,
      state,
      country,
      phno,
      gender,
      category,
      datetime,
      email,
    });

    await patient.save();

    res.status(201).json({
      msg: "Patient registered successfully",
    });

  } catch (error) {
    console.error(error);


    res.status(500).json({ msg: "Registration failed" });
  }
};

export const getPatient = async (req, res) => {
  
  try {
    const cat = req.params.id
  const pat = await Patient.find({category:cat})
  if(!pat) return res.status(404).json({ message: "Pat not found" });
  res.json(pat)
     

    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
 
};