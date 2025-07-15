function CreateChallenge({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      prize: '',
      rules: '',
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
        const challengeData = {
          ...formData,
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          status: 'active',
          participants: 0
        };
        await trickleCreateObject('challenge', challengeData);
        alert('Challenge created successfully!');
        onNavigate('admin');
      } catch (error) {
        alert('Failed to create challenge. Please try again.');
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
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-trophy text-2xl text-yellow-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Challenge</h1>
              <p className="text-gray-600 mt-2">Engage your community with challenges</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Title</label>
                <input type="text" name="title" required className="input-field" 
                       value={formData.title} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="4" required className="input-field"
                          value={formData.description} onChange={handleInputChange}></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input type="date" name="startDate" required className="input-field"
                         value={formData.startDate} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input type="date" name="endDate" required className="input-field"
                         value={formData.endDate} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prize</label>
                <input type="text" name="prize" className="input-field"
                       value={formData.prize} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rules</label>
                <textarea name="rules" rows="3" className="input-field"
                          value={formData.rules} onChange={handleInputChange}></textarea>
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
                <button type="submit" className="btn-primary flex-1 animate-pulse-hover">Create Challenge</button>
                <button type="button" onClick={() => onNavigate('admin')} className="btn-secondary flex-1 animate-pulse-hover">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CreateChallenge component error:', error);
    return null;
  }
}
