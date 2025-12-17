import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home: React.FC = () => {
  useGSAP(() => {
    gsap.from(".header-main", {
      y: -100,
      opacity: 0,
      duration: 1,
      yoyo: true,

      ease: "elastic",
    });
  }, []);
  return (
    <div className="flex flex-col items-center text-center pt-10">
      <div className="max-w-[700px] mb-20">
        <div className="text-6xl mb-6">🚀</div>
        <h1
          id="header-main"
          className=" font-sans text-notion-primary mb-6 tracking-tight text-5xl header-main"
        >
          Pravega Tech Fest 2025
        </h1>
        <p className="text-xl text-notion-muted leading-relaxed mb-10">
          The biggest technical synthesis of science and culture. Join us for a
          3-day extravaganza of innovation, technology, and fun.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/events">
            <Button
              size="lg"
              className="px-8 bg-notion-accent hover:bg-sky-700 text-white border-transparent"
            >
              Explore Events
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="px-8">
              Register Now <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full border-t border-notion-border pt-10">
        <div className="text-left md:text-center">
          <h3 className="text-sm uppercase tracking-wider text-notion-text-light mb-2">
            Date & Time
          </h3>
          <p className="text-lg font-medium text-notion-text">
            January 24-26, 2025
          </p>
        </div>
        <div className="text-left md:text-center">
          <h3 className="text-sm uppercase tracking-wider text-notion-text-light mb-2">
            Location
          </h3>
          <p className="text-lg font-medium text-notion-text">IISc Bangalore</p>
        </div>
        <div className="text-left md:text-center">
          <h3 className="text-sm uppercase tracking-wider text-notion-text-light mb-2">
            Participants
          </h3>
          <p className="text-lg font-medium text-notion-text">5000+ Students</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
