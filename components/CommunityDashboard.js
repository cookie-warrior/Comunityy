function CommunityDashboard({ user, onNavigate }) {
  try {
    const [communities, setCommunities] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadUserData();
    }, []);

    const loadUserData = async () => {
      try {
        const [communitiesRes, productsRes] = await Promise.all([
          trickleListObjects('community', 10, true),
          trickleListObjects('product', 10, true)
        ]);
        
        setCommunities(communitiesRes.items || []);
        setProducts(productsRes.items || []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen py-4" data-name="community-dashboard" data-file="components/CommunityDashboard.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-2">Manage your communities and connect with members</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card mb-6 animate-slide-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Communities</h2>
                  <button
                    onClick={() => onNavigate('create-community')}
                    className="btn-primary text-sm animate-pulse-hover"
                  >
                    Create New
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  </div>
                ) : communities.length > 0 ? (
                  <div className="space-y-4">
                    {communities.map((community) => (
                      <div key={community.objectId} className="flex items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <div className="icon-users text-xl text-purple-600"></div>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-gray-900">{community.objectData.name}</h3>
                          <p className="text-sm text-gray-500">{community.objectData.memberCount || 1} members</p>
                        </div>
                        <button 
                          onClick={() => onNavigate('admin')}
                          className="btn-secondary text-sm animate-pulse-hover"
                        >
                          Manage
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No communities yet. Create your first community!</p>
                  </div>
                )}
              </div>

              <div className="card animate-slide-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Products</h2>
                  <button
                    onClick={() => onNavigate('upload-product')}
                    className="btn-primary text-sm animate-pulse-hover"
                  >
                    Upload Product
                  </button>
                </div>

                {products.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {products.slice(0, 4).map((product) => (
                      <div key={product.objectId} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">{product.objectData.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.objectData.price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No products uploaded yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card animate-bounce-in">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('create-community')}
                    className="w-full btn-primary text-left animate-pulse-hover"
                  >
                    <div className="icon-plus text-sm mr-2 inline-block"></div>
                    Create Community
                  </button>
                  <button
                    onClick={() => onNavigate('join-community')}
                    className="w-full btn-secondary text-left animate-pulse-hover"
                  >
                    <div className="icon-search text-sm mr-2 inline-block"></div>
                    Join Community
                  </button>
                  <button
                    onClick={() => onNavigate('upload-product')}
                    className="w-full btn-secondary text-left animate-pulse-hover"
                  >
                    <div className="icon-upload text-sm mr-2 inline-block"></div>
                    Upload Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CommunityDashboard component error:', error);
    return null;
  }
}