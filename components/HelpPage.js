function HelpPage({ onNavigate }) {
  try {
    const [searchTerm, setSearchTerm] = React.useState('');
    
    const faqs = [
      {
        question: "How do I create a community?",
        answer: "Click on 'Create Community' in the navigation menu and fill out the required information."
      },
      {
        question: "How can I join a community?",
        answer: "You can join communities by browsing our directory or using an invite code from a community creator."
      },
      {
        question: "What are invite codes?",
        answer: "Invite codes are 6-digit codes that community creators can share to allow direct access to their communities."
      },
      {
        question: "How do I upload products?",
        answer: "Navigate to the admin dashboard of your community and use the 'Upload Product' feature."
      }
    ];

    const filteredFaqs = faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600">Find answers to common questions</p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for help..."
              className="input-field max-w-md mx-auto block"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-primary animate-pulse-hover"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HelpPage component error:', error);
    return null;
  }
}