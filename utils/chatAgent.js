const ChatAgent = {
  async moderateMessage(message) {
    try {
      const response = await invokeAIAgent(
        "You are a community chat moderator. Analyze this message for inappropriate content, spam, or harmful language. Respond with 'APPROVED' if safe, or 'FLAGGED: [reason]' if problematic.",
        `Message to moderate: "${message}"`
      );
      
      return response;
    } catch (error) {
      console.error('Moderation failed:', error);
      return 'APPROVED'; // Default to approved if AI fails
    }
  },

  async generateWelcomeMessage(userName, communityName) {
    try {
      const response = await invokeAIAgent(
        "Generate a friendly welcome message for a new community member. Keep it warm, encouraging, and under 100 words.",
        `Welcome ${userName} to ${communityName} community`
      );
      
      return response;
    } catch (error) {
      console.error('Welcome message generation failed:', error);
      return `Welcome to ${communityName}, ${userName}! We're excited to have you here.`;
    }
  },

  async suggestCommunityContent(communityType, recentActivity) {
    try {
      const response = await invokeAIAgent(
        "Based on the community type and recent activity, suggest 3 engaging content ideas for community posts. Format as bullet points.",
        `Community type: ${communityType}\nRecent activity: ${JSON.stringify(recentActivity)}`
      );
      
      return response;
    } catch (error) {
      console.error('Content suggestion failed:', error);
      return "• Share your latest project updates\n• Ask the community for feedback\n• Start a discussion about industry trends";
    }
  }
};