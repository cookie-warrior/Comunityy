function CreateEvent({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '',
      entryFee: '',
      isVirtual: true,
      meetingLink: '',
      location: '',
      maxAttendees: '',
      communityId: '',
      communities: []
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
        const eventData = {
          ...formData,
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          status: 'active',
          attendees: 0
        };
        await trickleCreateObject('event', eventData);
        alert('Event created successfully!');
        onNavigate('admin');
      } catch (error) {
        alert('Failed to create event. Please try again.');
      }
    };

    const handleInputChange = (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };

    return (
      <div className="min-h-screen py-8 bg-gradient-to-br from-purple-50 to-blue-50" data-name="create-event" data-file="components/CreateEvent.js">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card animate-bounce-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-calendar text-2xl text-blue-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Event</h1>
              <p className="text-gray-600 mt-2">Plan and organize community events</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                  <input type="number" name="duration" className="input-field"
                         value={formData.duration} onChange={handleInputChange} />
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="isVirtual" className="h-4 w-4 text-purple-600"
                       checked={formData.isVirtual} onChange={handleInputChange} />
                <label className="ml-2 text-sm text-gray-700">Virtual Event</label>
              </div>

              {formData.isVirtual ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                  <input type="url" name="meetingLink" className="input-field"
                         value={formData.meetingLink} onChange={handleInputChange} />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" className="input-field"
                         value={formData.location} onChange={handleInputChange} />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entry Fee ($)</label>
                  <input type="number" name="entryFee" className="input-field"
                         value={formData.entryFee} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                  <input type="number" name="maxAttendees" className="input-field"
                         value={formData.maxAttendees} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Community <span className="text-red-500">*</span>
                </label>
                <select
                  name="communityId"
                  required
                  className="input-field"
                  value={formData.communityId}
                  onChange={handleInputChange}
                >
                  <option value="">Select a community</option>
                  {communities.map((community) => (
                    <option key={community.objectId} value={community.objectId}>
                      {community.objectData.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1 animate-pulse-hover">Create Event</button>
                <button type="button" onClick={() => onNavigate('admin')} className="btn-secondary flex-1 animate-pulse-hover">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CreateEvent component error:', error);
    return null;
  }
}