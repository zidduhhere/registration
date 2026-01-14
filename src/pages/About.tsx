import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { velocityEq } from "../assets/svg";
import ScrollVelocity from "../components/ScrollVelocity";
import { logoMain } from "../assets/icons";
const About = () => {
  useGSAP(() => {
    gsap.from(".heading", {
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=600",
        scrub: 1,
      },
      y: 200,
      opacity: 0,
      ease: "power3.out",
    });
  }, []);
  return (
    <div className=" w-screen h-fit pt-20 ">
      <ScrollVelocity
        texts={["ABOUT PRAVEGA "]}
        numCopies={30}
        velocity={1}
        velocityMapping={{input: [0,10], output: [0, 0.01]}}

        
        className="text-white clash bg-green-800 transform-content rotate-1 h-15 text-4xl flex flex-col items-center justify-center"
      />
      <ScrollVelocity
        texts={["IEDC GENESIS"]}
        numCopies={30}
        velocity={0.7}
        velocityMapping={{input: [0,10], output: [0, -0.1]}}
         
        className="text-green-800 serif font-normal bg-black"
      />

      <div className="about-equation flex flex-col justify-center items-center mt-32 md:mt-48 gap-6 mb-12 ">
        <img
          src={velocityEq}
          alt="velocity-equation"
          className=" p-2 size-1/2 max-w-150 max-h-50 bg-black transform-content rotate-4 shadow-xl"
        />
        <p className="mt-10 serif tracking-normal text-5xl w-fit">
          Do you remember this{" "}
          <span className="bg-green-800 text-white transform-content px-2">
            equation ?
          </span>
        </p>
        <div>
          <p className="clash tracking-normal text-xl md:max-w-3xl text-justify max-w-2xl p-4 md:p-0 ">
            This equation laid foundatin for mechanincs. Speed / Velocity /
            Whatever you want to name it But have you ever thought of applying
            this to life ? Life is all about motion, motion towards your goals,
            motion towards your dreams. The faster you move the closer you get
            to your goals. So what are you waiting for ? Get moving and make
            your dreams a reality with{" "}
            <span className="clash text-2xl font-semibold">Pravega 2026</span>.
          </p>
        </div>
        <div className="logo-definition flex flex-col gap-6 justify-center items-center mt-20">
          <p className="clash font-semibold tracking-normal text-2xl max-w-2xl text-center  ">
            OUR LOGO & ITS DESIGN
          </p>
          <div className="flex flex-row md:gap-24 gap-6 p-6 items-center justify-center">
            <img
            src={logoMain}
            className="bg-black rounded-full p-8 w-32  h-32"
          />
            <p className="clash tracking-tighter text-lg max-w-xl text-justify md:tracking-normal"> 
                The logo of Pravega 2026 is a representation of same equation AND TBH, a cursor. 
                The circular shape of the logo symbolizes the continuous motion and progress 
                towards achieving goals. The bold and modern typography used for the event name adds to the overall sense 
                of energy and excitement surrounding Pravega 2026. 
            </p>
          </div>
          
        </div>
      </div>

      <div className="previous-chapters mt-20 h-40 relative overflow-visible">
      
      </div>
    </div>
  );
};

export default About;
