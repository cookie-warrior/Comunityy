function CreateCommunity({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      category: 'technology',
      isPrivate: false,
      rules: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const inviteCode = Math.random().toString().slice(2, 8);
        const communityData = {
          ...formData,
          id: Date.now().toString(),
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          memberCount: 1,
          inviteCode: inviteCode
        };

        await trickleCreateObject('community', communityData);
        
        // Generate community URL
        const communityUrl = `communityy.org/${inviteCode}`;
        
        // Show success popup with invite code and URL
        const message = `Community created successfully!\n\nInvite Code: ${inviteCode}\nCommunity URL: ${communityUrl}\n\nShare these with others to let them join your community.\n\nWould you like to customize your community URL? (Premium feature)`;
        
        if (confirm(message)) {
          onNavigate('payment');
        } else {
          onNavigate('dashboard');
        }
      } catch (error) {
        alert('Failed to create community. Please try again.');
      }
    };

    const handleInputChange = (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    };

    return (
      <div className="min-h-screen py-6" data-name="create-community" data-file="components/CreateCommunity.js">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card animate-bounce-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-plus text-2xl text-purple-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Community</h1>
              <p className="text-gray-600 mt-2">Build a space for like-minded people to connect and share</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Community Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-field"
                  placeholder="Enter community name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  required
                  className="input-field"
                  placeholder="What's your community about?"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="input-field"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="creative">Creative</option>
                  <option value="health">Health & Fitness</option>
                  <option value="education">Education</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>

              <div>
                <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-2">
                  Community Rules (Optional)
                </label>
                <textarea
                  id="rules"
                  name="rules"
                  rows="3"
                  className="input-field"
                  placeholder="Set some ground rules for your community"
                  value={formData.rules}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="isPrivate"
                  name="isPrivate"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  checked={formData.isPrivate}
                  onChange={handleInputChange}
                />
                <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700">
                  Make this a private community (invite-only)
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 animate-pulse-hover"
                >
                  Create Community
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="btn-secondary flex-1 animate-pulse-hover"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CreateCommunity component error:', error);
    return null;
  }
}