import React, { useEffect, useState } from "react";
// import defaultBackground from "../assets/images/backgrounds/default.jpg";

export const ConfigContext = React.createContext({});
// export interface configType {
//     background: string;
//     updateBackground: (increment: boolean) => void;
//     unmuted: boolean;
//     updateUnmuted: () => void;
//     rememberUsername: boolean;
//     updateRememberUsername: (remember: boolean) => void;
//     hideUsername: boolean;
//     updateHideUsername: (hide: boolean) => void;
//     lastUsername: string;
//     updateLastUsername: (username: string) => void;
//     scale: string;
//     updateScale: (scale: string) => void;
//     hideBackgroundSelect: boolean;
//     updateHideBackgroundSelect: (hide: boolean) => void;
//     hideSessionSelect: boolean;
//     updateHideSessionSelect: (hide: boolean) => void;
//     valuesChanged: (
//         remember: boolean,
//         hide: boolean,
//         username: string
//     ) => boolean;
// }

const Configuration = ({ children }) => {
    const importAll = (r) => {
        return r.keys().map(r);
    };
    // const backgrounds = importAll(
    //     require.context("../public/head.jpeg", false, /\.(png|jpe?g|svg)$/)
    // );

    // const preloadImages = () => {
    //     Object.values(backgrounds).forEach((image) => {
    //         const img = new Image();
    //         img.src = typeof image === "string" ? image : image.default;
    //     });
    // };

    const initialBackground = "defaultBackground";
    let updateBackground = (_) => {};
    const initialUnmuted = "true";
    let updateUnmuted = () => {};
    const initialRememberUsername = "true";
    let updateRememberUsername = (_) => {};
    const initialHideUsername = "true";
    let updateHideUsername = (_) => {};
    const initialLastUsername = "";
    let updateLastUsername = (_) => {};
    const initialScale = "1.0";
    let updateScale = (_) => {};
    const initialHideBackgroundSelect = "true";
    let updateHideBackgroundSelect = (_) => {};
    const initialHideSessionSelect = "true";
    let updateHideSessionSelect = (_) => {};
    let valuesChanged = (_0, _1, _2) => false;

    const [initialValues] = useState({
        background: initialBackground,
        unmuted: initialUnmuted,
        rememberUsername: initialRememberUsername,
        hideUsername: initialHideUsername,
        lastUsername: initialLastUsername,
        scale: initialScale,
        hideBackgroundSelect: initialHideBackgroundSelect,
        hideSessionSelect: initialHideSessionSelect
    });

    const [config, setConfig] = useState({
        background: initialBackground,
        updateBackground: updateBackground,
        unmuted: initialUnmuted,
        updateUnmuted: updateUnmuted,
        rememberUsername: initialRememberUsername,
        updateRememberUsername: updateRememberUsername,
        hideUsername: initialHideUsername,
        updateHideUsername: updateHideUsername,
        lastUsername: initialLastUsername,
        updateLastUsername: updateLastUsername,
        scale: initialScale,
        updateScale: updateScale,
        hideBackgroundSelect: initialHideBackgroundSelect,
        updateHideBackgroundSelect: updateHideBackgroundSelect,
        hideSessionSelect: initialHideSessionSelect,
        updateHideSessionSelect: updateHideSessionSelect,
        valuesChanged: valuesChanged
    });

    valuesChanged = (remember, hide, username) => {
        return (
            config.background !== initialValues.background ||
            config.unmuted !== initialValues.unmuted ||
            remember !== initialValues.rememberUsername ||
            hide !== initialValues.hideUsername ||
            (remember && username !== initialValues.lastUsername) ||
            config.scale !== initialValues.scale ||
            config.hideBackgroundSelect !==
                initialValues.hideBackgroundSelect ||
            config.hideSessionSelect !== initialValues.hideSessionSelect
        );
    };

    const [update, setUpdate] = useState(false);

    updateBackground = (increment) => {
        const index = backgrounds.indexOf(config.background);
        const newIndex = increment
            ? (index + 1) % backgrounds.length
            : (index - 1) % backgrounds.length < 0
            ? backgrounds.length - 1
            : (index - 1) % backgrounds.length;
        const newBackground = backgrounds[newIndex];
        localStorage.setItem("background", newBackground);
        setConfig({ ...config, background: newBackground });
        setUpdate(true);
    };

    updateUnmuted = () => {
        const next = !config.unmuted;
        localStorage.setItem("unmuted", next.toString());
        setConfig({ ...config, unmuted: next });
        setUpdate(true);
    };

    updateRememberUsername = (remember) => {
        localStorage.setItem("rememberUsername", remember.toString());
        setConfig({ ...config, rememberUsername: remember });
        setUpdate(true);
    };

    updateHideUsername = (hide) => {
        localStorage.setItem("hideUsername", hide.toString());
        setConfig({ ...config, hideUsername: hide });
        setUpdate(true);
    };

    updateLastUsername = (username) => {
        localStorage.setItem("lastUsername", username);
        setConfig({ ...config, lastUsername: username });
        setUpdate(true);
    };

    updateScale = (scale) => {
        localStorage.setItem("scale", scale);
        setConfig({ ...config, scale: scale });
        console.log(`updated scale to ${scale}`);
        setUpdate(true);
    };

    updateHideBackgroundSelect = (hide) => {
        localStorage.setItem("hideBackgroundSelect", hide.toString());
        setConfig({ ...config, hideBackgroundSelect: hide });
        setUpdate(true);
    };

    updateHideSessionSelect = (hide) => {
        localStorage.setItem("hideSessionSelect", hide.toString());
        setConfig({ ...config, hideSessionSelect: hide });
        setUpdate(true);
    };

    useEffect(() => {
        if (update) {
            setConfig({
                ...config,
                updateBackground: updateBackground,
                updateUnmuted: updateUnmuted,
                updateRememberUsername: updateRememberUsername,
                updateHideUsername: updateHideUsername,
                updateLastUsername: updateLastUsername,
                updateScale: updateScale,
                updateHideBackgroundSelect: updateHideBackgroundSelect,
                updateHideSessionSelect: updateHideSessionSelect,
                valuesChanged: valuesChanged
            });
            setUpdate(false);
        }
    }, [config, update]);

    useEffect(() => {
        // preloadImages();
        setConfig({
            ...config,
            updateBackground: updateBackground,
            updateUnmuted: updateUnmuted,
            updateRememberUsername: updateRememberUsername,
            updateHideUsername: updateHideUsername,
            updateLastUsername: updateLastUsername,
            updateScale: updateScale,
            updateHideBackgroundSelect: updateHideBackgroundSelect,
            updateHideSessionSelect: updateHideSessionSelect,
            valuesChanged: valuesChanged
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export default Configuration;
