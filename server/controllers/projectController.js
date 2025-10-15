const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");

function removeFileIfExists(filename, folder) {
  if (!filename) return;
  const p = path.join(__dirname, "..", "uploads", folder, filename);
  fs.access(p, fs.constants.F_OK, (err) => {
    if (!err) fs.unlink(p, () => {});
  });
}

// Create
exports.createProject = async (req, res) => {
  try {
    const { title, clientName, summary, details, year, link, featured } = req.body;

    // fields used in route: logo and coverImage
    const logoFilename = req.files?.logo?.[0]?.filename;
    const coverFilename = req.files?.coverImage?.[0]?.filename;

    const project = new Project({
      title,
      clientName,
      summary,
      details,
      year,
      link,
      featured: featured === "true" || featured === true,
      logo: logoFilename || undefined,
      coverImage: coverFilename || undefined,
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("createProject:", err);
    res.status(500).json({ msg: "Failed to create project" });
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

// Update
exports.updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, clientName, summary, details, year, link, featured } = req.body;

    const update = {
      title,
      clientName,
      summary,
      details,
      year,
      link,
      featured: featured === "true" || featured === true,
    };

    // If new files provided via fields
    const newLogo = req.files?.logo?.[0]?.filename;
    const newCover = req.files?.coverImage?.[0]?.filename;

    const existing = await Project.findById(id).select("logo coverImage");

    if (newLogo) {
      if (existing?.logo) removeFileIfExists(existing.logo, "projects");
      update.logo = newLogo;
    }
    if (newCover) {
      if (existing?.coverImage) removeFileIfExists(existing.coverImage, "projects");
      update.coverImage = newCover;
    }

    const project = await Project.findByIdAndUpdate(id, update, { new: true });
    res.json(project);
  } catch (err) {
    console.error("updateProject:", err);
    res.status(500).json({ msg: "Failed to update project" });
  }
};

// Delete
exports.deleteProject = async (req, res) => {
  try {
    const p = await Project.findByIdAndDelete(req.params.id);
    if (p?.logo) removeFileIfExists(p.logo, "projects");
    if (p?.coverImage) removeFileIfExists(p.coverImage, "projects");
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("deleteProject:", err);
    res.status(500).json({ msg: "Delete failed" });
  }
};
