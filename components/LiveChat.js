function LiveChat({ user, onNavigate }) {
  try {
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [selectedCommunity, setSelectedCommunity] = React.useState('');
    const [communities, setCommunities] = React.useState([]);

    React.useEffect(() => {
      loadCommunities();
    }, []);

    React.useEffect(() => {
      if (selectedCommunity) {
        loadMessages();
      }
    }, [selectedCommunity]);

    const loadCommunities = async () => {
      try {
        const response = await trickleListObjects('community', 50, true);
        setCommunities(response.items || []);
        if (response.items && response.items.length > 0) {
          setSelectedCommunity(response.items[0].objectId);
        }
      } catch (error) {
        console.error('Failed to load communities:', error);
      }
    };

    const loadMessages = async () => {
      try {
        const response = await trickleListObjects(`chat-message:${selectedCommunity}`, 50, true);
        setMessages(response.items || []);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    const sendMessage = async (e) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      setLoading(true);
      try {
        const messageData = {
          content: newMessage,
          senderId: user.id,
          senderName: user.name,
          timestamp: new Date().toISOString(),
          type: 'user'
        };

        await trickleCreateObject(`chat-message:${selectedCommunity}`, messageData);
        setNewMessage('');

        // AI moderation check
        const moderationResponse = await invokeAIAgent(
          "You are a community chat moderator. Check if this message is appropriate and safe. Respond with 'APPROVED' or 'FLAGGED: reason'.",
          `Message: "${newMessage}"`
        );

        if (moderationResponse.includes('FLAGGED')) {
          const warningData = {
            content: "⚠️ Your message has been flagged for review. Please keep conversations respectful.",
            senderId: 'system',
            senderName: 'Community Bot',
            timestamp: new Date().toISOString(),
            type: 'system'
          };
          await trickleCreateObject(`chat-message:${selectedCommunity}`, warningData);
        }

        loadMessages();
      } catch (error) {
        alert('Failed to send message. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="card animate-slide-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communities</h3>
              <div className="space-y-2">
                {communities.map((community) => (
                  <button
                    key={community.objectId}
                    onClick={() => setSelectedCommunity(community.objectId)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedCommunity === community.objectId 
                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{community.objectData.name}</div>
                    <div className="text-sm text-gray-500">{community.objectData.memberCount || 1} members</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 card h-96 flex flex-col">
              <div className="border-b border-gray-200 p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {communities.find(c => c.objectId === selectedCommunity)?.objectData.name || 'Community Chat'}
                </h2>
                <p className="text-sm text-gray-600">Connect with community members</p>
              </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.objectId} className={`flex ${
                  message.objectData.senderId === user.id ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.objectData.type === 'system' 
                      ? 'bg-yellow-100 text-yellow-800 text-center w-full'
                      : message.objectData.senderId === user.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.objectData.type !== 'system' && (
                      <p className="text-xs opacity-75 mb-1">{message.objectData.senderName}</p>
                    )}
                    <p className="text-sm">{message.objectData.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 input-field"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  disabled={loading || !newMessage.trim()}
                  className="btn-primary px-6 animate-pulse-hover"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LiveChat component error:', error);
    return null;
  }
}