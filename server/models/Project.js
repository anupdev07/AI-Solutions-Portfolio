const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },      // e.g. "Banking Portal"
    clientName: { type: String },                 // e.g. "Nepal Bank"
    summary: { type: String },                    // short preview text
    details: { type: String },                    // full description
    year: { type: Number },                       // project year
    link: { type: String },                       // external link (optional)
    logo: { type: String },                       // filename for logo
    coverImage: { type: String },                 // filename for cover/banner
    featured: { type: Boolean, default: false },  // show on homepage if true
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
