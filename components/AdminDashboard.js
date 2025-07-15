function AdminDashboard({ user, onNavigate }) {
  try {
    const [activeTab, setActiveTab] = React.useState('create');
    const [stats, setStats] = React.useState({
      totalCommunities: 0,
      totalMembers: 0,
      totalProducts: 0,
      totalEvents: 0
    });
    const [members, setMembers] = React.useState([]);

    React.useEffect(() => {
      loadStats();
      loadMembers();
      setTimeout(initCharts, 100);
    }, []);

    const loadStats = async () => {
      try {
        const [communities, products] = await Promise.all([
          trickleListObjects('community', 100, true),
          trickleListObjects('product', 100, true)
        ]);
        
        setStats({
          totalCommunities: communities.items?.length || 0,
          totalMembers: communities.items?.reduce((sum, c) => sum + (c.objectData.memberCount || 0), 0) || 0,
          totalProducts: products.items?.length || 0,
          totalEvents: 0
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    const loadMembers = async () => {
      try {
        const response = await trickleListObjects('member', 100, true);
        const mockMembers = [
          { id: '1', name: 'John Doe', email: 'john@example.com', joined: '2024-01-15', paid: 299, membership: 'Premium' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', joined: '2024-02-10', paid: 99, membership: 'Basic' },
          { id: '3', name: 'Mike Johnson', email: 'mike@example.com', joined: '2024-03-05', paid: 599, membership: 'Enterprise' }
        ];
        setMembers(mockMembers);
      } catch (error) {
        console.error('Failed to load members:', error);
      }
    };

    const removeMember = async (memberId) => {
      if (confirm('Are you sure you want to remove this member?')) {
        try {
          setMembers(members.filter(m => m.id !== memberId));
          alert('Member removed successfully');
        } catch (error) {
          alert('Failed to remove member');
        }
      }
    };

    const makeAdmin = async (memberId) => {
      if (confirm('Are you sure you want to make this member an admin?')) {
        try {
          setMembers(members.map(m => 
            m.id === memberId ? {...m, role: 'admin'} : m
          ));
          alert('Member promoted to admin successfully');
        } catch (error) {
          alert('Failed to promote member');
        }
      }
    };

    const initCharts = () => {
      const memberCtx = document.getElementById('memberGrowthChart');
      const revenueCtx = document.getElementById('revenueChart');
      
      if (memberCtx && typeof ChartJS !== 'undefined') {
        new ChartJS(memberCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'New Members',
              data: [12, 19, 15, 25, 22, 30],
              borderColor: '#8B5CF6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }

      if (revenueCtx && typeof ChartJS !== 'undefined') {
        new ChartJS(revenueCtx, {
          type: 'bar',
          data: {
            labels: ['Products', 'Events', 'Memberships'],
            datasets: [{
              data: [1500, 900, 300],
              backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }
    };

    const createItems = [
      { name: 'Product', icon: 'shopping-bag', color: 'green', action: () => onNavigate('upload-product') },
      { name: 'Event', icon: 'calendar', color: 'blue', action: () => onNavigate('create-event') },
      { name: '1:1 Session', icon: 'video', color: 'purple', action: () => onNavigate('create-session') },
      { name: 'Challenge', icon: 'trophy', color: 'yellow', action: () => onNavigate('create-challenge') },
      { name: 'Course', icon: 'book-open', color: 'indigo', action: () => onNavigate('create-course') },
      { name: 'Membership', icon: 'users', color: 'pink', action: () => onNavigate('create-membership') }
    ];

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50" data-name="admin-dashboard" data-file="components/AdminDashboard.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your communities and track performance</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="card text-center animate-bounce-in">
              <div className="text-2xl font-bold text-purple-600">{stats.totalCommunities}</div>
              <div className="text-sm text-gray-600">Communities</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalMembers}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalProducts}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.totalEvents}</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
          </div>

          <div className="card animate-slide-in">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'create' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  Create Content
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'members' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  Members
                </button>
              </nav>
            </div>

            {activeTab === 'create' ? (
              <div className="grid md:grid-cols-3 gap-6">
                {createItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="p-6 border rounded-lg hover:shadow-md transition-shadow text-center"
                  >
                    <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <div className={`icon-${item.icon} text-xl text-${item.color}-600`}></div>
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  </button>
                ))}
                <button
                  onClick={() => onNavigate('community-customize')}
                  className="p-6 border rounded-lg hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <div className="icon-palette text-xl text-blue-600"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900">Customize</h3>
                </button>
              </div>
            ) : activeTab === 'analytics' ? (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="card">
                    <h4 className="font-semibold text-gray-900 mb-4">Member Growth</h4>
                    <div className="h-64">
                      <canvas id="memberGrowthChart" className="w-full h-full"></canvas>
                    </div>
                  </div>
                  <div className="card">
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Analytics</h4>
                    <div className="h-64">
                      <canvas id="revenueChart" className="w-full h-full"></canvas>
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Community Growth</h4>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalCommunities}</div>
                    <p className="text-sm text-blue-600">+12% this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Revenue Growth</h4>
                    <div className="text-3xl font-bold text-green-600">${(stats.totalProducts * 50).toFixed(0)}</div>
                    <p className="text-sm text-green-600">+28% this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Engagement Rate</h4>
                    <div className="text-3xl font-bold text-purple-600">78%</div>
                    <p className="text-sm text-purple-600">+5% this month</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Community Members</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Joined</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Paid</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Membership</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{member.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{member.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{member.joined}</td>
                          <td className="px-4 py-3 text-sm font-medium text-green-600">${member.paid}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              member.membership === 'Premium' ? 'bg-purple-100 text-purple-700' :
                              member.membership === 'Enterprise' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {member.membership}
                            </span>
                          </td>
                          <td className="px-4 py-3 space-x-2">
                            <button
                              onClick={() => makeAdmin(member.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Make Admin
                            </button>
                            <button
                              onClick={() => removeMember(member.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminDashboard component error:', error);
    return null;
  }
}
