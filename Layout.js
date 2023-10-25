import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import Preloader from "@components/Preloader/Preloader";
import { useState, useEffect } from "react";
import useCharacterStore from "../../store/charStore"; // Import Zustand store
import { preloader } from "@components/Preloader/utils";
import { useRouter } from "next/router";

export const Layout = ({ children, className = "", toggleSidebar }) => {
    const [showPreloader, setShowPreloader] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const { characters, selectedCharacter, setSelectedCharacter } =
        useCharacterStore();
    const router = useRouter();
    const handleCharacterClick = (index) => {
        setSelectedCharacter(characters[index]);

        // if (!isMobile) {
        //     let preloader = document.getElementById("preloader");
        //     if (preloader && preloader.parentNode) {
        //         preloader.parentNode.removeChild(preloader);
        //     }
        // }
        // document.querySelector("body").classList.add("opened");
        setShowPreloader(false);
        router.push("/playground");
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
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // useEffect(() => {
    //     if (!isMobile) preloader();
    // }, [setIsMobile]);
    return (
        <main
            className={`main relative overflow-hidden ${
                className && className
            }`}
        >
            <Header toggleSidebar={toggleSidebar} />

            {children}
            <Footer />
        </main>
    );
};
