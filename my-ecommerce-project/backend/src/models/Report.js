const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  reporter_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "reviewing", "resolved", "rejected"],
  },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
