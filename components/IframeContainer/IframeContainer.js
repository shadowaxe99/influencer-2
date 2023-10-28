import { useEffect, useRef, useState } from "react";

const IframeContainer = ( { addAudioRef, removeAudioRef } ) => {
    // const [showDemoAgent, setShowDemoAgent] = useState(false);
    const ref = useRef(null);
    const [areDoorsOpen, setAreDoorsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const leftDoor = document.querySelector(".door-left");
            const rightDoor = document.querySelector(".door-right");
            if (!leftDoor || !rightDoor) return;

            // Check if doors are in the viewport
            const rect = leftDoor.getBoundingClientRect();
            if (
                // Condition 1: Both doors are completely inside the viewport
                (rect.top >= 0 && rect.bottom <= window.innerHeight) ||
                // Condition 2: Top is above and bottom is below viewport
                (rect.top < 0 && rect.bottom > window.innerHeight)
            ) {
                if (!areDoorsOpen) {
                    toggleDoors(); // Open the doors

                    // Lock the scroll
                    document.body.style.overflow = "hidden";
                    setTimeout(() => {
                        document.body.style.overflow = "";
                    }, 2000); // Unlock after 2 seconds
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [areDoorsOpen]);

    const toggleDoors = () => {
        const leftDoor = document.querySelector(".door-left");
        const rightDoor = document.querySelector(".door-right");

        if (areDoorsOpen) {
            // If doors are open, close them
            leftDoor.classList.remove("open-left");
            rightDoor.classList.remove("open-right");

            // Play close sound
            if (typeof window !== "undefined") {
                const flipSound = new Audio("/sounds/door-close.mp3"); // assuming you have a door close sound effect
                addAudioRef(flipSound);
                flipSound.addEventListener("ended", () => {
                    removeAudioRef(flipSound);
                });
                flipSound.play();
            }
        } else {
            // If doors are closed, open them
            leftDoor.classList.add("open-left");
            rightDoor.classList.add("open-right");

            // Play open sound
            const flipSound = new Audio("/sounds/door-open.mp3");
            flipSound.pause();
            flipSound.currentTime = 0;
            flipSound.volume = 0.25;
            flipSound.playbackRate = 1;
            addAudioRef(flipSound);
            flipSound.addEventListener("ended", () => {
                removeAudioRef(flipSound);
            });
            flipSound.play();
            const agentStart = new Audio("/sounds/agent-opened.mp3");
            agentStart.volume = 0.15;
            addAudioRef(agentStart);
            agentStart.addEventListener("ended", () => {
                removeAudioRef(agentStart);
            });

            setTimeout(() => {
                setAreDoorsOpen(true);
                document.body.style.overflow = "";
                agentStart.play();
            }, 3000);
        }
    };

    // useEffect(() => {
    //     const iframe = document.querySelector(".iframe-container iframe");
    //     const resizeIframe = () => {
    //         iframe.style.height = `${window.innerHeight}px`;
    //     };
    //     resizeIframe();
    //     window.addEventListener("resize", resizeIframe);
    //     return () => {
    //         window.removeEventListener("resize", resizeIframe);
    //     };
    // }, []);

    return (
        <div className="iframe-container">
            <iframe
                src="https://elysium-simplified-ai-agent.vercel.app"
                className="agent-iframe"
                autoFocus={false}
                scrolling="no"
                loading="lazy"
                onLoad={(e) => e.preventDefault()}
            ></iframe>

            {!areDoorsOpen && (
                <div className="flex flex-row justify-center">
                    <div className="door-container">
                        <div className="door-left" onClick={toggleDoors}></div>
                        <div className="door-right" onClick={toggleDoors}></div>
                    </div>
                </div>
            )}
            {/* Open/Close Doors Button */}
            {/* <button onClick={toggleDoors} style={{marginTop: "1200px"}}>
            {areDoorsOpen ? "Close Doors" : "Open Doors"}
        </button> */}
        </div>
    );
};

export default IframeContainer;
