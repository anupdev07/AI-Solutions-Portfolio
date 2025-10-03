const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware").authMiddleware;
const adminOnly = require("../middleware/authMiddleware").adminMiddleware;
const multer = require("multer");
const path = require("path");

// Storage config for project uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/projects"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Public routes
router.get("/", getProjects);
router.get("/:id", getProject);

// Admin routes
router.post(
  "/",
  authMiddleware,
  adminOnly,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createProject
);

router.delete("/:id", authMiddleware, adminOnly, deleteProject);

  // Toggle featured status
  router.patch(
    "/:id/feature",
    authMiddleware,
    adminOnly,
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
