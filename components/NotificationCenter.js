function NotificationCenter({ user, onNavigate }) {
  try {
    const [notifications, setNotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadNotifications();
    }, []);

    const loadNotifications = async () => {
      try {
        const mockNotifications = [
          {
            objectId: '1',
            objectData: {
              type: 'product_launch',
              title: 'New Product Launch!',
              message: 'React Development Course is now available in Tech Community',
              read: false
            },
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            objectId: '2',
            objectData: {
              type: 'event',
              title: 'Upcoming Event',
              message: 'Community Networking Event starts in 2 hours',
              read: false
            },
            createdAt: '2024-01-14T14:20:00Z'
          },
          {
            objectId: '3',
            objectData: {
              type: 'announcement',
              title: 'Community Update',
              message: 'New features have been added to the platform',
              read: true
            },
            createdAt: '2024-01-13T09:15:00Z'
          }
        ];
        
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    const markAsRead = async (notificationId) => {
      try {
        await trickleUpdateObject(`notification:${user.id}`, notificationId, { read: true });
        loadNotifications();
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    };

    const getNotificationIcon = (type) => {
      switch(type) {
        case 'product_launch': return 'shopping-bag';
        case 'event': return 'calendar';
        case 'announcement': return 'megaphone';
        case 'community_join': return 'users';
        default: return 'bell';
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated with community activities</p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.objectId} 
                    className={`card cursor-pointer transition-all duration-200 ${
                      notification.objectData.read ? 'opacity-60' : 'border-purple-200 bg-purple-50'
                    }`}
                    onClick={() => markAsRead(notification.objectId)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <div className={`icon-${getNotificationIcon(notification.objectData.type)} text-purple-600`}></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{notification.objectData.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{notification.objectData.message}</p>
                        <p className="text-gray-500 text-xs mt-2">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.objectData.read && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="icon-bell text-2xl text-gray-400"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                  <p className="text-gray-600">You'll see updates from your communities here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('NotificationCenter component error:', error);
    return null;
  }
}