function EventBooking({ user, onNavigate }) {
  try {
    const [events, setEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadEvents();
    }, []);

    const loadEvents = async () => {
      try {
        const mockEvents = [
          {
            id: '1',
            title: 'Tech Conference 2024',
            date: '2024-02-15',
            time: '10:00',
            duration: 8,
            price: 99,
            maxAttendees: 100,
            currentAttendees: 45,
            description: 'Annual technology conference with industry leaders'
          },
          {
            id: '2',
            title: 'Creative Workshop',
            date: '2024-02-20',
            time: '14:00',
            duration: 4,
            price: 49,
            maxAttendees: 30,
            currentAttendees: 12,
            description: 'Hands-on workshop for creative professionals'
          }
        ];
        setEvents(mockEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    const bookEvent = async (eventId) => {
      try {
        const bookingData = {
          userId: user.id,
          eventId: eventId,
          bookedAt: new Date().toISOString(),
          status: 'confirmed'
        };
        
        await trickleCreateObject('event-booking', bookingData);
        
        // Send reminder notification
        await NotificationUtils.createNotification(
          user.id,
          'event',
          'Event Booked!',
          `You've successfully booked ${selectedEvent.title}. We'll remind you before the event.`
        );
        
        alert('Event booked successfully! You will receive a reminder notification.');
        setSelectedEvent(null);
      } catch (error) {
        alert('Failed to book event. Please try again.');
      }
    };

    return (
      <div className="min-h-screen py-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Book Events</h1>
            <p className="text-gray-600 mt-2">Reserve your spot at upcoming community events</p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="card">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>🕐 {event.time}</span>
                        <span>⏱️ {event.duration}h</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">${event.price}</div>
                      <div className="text-sm text-gray-500 mb-4">
                        {event.currentAttendees}/{event.maxAttendees} spots filled
                      </div>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="btn-primary w-full animate-pulse-hover"
                        disabled={event.currentAttendees >= event.maxAttendees}
                      >
                        {event.currentAttendees >= event.maxAttendees ? 'Sold Out' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to book "{selectedEvent.title}" for ${selectedEvent.price}?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => bookEvent(selectedEvent.id)}
                    className="btn-primary flex-1 animate-pulse-hover"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="btn-secondary flex-1 animate-pulse-hover"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('EventBooking component error:', error);
    return null;
  }
}