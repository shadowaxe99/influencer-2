import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Torch } from "@components/Torch/Torch";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState, useRef, createRef } from "react";
import { OpenAI, Configuration } from "openai";
import useCharacterStore from "@store/charStore";

export const HomeBanner = () => {
    const {
        selectedCharacter,
        setSelectedCharacter,
        characters,
        themeImagePaths,
        setThemeImagePaths
    } = useCharacterStore();
    const [primary, setPrimary] = useState("text-black");
    const [secondary, setSecondary] = useState("text-black");
    const [tertiary, setTertiary] = useState("text-black");

    useEffect(() => {
        if (selectedCharacter) {
            setPrimary(selectedCharacter.fontColors.primary);
            setSecondary(selectedCharacter.fontColors.secondary);
            setTertiary(selectedCharacter.fontColors.tertiary);
            console.log("Colors: ", selectedCharacter.fontColors.primary, selectedCharacter.fontColors.secondary, selectedCharacter.fontColors.tertiary);
        }
    }
    , []);

    useEffect(() => {
        const videoElement = document.getElementById("myVideo");
        videoElement.playbackRate = 0.5;
        videoElement.play();
    }, []);
    return (
        <SectionContainer className="page-banner--container py-16 relative">
            <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                {/* Appear First */}

                {/* <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                    <BadgeGroup alignment="center">
                        <BadgeMessage>
                            Man is the dream of the Gods{" "}
                        </BadgeMessage>
                    </BadgeGroup>
                </MotionBTTContainer>
                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <PageTitle className="text-center mx-auto" type="heavy">
                        Elysium OS
                    </PageTitle>
                </MotionBTTContainer> */}
                <MotionBTTContainer transition={{ delay: 0.6, duration: 0.5 }}>
                    {/* <Content className="text-center" alignment="center">
                        <p>
                            A New Dawn in AI: Dive into the heart of Elysium,
                            where AI works not just for you, but with you.
                        </p>
                    </Content> */}
                    {/* <div className="mt-6 mb-16 text-center">
                        <ButtonGroup alignment="center">
                            <Button href="#features">Begin</Button>
                        </ButtonGroup>
                    </div> */}
                </MotionBTTContainer>
                {/* Appear Fourth */}
                <MotionBTTContainer transition={{ delay: 0.8, duration: 0.5 }}>
                    <div className="page-banner--image">
                        <div className="relative z-20 flex justify-center mt-[-80px] mb-8 ">
                            <Image
                                src="/elysium-logo-new.png"
                                alt="logo"
                                width={250}
                                height={250}
                                priority
                                draggable={false}
                                className="rounded-full elysium-object-glow"
                            />
                        </div>
                        <Content className="text-center " alignment="center">
                            <p className="text-gray-800 w-full">
                                {/* A New Dawn in AI: Dive into the heart of
                                Elysium, where AI works not just for you, but
                                with you. */}
                            </p>
                        </Content>
                        <br />
                        <PageTitle className={`text-center mx-auto mt-2 text-7xl ${secondary}`}>
                            {selectedCharacter? selectedCharacter.contentText[0] : "Welcome to the Future"}
                            <br />
                        </PageTitle>
                        <div className="mt-6 mb-16 text-center text-4xl whitespace-nowrap">
                            {selectedCharacter? selectedCharacter.contentText[1] : "Elysium Innovations"}
                        </div>
                        <video
                            id="myVideo"
                            width={1024}
                            playsinline
                            height={680}
                            muted
                            type="video/mp4"
                            src={
                                selectedCharacter
                                    ? selectedCharacter.themeImagePaths[0]
                                    : "/temple.mp4"
                            }
                            // controls={true}
                            playsInline={true}
                            preload="metadata"
                            speed
                            loop={true}
                            autoPlay
                            className="mx-auto border-blue-500 border-4 rounded shadow-xl"
                            priority
                            // loading="lazy"
                        ></video>
                        {/* <Image
                            src="/temple.jpeg"
                            width={1024}
                            draggable={false}
                            height={680}
                            alt="Page Banner"
                            objectFit="cover"
                            className="mx-auto border-blue-500 border-4 rounded shadow-xl"
                        /> */}
                    </div>
                </MotionBTTContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
