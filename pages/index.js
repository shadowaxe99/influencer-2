import Preloader from "@components/Preloader/Preloader";
import { useState, useEffect } from "react";
import useCharacterStore from "../store/charStore"; // Import Zustand store
import { useRouter } from "next/router";
import ElysiumLanding from "@components/ElysiumLanding/ElysiumLanding";
export default function Home() {
    const router = useRouter();

    const { characters, selectedCharacter, setSelectedCharacter } =
        useCharacterStore();

    function muteMe(elem) {
        elem.muted = true;
        elem.pause();
    }
    
    // Try to mute all video and audio elements on the page
    function mutePage() {
        document.querySelectorAll("video, audio").forEach((elem) => muteMe(elem));
    }

    // const handleEnterClick = (index) => {
    //     router.push("/characterselect");
    // };
    const handleEnterInteractiveClick = () => {
        // document.body.classList.add("noScroll"); // Disable scrolling
        const overlayElem = document.querySelector(".overlay");
        overlayElem.classList.add("zoomFadeOutEffect");
        // Play the launching sound
        const launchAudio = new Audio("/sounds/launch.mp3");
        launchAudio.volume = 0.15; // Optional: Set volume to 50%
        launchAudio.play();
        setTimeout(() => {
            router.push("/characterselect");
        }, 2000);
    };
    const handleEnterStaticClick = () => {
        const overlayElem = document.querySelector(".overlay");
        overlayElem.classList.add("zoomFadeOutEffect");
        // Play the launching sound
        const launchAudio = new Audio("/sounds/launch.mp3");
        launchAudio.volume = 0.15; // Optional: Set volume to 50%
        launchAudio.play();
        setTimeout(() => {
            router.push("/staticexp");
        }, 2000);
    }
    return (
        <>
            <div className="overlay bg-black">
                <ElysiumLanding handleEnterInteractiveClick={handleEnterInteractiveClick} handleEnterStaticClick={handleEnterStaticClick} />
            </div>
        </>
    );
}
