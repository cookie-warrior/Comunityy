function ProductUpload({ user, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      price: '',
      category: 'digital',
      imageUrl: '',
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
        const productData = {
          ...formData,
          creatorId: user.id,
          createdAt: new Date().toISOString(),
          status: 'active'
        };

        await trickleCreateObject('product', productData);
        alert('Product uploaded successfully!');
        onNavigate('dashboard');
      } catch (error) {
        alert('Failed to upload product. Please try again.');
      }
    };

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="min-h-screen py-6" data-name="product-upload" data-file="components/ProductUpload.js">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card animate-bounce-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="icon-upload text-2xl text-green-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Upload Product</h1>
              <p className="text-gray-600 mt-2">Share your products with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-field"
                  placeholder="Enter product name"
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
                  placeholder="Describe your product"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    required
                    className="input-field"
                    placeholder="$99.99"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
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
                    <option value="digital">Digital Product</option>
                    <option value="physical">Physical Product</option>
                    <option value="service">Service</option>
                    <option value="course">Course</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="communityId" className="block text-sm font-medium text-gray-700 mb-2">
                  Community <span className="text-red-500">*</span>
                </label>
                <select
                  id="communityId"
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
                <button
                  type="submit"
                  className="btn-primary flex-1 animate-pulse-hover"
                >
                  Upload Product
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
    console.error('ProductUpload component error:', error);
    return null;
  }
}