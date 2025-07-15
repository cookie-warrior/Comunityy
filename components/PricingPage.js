function PricingPage({ user, onNavigate }) {
  try {
    const plans = [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        features: [
          'Create 1 community',
          'Up to 50 members',
          'Basic features',
          'Email support'
        ],
        buttonText: 'Get Started',
        popular: false
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        features: [
          'Create 5 communities',
          'Up to 500 members',
          'Advanced features',
          'Priority support',
          'Custom branding',
          'Analytics dashboard'
        ],
        buttonText: 'Get Premium',
        popular: true
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        features: [
          'Unlimited communities',
          'Unlimited members',
          'All features',
          '24/7 support',
          'White-label solution',
          'Custom integrations'
        ],
        buttonText: 'Contact Sales',
        popular: false
      }
    ];

    const handleSubscribe = (planName) => {
      if (planName === 'Free') {
        onNavigate('auth');
      } else {
        onNavigate('payment');
      }
    };

    return (
      <div className="min-h-screen py-8 bg-gradient-to-br from-purple-50 to-blue-50" data-name="pricing-page" data-file="components/PricingPage.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600">Start building your community today</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`card relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="icon-check text-green-500 text-sm mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors animate-pulse-hover ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">Need a custom solution?</p>
            <button className="btn-secondary animate-pulse-hover">Contact Sales</button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PricingPage component error:', error);
    return null;
  }
}