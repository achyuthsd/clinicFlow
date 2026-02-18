import User from "../models/user.js";

export const getUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(200).json({
        msg: "No such user exists",
        userId: ""
      });
    }

    // ✅ compare hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(200).json({
        msg: "Check your password & try again",
        userId: ""
      });
    }

    // ✅ login success
    res.status(200).json({
      msg: "Logged in successfully",
      userId: user._id,
      role:user.role
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
