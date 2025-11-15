// server/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const requireSignin = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) return res.status(401).json({ error: "No token provided" });
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    req.auth = decoded; // { _id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.auth?.role !== "admin") return res.status(403).json({ error: "Admin access required" });
  next();
};
