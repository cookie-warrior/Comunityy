class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { 
        className: 'min-h-screen flex items-center justify-center bg-gray-50' 
      }, 
        React.createElement('div', { className: 'text-center' },
          React.createElement('h1', { className: 'text-2xl font-bold text-gray-900 mb-4' }, 'Something went wrong'),
          React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Please refresh the page and try again'),
          React.createElement('button', { 
            className: 'btn-primary',
            onClick: () => window.location.reload()
          }, 'Refresh Page')
        )
      );
    }

    return this.props.children;
  }
}

function App() {
  const [user, setUser] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState('landing');

  React.useEffect(() => {
    const savedUser = AuthUtils.getUserSession();
    if (savedUser) {
      setUser(savedUser);
      setCurrentPage('home');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    AuthUtils.saveUserSession(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    AuthUtils.clearUserSession();
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return React.createElement(LandingPage, { onNavigate: setCurrentPage });
      case 'auth':
        return React.createElement(AuthPage, { onLogin: handleLogin, onNavigate: setCurrentPage });
      case 'home':
        return React.createElement(HomeFeed, { user, onNavigate: setCurrentPage });
      case 'dashboard':
        return React.createElement(CommunityDashboard, { user, onNavigate: setCurrentPage });
      case 'create-community':
        return React.createElement(CreateCommunity, { user, onNavigate: setCurrentPage });
      case 'join-community':
        return React.createElement(JoinCommunity, { user, onNavigate: setCurrentPage });
      case 'upload-product':
        return React.createElement(ProductUpload, { user, onNavigate: setCurrentPage });
      case 'admin':
        return React.createElement(AdminDashboard, { user, onNavigate: setCurrentPage });
      case 'profile':
        return React.createElement(UserProfile, { user, onNavigate: setCurrentPage });
      case 'enhanced-profile':
        return React.createElement(EnhancedUserProfile, { user, onNavigate: setCurrentPage });
      case 'pricing':
        return React.createElement(PricingPage, { user, onNavigate: setCurrentPage });
      case 'create-event':
        return React.createElement(CreateEvent, { user, onNavigate: setCurrentPage });
      case 'create-session':
        return React.createElement(CreateSession, { user, onNavigate: setCurrentPage });
      case 'create-challenge':
        return React.createElement(CreateChallenge, { user, onNavigate: setCurrentPage });
      case 'create-course':
        return React.createElement(CreateCourse, { user, onNavigate: setCurrentPage });
      case 'create-membership':
        return React.createElement(CreateMembership, { user, onNavigate: setCurrentPage });
      case 'features':
        return React.createElement(FeaturesPage, { user, onNavigate: setCurrentPage });
      case 'community-search':
        return React.createElement(CommunitySearch, { user, onNavigate: setCurrentPage });
      case 'event-booking':
        return React.createElement(EventBooking, { user, onNavigate: setCurrentPage });
      case 'community-stats':
        return React.createElement(CommunityStats, { user, onNavigate: setCurrentPage });
      case 'payment':
        return React.createElement(PaymentPage, { user, onNavigate: setCurrentPage });
      case 'notifications':
        return React.createElement(NotificationCenter, { user, onNavigate: setCurrentPage });
      case 'live-chat':
        return React.createElement(LiveChat, { user, onNavigate: setCurrentPage });
      case 'about':
        return React.createElement(AboutPage, { onNavigate: setCurrentPage });
      case 'contact':
        return React.createElement(ContactPage, { onNavigate: setCurrentPage });
      case 'help':
        return React.createElement(HelpPage, { onNavigate: setCurrentPage });
      case 'documentation':
        return React.createElement(DocumentationPage, { onNavigate: setCurrentPage });
      case 'blog':
        return React.createElement(BlogPage, { onNavigate: setCurrentPage });
      case 'careers':
        return React.createElement(CareersPage, { onNavigate: setCurrentPage });
      case 'community-customize':
        return React.createElement(CommunityCustomize, { user, onNavigate: setCurrentPage });
      default:
        return React.createElement(LandingPage, { onNavigate: setCurrentPage });
    }
  };

  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement(Header, { 
      user, 
      onNavigate: setCurrentPage, 
      onLogout: handleLogout, 
      currentPage 
    }),
    currentPage !== 'landing' && React.createElement('div', { className: 'max-w-7xl mx-auto px-4 py-2 flex space-x-2' },
      React.createElement('button', {
        onClick: () => {
          const pages = ['landing', 'home', 'dashboard', 'create-community', 'join-community'];
          const currentIndex = pages.indexOf(currentPage);
          if (currentIndex > 0) {
            setCurrentPage(pages[currentIndex - 1]);
          }
        },
        className: 'p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 animate-pulse-hover'
      }, React.createElement('div', { className: 'icon-arrow-left text-lg' })),
      React.createElement('button', {
        onClick: () => {
          const pages = ['landing', 'home', 'dashboard', 'create-community', 'join-community'];
          const currentIndex = pages.indexOf(currentPage);
          if (currentIndex < pages.length - 1 && currentIndex !== -1) {
            setCurrentPage(pages[currentIndex + 1]);
          }
        },
        className: 'p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 animate-pulse-hover'
      }, React.createElement('div', { className: 'icon-arrow-right text-lg' }))
    ),
    renderPage(),
    React.createElement(Footer, { onNavigate: setCurrentPage })
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ErrorBoundary, null, React.createElement(App)));
