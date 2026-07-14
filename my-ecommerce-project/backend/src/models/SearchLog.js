const mongoose = require("mongoose");

const searchLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  keyword: { type: String, required: true },
  searched_at: { type: Date, required: true, default: Date.now },
});

searchLogSchema.index({ user_id: 1, searched_at: -1 });
searchLogSchema.index({ keyword: 1 });
searchLogSchema.index({ searched_at: -1 });

module.exports = mongoose.model("SearchLog", searchLogSchema);
