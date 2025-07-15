function CreateMembership({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      price: '',
      duration: 'monthly',
      benefits: '',
      communityId: ''
    });
    const [communities, setCommunities] = React.useState([]);

    React.useEffect(() => {
      loadCommunities();
    }, []);

    const loadCommunities = async () => {
      try {
        const response = await trickleListObjects('community', 50, true);
        setCommunities(response.items || []);
      } catch (error) {
        console.error('Failed to load communities:', error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const membershipData = {
          ...formData,
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          status: 'active',
          subscribers: 0
        };
        await trickleCreateObject('membership', membershipData);
        alert('Membership tier created successfully!');
        onNavigate('admin');
      } catch (error) {
        alert('Failed to create membership. Please try again.');
      }
    };

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card animate-bounce-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-users text-2xl text-pink-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Membership</h1>
              <p className="text-gray-600 mt-2">Offer premium membership tiers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Membership Name</label>
                <input type="text" name="name" required className="input-field" 
                       value={formData.name} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="4" required className="input-field"
                          value={formData.description} onChange={handleInputChange}></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input type="number" name="price" required className="input-field"
                         value={formData.price} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select name="duration" className="input-field" value={formData.duration} onChange={handleInputChange}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Benefits</label>
                <textarea name="benefits" rows="4" className="input-field" placeholder="List the benefits members will receive"
                          value={formData.benefits} onChange={handleInputChange}></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Community</label>
                <select name="communityId" required className="input-field"
                        value={formData.communityId} onChange={handleInputChange}>
                  <option value="">Select a community</option>
                  {communities.map((community) => (
                    <option key={community.objectId} value={community.objectId}>
                      {community.objectData.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1 animate-pulse-hover">Create Membership</button>
                <button type="button" onClick={() => onNavigate('admin')} className="btn-secondary flex-1 animate-pulse-hover">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CreateMembership component error:', error);
    return null;
  }
}
