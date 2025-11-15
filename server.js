import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// --- Import all routes ---
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import contactRoutes from "./server/routes/contact.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";

// ✅ MongoDB connection setup
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1:27017/Portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Compass (Portfolio database)"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err.message));

// --- Event listener for connection errors ---
mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});

// --- ROUTES SETUP ---
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", projectRoutes);
app.use("/", contactRoutes);
app.use("/", qualificationRoutes);

// --- Default root route ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio Backend 🚀" });
});

// --- Start the Express server ---
const PORT = config.port || 3000;
app.listen(PORT, (err) => {
  if (err) console.error("❌ Server failed to start:", err);
  else console.info(`✅ Server started on port ${PORT}`);
});
