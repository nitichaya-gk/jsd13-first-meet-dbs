const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  rater_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rated_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Rating", ratingSchema);
