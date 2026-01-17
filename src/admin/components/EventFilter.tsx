interface EventFilterProps {
  events: Array<{ id: string; name: string }>;
  selectedEvent: string;
  onEventChange: (eventId: string) => void;
}

const EventFilter = ({ events, selectedEvent, onEventChange }: EventFilterProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2 clash">
        Filter by Event
      </label>
      <select
        value={selectedEvent}
        onChange={(e) => onEventChange(e.target.value)}
        className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition serif bg-white"
      >
        <option value="all">All Events</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventFilter;
