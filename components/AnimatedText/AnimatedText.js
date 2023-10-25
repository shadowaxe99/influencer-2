import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const AnimatedTextWord = ({ text }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "5px" }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export const AnimatedTextCharacter = ({ text }) => {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export const AnimatedTextListCharacter = ({ textList }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const currentText = textList[currentTextIndex];
    const letters = Array.from(currentText);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03 }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex(
                (prevIndex) => (prevIndex + 1) % textList.length
            );
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [textList]);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 0);

        return () => clearTimeout(timer);
    }, [currentTextIndex]);

    return (
        <motion.div
            key={currentText} // Force re-render by using a unique key
            style={{
                overflow: "hidden",
                display: "flex",
                fontSize: "2rem",
                textAlign: "center",
                justifyContent: "center",
                verticalAlign: "center",
                width: "100%"
            }}
            variants={container}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};
