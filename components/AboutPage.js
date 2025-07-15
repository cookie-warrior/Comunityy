function AboutPage({ onNavigate }) {
  try {
    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Communityy</h1>
            <p className="text-xl text-gray-600">Building the future of community engagement</p>
          </div>

          <div className="card mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Communityy, we believe that meaningful connections drive innovation and growth. 
              Our platform empowers creators, entrepreneurs, and thought leaders to build thriving 
              communities around their passions and expertise.
            </p>
            <p className="text-gray-600">
              We provide the tools and infrastructure needed to create, manage, and monetize 
              communities while fostering genuine relationships and valuable exchanges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To create a world where every expert can build a sustainable community 
                and every learner can find their tribe.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Authentic connections</li>
                <li>• Creator empowerment</li>
                <li>• Continuous learning</li>
                <li>• Innovation and growth</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-primary animate-pulse-hover"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AboutPage component error:', error);
    return null;
  }
}