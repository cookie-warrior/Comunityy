function CommunityStats({ user, onNavigate }) {
  try {
    const [stats, setStats] = React.useState({
      totalPosts: 0,
      totalMembers: 0,
      totalEngagement: 0,
      totalRevenue: 0,
      recentActivity: [],
      monthlyData: []
    });
    const [loading, setLoading] = React.useState(true);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
      loadStats();
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, []);

    const loadStats = async () => {
      try {
        const [posts, communities, products, events, courses] = await Promise.all([
          trickleListObjects('community-post', 100, true),
          trickleListObjects('community', 100, true),
          trickleListObjects('product', 100, true),
          trickleListObjects('event', 100, true),
          trickleListObjects('course', 100, true)
        ]);
        
        const revenue = (products.items?.reduce((sum, p) => sum + (parseFloat(p.objectData.price) || 0), 0) || 0) +
                       (events.items?.reduce((sum, e) => sum + (parseFloat(e.objectData.entryFee) || 0), 0) || 0) +
                       (courses.items?.reduce((sum, c) => sum + (parseFloat(c.objectData.price) || 0), 0) || 0);

        const monthlyData = [
          { month: 'Jan', members: 45, revenue: 1200 },
          { month: 'Feb', members: 89, revenue: 2100 },
          { month: 'Mar', members: 134, revenue: 3400 },
          { month: 'Apr', members: 178, revenue: 4200 },
          { month: 'May', members: 234, revenue: 5800 },
          { month: 'Jun', members: 289, revenue: 7200 }
        ];
        
        setStats({
          totalPosts: posts.items?.length || 0,
          totalMembers: communities.items?.reduce((sum, c) => sum + (c.objectData.memberCount || 0), 0) || 0,
          totalEngagement: posts.items?.reduce((sum, p) => sum + (p.objectData.likes || 0) + (p.objectData.comments || 0), 0) || 0,
          totalRevenue: revenue,
          recentActivity: posts.items?.slice(0, 5) || [],
          monthlyData
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      if (stats.monthlyData.length > 0 && chartRef.current) {
        createChart();
      }
    }, [stats.monthlyData]);

    const createChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: stats.monthlyData.map(d => d.month),
          datasets: [{
            label: 'Members',
            data: stats.monthlyData.map(d => d.members),
            borderColor: '#8B5CF6',
            backgroundColor: '#8B5CF6',
            tension: 0.4
          }, {
            label: 'Revenue ($)',
            data: stats.monthlyData.map(d => d.revenue),
            borderColor: '#10B981',
            backgroundColor: '#10B981',
            tension: 0.4,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true },
            y1: { type: 'linear', display: true, position: 'right' }
          }
        }
      });
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Community Dashboard</h1>
            <button 
              onClick={() => onNavigate('admin')}
              className="btn-secondary animate-pulse-hover"
            >
              Back to Admin
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="card text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="icon-file-text text-xl text-white"></div>
              </div>
              <div className="text-3xl font-bold text-purple-600">{stats.totalPosts}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="card text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="icon-users text-xl text-white"></div>
              </div>
              <div className="text-3xl font-bold text-blue-600">{stats.totalMembers}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="card text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="icon-dollar-sign text-xl text-white"></div>
              </div>
              <div className="text-3xl font-bold text-green-600">${stats.totalRevenue.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="card text-center bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="icon-trending-up text-xl text-white"></div>
              </div>
              <div className="text-3xl font-bold text-orange-600">{stats.totalEngagement}</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.objectData?.content?.substring(0, 50)}...
                      </p>
                      <p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.objectData?.likes || 0} likes
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Analytics</h3>
              <div className="h-64">
                <canvas ref={chartRef} className="w-full h-full"></canvas>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts This Week</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes</span>
                  <span className="font-semibold">892</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Products</span>
                  <span className="font-semibold text-green-600">${(stats.totalRevenue * 0.6).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Events</span>
                  <span className="font-semibold text-green-600">${(stats.totalRevenue * 0.3).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Memberships</span>
                  <span className="font-semibold text-green-600">${(stats.totalRevenue * 0.1).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Active</span>
                  <span className="font-semibold">{Math.floor(stats.totalMembers * 0.3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly Active</span>
                  <span className="font-semibold">{Math.floor(stats.totalMembers * 0.7)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New This Month</span>
                  <span className="font-semibold">{Math.floor(stats.totalMembers * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CommunityStats component error:', error);
    return null;
  }
}