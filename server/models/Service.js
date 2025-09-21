const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String }, // filename of uploaded image/icon
    category: { type: String, default: "General" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
