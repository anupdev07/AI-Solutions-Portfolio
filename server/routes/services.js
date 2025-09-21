const express = require("express");
const router = express.Router();
const {
  createService,
  getServices,
  deleteService,
} = require("../controllers/serviceController");

const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// GET all services (public)
router.get("/", getServices);


router.post("/", authMiddleware, adminMiddleware, upload.single("icon"), createService);

// DELETE service (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteService);

module.exports = router;
