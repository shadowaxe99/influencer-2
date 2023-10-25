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
export default function ElysiumLanding({ handleEnterInteractiveClick, handleEnterStaticClick }) {
    const [isMobile, setIsMobile] = useState(false);
    const [enterClicked, setEnterClicked] = useState(false);
    const router = useRouter();
    const colors = ["red", "blue", "gray", "yellow", "purple", "green"];
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                    navigator.userAgent
                )
            );
        };
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
            <div className="bg-gradient-to-b from-black to-gray-900 h-screen overflow-y-hidden flex flex-col justify-center items-center relative">
                {!isMobile &&
                    distances.map((distance, i) => (
                        <div
                            key={i}
                            style={{
                                width: `${distance * 2}px`,
                                height: `${distance * 2}px`,
                                border: "2px solid white",
                                borderRadius: "50%",
                                position: "absolute",
                                opacity: 0.5,
                                zIndex: 800
                            }}
                        ></div>
                    ))}
                {colors.map((color, i) => (
                    <RotatingCircle
                        key={i}
                        bgColor={color}
                        speed={enterClicked ? "1s" : rotationDurations[i]}
                        distance={distances[i]}
                        imagePath={imagePaths[i]}
                        initialDegree={(360 / colors.length) * i}
                    />
                ))}
                <Image
                    src="/elysium-logo-new.png"
                    width={200}
                    height={200}
                    className="absolute rounded-full elysium-object-glow z-50"
                />
                <button
                    onClick={() => {
                        setEnterClicked(true);
                        handleEnterInteractiveClick();
                    }}
                    className="bg-yellow-500 text-black px-4 py-2 absolute top-64 w-90 transition-all hover:scale-110 hover:bg-yellow-400 border-2 border-white"
                >
                    Enter Interactive Experience
                </button>
                <button
                    onClick={() => {
                        setEnterClicked(true);
                        handleEnterStaticClick();
                    }}
                    className="bg-yellow-500 text-black px-4 py-2 absolute bottom-64 w-90 transition-all hover:scale-110 hover:bg-yellow-400 border-2 border-white"
                >
                    Enter Static Experience
                </button>
            </div>
            <ParticlesBackground />
        </Transition>
    );
}
function RotatingCircle({
    speed,
    bgColor,
    distance,
    imagePath,
    initialDegree
}) {
    return (
        <div
            className="circle-container relative rounded-lg"
            style={{ animation: `rotate ${speed} infinite linear` }}
        >
            <RotatingItem
                bgColor={bgColor}
                distance={distance}
                imagePath={imagePath}
                initialDegree={initialDegree}
            />
        </div>
    );
}
function RotatingItem({ bgColor, distance, imagePath, initialDegree }) {
    return (
        <div
            className="circle-item rounded-full"
            style={{
                transform: `rotate(${initialDegree}deg) translateX(${distance}px) rotate(-${initialDegree}deg)`
            }}
        >
            <div className="relative w-12 h-12 border-2 border-gray-100 rounded-full overflow-hidden elysium-object-glow z-auto">
                <Image src={imagePath} objectFit="cover" layout="fill" />
            </div>
        </div>
    );
}
