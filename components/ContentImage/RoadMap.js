import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import useCharacterStore from "@store/charStore";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect, useRef } from "react";
import AudioPlayerSB from "../AudioPlayer/AudioPlayerSB";
const ContentImageData = [
    {
        id: uuid(),
        title: "Q4: 2023",
        content:
            "V1 on both Web and MacOS live - beta on Windows. (Virtual Assistant + Blockchain Integration)",
        align: "right",
        video: "/elysium-bot.mp4",
        //image: "/elysium-logo-2.png",
        listItems: [
            {
                content:
                    "Growth Opportunities: Our marketplace allows new revenue streams."
            },
            {
                content:
                    "Ownership Assurance: Our decentralized platform ensures  full control over your AI agents and IP"
            },
            {
                content:
                    "Advanced Interoperability: Seamlessly integrate your AI agents with existing software and platforms."
            },
            {
                content:
                    "Top-notch Security: Robust security protocols ensure data integrity, giving you and your users peace of mind."
            }
        ]
    },
    {
        id: uuid(),
        title: "Q1: 2024",
        content: "",
        align: "left",
        video: "web-app.mp4",
        //image: "/butler.png",
        listItems: [
            {
                content: "Full Public Launch of Web app and downloadable butler"
            },
            {
                content: "Developer Integration/marketplace"
            },
            {
                content: "White paper on Blockchain integration"
            }
        ]
    },
    {
        id: uuid(),
        title: "Q2-Q3 2024:",
        content: "",
        align: "right",
        video: "/mobile-app.mp4",
        //image: "/butler-2.png",
        listItems: [
            {
                content: "Mobile App Release"
            },
            {
                content: "First IP Collab/Persona"
            },
            {
                content: "Corporate partnerships"
            },
            {
                content: "Enterprise Push"
            },
            {
                content: "Blockchain integration deployment"
            }
        ]
    }
];
const VideoElement = React.memo(({ src }) => (
    <video
        src={src}
        width={512}
        height={512}
        muted
        playsInline={true}
        loop={true}
        autoPlay
        className="mx-auto border-blue-500 border-4 rounded shadow-xl"
    ></video>
));
VideoElement.displayName = "VideoElement";

export const RoadMap = () => {
    const {
        selectedCharacter,
        setSelectedCharacter,
        characters,
        themeImagePaths,
        setThemeImagePaths
    } = useCharacterStore();
    const [isRadioVisible, setRadioVisible] = useState(false);
    const radioRef = useRef(null);
    const getContentImageData = (themeImagePaths) => [
        {
            id: uuid(),
            title: "Q4: 2023",
            content:
                "V1 on both Web and MacOS live - beta on Windows. (Virtual Assistant + Blockchain Integration)",
            align: "right",
            video: themeImagePaths[1] || "/elysium-bot.mp4",
            //image: "/elysium-logo-2.png",
            listItems: [
                {
                    content:
                        "Growth Opportunities: Our marketplace allows new revenue streams."
                },
                {
                    content:
                        "Ownership Assurance: Our decentralized platform ensures  full control over your AI agents and IP"
                },
                {
                    content:
                        "Advanced Interoperability: Seamlessly integrate your AI agents with existing software and platforms."
                },
                {
                    content:
                        "Top-notch Security: Robust security protocols ensure data integrity, giving you and your users peace of mind."
                }
            ]
        },
        {
            id: uuid(),
            title: "Q1: 2024",
            content: "",
            align: "left",
            video: themeImagePaths[2] || "web-app.mp4",
            //image: "/butler.png",
            listItems: [
                {
                    content:
                        "Full Public Launch of Web app and downloadable butler"
                },
                {
                    content: "Developer Integration/marketplace"
                },
                {
                    content: "White paper on Blockchain integration"
                }
            ]
        },
        {
            id: uuid(),
            title: "Q2-Q3 2024:",
            content: "",
            align: "right",
            video: themeImagePaths[3] || "/mobile-app.mp4",
            //image: "/butler-2.png",
            listItems: [
                {
                    content: "Mobile App Release"
                },
                {
                    content: "First IP Collab/Persona"
                },
                {
                    content: "Corporate partnerships"
                },
                {
                    content: "Enterprise Push"
                },
                {
                    content: "Blockchain integration deployment"
                }
            ]
        }
    ];
    // const ContentImageData = getContentImageData(
    //     selectedCharacter
    //         ? selectedCharacter.themeImagePaths
    //         : characters[0].themeImagePaths
    // );
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setRadioVisible(true);
                }
            },
            { threshold: 0.1 } // Adjust the threshold as needed
        );

        if (radioRef.current) {
            observer.observe(radioRef.current);
        }

        return () => {
            if (radioRef.current) {
                observer.unobserve(radioRef.current);
            }
        };
    }, []);

    return (
        <SectionContainer className="process-items mt-16 space-y-16">
                    <div
                        className={`radio-container-sb ${
                            isRadioVisible ? "sliding-radio-sb" : ""
                        }`}
                        ref={radioRef}
                        id="radio-trigger-sb"
                    >
                        <AudioPlayerSB />
                    </div>
            {ContentImageData.map((item, i) => (
                <div
                    id={item.id}
                    key={item.id}
                    className="process-item--container grid md:grid-cols-2 gap-y-8"
                >
                    <div
                        className={`process-item--image rounded-3xl ${
                            item.align === "left" ? "md:order-1" : ""
                        }`}
                    >
                        <VideoElement
                            src={
                                selectedCharacter
                                    ? selectedCharacter.roadMapThemeImagePaths[
                                          i
                                      ]
                                    : item.video
                            }
                        />
                        {/* <Image
                            src={item.image}
                            width={512}
                            height={512}
                            draggable={false}
                            objectFit="cover"
                            alt="Process Banner 1"
                            className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded glow-image float-image"
                        /> */}
                    </div>
                    <div
                        className={`process-item--content ${
                            item.align === "left"
                                ? "md:pr-16 lg:pr-24 xl:pr-32 ml-auto"
                                : "md:pl-16 lg:pl-24 xl:pl-32  mr-auto"
                        } my-auto content text-black/60`}
                        style={{
                            fontSize:
                                item.title === "Q1: 2024" ||
                                item.title === "Q2-Q3 2024:"
                                    ? "1.65rem"
                                    : "inherit"
                        }}
                    >
                        <h3 className="mb-6 h4 md:h3 font-semibold text-black">
                            {item.title}
                        </h3>
                        <p>{item.content}</p>
                        <ul className="process-item--list space-y-3">
                            {item.listItems?.length &&
                                item.listItems.map((listItem) => (
                                    <li
                                        id={listItem.id}
                                        key={listItem.id}
                                        className="flex"
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
            ))}
        </SectionContainer>
    );
};
