import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import userRoutes from "./server/routes/user.routes.js";

// --- Middleware for user routes ---
app.use("/",userRoutes);
// --- Mongoose setup ---
mongoose.Promise = global.Promise;

// ✅ Connect to local MongoDB Compass (Portfolio database)
mongoose
  .connect("mongodb://127.0.0.1:27017/Portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Compass (Portfolio database)");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
  });

// --- Event listener for connection errors ---
mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});

// --- Default route ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio Backend 🚀" });
});

// --- Start the server ---
app.listen(config.port || 3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`✅ Server started on port ${config.port || 3000}`);
  }
});
