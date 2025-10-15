const express = require("express");
const router = express.Router();
const { uploadTo } = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");

// Public routes
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);

// create project - handle logo and coverImage (both saved to uploads/projects)
router.post(
  "/",
  auth,
  uploadTo("projects").fields([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  projectController.createProject
);

// update project
router.put(
  "/:id",
  auth,
  uploadTo("projects").fields([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  projectController.updateProject
);

// Admin routes
router.delete("/:id", auth, projectController.deleteProject);

// Toggle featured status
router.patch(
  "/:id/feature",
  auth,
  async (req, res) => {
    const { featured } = req.body;
    try {
      const project = await require("../models/Project").findByIdAndUpdate(
        req.params.id,
        { featured: !!featured },
        { new: true }
      );
      if (!project) return res.status(404).json({ msg: "Not found" });
      res.json(project);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
