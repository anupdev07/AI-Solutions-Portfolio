const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Routes
const contactRoutes = require("./routes/contact.js");
const blogRoutes = require("./routes/blogs.js");
const indexRoutes = require("./routes/index.js");
const serviceRoutes = require("./routes/services.js");
const eventRoutes = require("./routes/events");
const projectRoutes = require("./routes/projects");
const reviewRoutes = require("./routes/reviews");


const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sample test route
app.get("/", (req, res) => {
  res.send("API is working ");
});

// Main API routes
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", indexRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
// Start server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

start();
