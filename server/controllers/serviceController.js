const Service = require("../models/Service");
const fs = require("fs");
const path = require("path");

function removeFileIfExists(filename, folder) {
  if (!filename) return;
  const p = path.join(__dirname, "..", "uploads", folder, filename);
  fs.access(p, fs.constants.F_OK, (err) => {
    if (!err) fs.unlink(p, () => {});
  });
}

// Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const icon = req.file?.filename || undefined;

    const service = new Service({
      title,
      description,
      category,
      icon,
    });

    await service.save();
    res.json(service);
  } catch (err) {
    console.error("createService:", err);
    res.status(500).json({ msg: "Failed to create service" });
  }
};

// Get All Services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, category } = req.body;
    const update = { title, description, category };

    if (req.file?.filename) {
      const existing = await Service.findById(id).select("icon");
      if (existing?.icon) removeFileIfExists(existing.icon, "services");
      update.icon = req.file.filename;
    }

    const svc = await Service.findByIdAndUpdate(id, update, { new: true });
    res.json(svc);
  } catch (err) {
    console.error("updateService:", err);
    res.status(500).json({ msg: "Failed to update service" });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const s = await Service.findByIdAndDelete(req.params.id);
    if (s?.icon) removeFileIfExists(s.icon, "services");
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("deleteService:", err);
    res.status(500).json({ msg: "Delete failed" });
  }
};
