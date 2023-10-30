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
import useCharacterStore from "../store/charStore";
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
import { config } from "dotenv";
import { motion, useAnimation } from "framer-motion";
import { AgencyExample } from "@components/ContentImage/AgencyExample";
import AgencyPlayground from "@components/AgencyPlayground/AgencyPlayground";
import { Chart } from "chart.js";
import { CategoryScale, LinearScale } from "chart.js/auto";
import { v4 as uuid } from "uuid";

Chart.register(CategoryScale, LinearScale);

config();

const contextSystemPrompt = `
        You are Alfred, an AI Butler Assistant who's job is to help answer questions about Elysium. You are a sitting atop the website we will have users interact with to get a taste of what elysium is building towards. Elysium is a company dedicated to bringing AI to the masses. Refer to Elysium in the context of 'we', 'us', and 'I' because you are on the team. Here is some more information about the company:
        ---
        - We are building two main product offerings: Elysium OS and Automation Station. Elysium OS is a software that comes in the form of a web app and destkop app, providing user with their very own personal AI Butler Assistant who is able to delegate tasks to other agents deployed to the Elysium Ecosystem. Automation Station will be an AI Agent marketplace where developers can deploy their own agents and users can choose agents from to help accomplish their tasks; this aims to empower developers as well as provide as many agents to consumers as possible. Automation station is not yet live so to test out agents try it out on our demo which is located a bit after the beginning of the website.
        - Some context of what an AI Agent is: An AI Agent is A software entity that autonomously analyzes data and its environment or user input to make decisions and execute specific tasks using AI algorithms. If the user is interested in learning more or trying out an Agent, direct them to our AI Agent demo which is located just a bit after the top of the website.
        - The problem Elysium is trying to solve is that AI Agents are fragmented. There is no unified communication layer. Elysium aims to create that unified communication layer for agents to interact seamlessly.
        // // If the user is interested in learning more or investing, tell them to reach out to our CEO: Michael Gruen who can be reached at michael@elysiuminnovations.ai or they click the contact button on the site.
        
        ---
        Be concise in your responses. Use light humor where appropriate. Do not over explain or over answer. Make you answers clear and to the point. If the user gievs you their name and it is a notable firgure who you know, feel free to compliment them based on any public info you know of them. 
    `;

