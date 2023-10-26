// pages/team-chat.tsx

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import CustomSelect from "@components/CustomSelect/CustomSelect";
import BubblesSpinner from "@components/BubbleSpinner/BubbleSpinner";
// import uuid from "uuid";
import { profiles, frequentlyUsed } from "./profiles";
import TeamCarousel from "@components/TeamCarousel/TeamCarousel";
import HoneycombContainer from "./PhoneChat";

const TeamChat = () => {
    // States
    const [password, setPassword] = useState("");
    const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);

    const profileNameMapping = {
        gruen: "Michael Gruen",
        doug: "Doug Schaer",
        merk: "Michael Daigler",
        brock: "Brock Pierce",
        mooch: "Anthony Scaramucci",
        marc: "Marc Randolph",
        jay: "Jay Abraham",
        jamie: "Jamie McCourt",
        pfeffer: "Dr. Jeffrey Pfeffer",
        gscott: "G. Scott Paterson",
        shmuley: "Shmuley Boteach",
        arben: "Arben Gutierrez-B.",
        shivam: "Shivam Mittal",
        yohei: "Yohei Nakajima",
        shweta: "Shweta Katyal",
        karia: "Karia Samaroo",
        frederic: "Frederic Chesnais",
        dave: "Dave Bialek",
        munam: "Munam Wasi"
    };

    const [isMainContentVisible, setIsMainContentVisible] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [message, setMessage] = useState("");
    const [showAudio, setShowAudio] = useState(false);
    const [textResponse, setTextResponse] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeProfile, setActiveProfile] = useState(null);
    const [showAllProfiles, setShowAllProfiles] = useState(true);
    const [profileRefs, setProfileRefs] = useState({});
    const [chatHistory, setChatHistory] = useState([]);

    const textToSpeech = async (voiceId, inputText) => {
        // Set the API key for ElevenLabs API.
        // Do not use directly. Use environment variables.
        const API_KEY = "438bad5e76e56dcfd9bab8fd6ad2abc3";
        // Set the ID of the voice to be used.

        // Set options for the API request.

        // Send the API request using Axios and wait for the response.
        const speechDetails = await axios.request({
            method: "POST",
            url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            headers: {
                accept: "audio/mpeg", // Set the expected response type to audio/mpeg.
                "content-type": "application/json", // Set the content type to application/json.
                "xi-api-key": `${API_KEY}` // Set the API key in the headers.
            },
            data: {
                text: inputText // Pass in the inputText as the text to be converted to speech.
            },
            responseType: "arraybuffer" // Set the responseType to arraybuffer to receive binary data as response.
        });

        // Return the binary audio data received from the API response.
        return speechDetails.data;
    };
    // ... Additional states for the chat and audio functionalities ...
    const handleSendClick = async () => {
        if (!selectedProfile) {
            alert("Please select a profile first");
            return;
        }
        setIsLoading(true);
        setAudioUrl("");
        setShowAudio(false);
        setTextResponse("");
        const prod_base_url =
            "https://elysium-realchar-production.up.railway.app";
        const local_url = "http://127.0.0.1:5000";

        try {
            // const response = await fetch('/api/ask', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ profile: selectedProfile, message })
            // });
            const request_url = `${prod_base_url}/ask`;
            const response = await fetch(request_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    profile: selectedProfile.id,
                    message
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("API error");
            }

            const data = await response.json();

            // const newChatItem = {
            //     userMessage: message,
            //     profileResponse: data.text_response || ""
            // };
            const newChatEntry = {
                profileId: selectedProfile.id,
                profileName: selectedProfile.name,
                profileImage: selectedProfile.image,
                userMessage: message,
                profileResponse: data.text_response || ""
            };

            setChatHistory([...chatHistory, newChatEntry]);
            console.log("data", data);
            // Display text response in the chat interface
            setTextResponse(data.text_response || "");
            if (data.voice_id) {
                const voiceId = data.voice_id;
                const audio = await textToSpeech(voiceId, data.text_response);
                const blob = new Blob([audio], { type: "audio/mpeg" });
                // Create a URL for the blob object
                const url = URL.createObjectURL(blob);
                // const audioData = new Uint8Array(atob(audio).split("").map(char => char.charCodeAt(0)));
                // const audioBlob = new Blob([audioData], { type: 'audio/ogg' });
                setAudioUrl(url);
                setShowAudio(true);
            }
            // Decode base64 audio and update audio source
            // if (data.data.audio_content) {
            //     const audioData = new Uint8Array(atob(data.data.audio_content).split("").map(char => char.charCodeAt(0)));
            //     const audioBlob = new Blob([audioData], { type: 'audio/ogg' });
            //     setAudioUrl(URL.createObjectURL(audioBlob));
            // }
            console.log("Updated Text Response:", textResponse);
            console.log("Updated Audio URL:", audioUrl);
        } catch (error) {
            console.error(error);
            alert("Error sending message or processing the received response.");
        }
        setIsLoading(false);
    };
    const handleProfileClick = (profile) => {
        console.log("");
        // setChatHistory([]); keep chathistory?
        setAudioUrl(null);
        setActiveProfile(profile);
        setShowAllProfiles(false);
        setSelectedProfile(profile);
    };

    // ... Additional states for the chat and audio functionalities ...

    const handleAudioClose = () => setShowAudio(false);
    const handleOpenAudio = () => setShowAudio(true);

    // Event Handlers
    useEffect(() => {
        const newRefs = Object.keys(profileNameMapping).reduce((acc, key) => {
            acc[key] = React.createRef();
            return acc;
        }, {});
        setProfileRefs(newRefs);
    }, []);

    // ... Additional event handlers for profile selection, sending messages, and audio functionalities ...
    let renderedGroups = new Set();
    const settings = {
        dots: true,
        infinite: false,
        useCSS: true,
        speed: 500,
        width: "800px",
        slidesToShow: 4, // Consider adjusting this number
        slidesToScroll: 1, // Consider adjusting this number,
        rows: 1 // Make sure this is set to 1 to ensure only one row
    };

    const downloadChatHistory = () => {
        const text = generateChatHistoryText();
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ChatHistory.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const generateChatHistoryText = () => {
        let text = "Chat History\n\n";
        let prevProfileId = null;

        chatHistory.forEach((chat, index) => {
            if (prevProfileId !== chat.profileName) {
                text += `--- Switched to team member ${chat.profileName} ---\n`;
                prevProfileId = chat.profileId;
            }
            text += `${chat.profileName}: ${chat.userMessage}\n`;
            text += `You: ${chat.profileResponse}\n\n`;
        });

        return text;
    };

    const [selectedOption, setSelectedOption] = useState({ name: "Select" });
    function shuffleArray(array) {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i]
            ];
        }
        return shuffledArray;
    }
    const [randomProfiles, setRandomProfiles] = useState([]);
    useEffect(() => {
        const shuffledArray = shuffleArray(frequentlyUsed);
        setRandomProfiles(shuffledArray.slice(0, 3));
    }, []);

    const handleSelectChange = (option) => {
        setSelectedOption(option);
        if (onProfileSelect) {
            onProfileSelect(option);
        }
    };
    const [displayedText, setDisplayedText] = useState("");
    const [currentChatIndex, setCurrentChatIndex] = useState(null);
    const typeWriter = (text, index) => {
        if (index < text.length) {
            setDisplayedText((prev) => prev + text[index]);
            setTimeout(() => typeWriter(text, index + 1), 30); // Adjust speed here
        }
    };
    useEffect(() => {
        const latestChatIndex = chatHistory.length - 1;
        if (currentChatIndex !== latestChatIndex) {
            setCurrentChatIndex(latestChatIndex);
            setDisplayedText("");
            typeWriter(chatHistory[latestChatIndex]?.profileResponse || "", 0);
        }
    }, [chatHistory]);

    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col w-full mb-2">
                    {/* <p className="font-semibold text-center">Frequently used</p>
                    <div className="flex flex-row w-1/2 mx-auto space-x-2 text-center">
                        {randomProfiles.map((f, i) => (
                            <div
                                key={`${f.id}-${i}`}
                                className="flex flex-col bg-white rounded w-full p-2 h-full shadow-md hover:cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
                                onClick={() => handleProfileClick(f)}
                            >
                                <div className="relative w-12 h-12 border-2 border-gray-300 rounded-full mx-auto overflow-hidden">
                                    <Image
                                        id={f.id}
                                        src={f.image}
                                        alt={f.name}
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </div>
                                <p className="m-0">{f.name}</p>
                                <p className="m-0">{f.group}</p>
                            </div>
                        ))}
                    </div> */}

                    <TeamCarousel
                        handleProfileClick={(p) => handleProfileClick(p)}
                    />
                    <HoneycombContainer profiles={profiles} />
                </div>
            </div>
            <div className="teamchat-container">
                <div className="flex flex-col justify-center">
                    <p className="w-1/2 mx-auto text-center font-semibold">
                        {selectedProfile
                            ? `Chat with: ${selectedProfile.name}`
                            : "Chat with our team"}
                    </p>
                    <CustomSelect
                        options={profiles}
                        onSelect={(option) => handleProfileClick(option)}
                        selectedProfile={selectedProfile}
                    />
                </div>

                <div className="chatHistory">
                    {chatHistory.map((chat, index, arr) => {
                        console.log("Chathistory", chatHistory);

                        return (
                            <>
                                {index === 0 ||
                                chat.profileId !== arr[index - 1].profileId ? (
                                    <div className="profileSwitchIndicator">
                                        From {chat.profileName}
                                    </div>
                                ) : null}

                                <div className="flex flex-row justify-end">
                                    <div className="userMessage">
                                        {chat.userMessage}
                                    </div>
                                    <div className="relative w-12 h-12 border-2 border-gray-300 rounded-full ml-2 bg-green-400 overflow-hidden"></div>
                                </div>
                                <div className="flex flex-row justify-start">
                                    <div className="relative w-12 h-12 border-2 border-gray-300 rounded-full ml-2 overflow-hidden">
                                        {selectedProfile && (
                                            <Image
                                                src={chat.profileImage}
                                                alt={""}
                                                objectFit="cover"
                                                layout="fill"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>

                                    <div className="profileResponse">
                                        {chat.profileResponse}
                                    </div>
                                </div>
                                {isLoading &&
                                    index === chatHistory.length - 1 && (
                                        <BubblesSpinner />
                                    )}

                                {audioUrl && <audio src={audioUrl} autoPlay />}
                            </>
                        );
                    })}
                </div>

                <div className="chatbox">
                    <div className="flex flex-col items-center gap-4 w-full">
                        <textarea
                            id="chat-box"
                            className="flex-grow h-16 w-4/5 mx-4 rounded px-3 py-1 bg-gray-200 text-black rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                            placeholder="Send a message to the selected executive..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div className="flex flex-row w-4/5 justify-between">
                            <button
                                onClick={downloadChatHistory}
                                className="bg-gray-500 text-white h-12  px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 active:bg-gray-700"
                            >
                                Download Chat History
                            </button>
                            <button
                                disabled={isLoading}
                                id="send-button"
                                className="bg-green-500 text-white h-12 px-6 py-2 rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 "
                                onClick={handleSendClick}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamChat;
