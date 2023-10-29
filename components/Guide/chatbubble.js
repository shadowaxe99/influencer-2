import React, { useState, useEffect, useCallback, useRef } from "react";
import useCharacterStore from "../../store/charStore"; // Import Zustand store
import slideTexts from "./slideTexts"; // import more organized place that has text for each slide
import {
    duneFont,
    runescapePlain,
    agentFont,
    ancient,
    villain,
    bubbleFont,
    starTrekFont,
    popeFont,
    avengersFont,
    spockGalaxy,
    runescapeFont,
    popeMediciFont,
    spongebobFont,
    despicableFont,
    batmanFont
} from "@fonts/fonts";
const ChatBubble = ({ inputText }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [text, setText] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const [fontVariable, setFontVariable] = useState("");
    const [textColor, setTextColor] = useState("text-black");
    const [bgColor, setBgColor] = useState("bg-white");
    const [letterSpacing, setLetterSpacing] = useState("tracking-normal");
    const [textSize, setTextSize] = useState("text-base");
    const { selectedCharacter, setSelectedCharacter } = useCharacterStore(); // Use Zustand store
    // const slideToAudioMap = {
    //     firstSlide: new Audio({ src: "/narration/default/slideOne.mp3" }),
    //     secondSlide: new Audio("/narration/default/slideTwo.mp3"),
    //     thirdSlide: new Audio("/narration/default/slideThree.mp3"),
    //     fourthSlide: new Audio("/narration/default/slideFour.mp3"),
    //     fifthSlide: new Audio("/narration/default/slideFive.mp3"),
    //     sixthSlide: new Audio("/narration/default/slideSix.mp3"),
    //     seventhSlide: new Audio("/narration/default/slideSeven.mp3"),
    //     eigthSlide: new Audio("/narration/default/slideEight.mp3"),
    //     ninthSlide: new Audio("/narration/default/slideNine.mp3"),
    //     desktop: new Audio("/narration/default/desktop.mp3"),
    //     web: new Audio("/narration/default/web.mp3")

    //     // ... and so on for each slide
    // };

    function getTextForCharacterAndSection(targetId) {
        let characterText;
        if (slideTexts[targetId]) {
            if (targetId === "eigthSlide") console.log("targetId", targetId);

            characterText = slideTexts[targetId][selectedCharacter.id];
        } else {
            characterText = "";
        }

        return characterText;
    }

    const delay = 10;

    const handleIntersection = useCallback((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setCurrentText("");
                setCurrentIndex(0);
                // Object.values(slideToAudioMap).forEach((audio) =>
                //     audio.pause()
                // );
                // Object.values(audioRefs).forEach((audioRef) => {
                //     if (audioRef.current) audioRef.current.pause();
                // });

                const newText = getTextForCharacterAndSection(entry.target.id);
                setText((prev) => newText);

                // const audioElement = audioRefs[entry.target.id].current;
                // if (audioElement) {
                //     audioElement
                //         .play()
                //         .catch((e) => console.log("Play error:", e));
                // }
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        });

        const firstSlide = document.getElementById("firstSlide");
        const secondSlide = document.getElementById("secondSlide");
        const thirdSlide = document.getElementById("thirdSlide");
        const fourthSlide = document.getElementById("fourthSlide");
        const fifthSlide = document.getElementById("fifthSlide");
        const sixthSlide = document.getElementById("sixthSlide");
        const seventhSlide = document.getElementById("seventhSlide");
        const eigthSlide = document.getElementById("eigthSlide");
        const ninthSlide = document.getElementById("ninthSlide");
        const desktop = document.getElementById("desktop");
        const web = document.getElementById("web");
        observer.observe(firstSlide);
        observer.observe(secondSlide);
        observer.observe(thirdSlide);
        observer.observe(fourthSlide);
        observer.observe(fifthSlide);
        observer.observe(sixthSlide);
        observer.observe(seventhSlide);
        observer.observe(eigthSlide);
        observer.observe(ninthSlide);
        observer.observe(desktop);
        observer.observe(web);
        return () => {
            observer.unobserve(firstSlide);
            observer.unobserve(secondSlide);
            observer.unobserve(thirdSlide);
            observer.unobserve(fourthSlide);
            observer.unobserve(fifthSlide);
            observer.unobserve(sixthSlide);
            observer.unobserve(seventhSlide);
            observer.unobserve(eigthSlide);
            observer.unobserve(ninthSlide);
            observer.unobserve(desktop);
            observer.unobserve(web);
        };
    }, []);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    const determineCharacterFont = (character) => {
        console.log("character id", character.id);
        switch (character.id) {
            case "0":
                setFontFamily("font-runescape");
                setFontVariable(runescapePlain.variable);
                setTextSize("text-xl");
                setLetterSpacing("tracking-wide");
                break;
            // case "0":
            //     console.log("charceter id === 0");
            //     setFontFamily("font-runescape-new");
            //     setFontVariable(runescapeFont.variable);
            //     setTextSize("text-2xl");
            //     setLetterSpacing("tracking-wider");
            //     break;

                
            // case "1":
            //     setFontFamily("font-mono");
            //     setFontVariable(duneFont.variable);
            //     break;
            case "1":
                setFontFamily("font-batman");
                setFontVariable(batmanFont.variable);
                setLetterSpacing("tracking-wide");
                setTextSize("text-xl");
                break;


            // case "2":
            //     setFontFamily("font-agent");
            //     setFontVariable(agentFont.variable);
            //     setLetterSpacing("tracking-wider");
            //     break;
            case "2":
                setFontFamily("font-avengers");
                setFontVariable(avengersFont.variable);
                setLetterSpacing("tracking-wider");
                setTextSize("text-3xl");
                break;


            case "3":
                setFontFamily("font-startrek");
                setFontVariable(starTrekFont.variable);
                // setTextColor("text-blue-700");
                // setBgColor("bg-gray-400");
                setTextSize("text-3xl");
                setLetterSpacing("tracking-widest");
                break;
            // case "3":
            //     setFontFamily("font-spock-galaxy");
            //     setFontVariable(spockGalaxy.variable);
            //     // setTextColor("text-blue-700");
            //     setBgColor("bg-gray-400");
            //     setTextSize("text-3xl");
            //     break;


            case "4":
                setFontFamily("font-ancient");
                setFontVariable(ancient.variable);
                setTextSize("text-2xl");
                setLetterSpacing("tracking-wider");
                break;


            // case "5":
            //     setFontFamily("font-bubble");
            //     setFontVariable(bubbleFont.variable);
            //     setTextSize("text-2xl");
            //      break;
            case "5":
                setFontFamily("font-spongebob");
                setFontVariable(spongebobFont.variable);
                setTextSize("text-2xl");
                setLetterSpacing("tracking-widest");
                break;


            case "6":
                setFontFamily("font-pope");
                setFontVariable(popeFont.variable);
                setTextSize("text-3xl");
                setLetterSpacing("tracking-wide");
                break;
            // case "6":
            //     setFontFamily("font-pope-medici");
            //     setFontVariable(popeMediciFont.variable);
            //     setTextSize("text-xl");
            //     setLetterSpacing("tracking-wider");
            //     break;


            case "7":
                setFontFamily("font-villain");
                setFontVariable(villain.variable);
                setTextSize("text-3xl");
                setLetterSpacing("tracking-wide");
                break;
            // case "7":
            //     setFontFamily("font-despicable-me");
            //     setFontVariable(despicableFont.variable);
            //     setTextSize("text-xl");
            //     setLetterSpacing("tracking-widest");
            //     break;
        }
    };
    useEffect(() => {
        if (selectedCharacter) {
            determineCharacterFont(selectedCharacter);
        }
    }, []);

    // useEffect(() => {
    //     return () => {
    //         Object.values(slideToAudioMap).forEach((audio) => {
    //             audio.pause();
    //             audio.src = ""; // Empty the src to release the object URL
    //         });
    //     };
    // }, []);

    return (
        <div className={`chat-container `}>
            <div
                className={`chat-bubble ${bgColor} ${fontVariable} ${fontFamily} ${textColor} font-semibold ${letterSpacing} ${textSize}`}
            >
                {currentText}
            </div>
        </div>
    );
};

export default ChatBubble;
