function ContactPage({ onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">We'd love to hear from you</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    required
                    className="input-field"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full animate-pulse-hover">Send Message</button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3 text-gray-600">
                  <p>📧 support@communityy.org</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>📍 San Francisco, CA</p>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sales Inquiries</h3>
                <p className="text-gray-600 mb-3">
                  Interested in our enterprise solutions? Let's talk!
                </p>
                <button 
                  onClick={() => onNavigate('payment')}
                  className="btn-primary animate-pulse-hover"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ContactPage component error:', error);
    return null;
  }
}