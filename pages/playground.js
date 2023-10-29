import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { HomeBanner } from "@components/Banner";
import { Columns } from "@components/Columns";
import { ContentImage } from "@components/ContentImage";
import { Content } from "@components/Content";
import { Accordion } from "@components/Accordion";
import { MotionBTTContainer } from "@components/Motion";
import SEO from "@components/SEO/SEO";
import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";
import { ContentImage2 } from "@components/ContentImage/ContentImage2";
import { ContentImage3 } from "@components/ContentImage/ContentImage3";
import { ContentImage4 } from "@components/ContentImage/ContentImage4";
import { RoadMap } from "@components/ContentImage/RoadMap";
import { Revenue } from "@components/ContentImage/Revenue";
import Image from "next/image";
import ChatBubble from "@components/Guide/chatbubble";
import { TeamColumns } from "@components/Columns/TeamColumns";
import { useEffect, useState, useRef, createRef } from "react";
import IframeContainer from "@components/IframeContainer/IframeContainer";
import axios from "axios";
import Draggable from "react-draggable";
import BubblesSpinner from "@components/BubbleSpinner/BubbleSpinner";
import useCharacterStore from "../store/charStore"; // Import Zustand store
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faInfo,
    faTimes,
    faMicrophone,
    faQuestionCircle,
    faVolumeUp,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ChatPage from "@components/TeamChat/PhoneChat";
import PhoneChatFinal from "@components/TeamChat/Final_PhoneChat";
import PhoneChat from "@components/TeamChat/Final_Merged_PhoneChat_Part1";
import { config } from "dotenv";
import { motion, useAnimation } from "framer-motion";
import { AgencyExample } from "@components/ContentImage/AgencyExample";
// import AgencyPlayground from "@components/AgencyPlayground/AgencyPlayground";
import AgencyPlayground from "@components/AgencyPlayground/Final_Integrated_AgencyPlayground";
import { Chart } from "chart.js";
import { CategoryScale, LinearScale } from "chart.js/auto";
import { v4 as uuid } from "uuid";
// import useTouchMove from "react-use-touchmove";
// import useWindowSize from "react-use-window-size";
// import useMedia from "react-use-media";
// import useScrollY from "react-use-scroll-y";

Chart.register(CategoryScale, LinearScale);

config();

const contextSystemPrompt = `
        You are Alfred, an AI Butler Assistant who's job is to help answer questions about Elysium. You are a sitting atop the website we will have users interact with to get a taste of what elysium is building towards. Elysium is a company dedicated to bringing AI to the masses. Refer to Elysium in the context of 'we', 'us', and 'I' because you are on the team. Here is some more information about the company:
        ---
        - We are building two main product offerings: Elysium OS and Automation Station. Elysium OS is a software that comes in the form of a web app and desktop app, providing the user with their very own personal AI Butler Assistant who is able to delegate tasks to other agents deployed to the Elysium Ecosystem. Automation Station will be an AI Agent marketplace where developers can deploy their own agents and users can choose agents from to help accomplish their tasks, this aims to empower developers as well as provide as many agents to consumers as possible. Automation station is not yet live so to test out agents try it out on our demo which is located a bit after the beginning of the website.
        - Some context of what an AI Agent is: An AI Agent is A software entity that autonomously analyzes data and its environment or user input to make decisions and execute specific tasks using AI algorithms. If the user is interested in learning more or trying out an Agent, direct them to our AI Agent demo which is located just a bit after the top of the website.
        - The problem Elysium is trying to solve is that AI Agents are fragmented. There is no unified communication layer. Elysium aims to create that unified communication layer for agents to interact seamlessly.
        - If the user is interested in learning more or investing, tell them to reach out to our CEO: Michael Gruen who can be reached at michael@elysiuminnovations.ai or they click the contact button on the site.
        
        ---
        Be concise in your responses. Use light humor where appropriate. Do not over explain or over answer. Make you answers clear and to the point. If the user gives you their name and it is a notable figure who you know, feel free to compliment them based on any public info you know of them. 
    `;

