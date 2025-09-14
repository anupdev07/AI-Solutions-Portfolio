const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ msg: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
