const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/:slug", getBlog);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, upload.single("coverImage"), createBlog);
router.put("/:id", authMiddleware, adminMiddleware, upload.single("coverImage"), updateBlog);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBlog);

module.exports = router;
