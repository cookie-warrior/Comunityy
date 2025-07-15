function EnhancedUserProfile({ user, onNavigate }) {
  try {
    const [profileData, setProfileData] = React.useState({
      name: user.name,
      email: user.email,
      bio: '',
      website: '',
      interests: [],
      skills: [],
      achievements: [],
      profileImage: '',
      socialMedia: {
        twitter: '',
        linkedin: '',
        instagram: '',
        github: '',
        youtube: '',
        facebook: ''
      }
    });
    const [newSkill, setNewSkill] = React.useState('');
    const [userStats, setUserStats] = React.useState({
      communitiesJoined: 0,
      productsShared: 0,
      eventsAttended: 0
    });

    React.useEffect(() => {
      loadUserStats();
    }, []);

    const loadUserStats = async () => {
      try {
        const [products, events] = await Promise.all([
          trickleListObjects('product', 100, true),
          trickleListObjects('event', 100, true)
        ]);
        
        const userProducts = products.items?.filter(p => p.objectData.creatorId === user.id) || [];
        const userEvents = events.items?.filter(e => e.objectData.creatorId === user.id) || [];
        
        setUserStats({
          communitiesJoined: 3,
          productsShared: userProducts.length,
          eventsAttended: userEvents.length
        });
      } catch (error) {
        console.error('Failed to load user stats:', error);
      }
    };

    const handleSave = async () => {
      try {
        await trickleUpdateObject('user', user.id, profileData);
        alert('Profile updated successfully!');
      } catch (error) {
        alert('Failed to update profile. Please try again.');
      }
    };

    const addSkill = () => {
      if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
        setProfileData({
          ...profileData,
          skills: [...profileData.skills, newSkill.trim()]
        });
        setNewSkill('');
      }
    };

    const removeSkill = (skillToRemove) => {
      setProfileData({
        ...profileData,
        skills: profileData.skills.filter(skill => skill !== skillToRemove)
      });
    };

    const addInterest = (interest) => {
      if (interest && !profileData.interests.includes(interest)) {
        setProfileData({
          ...profileData,
          interests: [...profileData.interests, interest]
        });
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        className="input-field"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="input-field"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      className="input-field"
                      rows="3"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.interests.map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {['Technology', 'Business', 'Creative', 'Health'].map((interest) => (
                        <button
                          key={interest}
                          onClick={() => addInterest(interest)}
                          className="btn-secondary text-sm"
                        >
                          + {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profileData.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input-field flex-1"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <button onClick={addSkill} className="btn-primary">Add</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://example.com/image.jpg"
                      value={profileData.profileImage}
                      onChange={(e) => setProfileData({...profileData, profileImage: e.target.value})}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(profileData.socialMedia).map(([platform, value]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{platform}</label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder={`@username or profile URL`}
                            value={value}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              socialMedia: {...profileData.socialMedia, [platform]: e.target.value}
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleSave} className="btn-primary animate-pulse-hover">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Communities</span>
                    <span className="font-semibold">{userStats.communitiesJoined}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products Shared</span>
                    <span className="font-semibold">{userStats.productsShared}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Created</span>
                    <span className="font-semibold">{userStats.eventsAttended}</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="icon-star text-yellow-600 text-sm"></div>
                    </div>
                    <span className="text-sm">Community Builder</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="icon-check text-green-600 text-sm"></div>
                    </div>
                    <span className="text-sm">Active Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EnhancedUserProfile component error:', error);
    return null;
  }
}