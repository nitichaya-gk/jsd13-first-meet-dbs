const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  line_user_id: { type: String, required: true },
  rating_avg: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
