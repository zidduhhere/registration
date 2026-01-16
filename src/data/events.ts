import { paymentAssets } from './../assets/payments/index';
import { posterAssets } from './../assets/posters/index';
import { arrowIcon, eatingEmote, edRedIcon, starBlack, starGradient } from "../assets/icons";
import type { MenuItemProps } from "../components/FlowingMenu";


export const eventId = {
  BUSINESS_PITCHING: "business-pitching",
  AI_SPRINT_WORKSHOP: "ai-sprint-workshop",
  RC_CAR: "rc-car",
  DRONE_RACE: "drone-race",
  CODE_DEBUGGING: "code-debugging",
  CIRCUIT_DEBUGGING: "circuit-debugging",
  WEB_DEVELOPMENT: "web-development",
  DESIGN_FOR_THE_SKY: "design-for-the-sky",
  DESIGN_FOR_CIVIL: "design-for-civil",
  STUDENT_DEV_UIUX: "figma-sdp",
  DRONE_MAKING_WORKSHOP: "drone-making-workshop",
  ROBOTICS_WORKSHOP: "robotics-workshop"
}


export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  duration?: string;
  date: string;
  fee: number;
  rules: string[];
  minTeamSize: number;
  maxTeamSize: number;
  contact1: string;
  contact2: string;
  color1: string;
  color2: string;
  poster: string;
}

export type MemberDetails = {
  name: string;
  college: string;
  email: string;
  phone: string;
}

export type EventGuidelines = {
  eventId: string;
  eventName: string;
  minimumTeamSize: number;
  maximumTeamSize: number;
  rules: string[];
  price: string
  
}



