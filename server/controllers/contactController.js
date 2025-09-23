const Contact = require("../models/ContactMessage");

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, company, country, jobTitle, jobDetails, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ msg: "Name, email, and phone are required" });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      company,
      country,
      jobTitle,
      jobDetails,
      message,
    });

    await contact.save();
    res.status(201).json({ msg: "Contact message saved successfully", contact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all inquiries
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete inquiry
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Inquiry not found" });
    res.json({ msg: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
