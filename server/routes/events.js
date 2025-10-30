const express = require("express");
const router = express.Router();
const { uploadTo } = require("../middleware/upload");
const auth = require("../middleware/authMiddleware").authMiddleware;
const eventController = require("../controllers/eventController");

// Public: list events (optional ?upcoming=true)
router.get("/", eventController.getEvents);

// Public: get single event by id
router.get("/:id", eventController.getEvent);

// Protected / admin actions
// Create event: fields + files (coverImage + images[])
router.post(
  "/",
  auth,
  uploadTo("events").single("coverImage"),
  eventController.createEvent
);

// Update basic fields (optionally replace cover via single file 'coverImage')
router.put(
  "/:id",
  auth,
  uploadTo("events").single("coverImage"),
  eventController.updateEvent
);

// Add more images to existing event
router.put(
  "/:id/images",
  auth,
  uploadTo("events").array("images", 20),
  eventController.addImages
);

// Delete single image
router.delete("/:id/image/:imgName", auth, eventController.deleteImage);

// Delete event
router.delete("/:id", auth, eventController.deleteEvent);

module.exports = router;
