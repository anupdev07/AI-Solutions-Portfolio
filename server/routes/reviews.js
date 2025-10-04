const express = require("express");
const router = express.Router();
const {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware").authMiddleware;
const adminOnly = require("../middleware/authMiddleware").adminMiddleware;

// Public - view approved reviews
router.get("/", getApprovedReviews);

// User - submit review
router.post("/", authMiddleware, createReview);

// Admin - view all reviews
router.get("/all", authMiddleware, adminOnly, getAllReviews);

// Admin - approve/deny
router.put("/:id/status", authMiddleware, adminOnly, updateReviewStatus);

// Admin - delete
router.delete("/:id", authMiddleware, adminOnly, deleteReview);

module.exports = router;
