const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: { type: String, enum: ["FIBERNET", "COPPER", "OTHER"], required: true },
  billingCycleDays: { type: Number, required: true },
  quotaGB: { type: Number, required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Plan", PlanSchema);
