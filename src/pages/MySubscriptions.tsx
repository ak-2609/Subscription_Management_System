import React, { useState } from 'react';
import './MySubscriptions.css';

interface Subscription {
  id: string;
  name: string;
  price: number;
  type: string;
  data: string;
  speed: string;
  status: 'active' | 'pending' | 'cancelled';
  renewalDate: string;
}

const MySubscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'sub-001',
      name: 'Basic Fiber',
      price: 499,
      type: 'Fibernet',
      data: '100 GB',
      speed: '50 Mbps',
      status: 'active',
      renewalDate: '15 Aug 2023'
    },
    {
      id: 'sub-002',
      name: 'Premium Fiber',
      price: 899,
      type: 'Fibernet',
      data: '250 GB',
      speed: '100 Mbps',
      status: 'pending',
      renewalDate: '10 Aug 2023'
    },
    {
      id: 'sub-003',
      name: 'Standard Copper',
      price: 399,
      type: 'Broadband Copper',
      data: '75 GB',
      speed: '30 Mbps',
      status: 'cancelled',
      renewalDate: '05 Aug 2023'
    }
  ]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showRenewModal, setShowRenewModal] = useState(false);

  const handleCancel = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowCancelModal(true);
  };

  const handleRenew = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowRenewModal(true);
  };

  const confirmCancel = () => {
    if (selectedSubscription) {
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === selectedSubscription.id 
            ? { ...sub, status: 'cancelled' as const } 
            : sub
        )
      );
      setShowCancelModal(false);
      setSelectedSubscription(null);
    }
  };

  const confirmRenew = () => {
    if (selectedSubscription) {
      // Calculate next month's date for renewal
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const formattedDate = nextMonth.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
      
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === selectedSubscription.id 
            ? { 
                ...sub, 
                status: 'active' as const,
                renewalDate: formattedDate
              } 
            : sub
        )
      );
      setShowRenewModal(false);
      setSelectedSubscription(null);
    }
  };

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return <span className="badge bg-success">Active</span>;
      case 'pending':
        return <span className="badge bg-warning">Pending Renewal</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="subscriptions-container">
      <div className="subscriptions-header">
        <h1>My Subscriptions</h1>
        <p>Manage your current subscription plans</p>
      </div>

      <div className="subscriptions-content">
        {subscriptions.length === 0 ? (
          <div className="no-subscriptions">
            <i className="fas fa-wifi fa-3x mb-3"></i>
            <h3>No active subscriptions</h3>
            <p>You don't have any active subscriptions at the moment.</p>
            <button className="btn btn-primary">Browse Plans</button>
          </div>
        ) : (
          <div className="subscriptions-list">
            {subscriptions.map(subscription => (
              <div key={subscription.id} className="subscription-card">
                <div className="subscription-header">
                  <h3>{subscription.name}</h3>
                  {getStatusBadge(subscription.status)}
                </div>
                
                <div className="subscription-details">
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">₹{subscription.price}/month</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Data:</span>
                    <span className="detail-value">{subscription.data}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Speed:</span>
                    <span className="detail-value">{subscription.speed}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{subscription.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {subscription.status === 'cancelled' ? 'Expiry Date:' : 'Renewal Date:'}
                    </span>
                    <span className="detail-value">{subscription.renewalDate}</span>
                  </div>
                </div>
                
                <div className="subscription-actions">
                  {subscription.status === 'active' && (
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => handleCancel(subscription)}
                    >
                      <i className="fas fa-times-circle me-2"></i>
                      Cancel Subscription
                    </button>
                  )}
                  
                  {subscription.status === 'cancelled' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleRenew(subscription)}
                    >
                      <i className="fas fa-sync-alt me-2"></i>
                      Renew Subscription
                    </button>
                  )}
                  
                  {subscription.status === 'pending' && (
                    <>
                      <button 
                        className="btn btn-primary me-2"
                        onClick={() => handleRenew(subscription)}
                      >
                        <i className="fas fa-check-circle me-2"></i>
                        Renew Now
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleCancel(subscription)}
                      >
                        <i className="fas fa-times-circle me-2"></i>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedSubscription && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Cancel Subscription</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCancelModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel your <strong>{selectedSubscription.name}</strong> subscription?</p>
              <p>Your service will remain active until the end of your current billing period on {selectedSubscription.renewalDate}.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Subscription
              </button>
              <button 
                className="btn btn-danger"
                onClick={confirmCancel}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renew Confirmation Modal */}
      {showRenewModal && selectedSubscription && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Renew Subscription</h3>
              <button 
                className="modal-close"
                onClick={() => setShowRenewModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to renew your <strong>{selectedSubscription.name}</strong> subscription?</p>
              <p>You will be charged ₹{selectedSubscription.price} for the next billing cycle.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowRenewModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={confirmRenew}
              >
                Confirm Renewal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscriptions;