function DocumentationPage({ onNavigate }) {
  try {
    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
            <p className="text-xl text-gray-600">Learn how to use Communityy effectively</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Started</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Creating your account</li>
                <li>• Setting up your profile</li>
                <li>• Joining communities</li>
                <li>• Understanding the dashboard</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Management</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Creating communities</li>
                <li>• Managing members</li>
                <li>• Setting permissions</li>
                <li>• Customizing themes</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analytics & insights</li>
                <li>• Payment integration</li>
                <li>• API documentation</li>
                <li>• Custom integrations</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => onNavigate('help')}
              className="btn-primary animate-pulse-hover"
            >
              Visit Help Center
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DocumentationPage component error:', error);
    return null;
  }
}