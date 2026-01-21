import { useState, useEffect } from 'react';
import { eventGuidelines } from '../../data/events';

interface EventStatusManagerProps {
  onStatusChange?: () => void;
}

const EventStatusManager = ({ onStatusChange }: EventStatusManagerProps) => {
  const [eventStatuses, setEventStatuses] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  // Load event statuses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('eventRegistrationStatus');
    if (stored) {
      try {
        setEventStatuses(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse event statuses:', err);
      }
    }
  }, []);

  const toggleEventStatus = (eventId: string) => {
    setLoading(true);
    
    setEventStatuses(prev => {
      const newStatuses = {
        ...prev,
        [eventId]: !(prev[eventId] ?? true) // Default to true if not set
      };
      
      // Save to localStorage
      localStorage.setItem('eventRegistrationStatus', JSON.stringify(newStatuses));
      
      return newStatuses;
    });

    // Notify parent component
    if (onStatusChange) {
      onStatusChange();
    }

    setLoading(false);
  };

  const getEventStatus = (eventId: string): boolean => {
    return eventStatuses[eventId] ?? true; // Default to open
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 clash">Event Registration Status</h3>
        <p className="text-sm text-gray-600 serif mt-1">
          Toggle event registration on/off. Closed events will show as "Registration Full" to users.
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {eventGuidelines.map((event) => {
          const isOpen = getEventStatus(event.eventId);
          
          return (
            <div
              key={event.eventId}
              className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 clash">
                  {event.eventName}
                </h4>
                <p className="text-xs text-gray-500 serif mt-0.5">
                  ID: {event.eventId}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold clash ${
                    isOpen
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isOpen ? (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Open
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Closed
                    </>
                  )}
                </span>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleEventStatus(event.eventId)}
                  disabled={loading}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isOpen ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  role="switch"
                  aria-checked={isOpen}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isOpen ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>

                {/* Action Text */}
                <span className="text-xs text-gray-500 serif min-w-15">
                  {isOpen ? 'Close' : 'Open'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 serif italic">
          ℹ️ Changes are saved automatically in browser storage. Closed events will display
          "Registration Full" message to users and prevent new registrations.
        </p>
      </div>
    </div>
  );
};

export default EventStatusManager;
