
import React, { useEffect } from "react";

const SpecialEffects = ({ score }) => {
    useEffect(() => {
        if (score >= 100) {
            const audio = new Audio("/path/to/celebration_sound.mp3");
            audio.play();
        }
    }, [score]);
    
    return (
        <div className="special-effects-overlay">
            {score >= 100 && <h2>You're Crushing It!</h2>}
        </div>
    );
};
export default SpecialEffects;
