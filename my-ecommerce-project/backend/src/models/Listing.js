const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  item_condition: {
    type: String,
    required: true,
    enum: ["used_like_new", "used_good", "used_fair"],
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "reserved", "sold"],
  },
  images: [{ type: String }],
  location: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
});

listingSchema.index({ seller_id: 1 });
listingSchema.index({ category_id: 1 });
listingSchema.index({ status: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ created_at: -1 });

module.exports = mongoose.model("Listing", listingSchema);