export default function Home() {
    const {
        selectedCharacter,
        setSelectedCharacter,
        characters,
        themeImagePaths,
        setThemeImagePaths
    } = useCharacterStore(); // Use Zustand store
    const router = useRouter();

    const [showVoiceResponse, setShowVoiceResponse] = useState(false);
    const [recording, setRecording] = useState(false);
    const [audioData, setAudioData] = useState(null);
    const [currTranscript, setTranscript] = useState("");

    let mediaRecorder = createRef(null);

    const recognitionRef = useRef(null);
    const [chatBotResponse, setChatBotResponse] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { role: "system", content: contextSystemPrompt }
    ]
);
    const [audioURL, setAudioURL] = useState(null);
    const [isVoiceLoading, setIsVoiceLoading] = useState(false);
    const [isButlerDismissed, setButlerIsDismissed] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isChatBotResponseLoading, setIsChatBotResponseLoading] =
        useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isContainerVisible, setContainerVisible] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [showMobileBlock, setShowMobileBlock] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [files, setFiles] = useState([
        "ELYSIUM_INNOVATIONS_DECK.pdf",
        "Elysium_Business_Plan.pdf",
        "Elysium_Innovations_Financial_Model.xlsx",
    ]
);
    const [fontFamily, setFontFamily] = useState("");
    const [fontVariable, setFontVariable] = useState("");
    const [letterSpacing, setLetterSpacing] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const [localMute, setLocalMute] = useState(false);
    const audioRefs = useRef([]
);

    const addAudioRef = (audio) => {
        audioRefs.current.push(audio);
        // console.log("MUTED OR NOT IN ADD REF: ", localMute)
        // audio.muted = isMuted;
    };

    useEffect(() => {
        audioRefs.current.forEach(audio => {
            audio.muted = isMuted;
        });
    }, [isMuted, addAudioRef]
);
    
    const removeAudioRef = (audioToRemove) => {
        audioRefs.current = audioRefs.current.filter(audio => audio !== audioToRemove);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        const allMediaElements = document.querySelectorAll('audio, video');
        allMediaElements.forEach(media => {
            media.muted = !isMuted;
        });
      };      
      
    useEffect(() => {
        if (selectedCharacter) {
            setFontFamily(selectedCharacter.fontFamily);
            setFontVariable(selectedCharacter.fontVariable);
            setLetterSpacing(selectedCharacter.letterSpacing);
            console.log("selectedCharacter", selectedCharacter);
            console.log("font family", selectedCharacter.fontFamily);
            console.log("font variable", selectedCharacter.fontVariable);
        }
    }, []
);


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

    const handleMobileButtonClicked = () => {
        setShowMobileBlock(false);
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
    }, []
);

    // Function to start recording
    const startRecording = () => {
        setIsRecording(true);
        // Create a new SpeechRecognition instance and configure it
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        let lastResultIndex = 0;
        recognitionRef.current.onresult = (event) => {
            let interimTranscript = "";
            for (let i = lastResultIndex; i < event.results.length; i++) {
                const { transcript } = event.results[i][0];
                if (event.results[i].isFinal) {
                    console.log("is final", event.results[i]
);
                    setTranscript(`${transcript}`);
                    console.log("[transcript from speech]", transcript);
                    console.log("[currTranscript]", currTranscript);
                    lastResultIndex = i + 1;
                } else {
                    // const newWords = transcript.replace(interimTranscript, "");
                    interimTranscript += transcript;
                    // setTranscript(
                    //     (prevTranscript) => `${prevTranscript} ${newWords}`
                    // );
                }
            }
            // You can do something with the interimTranscript here if you want
        };

        // Start the speech recognition
        recognitionRef.current.start();
    };

    const ttsElevenlabs = async (chatBotAnswer) => {
        const tonyStarkId = "05U1tkz7fchGoPDPbES7";
        const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
        const options = {
            method: "POST",
            url: `https://api.elevenlabs.io/v1/text-to-speech/${tonyStarkId}`,
            headers: {
                accept: "audio/mpeg", // Set the expected response type to audio/mpeg.
                "content-type": "application/json", // Set the content type to application/json.
                "xi-api-key": "YOUR_API_KEY" // Set the API key in the headers.
            },
            data: {
                text: chatBotAnswer // Pass in the inputText as the text to be converted to speech.
            },
            responseType: "arraybuffer" // Set the responseType to arraybuffer to receive binary data as response.
        };
        const speechDetails = await axios.request(options);
        setIsVoiceLoading(false);
        return speechDetails.data;
    };

    const getChatBotResponse = async () => {
        let messages = chatHistory.concat([
            { role: "user", content: currTranscript }
        ]
);
        setChatHistory(messages);
        console.log("m", messages);

        // if (chatHistory.length > 0) {
        //     messages.concat(chatHistory);
        // }
        setIsVoiceLoading(true);
        setIsChatBotResponseLoading(true);

        const model = "gpt-3.5-turbo";
        const max_tokens = 256;
        const top_p = 1;
        const frequency_penalty = 0.4;
        const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        console.log(process.env);
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer YOUR_OPENAI_API_KEY"
                },
                body: JSON.stringify({
                    messages,
                    model,
                    max_tokens,
                    top_p,
                    frequency_penalty
                })
            }
        );

        const chatbotJson = await response.json();
        console.log("rrrr", chatbotJson);
        const chatbotAnswer = chatbotJson["choices"][0]["message"].content; // Replace this with the actual field from API response
        setChatBotResponse(chatbotAnswer);
        console.log("[currTranscript] after response", currTranscript);
        let newHistory = chatHistory.concat(
            { role: "user", content: currTranscript },
            { role: "assistant", content: chatbotAnswer }
        );
        console.log("[newHistory]", newHistory);
        setChatHistory(newHistory);
        setIsChatBotResponseLoading(false);

        console.log("[chatHistory] after repsonse", chatHistory);
        const voiceResponse = await ttsElevenlabs(chatbotAnswer);
        // console.log("voiceresponse", voiceResponse);
        const blob = new Blob([voiceResponse], { type: "audio/mpeg" });
        // Create a URL for the blob object
        const url = URL.createObjectURL(blob);
        // console.log("url", url);
        // Set the audio URL state variable to the newly created URL
        setAudioURL(url);
        console.log("removing current transcript", currTranscript);
        setTranscript("");
    };
    const stopRecording = async () => {
        // if (mediaRecorder.current) {
        //     console.log("mediaRecorder", mediaRecorder);
        //     mediaRecorder.current.stop();
        // }
        if (recognitionRef.current) {
            console.log("mediaRecorder", recognitionRef);
            recognitionRef.current.stop();
        }

        setRecording(false);
        setAudioURL(null);
        return new Promise((resolve) => {
            recognitionRef.current.onend = () => {
                resolve();
            };
        });

        // Transcribe audio to text
        // Display the chatbot's response in the voice response box
        // Implement your logic to display chatbotAnswer in the voice response box
    };

    const [isRecording, setIsRecording] = useState(false);
    const resetButlerChatState = () => {
        setAudioURL(null);
        setChatHistory([{ role: "system", content: contextSystemPrompt }]
);
    };
    // const [iframeDisplay, setIframeDisplay] = useState("none");
    const handleDismissVoiceResponseBox = () => {
        setShowVoiceResponse(false);
        resetButlerChatState();
    };
    const handleShowVoiceResponse = () => {
        setShowVoiceResponse(true);
        startRecording();
        setIsRecording(true);
    };
    const handleAskAgain = () => {
        setIsRecording(true);
        startRecording();
    };
    const handleSubmitVoice = async () => {
        setIsRecording(false);
        await stopRecording();
        setIsSubmitted(true);
    };

    const handleDismissButler = () => {
        setButlerIsDismissed(true);
        resetButlerChatState();
    };
    const handleButlerSummoned = () => {
        setButlerIsDismissed(false);
    };

    useEffect(() => {
        if (isSubmitted) {
            getChatBotResponse();
            setIsSubmitted(false); // Reset for next submission
        }
    }, [isSubmitted]
);
    // After the party's over, it's time for cleanup. 🧹 effect when the component unmounts
    useEffect(() => {
        return () => {
            // Stop the speech recognition if it's active
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []
);
    useEffect(() => {
        if (!selectedCharacter) {
            setSelectedCharacter(characters[0]
);
            console.log(characters[0].themeImagePaths);
            setThemeImagePaths(characters[0].themeImagePaths);
            const greetingAudio = new Audio(characters[0].greeting);
            greetingAudio.muted = isMuted;
            addAudioRef(greetingAudio);
            greetingAudio.addEventListener('ended', () => removeAudioRef(greetingAudio));
            greetingAudio.volume = 0.4;
            greetingAudio.play();
            return;
        }
        console.log("selectedCharacter", selectedCharacter);
        const greetingAudio = new Audio(selectedCharacter.greeting);
        greetingAudio.muted = isMuted;
        addAudioRef(greetingAudio);
        greetingAudio.addEventListener('ended', () => removeAudioRef(greetingAudio));
        greetingAudio.volume = 0.4;
        greetingAudio.play();
    }, []
);
    useEffect(() => {
        const audio = new Audio("/sounds/dystopia.mp3"); // could use dystopian.mp3 instaed if wanted. It is just longer and covers other sounds
        audio.muted = isMuted;
        addAudioRef(audio);
        audio.addEventListener('ended', () => removeAudioRef(audio));
        audio.volume = 0.012;
        audio.play();
    }, []
);

    const scrollToSlide = (event, slideId) => {
        event.preventDefault();
        const target = document.getElementById(slideId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    function toggleSidebar() {
        const sidebar = document.querySelector(".sidebar");
        const toggleBtn = document.querySelector(".toggle-sidebar");

        // Check for inline style and the computed style
        const isSidebarOpen =
            sidebar.style.right === "0px" ||
            getComputedStyle(sidebar).right === "0px";

        if (isSidebarOpen) {
            sidebar.style.right = "-220px";
            try {
                toggleBtn.style.right = "0";
            } catch (e) {
                console.log("error", e);
            }
        } else {
            sidebar.style.right = "0";
            try {
                toggleBtn.style.right = "200px";
            } catch (e) {
                console.log("error", e);
            }
        }
    }

    useEffect(() => {
        const playAudio = () => {
            const audio = new Audio("/sounds/die-cast.mp3");
            addAudioRef(audio);
            audio.addEventListener('ended', () => removeAudioRef(audio));
            audio.volume = 0.04;
            audio.muted = isMuted;
            audio.play();
        };

        const handleScroll = () => {
            const section = document.getElementById("the-die-is-cast");
            const rect = section.getBoundingClientRect();

            // Check if section is in viewport
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                playAudio();
                // Remove event listener after playing the audio
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // After the party's over, it's time for cleanup. 🧹 the event listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []
);
    const [scrollY, setScrollY] = useState(0);
    const controls = useAnimation();
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            // console.log("mouse handle scroll", window.scrollY);

            if (scrollY > 50) {
                controls.start({ opacity: 0 });
                controls.start({ display: "none" });
            } else {
                controls.start({ opacity: 1 });
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollY, controls]
);

    const predefinedPassword = "password"; // Replace with your actual password

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
        if (enteredPassword === predefinedPassword) {
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
    const shakeIcon = () => {
        const iconElement = document.querySelector(".download-icon");
        if (iconElement) {
            iconElement.classList.add("shake-animation");

            setTimeout(() => {
                iconElement.classList.remove("shake-animation");
            }, 500);
        }
    };
    useEffect(() => {
        const shakeInterval = setInterval(shakeIcon, 5000);
        return () => clearInterval(shakeInterval);
    }, []
);

    return (
        <Layout className="" toggleSidebar={toggleSidebar}>
            <div className="fontFamily fontVariable letterSpacing">            <div className="toggle-sidebar" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <div class="sidebar text-center">
                <ul>
                    <li>
                        <a
                            href="#firstSlide"
                            onClick={(e) => scrollToSlide(e, "firstSlide")}
                        >
                            Welcome to Elysium
                        </a>
                    </li>
                    
                    <li>
                        <a
                            href="#thirdSlide"
                            onClick={(e) => scrollToSlide(e, "thirdSlide")}
                        >
                            Experience the AI Revolution
                        </a>
                    </li>

                    <li>
                        <a
                            href="#fourthSlide"
                            onClick={(e) => scrollToSlide(e, "fourthSlide")}
                        >
                            The AI Conundrum
                        </a>
                    </li>
                    
                    <li>
                        <a
                            href="#secondSlide"
                            onClick={(e) => scrollToSlide(e, "secondSlide")}
                        >
                            Your Personal AI Butler Awaits
                        </a>
                    </li>

                    <li>
                        <a
                            href="#fifthSlide"
                            onClick={(e) => scrollToSlide(e, "fifthSlide")}
                        >
                            Innovative Solutions
                        </a>
                    </li>
                    <li>
                        <a
                            href="#seventhSlide"
                            onClick={(e) => scrollToSlide(e, "seventhSlide")}
                        >
                            Empowering Developers
                        </a>
                    </li>
                    <li>
                        <a
                            href="#sixthSlide"
                            onClick={(e) => scrollToSlide(e, "sixthSlide")}
                        >
                            The Future, Envisioned
                        </a>
                    </li>
                    <li>
                        <a
                            href="#eigthSlide"
                            onClick={(e) => scrollToSlide(e, "eigthSlide")}
                        >
                            The Journey Ahead
                        </a>
                    </li>
                    <li>
                        <a
                            href="#ninthSlide"
                            onClick={(e) => scrollToSlide(e, "ninthSlide")}
                        >
                            The Engine of Progress
                        </a>
                    </li>
                    <li>
                        <a
                            href="#tenthSlide"
                            onClick={(e) => scrollToSlide(e, "tenthSlide")}
                        >
                            {"Meet Elysium's AI Doppelgängers"}
                        </a>
                    </li>
                </ul>
            </div>
            <div>
            <div className={`fixed top-10 z-50 left-2 p-4 ${isButlerDismissed ? "" : "hidden"}`}
            >
                <button
                    className="bg-green-500 text-white rounded p-2 shadow-md"
                    onClick={handleButlerSummoned}
                >
                    Call Butler
                </button>
            </div>

            <Draggable>
                <div
                    className={`fixed top-52 left-10 p-4 rounded-lg flex flex-col items-center z-50 ${isButlerDismissed ? "hidden" : "block"}`}
                >
                    {showVoiceResponse && (
                        <div className="bg-white voice-response-box">
                            <div className="text-black p pt-2 flex flex-row space-x-4 mb-2">
                                <p className="mt-2 mb-2 pl-2">
                                    {isRecording ? "Listening..." : ""}
                                </p>
                                <div className={isRecording ? "pulsate" : "hidden"}></div>
                            </div>

                            {audioURL && !isVoiceLoading ? (
                                <audio autoPlay controls className="mb-2">
                                    <source src={audioURL} type="audio/mpeg" />
                                </audio>
                            ) : (
                                <div className="loading-indicator">
                                    <div></div><div></div><div></div><div></div>
                                </div>
                            )}

                            <div className="overflow-y-scroll w-[90%] max-h-[500px] h-full rounded border border-gray-500 p-2">
                                {chatHistory.length > 0 &&
                                    chatHistory.filter(e => e.role !== "system").map((e, i) => (
                                        <p key={i} className={`w-full p-2 mb-2 mt-2 rounded-lg text-black ${e.role === "user" ? "bg-green-700 text-white w-2/5" : "bg-gray-300 w-2/5"}`}
                                        >
                                            {e.content}
                                        </p>
                                    ))}
                                {isChatBotResponseLoading && <BubblesSpinner />}
                            </div>

                            <div className="bottom-buttons m-2">
                                <button
                                    onClick={handleDismissVoiceResponseBox}
                                    className="border p-1 w-2/5 mx-2 text-sm bg-gray-300 text-black rounded"
                                >
                                    Dismiss
                                </button>

                                {isRecording ? (
                                    <button
                                        onClick={handleSubmitVoice}
                                        className="border p-2 w-2/5 text-sm mx-2 rounded bg-green-500 text-white"
                                    >
                                        Done
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAskAgain}
                                        className="border p-1 w-2/5 mx-2 text-sm bg-blue-500 text-white rounded"
                                    >
                                        Ask Another Question
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="absolute top-[-32px] left-4 flex flex-row space-x-2">
                        {!showVoiceResponse && (
                            <>
                                <button
                                    className="border bg-blue-500 px-2 text-white w-10 h-10 rounded-full"
                                    onClick={handleShowVoiceResponse}
                                >
                                    <FontAwesomeIcon icon={faMicrophone} width={24} height={24} />
                                </button>

                                <button
                                    className="border bg-red-500 text-white px-2 h-10 w-10 rounded-full"
                                    onClick={handleDismissButler}
                                >
                                    <FontAwesomeIcon icon={faTimes} width={24} height={24} />
                                </button>

                                <button 
                                    className="border bg-green-500 text-white px-2 h-10 w-10 rounded-full"
                                    onClick={toggleMute}
                                >
                                    <FontAwesomeIcon icon={ isMuted ? faVolumeMute : faVolumeUp} width={24} height={24} />
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
                            {!showVoiceResponse && selectedCharacter && <ChatBubble inputText="visibleText" />}
                        </div>
                    )}
                </div>
            </Draggable>
        </div>

            {showMobileBlock && (
                <div id="mobileWarning" className="mobile-warning">
                    <div className="flex flex-col">
                        {/* <FontAwesomeIcon icon={faFaceFrown} /> */}
                        <p className="p-2">
                            This site is best viewed on a desktop.
                        </p>
                        <button
                            className="bg-green-400 text-white rounded mx-auto p-2"
                            onClick={() => handleMobileButtonClicked()}
                        >
                            Sounds good
                        </button>
                    </div>
                </div>
            )}

            <div id="firstSlide"></div>
            <SEO
                title="Elysium Innovations"
                description="Your Rules, Your AI. 24/7"
            />
            <motion.div
                animate={controls}
                initial={{ opacity: 1, display: "block" }}
                className="fixed top-[20em] left-[32em]  flex w-full h-24 z-50"
            >
                <div class="arrow-box">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </motion.div>
            {/* <div class="mouse"></div> */}
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20 ">
                {/* { Page Banner } */}
                <HomeBanner />

                {/* Components Container */}
                <SectionContainer className="components--container wrap wrap-px md:grid gap-8 sm:gap-24">
                    {/* Problem */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs">
                            <div id="thirdSlide"></div>
                            <BadgeGroup alignment="center"
                                        className={`${fontFamily} ${fontVariable}`}>           
                                <BadgeMessage>Know thyself</BadgeMessage>
                                {/* <BadgeIcon icon="twemoji:waving-hand" /> */}
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                {selectedCharacter ? selectedCharacter.contentText[2] :
                                "Understanding AI Agents"}
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>
                                    {selectedCharacter ? selectedCharacter.contentText[3] :
                                    `AI agents excel in specialized domains. Yet,
                                    akin to a single musician amidst a grand
                                    symphony, their brilliance sometimes needs
                                    collaboration to reach its pinnacle.`}
                                </p>
                                <br />
                            </Content>
                            <div className="flex flex-row w-full justify-center mb-8">
                                <span className="font-semibold">
                                    Give it a spin!
                                </span>
                            </div>
                            
                            <IframeContainer 
                                addAudioRef={addAudioRef}
                                removeAudioRef={removeAudioRef}
                            />

                        </SectionContainer>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="features" className="features">
                            <div id="fourthSlide"></div>
                            <BadgeGroup alignment="center">
                                <BadgeMessage>
                                    Fortune favors the brave
                                </BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className={'text-center mx-auto'}
                                type="default"
                            >
                                
                                {"AI agents that don't Mingle Stay Single"}
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p className="font-semibold italic">
                                    Why Solo Performers Need an Orchestra for
                                    Symphony
                                </p>
                            </Content>

                            <ContentImage2 
                                shouldPlayWaves={true}
                                addAudioRef={addAudioRef}
                                removeAudioRef={removeAudioRef}
                            />
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* What is an Agent?*/}
                    {/* Features */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="features" className="features">
                            <div id="secondSlide"></div>
                            <BadgeGroup alignment="center">
                                <BadgeMessage>
                                    AGI is the dream of Man
                                </BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                
                                {"Addressing Key Challenges Elysium OS "}
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
                                <BadgeMessage>
                                    Eyes on the stars
                                </BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                {"Our Offerings"} 
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
                        <SectionContainer id="features" className="features md:mt-12">
                            <div id="seventhSlide"></div>
                            <BadgeGroup alignment="center">
                                <BadgeMessage>
                                    Love conquers all
                                </BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Developers! 
                            </PageTitle>
                            <Content className="text-center" alignment="center">
                                <p>Building for the builders.</p>
                            </Content>
                            <ContentImage4 />
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
            </div>
        </Layout>
    );
}
