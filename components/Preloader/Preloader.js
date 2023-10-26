import { useEffect, useState, useRef } from "react";
import { preloader } from "./utils";
import Image from "next/image";
import useCharacterStore from "../../store/charStore"; // Import Zustand store
import { useRouter } from "next/router";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faInfo,
    faTimes,
    faMicrophone,
    faQuestionCircle,
    faFaceFrown
} from "@fortawesome/free-solid-svg-icons";
import RunescapeLogin from "@components/RunscapeLogin/RunescapeLogin";
import ElysiumLanding from "@components/ElysiumLanding/ElysiumLanding";
import router from "next/router";

import { duneFont } from "@fonts/fonts";

const Preloader = ({ handleCharacterClick }) => {
    const { characters, selectedCharacter, setSelectedCharacter } =
        useCharacterStore();
    const [displayedText, setDisplayedText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [numColumns, setNumColumns] = useState(4); // default to 4 columns
    const [enterClicked, setEnterClicked] = useState(false); // <-- Make sure this line is present
    const [terminalType, setTerminalType] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true); // <-- Make sure this line is present

    const terminalRef = useRef(null);

    const [charIndex, setCharIndex] = useState(0);
    const messages = [
        "Initializing AI Personas...",
        "Writing Elysium G.U.I.D.E.",
        "Downloading packages from Olympus",
        "Loading...",
        "Running Elysium OS ⭐️"
    ];

    // let audio;
    // if (typeof window !== "undefined") {
    //     audio = new Audio();
    // }

    const [showOverlay, setShowOverlay] = useState(true);
    const [characterAudioPlayer, setCharacterAudioPlayer] = useState(null);
    const [showMobileBlock, setShowMobileBlock] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [inPreloader, setInPreloader] = useState(true);

    const handleEnterClick = () => {
        // document.body.classList.add("noScroll"); // Disable scrolling
        setIsOverlayVisible(false);
        const overlayElem = document.querySelector(".overlay");
        overlayElem.classList.add("zoomFadeOutEffect");

        const preloaderFade = () => {
            const preloaderElem = document.querySelector(".preloader");
            preloaderElem.classList.add("fadeInEffect");
        };

        // Play the launching sound
        const launchAudio = new Audio("/sounds/launch.mp3");
        launchAudio.volume = 0.15; // Optional: Set volume to 50%
        launchAudio.play();

        // Trigger the spaceship and overlay animations
        // document.querySelector(".spaceship").classList.add("exiting");
        // document.querySelector(".overlay").classList.add("exiting");
        // if (isMobile) {
        //     router.push("/playground");
        // }

        setEnterClicked(true);

        if (isMobile) {
            setTimeout(() => handleCharacterClick(0), 1500);
        } else {
            setTimeout(() => setShowOverlay(false), 1500);
            setTimeout(() => playAudio(), 1700);
            // setTimeout(() => playHackSound(), 1200);
            // setTimeout(() => playBinaryCode(), 12400);

            // Play the terminal type sound with a delay of 1.5 seconds
            if (terminalType) {
                setTimeout(() => terminalType.play(), 1500);
                setTimeout(() => terminalType.pause(), 12400);
                setTimeout(() => setTerminalType(null), 12500);
            }
        }
    };

    const [loopAudio, setLoopAudio] = useState(null);

    useEffect(() => {
        const audio = new Audio("/sounds/terminalType.mp3");
        audio.volume = 0.25; // Optional: Set volume to 50%
        audio.loop = true;
        setTerminalType(audio);
    }, []);

    const [BinaryCode, setBinaryCode] = useState(null);

    useEffect(() => {
        if (inPreloader && !terminalType && !isOverlayVisible) {
            const audio = new Audio("/sounds/binary-code.mp3");
            audio.loop = true;
            audio.volume = 0.1;
            audio.play();
            setBinaryCode(audio);
        }
        if (!inPreloader && BinaryCode) {
            BinaryCode.pause();
        }
    }, [inPreloader, terminalType]);

    const stopHackSound = (index) => {
        if (loopAudio) {
            loopAudio.pause();
            loopAudio.currentTime = 0; // Reset the audio playback position
        }
        if (terminalType) {
            terminalType.pause();
            terminalType.currentTime = 0;
        }
        if (characterAudioPlayer) {
            characterAudioPlayer.pause();
        }
        if (BinaryCode) {
            BinaryCode.pause();
        }
        handleCharacterClick(index);
        setInPreloader(false);
        console.log("entering playground");
        console.log(inPreloader);
        const bingAudio = new Audio("/sounds/bing-sound.mp3");
        bingAudio.play();
    };

    function typeMessage() {
        const currentMessage = messages[currentMessageIndex];

        if (charIndex < currentMessage.length) {
            setDisplayedText(
                (prevText) => prevText + currentMessage[charIndex]
            );
            setCharIndex((prevCharIndex) => prevCharIndex + 1);
        } else {
            if (currentMessageIndex < messages.length - 1) {
                // New line for the next message and reset char index for the new message
                setDisplayedText((prevText) => prevText + "\n");
                setCharIndex(0);
                setCurrentMessageIndex(
                    (prevMessageIndex) => prevMessageIndex + 1
                );
            }
        }
    }
    const handleMouseDown = (e) => {
        console.log("Mouse Down Triggered");

        setIsDragging(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (isDragging && terminalRef.current) {
            setPosition({
                x: e.clientX - terminalRef.current.offsetWidth / 2,
                y: e.clientY - terminalRef.current.offsetHeight / 2
            });
        }
    };

    // useEffect(() => {
    //     preloader();
    // }, []);

    const playAudio = async () => {
        const fighterAudio = new Audio("/sounds/choose-your-fighter.mp3");
        fighterAudio.volume = 0.4; // Optional: Set volume to 50%

        try {
            console.log("audio", fighterAudio);
            await fighterAudio.play();
            console.log("Audio play succeeded");
        } catch (err) {
            console.log("Audio play failed:", err);
        }
    };

    useEffect(() => {
        if (currentMessageIndex < messages.length) {
            const intervalId = setInterval(typeMessage, 100);
            return () => clearInterval(intervalId);
        }
    }, [currentMessageIndex, charIndex]);

    const handleMouseEnterCharacter = (soundPath) => {
        if (characterAudioPlayer) {
            characterAudioPlayer.pause();
        }
        // Play the hovered character's sound
        const newAudioPlayer = new Audio(soundPath);
        console.log("newAudioPlayer", newAudioPlayer);
        newAudioPlayer.volume = 0.2; // Optional: Set volume to 50%
        setCharacterAudioPlayer(newAudioPlayer);
        newAudioPlayer.play();
    };

    const handleScreenClick = (event) => {
        if (event.target.id === "preloader") {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * characters.length);
            stopHackSound(randomIndex);
        }
    };

    const handleMouseEnter = () => {
        try {
            const fighterAudio = new Audio("/sounds/choose-your-fighter.mp3");
            fighterAudio.volume = 0.2; // Optional: Set volume to 100%
            // fighterAudio.play();
        } catch (err) {
            console.log("Audio play failed:", err);
        }
    };
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
    }, []);

    useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setNumColumns(2); // Mobile
            } else if (window.innerWidth <= 1024) {
                setNumColumns(3); // Tablet
            } else {
                setNumColumns(4); // Desktop
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initialize

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <>
            {showOverlay ? (
                // <div className="overlay" onClick={handleEnterClick}>
                //     <div className="spaceship"></div>
                //     <p>Click spaceship to launch</p>
                // </div>
                // <RunescapeLogin handleEnterClick={handleEnterClick} />
                <div className="overlay" onClick={handleEnterClick}>
                    <ElysiumLanding
                        handleEnter={handleEnterClick}
                        enterClicked={enterClicked}
                    />
                </div>
            ) : (
                <div
                    id="preloader"
                    className="preloader"
                    onClick={handleScreenClick}
                >
                    {showMobileBlock && (
                        <div id="mobileWarning" className="mobile-warning">
                            <div className="flex flex-col">
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
                    {/* <Draggable> */}

                    <div
                        id="terminal"
                        class="terminal"
                        ref={terminalRef}
                        onMouseDown={handleMouseDown}
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`
                        }}
                    >
                        <div
                            class="terminal-header"
                            onMouseDown={handleMouseDown}
                        >
                            Command Prompt
                        </div>
                        <div className="terminal-content">
                            {"Last login: Sat Sep 30 13:40:23 on ttys023\n"}
                            {"zues@Elysium-OS ~ % \n"}
                            <pre>
                                {displayedText}
                                <span className="blinking-cursor">|</span>
                            </pre>
                        </div>
                    </div>
                    <img
                        src="/i-stand-with-israel.png"
                        className="topRightImage"
                        style={{ width: "300px", height: "300px" }}
                    />
                    {/* <img src="/bottomRight.png" className="bottomRightImage" /> */}
                    <div className="shooting-stars">
                        <span className="shooting-star"></span>
                        <span className="shooting-star"></span>
                        <span className="shooting-star"></span>
                        <span className="shooting-star"></span>
                        <span className="shooting-star"></span>
                        <span className="shooting-star"></span>
                        <span className="shooting-star"></span>
                    </div>

                    <div className="floatingShape shape1"></div>
                    <div className="floatingShape shape2"></div>
                    <div className="floatingShape shape3"></div>
                    <div className="floatingShape shape4"></div>
                    <div className="floatingShape shape5"></div>
                    <div className="floatingShape shape6"></div>
                    <div className="floatingShape shape7"></div>
                    <div className="floatingShape shape8"></div>
                    <div className="preloader-content">
                        <h1
                            className={`preloader-title ${duneFont.variable} font-dune`}
                        >
                            Elysium Innovations
                        </h1>
                        <div className="loader_line"></div>
                        <p className="preloader-subtitle">
                            Entering the future...
                        </p>
                        {/* <button onClick={skipPreloader} className="skip-button">
                        Enter
                    </button> */}
                    </div>
                    <div className="select-character-container">
                        <h3 className="bg-gray-500 rounded mx-auto w-4/5 p-2 mt-2">
                            Select Character
                        </h3>
                        <span>
                            Character selection should be based on your
                            knowledge of AI
                        </span>
                        <div
                            className="character-grid"
                            onMouseEnter={handleMouseEnter}
                            style={{
                                gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                                height: "400px"
                            }}
                        >
                            {characters.map((character, index) => (
                                <div
                                    key={index}
                                    className={`character-item ${
                                        selectedCharacter &&
                                        selectedCharacter.name ===
                                            character.name
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => stopHackSound(index)}
                                    onMouseEnter={() =>
                                        handleMouseEnterCharacter(
                                            character.sound
                                        )
                                    }
                                >
                                    <Image
                                        src={character.img}
                                        alt={character.name}
                                        width={100}
                                        height={100}
                                        className="character-image"
                                        loading="lazy"
                                    />
                                    <div className="font-semibold">
                                        {character.name}
                                    </div>
                                    <p>{character.skill}</p>
                                    <div className="description-bubble">
                                        {character.description}
                                    </div>
                                    <style jsx>{`
                                        .character-item:hover {
                                            animation: bounce 0.5s infinite;
                                        }
                                        @keyframes bounce {
                                            0%,
                                            100% {
                                                transform: translateY(0);
                                            }
                                            50% {
                                                transform: translateY(-10px);
                                            }
                                        }
                                    `}</style>
                                </div>
                            ))}
                        </div>
                        {/* <audio
                        src="/sounds/choose-your-fighter.mp3"
                        autoPlay
                    ></audio> */}
                    </div>
                </div>
            )}
        </>
    );
};
export default Preloader;
