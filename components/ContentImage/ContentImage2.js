import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
const ContentImageData = [
    {
        id: uuid(),
        title: "Agents aren't great at complex tasks on their own.",
        content:
            "<strong>They need a Boss/Conductor!</strong><br>Isolated AI agents are good at specific tasks but can't handle everything on their own. In today's digital realm, standalone AI agents excel in singular tasks. However, the magic unfolds when they synergize for complex endeavors.",
        align: "right", //html in text is iffy for security but whatevs
        image: "/mingle.png",
        video: "/mingle-video.mp4"
    }
    // {
    //     id: uuid(),
    //     title: "Our G.U.I.D.E: ",
    //     content:
    //         "Growth, User Empowerment, Innovation, Data Security, Enterprise Optimization",
    //     align: "left",
    //     image: "/build-project.jpeg"
    // }
];

export const ContentImage2 = ({ shouldPlayWaves, addAudioRef, removeAudioRef }) => {
    const [scrollY, setScrollY] = useState(0);
    const [hoveredId, setHoveredId] = useState(null);
    const [audio, setAudio] = useState(null); // Store the audio object

    const [inViewRef, inView] = useInView({
        triggerOnce: false // Will trigger each time the component enters or leaves the viewport
    });

    useEffect(() => {
        if (shouldPlayWaves) {
            if (inView) {
                // Create and play the audio only if it doesn't exist
                if (!audio) {
                    const newAudio = new Audio("/sounds/waves-1.mp3");
                    newAudio.volume = 0.07; // Set volume to 50%

                    setAudio(newAudio);
                    addAudioRef(newAudio);
                    newAudio.addEventListener("ended", () => {
                        removeAudioRef(newAudio);
                    });

                    newAudio.play();
                } else {
                    // Resume playing if audio already exists
                    audio.play();
                }
            } else {
                // Pause the audio when component is out of view
                if (audio) {
                    audio.pause();
                }
            }
        }
    }, [inView, shouldPlayWaves, audio]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <SectionContainer className="process-items mt-16 space-y-16">
            {ContentImageData.map((item) => {
                const transformStyle = (align, id) => {
                    const moveFactor = -0.12;
                    const hoverTransform =
                        id === hoveredId ? "scale(1.05) translateY(-5px)" : "";
                    const waveAnimation = "wave 4s infinite ease-in-out";

                    return {
                        transform: `translateX(${
                            (moveFactor * scrollY) / 2
                        }px) ${hoverTransform}`,
                        transition: "all 0.3s ease-out",
                        animation: waveAnimation,
                        boxShadow:
                            id === hoveredId
                                ? "0 10px 20px rgba(0, 0, 0, 0.2)"
                                : "0 4px 6px rgba(0, 0, 0, 0.1)"
                    };
                };

                return (
                    <div
                        id={item.id}
                        ref={inViewRef}
                        key={item.id}
                        className="process-item--container grid md:grid-cols-2 gap-y-8"
                    >
                        <div
                            className={`process-item--image rounded-3xl ${
                                item.align === "left" ? "md:order-1" : ""
                            }`}
                        >
                            {/* <Image
                                src={item.image}
                                width={512}
                                height={512}
                                draggable={false}
                                objectFit="cover"
                                alt="Process Banner 1"
                                className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded glow-image float-image"
                                style={transformStyle(item.align, item.id)}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            /> */}
                            <video
                                src={item.video}
                                width={512}
                                height={512}
                                draggable={false}
                                objectFit="cover"
                                alt="Process Banner 1"
                                className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded glow-image float-image"
                                style={transformStyle(item.align, item.id)}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                muted
                                loop
                                autoPlay
                                loading="lazy"
                            />
                        </div>
                        <div
                            className={`process-item--content ${
                                item.align === "left"
                                    ? "md:pr-16 lg:pr-24 xl:pr-32 ml-auto"
                                    : "md:pl-16 lg:pl-24 xl:pl-32  mr-auto"
                            } my-auto content text-black/60`}
                        >
                            <h3 className="mb-6 h4 md:h3 font-semibold text-black">
                                {item.title}
                            </h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: item.content
                                }}
                            ></p>
                            <ul className="process-item--list space-y-3">
                                {item.listItems?.length &&
                                    item.listItems.map((listItem) => (
                                        <li
                                            id={listItem.id}
                                            key={listItem.id}
                                            className="inline-grid grid-flow-col-dense"
                                        >
                                            <Icon
                                                icon="ph:seal-check-bold"
                                                className="w-6 h-6 text-secondary-500 mr-2"
                                            />
                                            {listItem.content}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </SectionContainer>
    );
};

//className="inline-grid grid-flow-col-dense"
