const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

function removeFileIfExists(filename, folder) {
  if (!filename) return;
  const p = path.join(__dirname, "..", "uploads", folder, filename);
  fs.access(p, fs.constants.F_OK, (err) => {
    if (!err) fs.unlink(p, () => {});
  });
}

// Create new event (cover + multiple images)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, details, date, venue, category } = req.body;
    const coverImage = req.file?.filename || undefined;

    const event = new Event({
      title,
      description,
      details,
      date,
      venue,
      category,
      coverImage,
      images: [], // images added via separate endpoint
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error("createEvent:", err);
    res.status(500).json({ msg: "Failed to create event" });
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
    const id = req.params.id;
    const { title, description, details, date, venue, category } = req.body;
    const update = { title, description, details, date, venue, category };

    if (req.file?.filename) {
      const existing = await Event.findById(id).select("coverImage");
      if (existing?.coverImage) removeFileIfExists(existing.coverImage, "events");
      update.coverImage = req.file.filename;
    }

    const event = await Event.findByIdAndUpdate(id, update, { new: true });
    res.json(event);
  } catch (err) {
    console.error("updateEvent:", err);
    res.status(500).json({ msg: "Failed to update event" });
  }
};

// Add more images to existing event (req.files: images[])
exports.addImages = async (req, res) => {
  try {
    const id = req.params.id;
    const files = req.files || [];
    const filenames = files.map((f) => f.filename);

    const event = await Event.findByIdAndUpdate(
      id,
      { $push: { images: { $each: filenames } } },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    console.error("addImages:", err);
    res.status(500).json({ msg: "Failed to add images" });
  }
};

// Delete a specific image from an event (and filesystem)
exports.deleteImage = async (req, res) => {
  try {
    const { id, imageName } = req.params;
    await Event.findByIdAndUpdate(id, { $pull: { images: imageName } });
    removeFileIfExists(imageName, "events");
    res.json({ msg: "Image removed" });
  } catch (err) {
    console.error("deleteImage:", err);
    res.status(500).json({ msg: "Delete image failed" });
  }
};

// Delete event and its images
exports.deleteEvent = async (req, res) => {
  try {
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (ev?.coverImage) removeFileIfExists(ev.coverImage, "events");
    if (Array.isArray(ev?.images)) {
      ev.images.forEach((img) => removeFileIfExists(img, "events"));
    }
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("deleteEvent:", err);
    res.status(500).json({ msg: "Delete failed" });
  }
};
