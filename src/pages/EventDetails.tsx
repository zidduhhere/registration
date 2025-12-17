import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Receipt,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { eventsData } from "../data/events";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-notion-text mb-4">
          Event Not Found
        </h2>
        <Link to="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[800px] mx-auto"
    >
      <Link
        to="/events"
        className="inline-flex items-center text-notion-muted hover:text-notion-text mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Events
      </Link>

      <div className="mb-10 text-center">
        <div className="text-6xl mb-4">{event.emoji}</div>
        <h1 className="text-4xl font-sans font-bold text-notion-primary mb-4">
          {event.title}
        </h1>
        <span className="inline-block px-3 py-1 rounded bg-notion-card text-notion-text text-sm font-medium tracking-wide">
          {event.category}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="flex flex-col items-center text-center p-6 bg-notion-card border-notion-border">
          <Calendar className="text-notion-muted mb-2" size={24} />
          <span className="text-sm text-notion-muted uppercase tracking-wider mb-1">
            Date
          </span>
          <span className="font-medium text-notion-text">{event.date}</span>
        </Card>
        <Card className="flex flex-col items-center text-center p-6 bg-notion-card border-notion-border">
          <MapPin className="text-notion-muted mb-2" size={24} />
          <span className="text-sm text-notion-muted uppercase tracking-wider mb-1">
            Time & Venue
          </span>
          <span className="font-medium text-notion-text">{event.location}</span>
        </Card>
        <Card className="flex flex-col items-center text-center p-6 bg-notion-card border-notion-border">
          <Receipt className="text-notion-muted mb-2" size={24} />
          <span className="text-sm text-notion-muted uppercase tracking-wider mb-1">
            Registration Fee
          </span>
          <span className="font-medium text-notion-text">₹ {event.fee}</span>
        </Card>
      </div>

      <div className="prose prose-invert max-w-none text-notion-text mb-12">
        <h3 className="text-xl font-medium text-notion-primary mb-4">
          About the Event
        </h3>
        <p className="text-notion-text/90 leading-relaxed mb-8 text-lg">
          {event.longDescription}
        </p>

        <h3 className="text-xl font-medium text-notion-primary mb-4">
          Rules & Guidelines
        </h3>
        <ul className="space-y-2 list-none pl-0">
          {event.rules.map((rule, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-notion-text/90"
            >
              <AlertCircle
                size={18}
                className="mt-1 text-notion-muted flex-shrink-0"
              />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center border-t border-notion-border pt-10">
        <Link to={`/register?eventId=${event.id}`}>
          <Button
            size="lg"
            className="px-12 text-lg h-14 bg-notion-accent text-white hover:bg-sky-700 border-transparent"
          >
            Register for {event.title}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EventDetails;
