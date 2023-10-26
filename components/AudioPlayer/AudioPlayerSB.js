import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const AudioPlayerSB = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0 // Adjust this value based on how much of the target element should be visible before triggering
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsPlaying(true);
                    audioRef.current.play();
                    audioRef.current.volume = 0.2;
                } else {
                    audioRef.current.pause();
                    setIsPlaying(false);
        
                    // Check if the radio has scrolled past the top of the viewport
                    if (entry.boundingClientRect.top < 0) {
                        observerRef.current.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);        

        const target = document.getElementById("radio-trigger-sb"); // Replace 'targetElement' with your specific ID
        observerRef.current.observe(target);

        return () => observerRef.current.unobserve(target);
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center radio-container relative">
           {/* Video background */}
            <video 
                className="absolute top-3 left-0 w-full h-full object-cover z-0" 
                loop 
                muted 
                autoPlay
                loading="lazy"
            >
                <source src="/radio-bg-pika.mp4" type="video/mp4" />
            </video>
    
            <audio
                ref={audioRef}
                src={"/radio/steve-ballmer-ai.mp3"}
                autoPlay={isPlaying}
            ></audio>
    
            <div className="flex items-center justify-start z-10">
                {/* Text right in front of the radio image */}
                <Image
                    src={"/ai-radio-1.png"}
                    alt="Play/Pause"
                    width={1000}
                    height={800}
                    className="w-full h-full"
                    onClick={togglePlayPause}
                    style={{ cursor: "pointer", width: "95%", height: "95%"}}
                    loading="lazy"
                />
            </div>
    
            <button
                onClick={togglePlayPause}
                className="w-1/2 bg-yellow-300 rounded mx-auto z-10"
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default AudioPlayerSB;
