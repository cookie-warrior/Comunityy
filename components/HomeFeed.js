function HomeFeed({ user, onNavigate }) {
  try {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadFeedData();
    }, []);

    const loadFeedData = async () => {
      try {
        const mockPosts = [
          {
            objectId: '1',
            type: 'product',
            objectData: {
              name: 'React Development Course',
              description: 'Learn React from scratch with hands-on projects',
              price: '99'
            },
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            objectId: '2',
            type: 'event',
            objectData: {
              title: 'Community Networking Event',
              description: 'Join us for an evening of networking and collaboration',
              date: '2024-02-20'
            },
            createdAt: '2024-01-14T14:20:00Z'
          },
          {
            objectId: '3',
            type: 'reminder',
            objectData: {
              title: 'Event Reminder',
              description: 'Tech Conference 2024 starts tomorrow at 10:00 AM'
            },
            createdAt: '2024-01-13T09:15:00Z'
          },
          {
            objectId: '4',
            type: 'update',
            objectData: {
              title: 'Community Update',
              description: 'New members joined Tech Innovators community this week'
            },
            createdAt: '2024-01-12T15:30:00Z'
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to load feed:', error);
      } finally {
        setLoading(false);
      }
    };

    const getPostIcon = (type) => {
      switch(type) {
        case 'product': return 'shopping-bag';
        case 'event': return 'calendar';
        case 'challenge': return 'trophy';
        case 'reminder': return 'bell';
        case 'update': return 'info';
        default: return 'circle';
      }
    };

    const getPostColor = (type) => {
      switch(type) {
        case 'product': return 'bg-green-100 text-green-600';
        case 'event': return 'bg-blue-100 text-blue-600';
        case 'challenge': return 'bg-purple-100 text-purple-600';
        case 'reminder': return 'bg-orange-100 text-orange-600';
        case 'update': return 'bg-gray-100 text-gray-600';
        default: return 'bg-gray-100 text-gray-600';
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50" data-name="home-feed" data-file="components/HomeFeed.js">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-2">Stay updated with your community activities</p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 mt-2">Loading feed...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.objectId} className="card animate-slide-in">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPostColor(post.type)}`}>
                      <div className={`icon-${getPostIcon(post.type)} text-xl`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {post.objectData.name || post.objectData.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{post.objectData.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        {post.objectData.price && (
                          <span className="text-sm font-medium text-green-600">${post.objectData.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('HomeFeed component error:', error);
    return null;
  }
}