function CareersPage({ onNavigate }) {
  try {
    const openings = [
      {
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time"
      },
      {
        title: "Community Manager",
        department: "Operations", 
        location: "San Francisco, CA",
        type: "Full-time"
      },
      {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        type: "Contract"
      }
    ];

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers</h1>
            <p className="text-xl text-gray-600">Join our mission to build the future of communities</p>
          </div>

          <div className="card mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-gray-600 mb-4">
              Join a team that's passionate about connecting people and building the future of online communities.
              We offer competitive benefits, remote work options, and the opportunity to make a real impact.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Open Positions</h3>
            {openings.map((job, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-gray-600">{job.department} • {job.location} • {job.type}</p>
                  </div>
                  <button className="btn-primary animate-pulse-hover">Apply Now</button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Don't see a role that fits?</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-primary animate-pulse-hover"
            >
              Send Us Your Resume
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CareersPage component error:', error);
    return null;
  }
}
