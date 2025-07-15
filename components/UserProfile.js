function UserProfile({ user, onNavigate }) {
  try {
    const [profileData, setProfileData] = React.useState({
      name: user.name,
      email: user.email,
      bio: '',
      website: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    });

    const handleInputChange = (e) => {
      setProfileData({
        ...profileData,
        [e.target.name]: e.target.value
      });
    };

    const handleSave = async () => {
      try {
        await trickleUpdateObject('user', user.id, profileData);
        alert('Profile updated successfully!');
      } catch (error) {
        alert('Failed to update profile. Please try again.');
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50" data-name="user-profile" data-file="components/UserProfile.js">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-2">Manage your account settings and social connections</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    value={profileData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  className="input-field"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  className="input-field"
                  placeholder="https://yourwebsite.com"
                  value={profileData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input
                      type="text"
                      name="twitter"
                      className="input-field"
                      placeholder="@username"
                      value={profileData.twitter}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      className="input-field"
                      placeholder="linkedin.com/in/username"
                      value={profileData.linkedin}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    className="input-field"
                    placeholder="@username"
                    value={profileData.instagram}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button onClick={handleSave} className="btn-primary flex-1 animate-pulse-hover">
                  Save Changes
                </button>
                <button onClick={() => onNavigate('home')} className="btn-secondary flex-1 animate-pulse-hover">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserProfile component error:', error);
    return null;
  }
}