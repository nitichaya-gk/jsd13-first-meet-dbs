const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  listing_id: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true, default: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [orderItemSchema], required: true },
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending_payment", "paid", "shipped", "completed", "cancelled"],
    default: "pending_payment",
  },
  payment_slip: { type: String },
  shipping_address: { type: String },
  phone: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
});

orderSchema.index({ buyer_id: 1, created_at: -1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model("Order", orderSchema);
