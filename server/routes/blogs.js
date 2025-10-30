const express = require("express");
const router = express.Router();
const { uploadTo } = require("../middleware/upload");
const auth = require("../middleware/authMiddleware").authMiddleware;

const blogController = require("../controllers/blogController");

// Public routes
router.get("/", blogController.getBlogs);
router.get("/:slug", blogController.getBlog);

// Admin routes  
router.post("/", auth, uploadTo("blogs").single("coverImage"), blogController.createBlog);
router.put("/:id", auth, uploadTo("blogs").single("coverImage"), blogController.updateBlog);
router.delete("/:id", auth, blogController.deleteBlog);

module.exports = router;
