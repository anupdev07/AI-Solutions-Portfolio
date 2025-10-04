const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, // star rating
    satisfactionScore: { type: Number, min: 1, max: 10 }, // extra metric
    recommend: { type: Boolean, default: false }, // recommend or not
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
