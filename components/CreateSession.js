function CreateSession({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '',
      price: '',
      maxParticipants: '',
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
        const sessionData = {
          ...formData,
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          status: 'active'
        };
        await trickleCreateObject('session', sessionData);
        alert('1:1 Session created successfully!');
        onNavigate('admin');
      } catch (error) {
        alert('Failed to create session. Please try again.');
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
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-video text-2xl text-purple-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create 1:1 Session</h1>
              <p className="text-gray-600 mt-2">Offer personal coaching sessions</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                <input type="text" name="title" required className="input-field" 
                       value={formData.title} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="4" required className="input-field"
                          value={formData.description} onChange={handleInputChange}></textarea>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input type="date" name="date" required className="input-field"
                         value={formData.date} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input type="time" name="time" required className="input-field"
                         value={formData.time} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                  <input type="number" name="duration" className="input-field"
                         value={formData.duration} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input type="number" name="price" className="input-field"
                         value={formData.price} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input type="number" name="maxParticipants" className="input-field"
                         value={formData.maxParticipants} onChange={handleInputChange} />
                </div>
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
                <button type="submit" className="btn-primary flex-1 animate-pulse-hover">Create Session</button>
                <button type="button" onClick={() => onNavigate('admin')} className="btn-secondary flex-1 animate-pulse-hover">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CreateSession component error:', error);
    return null;
  }
}
