const Project = require("../models/Project");

// Create
exports.createProject = async (req, res) => {
  try {
    const { title, clientName, summary, details, year, link, featured } = req.body;

    const logo = req.files?.logo ? req.files.logo[0].filename : null;
    const coverImage = req.files?.coverImage ? req.files.coverImage[0].filename : null;

    const project = new Project({
      title,
      clientName,
      summary,
      details,
      year,
      link,
      featured: !!featured,
      logo,
      coverImage,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("Create Project Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
