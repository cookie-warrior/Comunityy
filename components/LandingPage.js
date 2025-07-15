function LandingPage({ onNavigate }) {
  try {
    return (
      <div className="min-h-screen" data-name="landing-page" data-file="components/LandingPage.js">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Build Your <span className="text-purple-600">Community</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Create, manage, and grow your community with powerful tools. Share products, connect with members, and build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onNavigate('auth')}
                  className="btn-primary text-lg px-8 py-3 animate-bounce-in animate-pulse-hover"
                >
                  Start Building
                </button>
                <button 
                  onClick={() => onNavigate('auth')}
                  className="btn-secondary text-lg px-8 py-3 animate-bounce-in animate-pulse-hover"
                >
                  Join Community
                </button>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-16 max-w-5xl mx-auto px-4">
            <img 
              src="https://app.trickle.so/storage/public/images/usr_1283e50d68000001/85c04de3-51d1-4da0-bb5d-03e7a84aa0be.png"
              alt="Community Platform"
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to build communities
              </h2>
              <p className="text-xl text-gray-600">
                Powerful features to help you create and manage thriving communities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center animate-slide-in">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="icon-users text-xl text-purple-600"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Communities</h3>
                <p className="text-gray-600">Build your own community space with custom branding and settings</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="icon-shopping-bag text-xl text-green-600"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Products</h3>
                <p className="text-gray-600">Upload and showcase your products to community members</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="icon-heart text-xl text-purple-600"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Engage</h3>
                <p className="text-gray-600">Build meaningful connections with like-minded people</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Active Communities</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
                <div className="text-gray-600">Community Members</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">$2M+</div>
                <div className="text-gray-600">Creator Revenue</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Public Communities Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Public Communities</h2>
              <p className="text-xl text-gray-600">Connect with like-minded people in open communities</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { name: 'Tech Innovators', members: '12.5K', category: 'Technology' },
                { name: 'Creative Minds', members: '8.2K', category: 'Design' },
                { name: 'Business Leaders', members: '15.7K', category: 'Business' }
              ].map((community, index) => (
                <div key={index} className="card text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">{community.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{community.members} members • {community.category}</p>
                  <button 
                    onClick={() => onNavigate('auth')}
                    className="btn-primary w-full animate-pulse-hover"
                  >
                    Join Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Creators */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Creators</h2>
              <p className="text-xl text-gray-600">Meet successful community builders on our platform</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Johnson', role: 'Tech Educator', communities: 3, revenue: '$45K' },
                { name: 'Mike Chen', role: 'Business Coach', communities: 5, revenue: '$78K' },
                { name: 'Lisa Rodriguez', role: 'Design Mentor', communities: 2, revenue: '$32K' }
              ].map((creator, index) => (
                <div key={index} className="card text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-1">{creator.name}</h3>
                  <p className="text-purple-600 text-sm mb-3">{creator.role}</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{creator.communities} Communities</p>
                    <p>{creator.revenue} Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 gradient-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start building?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of creators building amazing communities
            </p>
            <button 
              onClick={() => onNavigate('auth')}
              className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors animate-pulse-hover"
            >
              Get Started Free
            </button>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('LandingPage component error:', error);
    return null;
  }
}