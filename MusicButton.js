import { Button } from "@mui/material";
import { useContext, useState } from "react";
// import musicOn from "../assets/images/components/musicOn.png";
// import musicOff from "../assets/images/components/musicOff.png";
// import music from "../assets/audio/scapeMain.mp3";
import { ConfigContext, configType } from "./Configuration";

const MusicButton = () => {
    const config = useContext(ConfigContext);
    const [audio] = useState(new Audio(music));
    const [init, setInit] = useState(true);

    const handleClick = () => {
        const oldCommand = config.unmuted;
        const newCommand = !oldCommand;
        if (newCommand) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
        config.updateUnmuted();
    };

    ["click", "keydown"].forEach((type) => {
        window.addEventListener(type, (e) => {
            const target = e.target;
            init &&
                config.unmuted &&
                target?.id !== "music-button" &&
                audio.play();
            setInit(false);
        });
    });

    const musicButtonStyle = {
        minWidth: 36,
        maxWidth: 36,
        height: 36,
        backgroundImage: `url(${config.unmuted ? musicOn : musicOff})`,
        display: "flex"
    };

    return (
        <Button sx={musicButtonStyle} onClick={handleClick} id="music-button" />
    );
};

export default MusicButton;
