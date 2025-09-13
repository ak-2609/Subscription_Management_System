const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { 
    type: String, 
    enum: ["ACTIVE","CANCELLED","EXPIRED","UPGRADED","DOWNGRADED"], 
    required: true 
  },
  discountId: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
