import { ArrowDownCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { eventGuidelines, type EventGuidelines } from "../../data/events";
import { useEventStatus } from "../../hooks/useEventStatus";

interface EventSelectionProps {
  eventSelected: EventGuidelines | null;
  setEventSelected: (event: EventGuidelines | null) => void;
}

const EventSelection = ({ eventSelected, setEventSelected }: EventSelectionProps) => {
  const { isEventOpen } = useEventStatus();

  return (
    <>
      <form className="h-fit py-4 mx-2" id="eventSelection">
        <div className="max-w-fit relative">
          <ArrowDownCircle className="inline-block absolute w-4 top-1/2 right-2" />
          <label
            htmlFor="eventSelection"
            className="block clash text-sm font-semibold mb-2 mt-4"
          >
            Select The Event <span className="text-red-500">*</span>
          </label>
          <select
            value={eventSelected?.eventName || ""}
            onChange={(e) => {
              const selected = eventGuidelines.find(eg => eg.eventName === e.target.value) || null;
              setEventSelected(selected);
            }}
            className="bg-gray-100 px-4 py-2 min-w-50 rounded-md clash text-sm overflow-hidden"
            name="event"
            id="eventSelection"
          >
            <option value="" disabled>
              Select an event
            </option>
            {eventGuidelines.map((event, index) => {
              const isOpen = isEventOpen(event.eventId);
              return (
                <option 
                  key={index} 
                  value={event.eventName}
                  disabled={!isOpen}
                >
                  {event.eventName} {!isOpen ? '(Registration Full)' : ''}
                </option>
              );
            })}
          </select>
          {!eventSelected && (
            <p className="text-red-500 text-xs mt-1">Please select an event</p>
          )}
          {eventSelected && !isEventOpen(eventSelected.eventId) && (
            <p className="text-red-500 text-xs mt-1 font-semibold">
              ⚠️ Registration for this event is currently closed (Full)
            </p>
          )}
        </div>
      </form>

      {eventSelected && (
        <Link
          to={`/events/${eventSelected.eventId}`}
          className="clash text-sm underline leading-2 mx-2 text-[#5227FF]"
        >
          Check {eventSelected?.eventName} details
        </Link>
      )}
    </>
  );
};

export default EventSelection;
