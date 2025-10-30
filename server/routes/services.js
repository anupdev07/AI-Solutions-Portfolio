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

// update service - allow icon replacement
router.put(
  "/:id",
  auth,
  uploadTo("services").single("icon"),
  serviceController.updateService
);

module.exports = router;
