import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

export const ContentImage3 = () => {
    const ContentImageData = [
        {
            id: uuid(),
            title: "AI Agent Interface",
            content: "A world of agents that is here to serve you.",
            align: "left",
            image: "/agent-web-demo.mp4",
            isYoutubeVideo: false,
            demoId: "web",
            index: 0
        },
        {
            id: uuid(),
            title: "Elysium OS on Desktop ",
            content: "Control your computer without lifting a finger.",
            align: "right",
            image: "/desktop-demo.mp4",
            isYoutubeVideo: false,
            demoId: "desktop",
            index: 1
        }
    ];
    const [activeTab, setActiveTab] = useState(ContentImageData[1]); // Default to first tab
    const videoRefs = useRef([]); // Ref for video elements
    const [initialLoad, setInitialLoad] = useState(true); // State to check if it's the initial load
    const activeTabIndexRef = useRef(ContentImageData[1].index);

    useEffect(() => {
        activeTabIndexRef.current = activeTab.index;
    }, [activeTab]);

    const playOrPauseVideo = (index, action) => {
        const video = videoRefs.current[index];
        if (video) {
            if (action === "play") {
                video.play();
                video.volume = 0.25;
                video.muted = false;
            } else if (action === "pause") {
                video.pause();
                video.muted = true;
            }
        }
    };

    useEffect(() => {
        // Function to play or pause videos based on visibility
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            ContentImageData.forEach((demoTab, index) => {
                const videoRef = videoRefs.current[index];
                const videoContainer = document.getElementById(demoTab.demoId);

                if (videoContainer && videoRef) {
                    const videoTop =
                        videoContainer.getBoundingClientRect().top + scrollY;
                    const videoBottom = videoTop + videoRef.clientHeight;
                    console.log("Indices", index, activeTabIndexRef.current);
                    if (
                        videoTop > scrollY - videoRef.clientHeight &&
                        videoBottom < scrollY + windowHeight &&
                        index === activeTabIndexRef.current
                    ) {
                        playOrPauseVideo(index, "play");
                        console.log("playing video", index);
                    } else {
                        playOrPauseVideo(index, "pause");
                    }
                }
            });
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call it once to check initial visibility

        return () => {
            // Remove scroll event listener when component unmounts
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        // When activeTab changes, pause all videos and play the active one
        videoRefs.current.forEach((video, index) => {
            playOrPauseVideo(index, "pause");
        });

        if (initialLoad) {
            setInitialLoad(false);
            return;
        }
        const activeIndex = ContentImageData.findIndex(
            (tab) => tab.demoId === activeTab.demoId
        );
        console.log("playing video", activeIndex);
        playOrPauseVideo(activeIndex, "play");
    }, [activeTab]);

    return (
        <SectionContainer className="process-items mt-8 space-y-4">
            <div className="flex flex-col md:flex-row justify-evenly md:space-x-4 h-24 space-y-8 md:space-y-0 md:mt-0 mt-24">
                {ContentImageData.map((demoTab) => (
                    <button
                        key={demoTab.id}
                        className={`bg-white min-w-24 text-xl font-semibold rounded w-full md:w-1/2 mx-auto text-center p-8 border shadow-md md:hover:scale-105 transition-all ease-in-out ${
                            demoTab.demoId === activeTab.demoId &&
                            "border-blue-500"
                        }`}
                        onClick={() => setActiveTab(demoTab)}
                    >
                        {demoTab.title}
                    </button>
                ))}
            </div>
            <div className="relative w-full h-96">
                {ContentImageData.map((demoTab, index) => (
                    <div
                        key={demoTab.demoId}
                        id={demoTab.demoId}
                        className={`
            absolute md:top-0 top-24 left-0 md:left-28 md:w-4/5 mx-auto h-full transition-all ease-in-out duration-300 transform  ${
                demoTab.demoId === activeTab.demoId
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
            }`}
                    >
                        <video
                            ref={(ref) => (videoRefs.current[index] = ref)}
                            src={demoTab.image}
                            width={512}
                            height={512}
                            muted
                            preload="metadata"
                            loop
                            playsInline={true}
                            alt="Demo Video"
                            className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded-sm"
                            controls
                        />
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
};
