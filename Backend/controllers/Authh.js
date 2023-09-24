const bcrypt = require("bcrypt");
const user = require("../models/user");

// signup handler

exports.signup = async (req, res) => {
  try {
    // fetch data from body
    const { name, email, password, role } = req.body;

    // check if email is already exists or not
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Email already registered",
      });
    }

    // hash password
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(502).json({
        success: false,
        message: "Not hashed",
      });
    }

    // create entry
    const User = await user.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "Entry was successful",
    });
  } catch (err) {
    console.log(err.message);
  }
};

// login Handler
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Enter All fields",
      });
    }

    const userO = await user.findOne({ email });

    if (!userO) {
      return res.status(405).json({
        success: false,
        message: "No Account Found!",
      });
    }

    if (await bcrypt.compare(password, userO.password)) {
      // password match
      res.status(200).json({
        success: true,
        message: "You are logged in",
      });
    } else {
      return res.status(408).json({
        success: false,
        message: "Wrong Password!",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
