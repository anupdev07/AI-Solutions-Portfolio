const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

// Helper to delete file (if exists)
function deleteFileIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Error deleting file:", filePath, err.message);
  }
}

// Create new event (cover + multiple images)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, details, date, venue, category } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ msg: "Title, description and date are required" });
    }

    // files: req.files is an object when using upload.fields()
    const coverImage = req.files?.coverImage?.[0]?.filename || null;
    const images = req.files?.images ? req.files.images.map((f) => f.filename) : [];

    const ev = new Event({
      title,
      description,
      details,
      date: new Date(date),
      venue,
      category: category || title.replace(/\s+/g, ""),
      coverImage,
      images,
    });

    await ev.save();
    res.status(201).json(ev);
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all events (optional query: ?upcoming=true or ?upcoming=false)
exports.getEvents = async (req, res) => {
  try {
    const { upcoming } = req.query;
    let filter = {};
    if (upcoming === "true") {
      filter.date = { $gte: new Date() };
    } else if (upcoming === "false") {
      filter.date = { $lt: new Date() };
    }

    const events = await Event.find(filter).sort({ date: 1 }); // earliest first
    res.json(events);
  } catch (err) {
    console.error("getEvents error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single event by id
exports.getEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: "Event not found" });
    res.json(ev);
  } catch (err) {
    console.error("getEvent error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update event (fields + optional cover replacement)
exports.updateEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: "Event not found" });

    const { title, description, details, date, venue, category } = req.body;

    if (title) ev.title = title;
    if (description) ev.description = description;
    if (details) ev.details = details;
    if (date) ev.date = new Date(date);
    if (venue) ev.venue = venue;
    if (category) ev.category = category;

    // replace cover image if provided
    if (req.file) {
      // req.file when using upload.single('coverImage') or upload.fields...
      const oldCover = ev.coverImage ? path.join(__dirname, "..", "uploads", "events", ev.coverImage) : null;
      ev.coverImage = req.file.filename;
      if (oldCover) deleteFileIfExists(oldCover);
    }

    await ev.save();
    res.json(ev);
  } catch (err) {
    console.error("updateEvent error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Add more images to existing event (req.files: images[])
exports.addImages = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ msg: "Event not found" });

    const newImages = req.files ? req.files.map((f) => f.filename) : [];
    ev.images = ev.images.concat(newImages);
    await ev.save();
    res.json(ev);
  } catch (err) {
    console.error("addImages error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a specific image from an event (and filesystem)
exports.deleteImage = async (req, res) => {
  try {
    const { id, imgName } = req.params;
    const ev = await Event.findById(id);
    if (!ev) return res.status(404).json({ msg: "Event not found" });

    const idx = ev.images.indexOf(imgName);
    if (idx === -1) return res.status(404).json({ msg: "Image not found in event" });

    // remove from array and delete file
    ev.images.splice(idx, 1);
    await ev.save();

    const filePath = path.join(__dirname, "..", "uploads", "events", imgName);
    deleteFileIfExists(filePath);

    res.json({ msg: "Image removed", event: ev });
  } catch (err) {
    console.error("deleteImage error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete event and its images
exports.deleteEvent = async (req, res) => {
  try {
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ msg: "Event not found" });

    // delete cover + images
    const base = path.join(__dirname, "..", "uploads", "events");
    if (ev.coverImage) deleteFileIfExists(path.join(base, ev.coverImage));
    if (Array.isArray(ev.images)) {
      ev.images.forEach((fn) => deleteFileIfExists(path.join(base, fn)));
    }

    res.json({ msg: "Event deleted successfully" });
  } catch (err) {
    console.error("deleteEvent error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
