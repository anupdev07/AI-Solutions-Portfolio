const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const contactRoutes = require("./routes/contact.js");
const blogRoutes = require("./routes/blogs.js");

const path = require("path");


// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Sample test route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});




app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);


// Routes (to be expanded)
app.use('/api', require('./routes/index'));
app.use("/api/contact", contactRoutes);
const PORT = process.env.PORT || 5000;
const start=async ()=>{
  try {

    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
  console.log(`Server running on url http://localhost:${PORT}`);
});
  } catch (error) {
    
  }
}
start();
