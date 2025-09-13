const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  discountPercent: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Discount", DiscountSchema);
