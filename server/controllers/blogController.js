const Blog = require("../models/Blog");
const slugify = require("slugify");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, tags } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({ msg: "Title, content, and excerpt are required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      coverImage: req.file ? req.file.filename : null,
      author: req.user.id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ msg: "Server error" });
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
    const { title, content, excerpt, tags } = req.body;

    let slug;
    if (title) slug = slugify(title, { lower: true, strict: true });

    const updateData = {
      title,
      slug,
      content,
      excerpt,
      tags: tags ? tags.split(",").map(t => t.trim()) : []
    };

    if (req.file) {
      updateData.coverImage = req.file.filename;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json({ msg: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
