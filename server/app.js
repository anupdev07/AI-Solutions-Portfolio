const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const contactRoutes = require("./routes/contact.js");

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Sample test route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

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
