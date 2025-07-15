const NotificationUtils = {
  async createNotification(userId, type, title, message) {
    try {
      const notificationData = {
        type,
        title,
        message,
        read: false,
        createdAt: new Date().toISOString()
      };
      
      await trickleCreateObject(`notification:${userId}`, notificationData);
      return true;
    } catch (error) {
      console.error('Failed to create notification:', error);
      return false;
    }
  },

  async notifyProductLaunch(productName, communityMembers) {
    const promises = communityMembers.map(memberId => 
      this.createNotification(
        memberId,
        'product_launch',
        'New Product Launch!',
        `${productName} is now available in your community`
      )
    );
    
    await Promise.all(promises);
  },

  async notifyEventCreated(eventName, communityMembers) {
    const promises = communityMembers.map(memberId => 
      this.createNotification(
        memberId,
        'event',
        'New Event Created!',
        `Don't miss: ${eventName}`
      )
    );
    
    await Promise.all(promises);
  },

  async notifyAnnouncement(announcement, communityMembers) {
    const promises = communityMembers.map(memberId => 
      this.createNotification(
        memberId,
        'announcement',
        'Community Announcement',
        announcement
      )
    );
    
    await Promise.all(promises);
  }
};