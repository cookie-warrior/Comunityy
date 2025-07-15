function CommunityCustomize({ user, onNavigate }) {
  try {
    const [customization, setCustomization] = React.useState({
      theme: 'default',
      coverImage: '',
      profileImage: '',
      primaryColor: '#8B5CF6',
      secondaryColor: '#3B82F6'
    });

    const themes = [
      { name: 'Default', value: 'default', colors: ['#8B5CF6', '#3B82F6'] },
      { name: 'Ocean', value: 'ocean', colors: ['#0EA5E9', '#06B6D4'] },
      { name: 'Forest', value: 'forest', colors: ['#10B981', '#059669'] },
      { name: 'Sunset', value: 'sunset', colors: ['#F59E0B', '#EF4444'] }
    ];

    const handleSave = async () => {
      try {
        await trickleUpdateObject('community-customization', user.id, customization);
        alert('Community customization saved successfully!');
        onNavigate('admin');
      } catch (error) {
        alert('Failed to save customization. Please try again.');
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Customize Community</h1>
            <p className="text-gray-600 mt-2">Personalize your community's appearance</p>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Selection</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.value}
                    onClick={() => setCustomization({...customization, theme: theme.value})}
                    className={`p-4 border-2 rounded-lg cursor-pointer ${
                      customization.theme === theme.value ? 'border-purple-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded"
                            style={{backgroundColor: color}}
                          ></div>
                        ))}
                      </div>
                      <span className="font-medium">{theme.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                  <input
                    type="url"
                    className="input-field"
                    value={customization.coverImage}
                    onChange={(e) => setCustomization({...customization, coverImage: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
                  <input
                    type="url"
                    className="input-field"
                    value={customization.profileImage}
                    onChange={(e) => setCustomization({...customization, profileImage: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleSave} className="btn-primary animate-pulse-hover">Save Changes</button>
              <button onClick={() => onNavigate('admin')} className="btn-secondary animate-pulse-hover">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CommunityCustomize component error:', error);
    return null;
  }
}