const mongoose = require("mongoose");

const UsageStatSchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
  month: { type: Date, required: true },
  dataUsedGB: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UsageStat", UsageStatSchema);
