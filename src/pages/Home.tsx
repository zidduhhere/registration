import React, { useState } from "react";
import TextType from "../components/TextType";
import ShinyText from "../components/ShinyText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextPressure from "../components/TextPressure";
import About from "./About";
import Events from "./Events";
import ContactUs from "./ContactUs";
import { Link } from "react-router-dom";
import { items } from "../data/events";
import Watermark from "../components/Watermark";
import RepublicDay from "../components/RepublicDay";

const Home: React.FC = () => {
  const [showLoading, setShowLoading] = useState(() => {
    return !sessionStorage.getItem("hasVisitedHome");
  });

  useGSAP(() => {
    if (!showLoading) {
      // If returning visitor, show content immediately without animation
      gsap.set(".children", {
        display: "flex",
        opacity: 1,
        y: 0,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      });
      gsap.set(".hero-container", {
        display: "none",
      });
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          // Set loading to false when animation completes
          setShowLoading(false);
          sessionStorage.setItem("hasVisitedHome", "true");
        },
      })
      .from(".main-text", {
        opacity: 0,
        y: -40,
        ease: "power3.out",
        duration: 0.7,
        delay: 0.3,
      })
      .from(".hint-text", {
        opacity: 0,
        y: 40,
        ease: "power3.out",
        duration: 0.7,
      })
      .from(".republic-day-intro", {
        opacity: 0,
        scale: 0.8,
        ease: "back.out(1.7)",
        duration: 0.8,
      })
      .to(".hero-container", {
        opacity: 0,
        y: -400,
        pointerEvents: "none",
        ease: "elastic.in",
        duration: 0.7,
      })
      .to(".hero-container", {
        display: "none",
      })
      .fromTo(
        ".children",
        {
          display: "flex",
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "all",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          ease: "power3.out",
          duration: 0.7,
        },
      );
  }, [showLoading]);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Container - shown on first visit */}
      <div className="flex flex-col gap-4 justify-center items-center h-screen hero-container">
        <TextType
          text={"PRAVEGA"}
          cursorCharacter={"_"}
          typingSpeed={200}
          deletingSpeed={100}
          showCursor={false}
          pauseDuration={2000}
          loop={false}
          className="nevera text-7xl text-black main-text"
        />

        <div className="hint-text flex flex-col items-center gap-2">
          <ShinyText text="Let's RUN !!!" className="clash text-3xl" />

          {/* Republic Day 2026 with Tricolor Theme */}
          <div className="flex flex-col items-center mt-4 republic-day-intro">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl animate-bounce">🇮🇳</span>
              <h2 className="clash text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-saffron via-india-green to-ashoka-blue">
                REPUBLIC DAY 2026
              </h2>
              <span className="text-4xl animate-bounce">🇮🇳</span>
            </div>
            <p className="serif text-lg text-gray-600 italic">
              Celebrating 77 Years of Democracy
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - shown after animation or immediately for return visitors */}
      <div className="opacity-0 children" style={{ display: "none" }}>
        <TextPressure text="PRAVEGA 2026" textColor="black" strokeWidth={10} />

        {/* <div className="w-screen overflow-hidden">
        <video 
          className="w-[60vh] mt-10 mx-auto rounded-full h-60 my-auto object-cover  border-none"
          autoPlay 
          loop  
          playsInline
          
        >
          <source className="border-none object-contain" src="/src/assets/IMG_8676.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="w-full h-full inset-0 bg-black opacity-90 pointer-events-none"></div>
      </div> */}

        <div className="flex flex-col items-center justify-center text-center pt-10 h-[80vh] gap-4">
          <a
            href="#republic-day"
            className="button-text tricolor-gradient h-14 w-[60vw] px-10 md:w-[40vw] hover:scale-105 transition-transform text-white serif text-4xl flex items-center justify-center font-bold shadow-lg"
          >
            🇮🇳 REPUBLIC DAY
          </a>
          <a
            href="#about"
            className="button-text bg-saffron h-14 w-[60vw] px-10 md:w-[40vw] hover:bg-india-green text-white serif text-4xl flex items-center justify-center transition-colors"
          >
            ABOUT
          </a>
          <a
            href="#events"
            className="button-text bg-india-green h-14 w-[60vw] md:w-[40vw] hover:bg-saffron text-white serif text-4xl flex items-center justify-center transition-colors"
          >
            EVENTS
          </a>
          <Link
            to="/register"
            className="button-text bg-ashoka-blue h-14 w-[60vw] md:w-[40vw] hover:bg-saffron text-white serif text-4xl px-10 flex items-center justify-center transition-colors"
          >
            REGISTRATION
          </Link>
          <a
            href="#contact"
            className="button-text bg-black h-14 w-[60vw] md:w-[40vw] hover:bg-india-green text-white serif text-4xl flex items-center justify-center transition-colors"
          >
            CONTACT US
          </a>
        </div>
        <div id="republic-day">
          <RepublicDay />
        </div>
        <About />
        <Events events={items} />

        {/* Video Section */}

        <ContactUs />
      </div>
      <Watermark />
    </div>
  );
};

export default Home;
