function CommunitySearch({ user, onNavigate }) {
  try {
    const [communities, setCommunities] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadCommunities();
    }, []);

    const loadCommunities = async () => {
      try {
        const mockCommunities = [
          { id: '1', name: 'Tech Innovators', description: 'Latest in technology and innovation', category: 'technology', members: 1250, isPublic: true },
          { id: '2', name: 'Creative Minds', description: 'Design, art, and creative projects', category: 'creative', members: 820, isPublic: true },
          { id: '3', name: 'Business Leaders', description: 'Entrepreneurship and business growth', category: 'business', members: 1570, isPublic: false },
          { id: '4', name: 'Health & Wellness', description: 'Fitness, nutrition, and mental health', category: 'health', members: 960, isPublic: true }
        ];
        setCommunities(mockCommunities);
      } catch (error) {
        console.error('Failed to load communities:', error);
      } finally {
        setLoading(false);
      }
    };

    const filteredCommunities = communities.filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           community.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Discover Communities</h1>
            <p className="text-gray-600 mt-2">Find communities that match your interests</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="creative">Creative</option>
                    <option value="health">Health</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search communities..."
                  className="input-field"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCommunities.map((community) => (
                    <div key={community.id} className="card">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{community.name}</h3>
                        {community.isPublic ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Public</span>
                        ) : (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">Private</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{community.members} members</span>
                        <button className="btn-primary text-sm animate-pulse-hover">
                          {community.isPublic ? 'Join' : 'Request'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CommunitySearch component error:', error);
    return null;
  }
}