export default function Home() {
    const router = useRouter();
    const {
        selectedCharacter,
        setSelectedCharacter,
        characters,
        themeImagePaths,
        setThemeImagePaths
    } = useCharacterStore();
    const [showVoiceResponse, setShowVoiceResponse] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileBlock, setShowMobileBlock] = useState(false);
    const [isContainerVisible, setContainerVisible] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const audioRefs = useRef([]);
    const accordionData = [
        {
            id: uuid(),
            title: "What is Elysium OS?",
            isOpen: true,
            content:
                "Elysium OS is your personal assistant which can delegate tasks to an army of agents on our unified platform."
        },
        {
            id: uuid(),
            title: "What does Elysium Innovations do?",
            isOpen: false,
            content:
                "Elysium Innovations is an AI platform company focused on developing an innovative AI marketplace and protocol layer to provide seamless AI-powered solutions to users."
        },
        {
            id: uuid(),
            title: "What is Elysium Innovations' main product offering?",
            isOpen: false,
            content:
                "Our main product is the 'Butler' AI agent which serves as a central coordinator for all other AI agents on our platform. This enables seamless integration and coordination of various AI solutions."
        },
        {
            id: uuid(),
            title: "What technology does Elysium Innovations leverage?",
            isOpen: false,
            content:
                "We utilize blockchain technology which enables transparency, security, and ownership of AI agents for users on our platform."
        },
        {
            id: uuid(),
            title: "How does Elysium Innovations make money?",
            isOpen: false,
            content:
                "We will generate revenue through commissions from transactions on our AI marketplace and premium subscriptions for access to our platform."
        },
        {
            id: uuid(),
            title: "What are Elysium Innovations' competitive advantages?",
            isOpen: false,
            content:
                "Our key advantages are the 'Butler' AI agent for coordination and the use of blockchain technology for transparency and ownership. Having prominent industry figures also provides us expertise and credibility."
        },
        {
            id: uuid(),
            title: "What is Elysium Innovations' expansion strategy?",
            isOpen: false,
            content:
                "Our strategy focuses on partnerships, acquisitions, staying ahead in innovation, and fostering an ecosystem of AI solutions. Distribution is through our AI marketplace enhanced by blockchain."
        },
        // {
        //     id: uuid(),
        //     title: "Who are some of the key people behind Elysium Innovations?",
        //     isOpen: false,
        //     content:
        //         "We have prominent figures which include CEO Michael Gruen, Chief Business Officer Doug Schaer, and Chief Evangelist Brock Pierce. "
        // },
        {
            id: uuid(),
            title: "Who are the founders of Elysium Innovations?",
            isOpen: false,
            content:
                "Our founding team includes people like AI expert Michael Gruen along with other industry veterans who have experience across domains like entertainment, cryptocurrency, and automation."
        },
        {
            id: uuid(),
            title: "What problem is Elysium Innovations trying to solve?",
            isOpen: false,
            content:
                "At Elysium Innovations, we aim to tackle the issues of fragmentation and inaccessibility that developers face in the AI industry by providing a unified and customizable platform called Elysium OS."
        },
        {
            id: uuid(),
            title: "Who are the target customers for Elysium Innovations?",
            isOpen: false,
            content:
                "We are targeting both developers and consumers. For developers, we provide tools to rapidly build AI innovations. For consumers, we offer personalized AI experiences."
        },
        {
            id: uuid(),
            title: "What are some key features of Elysium OS?",
            isOpen: false,
            content:
                "Elysium OS allows for customization and control of AI agents. It facilitates rapid prototyping for developers. It also enables next-level personalization of the AI experience."
        },
        {
            id: uuid(),
            title: "How does Elysium Innovations plan to scale up?",
            isOpen: false,
            content:
                "We plan to scale by focusing on developers first to create a ripple effect for consumers and prioritizing collaboration and personalization using their platform and AI marketplace."
        },
        {
            id: uuid(),
            title: "What is an AI persona?",
            isOpen: false,
            content:
                "They are customizable personalities or characters that users can purchase and integrate into their AI agents on the Elysium platform"
        }
    ];

    const addAudioRef = (audio) => {
        audioRefs.current.push(audio);
        audio.muted = isMuted;
    };

    useEffect(() => {
        audioRefs.current.forEach((audio) => {
            audio.muted = isMuted;
        });
    }, [isMuted, addAudioRef]);

    const removeAudioRef = (audioToRemove) => {
        audioRefs.current = audioRefs.current.filter(
            (audio) => audio !== audioToRemove
        );
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        const allMediaElements = document.querySelectorAll("audio, video");
        allMediaElements.forEach((media) => {
            media.muted = !isMuted;
        });
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                    navigator.userAgent
                )
            );
        };
        checkMobile();
        setShowMobileBlock(true);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleIconClick = () => {
        if (isUnlocked) {
            setContainerVisible(true);
        } else {
            setContainerVisible(!isContainerVisible);
        }
    };

    const handlePasswordChange = (e) => {
        setEnteredPassword(e.target.value);
    };

    const handleSubmitPassword = () => {
        if (enteredPassword === "password") {
            setIsUnlocked(true);
        } else {
            alert("Wrong password");
        }
    };

    const handleUnlock = () => {
        setContainerVisible(true);
        setIsUnlocked(true);
    };

    const handleGoBack = () => {
        setContainerVisible(false);
        setIsUnlocked(false);
        setEnteredPassword("");
    };

    useEffect(() => {
        if (!selectedCharacter) {
            setSelectedCharacter(characters[0]);
            setThemeImagePaths(characters[0].themeImagePaths);
            return;
        }
        const greetingAudio = new Audio(selectedCharacter.greeting);
        greetingAudio.muted = isMuted;
        addAudioRef(greetingAudio);
        greetingAudio.addEventListener("ended", () =>
            removeAudioRef(greetingAudio)
        );
        greetingAudio.volume = 0.4;
        greetingAudio.play();
    }, []);

    useEffect(() => {
        const audio = new Audio("/sounds/dystopia.mp3");
        audio.muted = isMuted;
        addAudioRef(audio);
        audio.addEventListener("ended", () => removeAudioRef(audio));
        audio.volume = 0.012;
        audio.play();
    }, []);

    useEffect(() => {
        const shakeIcon = () => {
            const iconElement = document.querySelector(".download-icon");
            if (iconElement) {
                iconElement.classList.add("shake-animation");

                setTimeout(() => {
                    iconElement.classList.remove("shake-animation");
                }, 500);
            }
        };

        const shakeInterval = setInterval(shakeIcon, 5000);

        return () => clearInterval(shakeInterval);
    }, []);

    // useTouchMove();
    // useWindowSize();
    // useMedia({ minWidth: 768 });
    // const y = useScrollY();

    return (
        <Layout toggleSidebar={() => {}}>
            <div className="toggle-sidebar" onClick={() => {}}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <div className="sidebar text-center">
                <ul>
                    <li>
                        <a href="#firstSlide">Welcome to Elysium</a>
                    </li>
                    <li>
                        <a href="#thirdSlide">Experience the AI Revolution</a>
                    </li>
                    <li>
                        <a href="#fourthSlide">The AI Conundrum</a>
                    </li>
                    <li>
                        <a href="#secondSlide">
                            Your Personal AI Butler Awaits
                        </a>
                    </li>
                    <li>
                        <a href="#fifthSlide">Innovative Solutions</a>
                    </li>
                    <li>
                        <a href="#seventhSlide">Empowering Developers</a>
                    </li>
                    <li>
                        <a href="#sixthSlide">The Future, Envisioned</a>
                    </li>
                    <li>
                        <a href="#eigthSlide">The Journey Ahead</a>
                    </li>
                    <li>
                        <a href="#ninthSlide">The Engine of Progress</a>
                    </li>
                    <li>
                        <a href="#tenthSlide">
                            Meet Elysium's AI Doppelgängers
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <div className="fixed top-10 z-50 left-2 p-4">
                    <button className="bg-green-500 text-white rounded p-2 shadow-md">
                        Call Butler
                    </button>
                </div>

                <Draggable>
                    <div className="fixed top-52 left-10 p-4 rounded-lg flex flex-col items-center z-50">
                        <div className="bg-white voice-response-box">
                            <div className="text-black p pt-2 flex flex-row space-x-4 mb-2">
                                <p className="mt-2 mb-2 pl-2"></p>
                                <div className="pulsate"></div>
                            </div>

                            <div
                                className="loading-indicator"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "75px"
                                }}
                            >
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                            <div className="overflow-y-scroll w-[90%] max-h-[500px] h-full rounded border border-gray-500 p-2"></div>

                            <div className="bottom-buttons m-2">
                                <button
                                    onClick={() => {}}to="#"
                                    className="border p-1 w-2/5 mx-2 text-sm bg-gray-300 text-black rounded"
                                >
                                    Dismiss
                                </button>

                                <button
                                    onClick={() => {}}
                                    className="border p-1 w-2/5 mx-2 text-sm bg-blue-500 text-white rounded"
                                >
                                    Ask Another Question
                                </button>
                            </div>
                        </div>

                        <div className="absolute top-[-32px] left-4 flex flex-row space-x-2">
                            {!showVoiceResponse && (
                                <>
                                    <button
                                        className="border bg-blue-500 px-2 text-white w-10 h-10 rounded-full"
                                        onClick={() => {}}
                                    >
                                        <FontAwesomeIcon icon={faMicrophone} width={24} height={24} />
                                    </button>

                                    <button
                                        className="border bg-red-500 text-white px-2 h-10 w-10 rounded-full"
                                        onClick={() => {}}
                                    >
                                        <FontAwesomeIcon icon={faTimes} width={24} height={24} />
                                    </button>

                                    <button
                                        className="border bg-green-500 text-white px-2 h-10 w-10 rounded-full"
                                        onClick={toggleMute}
                                    >
                                        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} width={24} height={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {selectedCharacter && (
                            <div className="flex flex-row">
                                <Image
                                    src={selectedCharacter.img}
                                    className="butler-image"
                                    height={100}
                                    width={100}
                                    draggable={false}
                                    alt="butler"
                                    loading="lazy"
                                />
                                {!showVoiceResponse && selectedCharacter && <ChatBubble />}         
                            </div>
                        )}

                    </div>
                </Draggable>
            </div>

            {isMobile && (
                <div id="mobileWarning" className="mobile-warning">
                    <div className="flex flex-col">
                        <p className="p-2">
                            This site is best viewed on a desktop.
                        </p>
                        <button
                            className="bg-green-400 text-white rounded mx-auto p-2"
                            onClick={() => {}}
                        >
                            Sounds good
                        </button>
                    </div>
                </div>
            )}

            <div className="main-wrapper bg-[#F3F5F8] relative pb-20 pt-20 ">
                {/* Page Banner */}
                <HomeBanner />

                {/* Components Container */}
                <SectionContainer className="components--container">
                    {/* Problem */}
                    <MotionBTTContainer>
                        <SectionContainer className="feature-tabs" id="firstSlide" >
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Know thyself</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Understanding AI Agents
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>
                                    AI agents excel in specialized domains. Yet, akin to a single musician amidst a grand symphony, their brilliance sometimes needs collaboration to reach its pinnacle.
                                </p>
                            </Content>
                            <IframeContainer 
                                addAudioRef={addAudioRef}
                                removeAudioRef={removeAudioRef}
                            />
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* AI Agents Collaboration */}
                    <MotionBTTContainer>
                        <div id="secondSlide"></div>
                        <SectionContainer id="features" className="features">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>
                                    Fortune favors the brave
                                </BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                AI agents that don't Mingle Stay Single
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p className="italic font-semibold">
                                    Why Solo Performers Need an Orchestra for Symphony
                                </p>
                            </Content>

                            <ContentImage addAudioRef={addAudioRef} removeAudioRef={removeAudioRef}/>
                        </SectionContainer>
                    </MotionBTTContainer>
                    <div id="fourthSlide"></div>

                    {/* Elysium OS */}
                    <MotionBTTContainer>
                        <div id="thirdSlide"></div>
                        <SectionContainer id="features" className="features">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Eyes on the stars</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Addressing Key Challenges Elysium OS{" "}
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>
                                    {/* A Decentralized Operating System for Secure
                                    and Transparent Management of Personalized
                                    AI Agents 24/7 */}
                                </p>
                            </Content>
                            <ContentImage 
                                addAudioRef={addAudioRef}
                                removeAudioRef={removeAudioRef}
                            />
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* Our offerings */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs">
                            <div id="fifthSlide"></div>
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Eyes on the stars</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                {"Our Offerings"}{" "}
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>Our Main Product Offerings</p>
                            </Content>
                            <CardGroup className="grid scroll-m-24 gap-8 grid-cols-1 max-w-4xl mx-auto mt-24 md:grid-cols-2">
                                <Card className="col-span-1 text-primary-900">
                                    <CardBody className="w-full bg-white-600/20 p-12">
                                        {/* <CardImage
                                            src="/ironman.jpeg"
                                            alt="Customizable Layouts image used."
                                        /> */}
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            src="/ironman-video.mp4"
                                            loading="lazy"
                                        ></video>
                                        <CardHeader className="!text-black !text-2xl !font-bold">
                                            Elysium OS on Web & Desktop
                                        </CardHeader>
                                        <p>
                                            {`A groundbreaking decentralized system for secure and transparent management of your AI assistants round-the-clock.`}
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card className="col-span-1 text-primary-900">
                                    <CardBody className="w-full bg-white-600/20 p-12">
                                        {/* <CardImage
                                            src="/build-project.jpeg"
                                            alt="Progress Tracking image used."
                                        /> */}
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            src="/build-project-video.mp4"
                                            loading="lazy"
                                        ></video>
                                        <CardHeader className="!text-black !text-2xl !font-bold">
                                            {selectedCharacter ? selectedCharacter.contentText[8] :
                                                "Automation Station"
                                            }
                                        </CardHeader>
                                        <p>
                                            {selectedCharacter ? selectedCharacter.contentText[9] :
                                                "The hub where efficiency meets innovation. Manage and deploy AI agents effortlessly, making your life simpler and more exciting."
                                            }
                                        </p>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>

                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer
                            id="features"
                            className="features md:mt-12"
                        >
                            <div id="seventhSlide"></div>
                            <BadgeGroup alignment="center">
                                <BadgeMessage>Love conquers all</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Developers!{" "}
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>Building for the builders.</p>
                            </Content>
                            <ContentImage4 />
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* demos */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="" className="mb-12">
                            <SectionContainer id="features" className="mb-12">
                                <div></div>

                                <PageTitle
                                    className="text-center mx-auto"
                                    type="default"
                                >
                                    {"Cutting costs in the real world"}
                                </PageTitle>
                                <Content
                                    className="text-center"
                                    alignment="center"
                                >
                                    <p>
                                        {`Accomplish your tasks without the overhead and cost of hiring real assistants.`}
                                    </p>
                                </Content>
                                <AgencyExample />
                            </SectionContainer>
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* @ zenitsue we are wokring here */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="" className="mb-12">
                            <SectionContainer id="features" className="mb-12">
                                <AgencyPlayground />
                            </SectionContainer>
                        </SectionContainer>
                    </MotionBTTContainer>

                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer
                            id="the-die-is-cast"
                            className="mb-12"
                        >
                            <SectionContainer id="features" className="mb-12">
                                <div id="sixthSlide"></div>
                                <BadgeGroup alignment="center">
                                    <BadgeMessage>The die is cast</BadgeMessage>
                                </BadgeGroup>
                                <PageTitle
                                    className="text-center mx-auto"
                                    type="default"
                                >
                                    {selectedCharacter ? selectedCharacter.contentText[12] :
                                    "Our Vision (Live Demos) "
                                    }
                                </PageTitle>
                                <Content
                                    className="text-center"
                                    alignment="center"
                                >
                                    <p>
                                        {selectedCharacter ? selectedCharacter.contentText[13] :
                                        ` We're painting a grand picture – an
                                    interconnected ecosystem of AI agents,
                                    creating harmonious solutions for
                                    multifaceted challenges.`}
                                    </p>
                                </Content>
                                <ContentImage3 />
                            </SectionContainer>
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* target users */}

                    {/* roadmap */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="features" className="features">
                            <div id="eigthSlide"></div>
                            <BadgeGroup alignment="center">
                                <BadgeMessage>
                                    To Elysium and Beyond!
                                </BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                {selectedCharacter ? selectedCharacter.contentText[18] :
                                "Our Journey Ahead – The Roadmap"
                                }
                            </PageTitle>

                            <Content className="text-center" alignment="center">
                                <p>
                                    {selectedCharacter ? selectedCharacter.contentText[19] :
                                    "The future awaits..." }
                                </p>
                            </Content>
                            <RoadMap />
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* revenue */}

                    {/* <div id="ninthSlide"></div> */}
                    <Revenue />

                    {/* team */}
                    <div id="tenthSlide"></div>
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="features" className="features">
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                {selectedCharacter ? selectedCharacter.contentText[14] :
                                "Meet the Maestros - Our Team"}
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>
                                    {selectedCharacter ? selectedCharacter.contentText[15] :
                                    `From AI enthusiasts to business moguls, meet
                                    the minds sculpting the Elysium dream.`}
                                </p>
                            </Content>

                            <ChatPage />
                        </SectionContainer>
                    </MotionBTTContainer>
                    {/* <PhoneChat /> */}
                    {/* Testimonials */}

                    {/* Downloadable Files*/}
                    <div className="mx-auto  items-center h-full flex flex-col space-y-12">
                        <p className="notice-text w-full">
                            Have a look at our paperwork
                        </p>

                        {!isContainerVisible && (
                            <div className="w-48 relative flex flex-col justify-center items-center h-56 bg-yellow-900 elysium-object-glow rounded cabinet">
                                <p className="absolute top-4 text-white border-b w-full text-center pb-2 border-gray-300 shadow-lg font-mono">
                                    Elysium Files
                                </p>
                                <img
                                    src="/download-files.png"
                                    alt="Download Icon"
                                    // onClick={handleIconClick}
                                    onClick={handleUnlock}
                                    draggable={false}
                                    className="download-icon  bg-brown-400 "
                                />
                                <div className="w-full border-t text-white text-center text-sm font-mono">
                                    * Click folder *
                                </div>
                            </div>
                        )}
                        {isContainerVisible && (
                            <div
                                className={`w-full h-56 relative flex flex-col bg-white rounded p-4 shadow-md bg-gradient-to-b from-blue-400 to-gray-700 ${
                                    isUnlocked ? "elysium-object-glow" : ""
                                }`}
                            >
                                {!isUnlocked ? (
                                    <>
                                        <input
                                            type="password"
                                            className="rounded p-2 border font-mono"
                                            value={enteredPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter password"
                                        />
                                        <div className="flex justify-evenly mt-4 font-mono">
                                            <button
                                                className="p-2 bg-blue-500 text-white"
                                                onClick={handleSubmitPassword}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={handleGoBack}
                                                className="p-2 bg-blue-500 text-white"
                                            >
                                                Go Back
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-2 font-mono text-blue-500 ">
                                        {files.map((file) => (
                                            <a
                                                key={file}
                                                href={`/downloads/${file}`}
                                                download
                                                className="bg-white p-1 text-center"
                                            >
                                                {file}
                                            </a>
                                        ))}
                                        <button
                                            onClick={handleGoBack}
                                            className="p-2 bg-blue-500 text-white mx-auto absolute bottom-4"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Accordions */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="faq" className="faq">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>FAQ</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                <div id="faq"></div>
                                {selectedCharacter ? selectedCharacter.contentText[16] :
                                "Questions? Dive into our FAQ: "}
                                <br></br>
                                <br></br>
                                <p className="text-xl font-light">
                                    {selectedCharacter ? selectedCharacter.contentText[17] :
                                        "Your queries, answered. From our mission to our methods – get the clarity you seek."
                                    }
                                </p>
                            </PageTitle>
                            <Accordion sections={accordionData} />
                        </SectionContainer>
                    </MotionBTTContainer>
                </SectionContainer>
            </div>
            {/* <div className="fixed bottom-0 right-0 z-50 p-4">
                <button
                    className="bg-green-500 text-white rounded p-2 shadow-md"
                    onClick={() => {}}
                >
                    Call Butler
                </button>
            </div> */}
        </Layout>
    );
}