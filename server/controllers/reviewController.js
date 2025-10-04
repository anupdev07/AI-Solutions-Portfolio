const Review = require("../models/Review");

// Create new review (default pending)
exports.createReview = async (req, res) => {
  try {
    const { rating, satisfactionScore, recommend, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ msg: "Rating and message are required" });
    }

    const review = new Review({
      user: req.user.id, // logged-in user
      rating,
      satisfactionScore,
      recommend,
      message,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get approved reviews (for frontend)
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all reviews (admin)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Approve/Deny review (admin)
exports.updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "denied"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!review) return res.status(404).json({ msg: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete review (admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });
    res.json({ msg: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
