const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },   // short summary for card
    details: { type: String },                       // long content for detail page (HTML/markdown)
    date: { type: Date, required: true },
    venue: { type: String, trim: true },
    category: { type: String, trim: true },
    coverImage: { type: String },                    // single cover filename
    images: [{ type: String }],                      // additional gallery images
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
