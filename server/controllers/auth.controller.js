import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

// ------------------ SIGN UP ------------------
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user using your User model (crypto-based hashing)
    const user = new User({ name, email, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret);

    // Return success response
    return res.status(201).json({
      message: "Signup successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Signup failed. Please try again." });
  }
};

// ------------------ SIGN IN ------------------
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// ------------------ SIGN OUT ------------------
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out" });
};

// ------------------ PROTECTED ROUTES ------------------
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// ------------------ AUTHORIZATION ------------------
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

export default { signup, signin, signout, requireSignin, hasAuthorization };
