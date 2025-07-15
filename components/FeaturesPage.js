function FeaturesPage({ user, onNavigate }) {
  try {
    const features = [
      {
        title: "Community Creation",
        description: "Build and customize your own community spaces with advanced settings",
        icon: "users",
        color: "purple"
      },
      {
        title: "Product Marketplace",
        description: "Share and sell your products directly to community members",
        icon: "shopping-bag",
        color: "green"
      },
      {
        title: "Event Management",
        description: "Organize virtual and physical events with built-in registration",
        icon: "calendar",
        color: "blue"
      },
      {
        title: "Live Chat & Messaging",
        description: "Real-time communication with AI-powered moderation",
        icon: "message-circle",
        color: "indigo"
      },
      {
        title: "Analytics Dashboard",
        description: "Track growth, engagement, and revenue with detailed insights",
        icon: "chart-bar",
        color: "orange"
      },
      {
        title: "Member Management",
        description: "Advanced tools to manage community members and permissions",
        icon: "shield",
        color: "red"
      }
    ];

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h1>
            <p className="text-xl text-gray-600">Everything you need to build and manage thriving communities</p>
          </div>

          <div className="mb-8">
            <img 
              src="https://app.trickle.so/storage/public/images/usr_1283e50d68000001/34895b5e-d231-4edd-8c70-e627ee90921e.png"
              alt="Platform Features Overview"
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={`icon-${feature.icon} text-xl text-${feature.color}-600`}></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => user ? onNavigate('create-community') : onNavigate('auth')}
              className="btn-primary text-lg px-8 py-3 animate-pulse-hover"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('FeaturesPage component error:', error);
    return null;
  }
}