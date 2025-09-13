const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  actionType: { 
    type: String, 
    enum: [
      "SUBSCRIBE","CANCEL","UPGRADE","DOWNGRADE","RENEW",
      "CREATE_PLAN","UPDATE_PLAN","DELETE_PLAN",
      "CREATE_DISCOUNT","UPDATE_DISCOUNT","DELETE_DISCOUNT",
      "LOGIN","LOGOUT"
    ], 
    required: true 
  },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  targetTable: { type: String },
  actionDetails: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
