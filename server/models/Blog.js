const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true }, // <-- allow string
    tags: [{ type: String }],
    coverImage: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
