
import React, { useState } from "react";

const RadioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // Implement the audio play/pause logic
    };

    return (
        <div className="radio-player">
            <button onClick={togglePlay}>{isPlaying ? "Mute" : "Play"}</button>
        </div>
    );
};
export default RadioPlayer;
