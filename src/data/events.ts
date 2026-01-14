import { arrowIcon, eatingEmote, edRedIcon, starBlack, starGradient } from "../assets/icons";
import type { MenuItemProps } from "../components/FlowingMenu";

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
    id: "business-pitching",
    title: "Business Pitching",
    category: "Business",
    description: "3-day hackathon focused on business pitching and startups.",
    longDescription:
      "A 3-day intensive business pitching hackathon where teams build startup ideas, prepare pitch decks, and present to judges. Mentorship and checkpoints available throughout the event.",
    emoji: "💼",
    date: "Feb 2-4, 2025",
    fee: 30000,
    location: "ACE College Auditorium",
    minTeamSize: 1,
    maxTeamSize: 6,
    rules: [
      "Teams up to 6 members.",
      "Pitch deck time: 8 minutes + Q&A.",
      "Slide decks submitted before final presentation.",
    ],
  },
  {
    id: "ai-sprint-workshop",
    title: "AI Sprint & Workshop",
    category: "AI",
    description: "2-day sprint and hands-on AI workshop.",
    longDescription:
      "A focused 2-day AI sprint including an instructor-led workshop, followed by a mini-challenge where participants apply workshop techniques to short problems.",
    emoji: "🤖",
    date: "Feb 2-3, 2025",
    fee: 5000,
    location: "Computer Lab 1",
    minTeamSize: 1,
    maxTeamSize: 3,
    rules: ["Individual or small teams.", "Bring your laptop."]
  },
  {
    id: "rc-car-race",
    title: "RC Car Race",
    category: "Robotics",
    description: "High-speed RC car racing challenge.",
    longDescription:
      "Design or bring an RC car to compete on a custom track. Time trials followed by elimination rounds determine winners.",
    emoji: "🏎️",
    date: "Feb 2, 2025",
    fee: 20000,
    location: "Outdoor Track",
    minTeamSize: 1,
    maxTeamSize: 4,
    rules: ["Safety checks mandatory.", "No combustible fuel-powered cars."]
  },
  {
    id: "drone-race",
    title: "Drone Race",
    category: "Aero",
    description: "One-day drone racing competition.",
    longDescription:
      "Compete in a high-adrenaline drone race through gates and obstacles. Pilots must follow safety and flight rules.",
    emoji: "🛩️",
    date: "Feb 2, 2025",
    fee: 20000,
    location: "Flying Field",
    minTeamSize: 1,
    maxTeamSize: 2,
    rules: ["FAA/college flight rules apply.", "Pre-race inspection required."]
  },
  {
    id: "code-debugging",
    title: "Code Debugging",
    category: "Programming",
    description: "Half-day debugging contest to fix broken code.",
    longDescription:
      "A rapid half-day contest where participants debug and fix a set of real-world buggy programs under time pressure.",
    emoji: "🛠️",
    date: "Feb 3, 2025",
    fee: 5000,
    location: "Lab 3",
    minTeamSize: 1,
    maxTeamSize: 2,
    rules: ["Individual or pairs.", "Internet allowed for documentation only."]
  },
  {
    id: "circuit-debugging",
    title: "Circuit Debugging",
    category: "Electronics",
    description: "Half-day contest to diagnose and fix circuit issues.",
    longDescription:
      "Participants are given malfunctioning circuit setups and must identify and fix faults within the time limit.",
    emoji: "🔧",
    date: "Feb 3, 2025",
    fee: 5000,
    location: "Electronics Lab",
    minTeamSize: 1,
    maxTeamSize: 2,
    rules: ["Safety goggles required.", "No external powered test rigs allowed."]
  },
  {
    id: "web-development",
    title: "Web Development",
    category: "Web",
    description: "Full-day web development challenge.",
    longDescription:
      "Teams build a small web app from scratch in a single day; judged on functionality, design, and performance.",
    emoji: "🌐",
    date: "Feb 4, 2025",
    fee: 5000,
    location: "Lab 5",
    minTeamSize: 1,
    maxTeamSize: 4,
    rules: ["Teams of up to 4.", "Use of public libraries allowed."]
  },
  {
    id: "design-for-the-sky",
    title: "Design for the Sky",
    category: "Design",
    description: "Full-day conceptual design challenge (aviation focused).",
    longDescription:
      "A full-day competition where teams propose conceptual designs related to aerial systems, UI/UX for cockpit displays, or products aimed at the skies.",
    emoji: "🎨",
    date: "Feb 4, 2025",
    fee: 5000,
    location: "Design Studio",
    minTeamSize: 1,
    maxTeamSize: 4,
    rules: ["Presentations limited to 10 minutes.", "Use provided template for posters."]
  },
  {
    id: "design-for-civil",
    title: "Design for Civil",
    category: "Design",
    description: "Full-day civil engineering design competition.",
    longDescription:
      "Teams propose civil engineering solutions — from sustainable structures to community-focused designs — and present models and drawings.",
    emoji: "🏗️",
    date: "Feb 4, 2025",
    fee: 5000,
    location: "Civil Workshop",
    minTeamSize: 1,
    maxTeamSize: 5,
    rules: ["Teams up to 5.", "Physical model materials provided on request."]
  },
  {
    id: "iedc-talk-session",
    title: "IEDC Talk Session",
    category: "Talk",
    description: "A one-day expert talk hosted by IEDC.",
    longDescription:
      "Join industry speakers and founders for a one-day talk session covering entrepreneurship, incubation, and real-world startup advice.",
    emoji: "📢",
    date: "Feb 3, 2025",
    fee: 0,
    location: "Seminar Hall",
    minTeamSize: 1,
    maxTeamSize: 100,
    rules: ["Open to all students."]
  },
  {
    id: "student-dev-uiux",
    title: "Student Development Program - UI/UX",
    category: "Workshop",
    description: "Speaker session focusing on UI/UX and student development.",
    longDescription:
      "A speaker-led session and interactive workshop on UI/UX best practices, career development tips, and hands-on exercises for students.",
    emoji: "🧑‍🎨",
    date: "Feb 3, 2025",
    fee: 0,
    location: "Auditorium B",
    minTeamSize: 1,
    maxTeamSize: 100,
    rules: ["Registration encouraged."]
  },
];



 export const items : MenuItemProps[] = [{
      link: "/events/event1",
      text: "BUSINESS HACAKATHON",
      image: starGradient,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "RC CAR RACE",
      image: edRedIcon,
      speed: 30,
      
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "DRONE RACE",
      image: starBlack,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "BUSINESS HACAKATHON",
      image: arrowIcon,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "AI WORKSHOP & SPRINT",
      image: eatingEmote,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "CODE DEBUGGING",
      image: starGradient,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "CIRCUIT DEBUGGING",
      image: edRedIcon,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "WEBSITE DESIGNING",
      image: starBlack,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "FIGMA FOR DESIGNERS _ SOP",
      image: arrowIcon,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "IEDC TALKS",
      image: eatingEmote,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "DESIGN FOR STRUCTURE",
      image: edRedIcon,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "DESIGN FOR SKY",
      image: starBlack,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: "/events/event1",
      text: "DRONE MAKING WORKSHOP",
      image: edRedIcon,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    }
  ];