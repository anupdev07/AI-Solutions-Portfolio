import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// Save contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();
    res.status(201).json({ msg: "Message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
