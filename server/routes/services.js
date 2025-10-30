const express = require("express");
const router = express.Router();
const { uploadTo } = require("../middleware/upload");
const auth = require("../middleware/authMiddleware").authMiddleware;
const serviceController = require("../controllers/serviceController");

// create service - icon goes to uploads/services
router.post(
  "/",
  auth,
  uploadTo("services").single("icon"),
  serviceController.createService
);

// Get all services (public)
router.get("/", serviceController.getServices);

// Update service - allow icon replacement
router.put(
  "/:id",
  auth,
  uploadTo("services").single("icon"),
  serviceController.updateService
);

// Delete service (admin)
router.delete("/:id", auth, serviceController.deleteService);

module.exports = router;
