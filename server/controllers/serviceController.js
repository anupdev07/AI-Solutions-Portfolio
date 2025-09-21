const Service = require("../models/Service");

// Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required" });
    }

    const service = new Service({
      title,
      description,
      category,
      icon: req.file ? req.file.filename : null,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ msg: "Server error" });
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

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });
    res.json({ msg: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
