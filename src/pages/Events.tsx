import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const eventsData = [
  {
    id: 1,
    title: "Coding Marathon",
    category: "Computer Science",
    description: "24-hour hackathon to solve real-world problems.",
    emoji: "💻",
    date: "Jan 24",
  },
  {
    id: 2,
    title: "RoboWars",
    category: "Robotics",
    description: "Build your bot and battle it out in the arena.",
    emoji: "🤖",
    date: "Jan 25",
  },
  {
    id: 3,
    title: "Science Quiz",
    category: "General Science",
    description: "Test your knowledge across physics, chem, and math.",
    emoji: "🧬",
    date: "Jan 25",
  },
  {
    id: 4,
    title: "Paper Presentation",
    category: "Research",
    description: "Present your research papers to a panel of experts.",
    emoji: "📄",
    date: "Jan 26",
  },
  {
    id: 5,
    title: "Treasure Hunt",
    category: "Fun",
    description: "Explore the campus and solve clues to win.",
    emoji: "🗺️",
    date: "Jan 26",
  },
];

const Events: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-4xl font-sans text-notion-primary mb-2">Events</h1>
        <p className="text-notion-muted text-lg">
          Select an event to register.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card hoverable className="h-full flex flex-col">
              <div className="text-3xl mb-4">{event.emoji}</div>
              <div className="flex-1 flex flex-col">
                <span className="text-xs uppercase tracking-wider text-notion-text-light font-semibold mb-1">
                  {event.category}
                </span>
                <h3 className="text-xl font-medium text-notion-text mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-notion-muted leading-relaxed mb-6 flex-1">
                  {event.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-notion-border mt-auto">
                  <span className="text-sm text-notion-muted bg-notion-card px-2 py-1 rounded">
                    {event.date}
                  </span>
                  <Button size="sm" variant="secondary">
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
