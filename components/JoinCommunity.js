function JoinCommunity({ user, onNavigate }) {
  try {
    const [communities, setCommunities] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [inviteCode, setInviteCode] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');

    React.useEffect(() => {
      loadCommunities();
    }, []);

    const loadCommunities = async () => {
      try {
        const response = await trickleListObjects('community', 20, true);
        setCommunities(response.items || []);
      } catch (error) {
        console.error('Failed to load communities:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleJoinCommunity = async (communityId) => {
      try {
        const memberData = {
          userId: user.id,
          communityId: communityId,
          joinedAt: new Date().toISOString(),
          role: 'member'
        };

        await trickleCreateObject(`member:${communityId}`, memberData);
        alert('Successfully joined the community!');
        onNavigate('dashboard');
      } catch (error) {
        alert('Failed to join community. Please try again.');
      }
    };

    const handleJoinByCode = async () => {
      if (!inviteCode.trim()) {
        alert('Please enter an invite code');
        return;
      }

      try {
        const response = await trickleListObjects('community', 100, true);
        const community = response.items?.find(c => c.objectData.inviteCode === inviteCode);
        
        if (community) {
          await handleJoinCommunity(community.objectId);
        } else {
          alert('Invalid invite code. Please check and try again.');
        }
      } catch (error) {
        alert('Failed to join community. Please try again.');
      }
    };

    const filteredCommunities = communities.filter(community => {
      const matchesSearch = community.objectData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           community.objectData.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || community.objectData.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="min-h-screen py-6" data-name="join-community" data-file="components/JoinCommunity.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Join Communities</h1>
            <p className="text-gray-600 mt-2">Discover and connect with communities that match your interests</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="card animate-slide-in">
              <h3 className="font-semibold text-gray-900 mb-4">Join with Invite Code</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="input-field"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  maxLength={6}
                />
                <button
                  onClick={handleJoinByCode}
                  className="btn-primary w-full text-sm animate-pulse-hover"
                >
                  Join Community
                </button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Filters</h4>
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
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className="text-gray-600 mt-2">Loading communities...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCommunities.length > 0 ? (
                    filteredCommunities.map((community) => (
                      <div key={community.objectId} className="card">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <div className="icon-users text-xl text-purple-600"></div>
                          </div>
                          <div className="ml-3">
                            <h3 className="font-semibold text-gray-900">{community.objectData.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{community.objectData.category}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {community.objectData.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="icon-users text-sm mr-1"></div>
                            <span>{community.objectData.memberCount || 1} members</span>
                          </div>
                          <button
                            onClick={() => handleJoinCommunity(community.objectId)}
                            className="btn-primary text-sm animate-pulse-hover"
                          >
                            Join
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <div className="icon-search text-2xl text-gray-400"></div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No communities found</h3>
                      <p className="text-gray-600">Try adjusting your search or create a new community</p>
                      <button
                        onClick={() => onNavigate('create-community')}
                        className="btn-primary mt-4 animate-pulse-hover"
                      >
                        Create Community
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('JoinCommunity component error:', error);
    return null;
  }
}
