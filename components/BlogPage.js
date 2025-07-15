function BlogPage({ onNavigate }) {
  try {
    const posts = [
      {
        title: "Building Successful Online Communities",
        excerpt: "Learn the key strategies for creating and maintaining thriving online communities.",
        date: "2024-01-15",
        author: "Sarah Johnson"
      },
      {
        title: "The Future of Creator Economy",
        excerpt: "Exploring how creators are monetizing their expertise through community platforms.",
        date: "2024-01-10", 
        author: "Mike Chen"
      },
      {
        title: "Community Engagement Best Practices",
        excerpt: "Tips and tricks to keep your community members active and engaged.",
        date: "2024-01-05",
        author: "Lisa Rodriguez"
      }
    ];

    return (
      <div className="min-h-screen py-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600">Insights, tips, and stories from the community</p>
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <div key={index} className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">More articles coming soon!</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BlogPage component error:', error);
    return null;
  }
}