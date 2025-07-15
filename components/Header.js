function Header({ user, onNavigate, onLogout, currentPage }) {
  try {
    const [openDropdown, setOpenDropdown] = React.useState(null);

    const toggleDropdown = (dropdown) => {
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    React.useEffect(() => {
      const handleClickOutside = () => {
        setOpenDropdown(null);
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
      <header className="bg-white border-b border-purple-200 sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <div className="icon-users text-white text-lg"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">Communityy</span>
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {user && (
                <>
                  <button 
                    onClick={() => onNavigate('home')}
                    className={`text-sm font-medium ${currentPage === 'home' ? 'text-purple-600' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => onNavigate('notifications')}
                    className={`text-sm font-medium ${currentPage === 'notifications' ? 'text-purple-600' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    Notifications
                  </button>
                  <button 
                    onClick={() => onNavigate('live-chat')}
                    className={`text-sm font-medium ${currentPage === 'live-chat' ? 'text-purple-600' : 'text-gray-700 hover:text-gray-900'}`}
                  >
                    Chat
                  </button>
                </>
              )}
              
              <button 
                onClick={() => onNavigate('features')}
                className={`text-sm font-medium ${currentPage === 'features' ? 'text-purple-600' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Features
              </button>

              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('community');
                  }}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Community <div className="icon-chevron-down text-xs ml-1"></div>
                </button>
                {openDropdown === 'community' && (
                  <div className="dropdown">
                    <button onClick={() => onNavigate('join-community')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">Join Communities</button>
                    <button onClick={() => onNavigate('create-community')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">Create Community</button>
                    <button onClick={() => onNavigate('dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">My Communities</button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onNavigate('pricing')}
                className={`text-sm font-medium ${currentPage === 'pricing' ? 'text-purple-600' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Pricing
              </button>
            </nav>

              <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onNavigate('enhanced-profile')}
                    className="flex items-center space-x-2 animate-pulse-hover"
                  >
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.emoji || user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.username || user.name}</span>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-sm text-gray-500 hover:text-gray-700 animate-pulse-hover"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('auth')}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 animate-pulse-hover"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => onNavigate('auth')}
                    className="btn-primary text-sm animate-pulse-hover"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
