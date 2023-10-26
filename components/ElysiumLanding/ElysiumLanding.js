import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ParticlesBackground from "../Particles/ParticlesBackground";
import { useRouter } from "next/router";
const rotationDurations = ["16s", "20s", "24s", "28s", "32s", "34s"];
const distances = [186, 240, 300, 360, 420, 460];
const imagePaths = [
    "/head.jpeg",
    "/mingle.png",
    "/pnedant.jpeg",
    "/temple.jpeg",
    "/ironman.jpeg",
    "/elysium-logo-2.png"
];
const circleData = [
    { speed: "16s", distance: 186, imagePath: "/head.jpeg" },
    { speed: "20s", distance: 240, imagePath: "/mingle.png" },
    { speed: "24s", distance: 300, imagePath: "/pnedant.jpeg" },
    { speed: "28s", distance: 360, imagePath: "/temple.jpeg" },
    { speed: "32s", distance: 420, imagePath: "/ironman.jpeg" },
    { speed: "34s", distance: 460, imagePath: "/elysium-logo-2.png" },
  ];
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
          {circleData.map((circle, i) => (
            <RotatingCircle
              key={i}
              speed={enterClicked ? "1s" : circle.speed}
              distance={circle.distance}
              imagePath={circle.imagePath}
            />
          ))}
          <Image 
              src="/elysium-logo-white.png" 
              width={200} 
              height={200} 
              className="z-50 shadow-lg rounded-full" 
              loadin="lazy"
            />
          <div className="absolute top-1/4 space-y-4 z-50">
            <Button onClick={() => {
                setEnterClicked(true);
                handleEnterInteractiveClick();
              }}>
              Enter Interactive Experience
            </Button>
            <Button onClick={() => {
                setEnterClicked(true);
                handleEnterStaticClick();
              }}>
              Enter Static Experience
            </Button>
          </div>
          <ParticlesBackground />
        </div>
      </Transition>
    );
  }
  function RotatingCircle({ speed, distance, imagePath }) {
    return (
      <div className="absolute animate-spin" style={{ animationDuration: speed }}>
        <div style={{ transform: `translateX(${distance}px)` }}>
          <div className="w-12 h-12 border-2 border-gray-100 rounded-full overflow-hidden shadow-lg z-50">
            {/* Dont lazy load logo */}
            <Image 
                src={imagePath} 
                objectFit="cover" 
                layout="fill" 
                // loading="lazy"
                />
          </div>
        </div>
      </div>
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