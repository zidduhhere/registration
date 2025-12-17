export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  emoji: string;
  date: string;
  fee: number;
  location: string;
  rules: string[];
  minTeamSize: number;
  maxTeamSize: number;
}

export const eventsData: Event[] = [
  {
    id: "coding-marathon",
    title: "Coding Marathon",
    category: "Computer Science",
    description: "24-hour hackathon to solve real-world problems.",
    longDescription: "The Coding Marathon is a grueling 24-hour hackathon where participants will work in teams to solve complex real-world problems. Whether you're an app developer, a machine learning enthusiast, or a competitive programmer, this event has something for you. Be prepared for sleepless nights, endless coffee, and the thrill of building something from scratch.",
    emoji: "💻",
    date: "Jan 24, 2025",
    fee: 499,
    location: "CSA Dept, Room 201",
    minTeamSize: 2,
    maxTeamSize: 4,
    rules: [
      "Teams of 2-4 members.",
      "Bring your own laptops and chargers.",
      "Use of open-source libraries is permitted.",
      "Plagiarism will lead to immediate disqualification."
    ]
  },
  {
    id: "robowars",
    title: "RoboWars",
    category: "Robotics",
    description: "Build your bot and battle it out in the arena.",
    longDescription: "RoboWars is the ultimate test of engineering and strategy. Design and build a combat robot to fight in our custom-made arena. From flippers to spinners, bring your most destructive designs and battle for supremacy. Safety protocols must be strictly followed.",
    emoji: "🤖",
    date: "Jan 25, 2025",
    fee: 999,
    location: "Main Auditorium",
    minTeamSize: 1,
    maxTeamSize: 5,
    rules: [
      "Bot weight limit: 15kg.",
      "No flammable or explosive weapons.",
      "Safety inspection is mandatory before the match.",
      "Teams can have up to 5 members."
    ]
  },
  {
    id: "science-quiz",
    title: "Science Quiz",
    category: "General Science",
    description: "Test your knowledge across physics, chem, and math.",
    longDescription: "A battle of wits! The Science Quiz will cover a broad range of topics including Physics, Chemistry, Mathematics, and Biology. Compete against the sharpest minds and prove your scientific prowess.",
    emoji: "🧬",
    date: "Jan 25, 2025",
    fee: 199,
    location: "Seminar Hall A",
    minTeamSize: 2,
    maxTeamSize: 2,
    rules: [
      "Teams of 2 members.",
      "Prelims followed by a stage final.",
      "No electronic gadgets allowed during the quiz.",
      "Quizmaster's decision is final."
    ]
  },
  {
    id: "paper-presentation",
    title: "Paper Presentation",
    category: "Research",
    description: "Present your research papers to a panel of experts.",
    longDescription: "Have you worked on innovative research? Present your findings to a panel of distinguished professors and industry experts. This is a platform to showcase your academic rigor and contribution to science and technology.",
    emoji: "📄",
    date: "Jan 26, 2025",
    fee: 299,
    location: "Conference Room B",
    minTeamSize: 1,
    maxTeamSize: 2,
    rules: [
      "Abstract submission deadline: Jan 10.",
      "Presentation time: 10 mins + 5 mins Q&A.",
      "Individual or teams of 2.",
      "Papers must be original work."
    ]
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    category: "Fun",
    description: "Explore the campus and solve clues to win.",
    longDescription: "Explore the beautiful IISc campus in this thrilling Treasure Hunt. Solve cryptic clues, perform fun tasks, and race against time to find the hidden treasure. A perfect blend of adventure and logic.",
    emoji: "🗺️",
    date: "Jan 26, 2025",
    fee: 399,
    location: "Central Lawn",
    minTeamSize: 3,
    maxTeamSize: 5,
    rules: [
      "Teams of 3-5 members.",
      "Use of bicycles/vehicles not allowed inside campus for the hunt.",
      "Fair play is mandatory.",
      "Reporting time: 9:00 AM."
    ]
  },
];
