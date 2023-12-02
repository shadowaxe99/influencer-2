import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ParticlesBackground from "../Particles/ParticlesBackground";
export default function ElysiumLanding({ handleEnterInteractiveClick, handleEnterStaticClick }) {
    const [isMobile, setIsMobile] = useState(false);
    const [enterClicked, setEnterClicked] = useState(false);
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 640);
      window.addEventListener("resize", checkMobile);
      checkMobile();
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return (
      <Transition
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="bg-gradient-to-b from-black to-gray-900 h-screen flex flex-col justify-center items-center relative">
          <ParticlesBackground />

          <div className="absolute top-1/4 space-y-4 z-50 flex flex-col items-center">
            <Button onClick={() => {
                setEnterClicked(true);
                handleEnterInteractiveClick();
              }}>
              Enter Interactive Experience
            </Button>

            <Image 
              src="/elysium-logo-white.png" 
              width={200} 
              height={200} 
              className="z-50 shadow-lg rounded-full mt-4 mb-4" 
              loadin="lazy"
            />

            <Button onClick={() => {
                setEnterClicked(true);
                handleEnterStaticClick();
              }}>
              Enter Static Experience
            </Button>
          </div>
        </div>
      </Transition>
    );
  }
  function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-yellow-500 text-black px-4 py-2 w-90 hover:scale-105 hover:bg-yellow-400 border-2 border-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      >
        {children}
      </button>
    );
  }