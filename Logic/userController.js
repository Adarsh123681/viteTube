const user = require("../model/Userschema");
const bcrypt = require("bcryptjs");
const uploadOnCloudinary = require("../cloudinaryConfig/config");
const path = require("path");
const registerUser = async function (req, res) {
  // all details of the user from the database
  const { userName, email, password, confirmPassword, address , imageUrl} = await req.body;
  // find the user from the databse it exists or not
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    
    const User = await user.create({
      userName,
      email,
      password,
      confirmPassword,
      address,
      imageUrl,
    });
    // save the user in the database
    const saveUser = await User.save();
    if (saveUser) {
      return res
        .status(200)
        .json({ message: "User registerd suceessfully...." });
    } else {
      res.status(400).json({ message: "Invalid credetials" });
    }
  }
};

const logIn = async (req, res) => {
  try {
    const { password, email } = req.body;
    // Check if the user exists in the sample data
    const findUser = await user.findOne({
      email: email,
    });

    if (!findUser) {
      return res.status(422).json({ message: "Invalid Creditanls" });
    }
    const match = await bcrypt.compare(password, findUser.password);

    token = await findUser.generateAuthToken();

    if (!match) {
      res.status(400).json({ error: "invalid credentials match" });
    }
    res.json({ message: "User signedIn successfully" });
  } catch {
    console.log("error");
    return res.status(500).json({ message: "Error" });
  }
};

const aboutPage = async (req, res) => {
  console.log("This is about Page");
};

const getAllUsers = async (req, res) => {
  const getUser = await user.find();
  
  if (!getUser) {
    console.log("all users are not found");
  } else {
    res.status(200).json({ message: "Users are found successully", getUser });
  }
};

const getUserWithId = async (req, res) => {
  const getSpecificUser = await req.params._id;
   
  const findUserWithId = await user.findById(getSpecificUser);
  if (!findUserWithId) {
    res.status(400).json({ message: "user is not found with the id" });
  } else {
    res.status(200).json({ message: "user is found", findUserWithId });
  }
};

module.exports = { registerUser, logIn, aboutPage, getAllUsers, getUserWithId };
