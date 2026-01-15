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


const Home: React.FC = () => {

   const [showLoading, setShowLoading] = useState(() => {
    return !sessionStorage.getItem('hasVisitedHome');
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
        textAlign: "center"
      });
      gsap.set(".hero-container", {
        display: "none"
      });
      return;
    }
    
     gsap
      .timeline({
        onComplete: () => {
          // Set loading to false when animation completes
          setShowLoading(false);
          sessionStorage.setItem('hasVisitedHome', 'true');
        }
      })
      .from(".main-text", {
        opacity: 0,
        y: -40,
        ease: "power3.out",
        duration: .7,
        delay: 0.3,
      })
      .from(".hint-text", {
        opacity: 0,
        y: 40,
        ease: "power3.out",
        duration: .7,
      })
      .to(".hero-container", {
        opacity: 0,
        y: -400,
        pointerEvents: "none",
        ease: "elastic.in",
        duration: .7,
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
          duration: .7,
        }
      );
    }, [showLoading]);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Container - shown on first visit */}
      <div className="flex flex-col gap-2 justify-center items-center h-screen hero-container">
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

        <ShinyText
          text="Let's RUN !!!"
          className="clash text-3xl hint-text"
        />
      </div>

      {/* Main Content - shown after animation or immediately for return visitors */}
      <div className="opacity-0 children" style={{ display: 'none' }}>
        <TextPressure text="PRAVEGA 2026" textColor="black" strokeWidth={10} />
       
        <div className="w-screen overflow-hidden">
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
      </div>
      
        <div className="flex flex-col items-center justify-center text-center pt-10 h-[60vh] gap-4">
          <a href="#about" className="button-text bg-black h-14 w-[60vw] px-10 md:w-[40vw] hover:bg-green-700 text-white serif text-4xl flex items-center justify-center">
            ABOUT
          </a>
          <a href="#events" className="button-text bg-black h-14 w-[60vw] md:w-[40vw] hover:bg-red-700 text-white serif text-4xl flex items-center justify-center">
            EVENTS
          </a>
          <Link to="/register" className="button-text bg-black h-14 w-[60vw] md:w-[40vw] text-white serif text-4xl px-10 flex items-center justify-center">
            REGISTRATION
          </Link>
          <a href="#contact" className="button-text bg-black h-14 w-[60vw] md:w-[40vw] text-white serif text-4xl flex items-center justify-center">
            CONTACT US
          </a>
        </div>
      <About />
      <Events events={items}/>
      
      {/* Video Section */}
     
      <ContactUs />
      </div>
      <Watermark />
    </div>
  );
};

export default Home;
