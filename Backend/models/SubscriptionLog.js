import mongoose from 'mongoose';

const subscriptionLogSchema = new mongoose.Schema({
  subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  current_status: { type: String, required: true },
  next_status: { type: String, required: true },
  action: { type: String, required: true },
  action_date: { type: Date, required: true }
});

export default mongoose.model('SubscriptionLog', subscriptionLogSchema);