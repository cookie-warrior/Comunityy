function Footer({ onNavigate }) {
  try {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <div className="icon-users text-white text-lg"></div>
                </div>
                <span className="text-xl font-bold">Communityy</span>
              </div>
              <p className="text-gray-400 text-sm">Build and grow your community with powerful tools and features.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => onNavigate('features')} className="hover:text-white">Features</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Pricing</button></li>
                <li><button onClick={() => onNavigate('community-search')} className="hover:text-white">Communities</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => onNavigate('help')} className="hover:text-white">Help Center</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact</button></li>
                <li><button onClick={() => onNavigate('documentation')} className="hover:text-white">Documentation</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-white">Blog</button></li>
                <li><button onClick={() => onNavigate('careers')} className="hover:text-white">Careers</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Communityy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}