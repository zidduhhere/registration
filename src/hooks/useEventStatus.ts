import { useState, useEffect } from 'react';
import { eventGuidelines } from '../data/events';

export const useEventStatus = () => {
  const [eventStatuses, setEventStatuses] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadEventStatuses();

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'eventRegistrationStatus') {
        loadEventStatuses();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadEventStatuses = () => {
    const stored = localStorage.getItem('eventRegistrationStatus');
    if (stored) {
      try {
        setEventStatuses(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse event statuses:', err);
      }
    }
  };

  const isEventOpen = (eventId: string): boolean => {
    // Check localStorage first
    const status = eventStatuses[eventId];
    if (status !== undefined) {
      return status;
    }

    // Fall back to default from events data
    const event = eventGuidelines.find(e => e.eventId === eventId);
    return event?.registrationOpen ?? true;
  };

  const getClosedEvents = (): string[] => {
    return eventGuidelines
      .filter(event => !isEventOpen(event.eventId))
      .map(event => event.eventId);
  };

  return {
    isEventOpen,
    getClosedEvents,
    eventStatuses
  };
};
