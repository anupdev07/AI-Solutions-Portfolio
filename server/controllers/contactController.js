const Contact = require("../models/ContactMessage");

// Get all inquiries
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Create inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const inquiry = new Contact({ name, email, subject, message });
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
