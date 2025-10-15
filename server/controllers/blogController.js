const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

function removeFileIfExists(filename, folder) {
  if (!filename) return;
  const p = path.join(__dirname, "..", "uploads", folder, filename);
  fs.access(p, fs.constants.F_OK, (err) => {
    if (!err) fs.unlink(p, () => {});
  });
}

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, tags, author } = req.body;
    const coverImage = req.file?.filename || undefined;

    const blog = new Blog({
      title,
      excerpt,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      author: author || (req.user && req.user.username) || "Admin",
      coverImage,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error("createBlog:", err);
    res.status(500).json({ msg: "Failed to create blog" });
  }
};
// Get All Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Single Blog by Slug
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate("author", "username email");
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, excerpt, content, tags, author } = req.body;

    const update = {
      title,
      excerpt,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    };

    // handle cover image replacement (single file)
    if (req.file?.filename) {
      const existing = await Blog.findById(id).select("coverImage");
      if (existing?.coverImage) removeFileIfExists(existing.coverImage, "blogs");
      update.coverImage = req.file.filename;
    }

    if (author) update.author = author;

    const blog = await Blog.findByIdAndUpdate(id, update, { new: true });
    res.json(blog);
  } catch (err) {
    console.error("updateBlog:", err);
    res.status(500).json({ msg: "Failed to update blog" });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog?.coverImage) removeFileIfExists(blog.coverImage, "blogs");
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("deleteBlog:", err);
    res.status(500).json({ msg: "Delete failed" });
  }
};
