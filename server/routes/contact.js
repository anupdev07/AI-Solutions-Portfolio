const express = require("express");
const router = express.Router();
const {
  getInquiries,
  createInquiry,
  deleteInquiry,
} = require("../controllers/contactController");


// Public route: create inquiry (any user can submit)
router.post("/", createInquiry);

// Admin-only: list inquiries
router.get("/",  getInquiries);

// Admin-only: delete inquiry
router.delete("/:id",  deleteInquiry);

module.exports = router;
