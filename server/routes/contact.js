const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  deleteContact,
} = require("../controllers/contactController");


// Public route: create contact (any user can submit)
router.post("/", createContact);

// Admin-only: list contacts
router.get("/", getContacts);

// Admin-only: delete contact
router.delete("/:id", deleteContact);

module.exports = router;
