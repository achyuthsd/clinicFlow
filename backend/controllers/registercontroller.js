import User from "../models/user.js";
import Detail from "../models/details.js";

export const postUser = async (req, res) => {
  const {
    username,
    password,
    name,
    age,
    state,
    country,
    phno,
    gender,
    specialization,
    role,
    email,
  } = req.body;


  try {

    const user = new User({ username,
       password,
      name,
      age,
      state,
      country,
      phno,
      gender,
      specialization,
      role,
      email,
      });
    const savedUser = await user.save();


    res.status(201).json({
      msg: "User registered successfully",
      userId: savedUser._id,
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    res.status(500).json({ msg: "Registration failed" });
  }
};