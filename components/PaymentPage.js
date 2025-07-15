function PaymentPage({ user, onNavigate }) {
  try {
    const [selectedPlan, setSelectedPlan] = React.useState('Pro');
    const [loading, setLoading] = React.useState(false);

    const plans = {
      Pro: { price: 29, features: ['5 communities', '500 members', 'Advanced features'] },
      Enterprise: { price: 99, features: ['Unlimited communities', 'Unlimited members', 'All features'] }
    };

    const handlePayment = async () => {
      setLoading(true);
      try {
        if (typeof window.Razorpay === 'undefined') {
          alert('Payment gateway is not available. Please try again later.');
          return;
        }

        const options = {
          key: "rzp_test_1234567890",
          amount: plans[selectedPlan].price * 100,
          currency: "USD",
          name: "Communityy",
          description: `${selectedPlan} Plan Subscription`,
          handler: function (response) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            onNavigate('dashboard');
          },
          prefill: {
            name: user?.name || "User",
            email: user?.email || "user@example.com"
          },
          theme: {
            color: "#8B5CF6"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        alert('Payment failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
              <p className="text-gray-600 mt-2">Choose your plan and proceed to payment</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Plan</label>
                <div className="space-y-3">
                  {Object.entries(plans).map(([planName, planData]) => (
                    <div key={planName} className={`border-2 rounded-lg p-4 cursor-pointer ${
                      selectedPlan === planName ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`} onClick={() => setSelectedPlan(planName)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{planName}</h3>
                          <p className="text-sm text-gray-600">{planData.features.join(', ')}</p>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">${planData.price}/mo</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-bold text-purple-600">${plans[selectedPlan].price}/month</span>
                </div>
                
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-primary w-full text-lg py-3 animate-pulse-hover"
                >
                  {loading ? 'Processing...' : `Pay $${plans[selectedPlan].price}`}
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PaymentPage component error:', error);
    return null;
  }
}