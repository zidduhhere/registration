import React, { type ReactNode } from "react";
import TextType from "./TextType";
import ShinyText from "./ShinyText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextPressure from "./TextPressure";
import About from "../pages/About";
import Events from "../pages/Events";
import { items } from "../data/events";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({}) => {
  useGSAP(() => {
    const firstTimeLine = gsap
      .timeline()
      .from(".main-text", {
        opacity: 0,
        y: -40,
        ease: "power3.out",
        duration: 1.2,
        delay: 0.8,
      })
      .from(".hint-text", {
        opacity: 0,
        y: 40,
        ease: "power3.out",
        duration: 1.2,
      })
      .to(".hero-container", {
        opacity: 0,
        y: -400,
        pointerEvents: "none",
        ease: "elastic.in",
        duration: 1.2,
      })
      .to(".hero-container", {
        display: "none",
      })
      .fromTo(
        ".children , .events",
        {
          opacity: 0,
          y: 40,
          ease: "power3.out",
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "all",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          ease: "power3.out",
          duration: 1.2,
        }
      );
  });

  return (
    <body className="min-h-screen w-full bg-white  ">
      {/* {Hero Container} */}
      <div className="flex flex-col gap-2 justify-center items-center h-screen hero-container">
        <TextType
          text={"PRAVEGA"}
          cursorCharacter={"_"}
          typingSpeed={70}
          deletingSpeed={100}
          showCursor={false}
          pauseDuration={2000}
          loop={false}
          className="nevera text-7xl text-black "
        />

        <ShinyText
          text="Let's RUN !!!"
          className="clash text-3xl hint-text"
        />
      </div>

      <div className="hidden z-100  opacity-0 children  ">
        
 
        <TextPressure text="PRAVEGA 2026" textColor="black" strokeWidth={10} />

        {/* {Navigation Elements} */}

        <div className="flex flex-col items-center justify-center text-center pt-10 h-screen gap-4 ">
          <div className="button-text bg-black  h-14 w-[60vw] px-10 md:w-[40vw] hover:bg-green-700 text-white serif text-4xl flex items-center justify-center">
            ABOUT
          </div>
          <div className="button-text bg-black h-14 w-[60vw] md:w-[40vw] hover:bg-red-700 text-white serif text-4xl flex items-center justify-center">
            EVENTS
          </div>
          <div className="button-text bg-black h-14 w-[60vw] md:w-[40vw] text-white serif text-4xl px-10 flex items-center justify-center">
            REGISTRATION
          </div>
          <div className="button-text bg-black h-14 w-[60vw] md:w-[40vw] text-white serif text-4xl flex items-center justify-center">
            CONTACT US
          </div>
        </div>
        <About />
        
      </div>
  
        <div className="opacity-0 events"> <Events events={items} /></div>
      
    </body>
  );
};
