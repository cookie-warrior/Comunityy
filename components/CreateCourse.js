function CreateCourse({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      price: '',
      duration: '',
      level: 'beginner',
      syllabus: '',
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
        const courseData = {
          ...formData,
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          status: 'active',
          enrollments: 0
        };
        await trickleCreateObject('course', courseData);
        alert('Course created successfully!');
        onNavigate('admin');
      } catch (error) {
        alert('Failed to create course. Please try again.');
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
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-book-open text-2xl text-indigo-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Course</h1>
              <p className="text-gray-600 mt-2">Share your knowledge through courses</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input type="number" name="price" required className="input-field"
                         value={formData.price} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                  <input type="number" name="duration" className="input-field"
                         value={formData.duration} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select name="level" className="input-field" value={formData.level} onChange={handleInputChange}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Syllabus</label>
                <textarea name="syllabus" rows="4" className="input-field"
                          value={formData.syllabus} onChange={handleInputChange}></textarea>
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
                <button type="submit" className="btn-primary flex-1 animate-pulse-hover">Create Course</button>
                <button type="button" onClick={() => onNavigate('admin')} className="btn-secondary flex-1 animate-pulse-hover">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CreateCourse component error:', error);
    return null;
  }
}