export const eventGuidelines: EventGuidelines[] = [

  {

    eventId: eventId.BUSINESS_PITCHING,
    eventName: "Business Pitching",
    minimumTeamSize: 3,
    maximumTeamSize: 4,
    rules: [
      "Teams up to 4 members.",
      "Pitch deck time: 8 minutes + Q&A.",
      "Slide decks submitted before final presentation.",
    ],
    price: paymentAssets[1500]
  },

  {
    eventId: eventId.AI_SPRINT_WORKSHOP,
    eventName: "AI Sprint & Workshop",
    minimumTeamSize: 1,
    maximumTeamSize: 1,
    rules: [
      "Individual teams.",
      "Bring your laptop."
    ],
    price: paymentAssets[200]
  },
    {
      eventId: eventId.RC_CAR,
      eventName: "RC Car Race",
      minimumTeamSize: 1,
      maximumTeamSize: 3,
      rules: [
        "Safety checks mandatory.",
        "No combustible fuel-powered cars.",
      ],
      price: paymentAssets[750]
    },
    {
      eventId: eventId.DRONE_RACE,
      eventName: "Drone Racing",
      minimumTeamSize: 1,
      maximumTeamSize: 2,
      rules: [
        "FAA/college flight rules apply.",
        "Pre-race inspection required."
      ],
      price: paymentAssets[750]
    },
    {
      eventId: eventId.CODE_DEBUGGING,
      eventName: "Code Debugging",
      minimumTeamSize: 1,
      maximumTeamSize: 2,
      rules: [
        "Individual or pairs.",
        "Internet allowed for documentation only."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.CIRCUIT_DEBUGGING,
      eventName: "Circuit Debugging",
      minimumTeamSize: 1,
      maximumTeamSize: 2,
      rules: [
        "Safety goggles required.",
        "No external powered test rigs allowed."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.WEB_DEVELOPMENT,
      eventName: "Web Development",
      minimumTeamSize: 1,
      maximumTeamSize: 2,
      rules: [
        "Teams of up to 4.",
        "Use of public libraries allowed."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.DESIGN_FOR_THE_SKY,
      eventName: "Design for the Sky",
      minimumTeamSize: 1,
      maximumTeamSize: 4,
      rules: [
        "Presentations limited to 10 minutes.",
        "Use provided template for posters."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.DESIGN_FOR_CIVIL,
      eventName: "Design for Civil",
      minimumTeamSize: 1,
      maximumTeamSize: 5,
      rules: [
        "Teams up to 5.",
        "Physical model materials provided on request."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.STUDENT_DEV_UIUX,
      eventName: "Student Development Program - UI/UX",
      minimumTeamSize: 1,
      maximumTeamSize: 2,
      rules: [
        "Registration encouraged."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.DRONE_MAKING_WORKSHOP,
      eventName: "Drone Making Workshop",
      minimumTeamSize: 1,
      maximumTeamSize: 1,
      rules: [
        "Bring your own laptop.",
        "Prior basic electronics knowledge recommended."
      ],
      price: paymentAssets[200]
    },
    {
      eventId: eventId.ROBOTICS_WORKSHOP,
      eventName: "Robotics Workshop",
      minimumTeamSize: 1,
      maximumTeamSize: 1,
      rules: [
        "Bring your own laptop.",
        "Prior basic electronics knowledge recommended."
      ],
      price: paymentAssets[200]
    }



];


export const eventsData: Event[] = [
  {
    id: "business-pitching",
    title: "Business Pitching",
    category: "Business",
    duration: "3 Days",
    description: "3-day hackathon focused on business pitching and startups.",
    longDescription:
      "A 3-day intensive business pitching hackathon where teams build startup ideas, prepare pitch decks, and present to judges. Mentorship and checkpoints available throughout the event. Participants will learn essential business skills including market analysis, financial planning, and investor communication. Expert judges from the startup ecosystem will provide real-time feedback and guidance. Winners receive prizes and potential investment opportunities. This is your chance to transform your business idea into a viable startup pitch.",

    date: "Feb 2-4, 2025",
    fee: 30000,

    minTeamSize: 1,
    maxTeamSize: 6,
    rules: [
      "Teams up to 6 members.",
      "Pitch deck time: 8 minutes + Q&A.",
      "Slide decks submitted before final presentation.",
    ],
    contact2: "+919809055938",
    contact1: "+917306522615",
              // colors={[eventDetails?.color1 ?? "#FF1500", eventDetails?.color2 ?? "#890707"]}

    color1: "#FF1500",
    color2: "#890707",
    poster: posterAssets["business-pitching"]
  },
  {
    id: "ai-sprint-workshop",
    title: "AI Sprint & Workshop",
    category: "AI",
    duration: "2 Days",
    description: "2-day sprint and hands-on AI workshop.",
    longDescription:
      "A focused 2-day AI sprint including an instructor-led workshop, followed by a mini-challenge where participants apply workshop techniques to short problems. Learn cutting-edge AI concepts from industry professionals and experienced mentors. Explore machine learning algorithms, neural networks, and practical AI applications in real-world scenarios. Hands-on coding sessions will help you build projects using popular frameworks like TensorFlow and PyTorch. Networking opportunities with AI experts and fellow enthusiasts throughout the event.",

    date: "Feb 2-3, 2025",
    fee: 5000,

    minTeamSize: 1,
    maxTeamSize: 3,
    rules: ["Individual or small teams.", "Bring your laptop."],
    contact1: "+917012253058",
    contact2: "+918281634393",
    color1: "#7c2d12",
    color2: "#fb923c",
    poster: posterAssets["ai-sprint-workshop"]
  },
  {
    id: eventId.RC_CAR,
    title: "RC Car Race",
    category: "Robotics",
    description: "High-speed RC car racing challenge.",
    longDescription:
      "Design or bring an RC car to compete on a custom track. Time trials followed by elimination rounds determine winners. Showcase your robotics and engineering skills in an exciting competitive environment. The event features a professionally designed track with various challenges and obstacles. Participants can either build their own RC car or bring pre-built models. Winners will be recognized and awarded prizes. This is an excellent opportunity to test your mechanical design and control systems.", 
    date: "Feb 2, 2025",
    fee: 20000,
    minTeamSize: 1,
    maxTeamSize: 4,
    rules: ["Safety checks mandatory.", "No combustible fuel-powered cars."],
    contact1: "+919633449155",
    contact2: "+918891748311",
    color1: "#991b1b",
    color2: "#f87171",
    poster: posterAssets['rc-car']
  },
  {
    id: eventId.DRONE_RACE,
    title: "Drone Race",
    duration: "1 Day",
    category: "Aero",
    description: "One-day drone racing competition.",
    longDescription:
      "Compete in a high-adrenaline drone race through gates and obstacles. Pilots must follow safety and flight rules.",

    date: "Feb 2, 2025",
    fee: 20000,

    minTeamSize: 1,
    maxTeamSize: 2,
    rules: ["FAA/college flight rules apply.", "Pre-race inspection required."],
    contact1: "+919778003944",
    contact2: "+918075478328",
    color1: "#0c4a6e",
    color2: "#38bdf8",
    poster: posterAssets["drone-race"]
  },
  {
    id: eventId.CODE_DEBUGGING,
    title: "Code Debugging",
    duration: "Half Day",
    category: "Programming",
    description: "Half-day debugging contest to fix broken code.",
    longDescription:
      "A rapid half-day contest where participants debug and fix a set of real-world buggy programs under time pressure.",

    date: "Feb 3, 2025",
    fee: 5000,

    minTeamSize: 1,
    maxTeamSize: 2,
    rules: ["Individual or pairs.", "Internet allowed for documentation only."],
    contact1: "+918590620874",
    contact2: "+919645373539",
    color1: "#065f46",
    color2: "#34d399",
    poster: posterAssets["code-debugging"]
  },
  {
    id: eventId.CIRCUIT_DEBUGGING,
    title: "Circuit Debugging",
    duration: "Half Day",
    category: "Electronics",
    description: "Half-day contest to diagnose and fix circuit issues.",
    longDescription:
      "Participants are given malfunctioning circuit setups and must identify and fix faults within the time limit.",

    date: "Feb 3, 2025",
    fee: 5000,

    minTeamSize: 1,
    maxTeamSize: 2,
    rules: ["Safety goggles required.", "No external powered test rigs allowed."],
    contact1: "+918590672271",
    contact2: "+917356867385",
    color1: "#831843",
    color2: "#f472b6",
    poster: posterAssets["circuit-debugging"]
  },
  {
    id: eventId.WEB_DEVELOPMENT,
    title: "Web Development",
    category: "Web",
    duration: "1 Day",
    description: "Full-day web development challenge.",
    longDescription:
      "Teams build a small web app from scratch in a single day; judged on functionality, design, and performance.",

    date: "Feb 4, 2025",
    fee: 5000,

    minTeamSize: 1,
    maxTeamSize: 4,
    rules: ["Teams of up to 4.", "Use of public libraries allowed."],
    contact1: "+919496905672",
    contact2: "+919092080155",
    color1: "#6b21a8",
    color2: "#c084fc",
    poster: posterAssets["web-development"]
  },
  {
    id: eventId.DESIGN_FOR_THE_SKY,
    title: "Design for the Sky",
    duration: "1 Day",
    category: "Design",
    description: "Full-day conceptual design challenge (aviation focused).",
    longDescription:
      "A full-day competition where teams propose conceptual designs related to aerial systems, UI/UX for cockpit displays, or products aimed at the skies.",

    date: "Feb 4, 2025",
    fee: 5000,

    minTeamSize: 1,
    maxTeamSize: 4,
    rules: ["Presentations limited to 10 minutes.", "Use provided template for posters."],
    contact1: "+919995585869",
    contact2: "+918089251740",
    color1: "#be123c",
    color2: "#fb7185",
    poster: posterAssets["design-for-the-sky"]
  },
  {
    id: eventId.DESIGN_FOR_CIVIL,
    title: "Design for Civil",
    duration: "1 Day",
    category: "Design",
    description: "Full-day civil engineering design competition.",
    longDescription:
      "Teams propose civil engineering solutions — from sustainable structures to community-focused designs — and present models and drawings.",

    date: "Feb 4, 2025",
    fee: 5000,

    minTeamSize: 1,
    maxTeamSize: 5,
    rules: ["Teams up to 5.", "Physical model materials provided on request."],
    contact1: "+9846507536",
    contact2: "+9496805691",
    color1: "#713f12",
    color2: "#fbbf24",
    poster: posterAssets["design-for-civil"]
  },
  
  {
    id: eventId.STUDENT_DEV_UIUX,
    duration: "1 Day",
    title: "Student Development Program - UI/UX",
    category: "Workshop",
    description: "Speaker session focusing on UI/UX and student development.",
    longDescription:
      "A speaker-led session and interactive workshop on UI/UX best practices, career development tips, and hands-on exercises for students.",

    date: "Feb 3, 2025",
    fee: 0,

    minTeamSize: 1,
    maxTeamSize: 100,
    rules: ["Registration encouraged."],
    contact1: "+919995762807",
    contact2: "+919497775753",
    color1: "#4c1d95",
    color2: "#a78bfa",
    poster: posterAssets['figma-sdp']
  },

  {
    id: eventId.DRONE_MAKING_WORKSHOP,
    duration: "2 Days",
    title: "Drone Making Workshop",
    category: "Workshop",
    description: "Hands-on drone making workshop over 2 days.",
    longDescription:
      "A practical 2-day workshop where participants learn to assemble and program drones from kits, covering basics of aerodynamics and flight control.",

    date: "Feb 2-3, 2025",
    fee: 10000,

    minTeamSize: 1,
    maxTeamSize: 1,
    rules: ["Bring your own laptop.", "Prior basic electronics knowledge recommended."],
    contact1: "234-567-8901",
    contact2: "234-567-8902",
    color1: "#064e3b",
    color2: "#10b981",
    poster: posterAssets["drone-making-workshop"]
  },

  {
    id: eventId.ROBOTICS_WORKSHOP,
    duration: "2 Days",
    title: "Robotics Workshop",
    category: "Workshop",
    description: "Introductory robotics workshop over 2 days.",
    longDescription:
      "A beginner-friendly 2-day workshop introducing robotics concepts, including building simple robots and programming basics using popular platforms.", 

    date: "Feb 2-3, 2025",
    fee: 10000,

    minTeamSize: 1,
    maxTeamSize: 1,
    rules: ["Bring your own laptop.", "Prior basic electronics knowledge recommended."],
    contact1: "345-678-9012",
    contact2: "345-678-9013",
    color1: "#1e40af",
    color2: "#3b82f6",
    poster: posterAssets["robotics-workshop"]
  }
];



export const items : MenuItemProps[] = [{
      link: `/events/${eventId.BUSINESS_PITCHING}`,
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
      link: `/events/${eventId.RC_CAR}`,
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
      link: `/events/${eventId.DRONE_RACE}`,
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
      link: `/events/${eventId.AI_SPRINT_WORKSHOP}`,
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
      link: `/events/${eventId.CODE_DEBUGGING}`,
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
      link: `/events/${eventId.CIRCUIT_DEBUGGING}`,
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
      link: `/events/${eventId.WEB_DEVELOPMENT}`,
      text: "WEBSITE DEVELOPMENT",
      image: starBlack,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
    {
      link: `/events/${eventId.STUDENT_DEV_UIUX}`,
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
      link: `/events/${eventId.DESIGN_FOR_CIVIL}`,
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
      link: `/events/${eventId.DESIGN_FOR_THE_SKY}`,
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
      link: `/events/${eventId.DRONE_MAKING_WORKSHOP}`,
      text: "DRONE MAKING WORKSHOP",
      image: edRedIcon,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
    },
     {
      link: `/events/${eventId.ROBOTICS_WORKSHOP}`,
      text: "ROBOTICS WORKSHOP",
      image: starGradient,
      speed: 30,
      textColor: "#FFFFFF",
      marqueeBgColor: "#FFffff",
      marqueeTextColor: "#000000",
      borderColor: "#FFFFFF",
      isFirst: true
     }
  ];