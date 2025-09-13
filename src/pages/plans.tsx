import React, { useState } from "react";
import "./plans.css";

interface Plan {
  product_id: number;
  name: string;
  price: number;
  data_quota_gb: number;
  status: string;
}

const plans: React.FC = () => {
  const [planList, setPlanList] = useState<Plan[]>([
    { product_id: 1, name: "Small", price: 100, data_quota_gb: 1000, status: "Active" },
    { product_id: 2, name: "MEdium", price: 300, data_quota_gb: 2000, status: "Active" },
    { product_id: 3, name: "Large", price: 500, data_quota_gb: 10000, status: "Inactive" },
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this plan?")) {
      setPlanList(planList.filter((p) => p.product_id !== id));
    }
  };

  return (
    <div className="plans-container">
      <h2 className="plans-heading">Available Plans</h2>

      <div className="plans-grid">
        {planList.map((plan) => (
          <div key={plan.product_id} className="plan-card">
            <h3>{plan.name}</h3>
            <p><strong>Quota:</strong> {plan.data_quota_gb} GB</p>
            <p><strong>Price:</strong> ₹{plan.price}</p>
            <p><strong>Status:</strong> {plan.status}</p>

            <div className="card-actions">
              <button className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(plan.product_id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default plans;
