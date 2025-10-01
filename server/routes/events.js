const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const upload = require("../middleware/uploadEvents");
const authMiddleware = require("../middleware/authMiddleware").authMiddleware;
const adminOnly = require("../middleware/authMiddleware").adminMiddleware;


// Public: list events (optional ?upcoming=true)
router.get("/", eventController.getEvents);

// Public: get single event by id
router.get("/:id", eventController.getEvent);

// Protected / admin actions
// Create event: fields + files (coverImage + images[])
router.post(
  "/",
  authMiddleware,
  adminOnly,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ]),
  eventController.createEvent
);

// Update basic fields (optionally replace cover via single file 'coverImage')
router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  upload.single("coverImage"),
  eventController.updateEvent
);

// Add more images to existing event
router.put(
  "/:id/images",
  authMiddleware,
  adminOnly,
  upload.array("images", 20),
  eventController.addImages
);

// Delete single image
router.delete("/:id/image/:imgName", authMiddleware, adminOnly, eventController.deleteImage);

// Delete event
router.delete("/:id", authMiddleware, adminOnly, eventController.deleteEvent);

module.exports = router;
