import React, { useEffect, useState } from "react";
import { profiles, frequentlyUsed } from "./profiles";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faChevronLeft,
    faInfoCircle,
    faDownload
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BubblesSpinner from "@components/BubbleSpinner/BubbleSpinner";

const UserInfoTooltip = ({ info }) => {
    return (
        <div className="absolute z-50 left-0 top-24 ml-48 mt-2 w-4/5 p-4 bg-gray-800 text-white rounded-lg shadow-lg w-80">
            <div className=" items-center mb-2 w-full">
                <ul className="w-full">
                    <li>{info.name}</li>
                    <li> {info.description} </li>
                </ul>
            </div>
        </div>
    );
};

const DownloadTooltip = () => {
    return (
        <div className="absolute z-50 right-6 top-24 ml-48 mt-2 w-4/5 p-4 bg-gray-800 text-white rounded-lg shadow-lg w-80">
            <div className=" items-center mb-2 w-full">
                <ul className="w-full">
                    <p>Download conversation history </p>
                </ul>
            </div>
        </div>
    );
};

const ChatPage = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState(
        profiles.reduce((acc, profile) => ({ ...acc, [profile.id]: [] }), {})
    );
    const [currentMessage, setCurrentMessage] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [showAudio, setShowAudio] = useState(false);
    const [showToolTipInfo, setShowToolTipInfo] = useState(null);
    const [showDownloadToolTip, setShowDownloadTooltip] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleContactClick = (member) => {
        console.log("CHOOSING MEMBER", member);
        setSelectedContact(member);
        const noMessagesYet =
            !messages[member.id] || messages[member.id].length === 0;

        if (member.canChat && noMessagesYet) {
            // Add a greeting message from the profile
            setIsLoading(true);
            const greetingMessage = {
                id: Date.now(),
                type: "profile", // profile message
                content: `Hey there! I'm ${member.name}, how can I assist you today?`, // Your greeting message here
                imagePath: member.image
            };
            setTimeout(() => {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [member.id]: [greetingMessage]
                }));
                setIsLoading(false);
            }, 2000);
        }
    };
    const handleBackToContacts = () => {
        setSelectedContact(null);
        setAudioUrl(null);
        setShowAudio(false);
        setCurrentMessage("");
    };

    const downloadChatHistory = () => {
        if (!selectedContact || !messages[selectedContact.id]) {
            alert("No chat history available for the selected contact.");
            return;
        }

        const chatHistory = messages[selectedContact.id];

        let text = `Chat History with ${selectedContact.name}\n\n`;

        chatHistory.forEach((chatEntry) => {
            if (chatEntry.type === "user") {
                text += `You: ${chatEntry.content}\n`;
            } else if (chatEntry.type === "profile") {
                text += `${selectedContact.name}: ${chatEntry.content}\n`;
            }
        });

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedContact.name}_chat_history.txt`;
        a.click();

        URL.revokeObjectURL(url);
    };

    const textToSpeech = async (voiceId, inputText) => {
        const API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
        try {
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

            return speechDetails.data;
        } catch (error) {
            console.log("elevenlabs error", error);
        }
    };

    const handleSendMessage = async () => {
        setCurrentMessage("");
        setAudioUrl(null);
        setShowAudio(false);
        setIsLoading(true);

        const imessage_audio = new Audio("/sounds/imessage-sound.mp3");
        setTimeout(() => {
            imessage_audio.play();
        }, 50);

        const userMessageEntry = {
            id: Date.now(), // unique identifier, can be generated differently
            type: "user", // user message
            content: currentMessage,
            imagePath: "/path/to/user/image.jpg"
        };
        setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedContact.id]: [
                ...(prevMessages[selectedContact.id] || []),
                userMessageEntry
            ]
        }));

        const prod_base_url =
            "https://elysium-realchar-production.up.railway.app";
        const local_url = "http://127.0.0.1:5000";

        try {
            const request_url = `${prod_base_url}/ask`;
            console.log(selectedContact);
            const response = await fetch(request_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    profile: selectedContact.id,
                    message: currentMessage
                })
            });
            console.log("response", response);
            if (!response.ok) {
                throw new Error("API error");
            }

            const data = await response.json();

            const profileResponseEntry = {
                id: Date.now() + 1, // unique identifier, can be generated differently
                type: "profile", // profile response
                content: data.text_response, // Replace with actual response,
                imagePath: selectedContact.image
            };

            setMessages((prevMessages) => ({
                ...prevMessages,
                [selectedContact.id]: [
                    ...(prevMessages[selectedContact.id] || []),

                    profileResponseEntry
                ]
            }));

            console.log("data", data);
            console.log("messsages", messages);
            // Display text response in the chat interface
            // setTextResponse(data.text_response || "");
            if (data.voice_id) {
                const voiceId = data.voice_id;
                console.log("voiceid", voiceId);
                const audio = await textToSpeech(voiceId, data.text_response);
                const blob = new Blob([audio], { type: "audio/mpeg" });
                const url = URL.createObjectURL(blob);
                console.log("url", url);
                setAudioUrl(url);
                setShowAudio(true);
            }
        } catch (error) {
            console.error("error", error);
            alert("Error sending message or processing the received response.");
        }
        setIsLoading(false);

        // *****
    };

    return (
        <div className="relative flex flex-col h-screen">
            {/* Contact List */}

            <div
                className={`relative w-full md:w-1/3 h-5/6 md:inset-6 mx-auto rounded-3xl border-4 border-gray-500 overflow-hidden shadow-xl drop-shadow-md`}
            >
                <div className="border-t-sm bg-gray-300 sticky top-0 h-38 ">
                    <p className="text-md font-semibold text-center p-4">
                        Team chat 🤖
                    </p>

                    <div className="flex w-full mt-1 overflow-x-auto no-scrollbar border-t-2 border-b-2 border-gray-400 pt-8">
                        <p className="absolute top-16 left-2 font-semibold">
                            Favorites ⭐️
                        </p>
                        {frequentlyUsed.map((profile, i) => (
                            <div
                                key={i}
                                className="flex-none flex flex-col items-center w-24 mx-2 h-full hover:bg-gray-300 hover:cursor-pointer rounded p-1" // Setting a fixed width using w-36
                                onClick={() => handleContactClick(profile)}
                            >
                                <div className="relative w-12 h-12 border-2 border-gray-100 rounded-full  overflow-hidden">
                                    <Image
                                        id={profile.id}
                                        src={profile.image}
                                        alt={profile.name}
                                        objectFit="cover"
                                        layout="fill"
                                        loading="lazy"
                                    />
                                </div>
                                <div className=" text-center  mt-2">
                                    <p className="text-sm">{profile.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ul className="overflow-y-scroll h-4/5">
                    {profiles.map((member) => (
                        <li
                            key={member.id}
                            className="p-4 hover:bg-gray-300 cursor-pointer"
                            onClick={() => handleContactClick(member)}
                        >
                            <div className="flex items-center">
                                <div className="relative w-12 h-12 border-2 border-gray-500 rounded-full  overflow-hidden">
                                    <Image
                                        id={member.id}
                                        src={member.image}
                                        alt={member.name}
                                        objectFit="cover"
                                        layout="fill"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="ml-4">
                                    <p>{member.name}</p>
                                    <small>{member.role}</small>
                                    <small>{member.title}</small>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Chat Screen */}
                <div
                    className={`absolute top-0 bottom-0 bg-white w-full transition-all duration-500 ${
                        selectedContact ? "left-0" : "left-full"
                    }`}
                >
                    {selectedContact && (
                        <>
                            <button
                                onClick={handleBackToContacts}
                                className="top-4 left-4 absolute h-4 w-4"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button
                                className="absolute right-4 top-4 h-6 w-6"
                                onClick={downloadChatHistory}
                                onMouseEnter={() =>
                                    setShowDownloadTooltip(true)
                                }
                                onMouseLeave={() =>
                                    setShowDownloadTooltip(false)
                                }
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </button>
                            {showDownloadToolTip && <DownloadTooltip />}

                            <div>
                                <div className="p-4 border-b flex flex-col items-center">
                                    <div className="flex flex-row ml-8 space-x-4">
                                        <div className="relative w-12 h-12 border-2 border-gray-500 rounded-full  overflow-hidden">
                                            <Image
                                                id={selectedContact.id}
                                                src={selectedContact.image}
                                                alt={selectedContact.name}
                                                objectFit="cover"
                                                layout="fill"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div
                                            className="h-4 w-4"
                                            onMouseEnter={() =>
                                                setShowToolTipInfo(true)
                                            }
                                            onMouseLeave={() =>
                                                setShowToolTipInfo(false)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="mt-3"
                                                size="1x"
                                            />
                                        </div>
                                        {showToolTipInfo && selectedContact && (
                                            <UserInfoTooltip
                                                info={selectedContact}
                                            />
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <p>{selectedContact.name}</p>
                                        <span className="flex flex-col">
                                            <p className="text-sm font-semibold pt-1">
                                                {selectedContact.group}{" "}
                                            </p>
                                            <small>
                                                {selectedContact.title}
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 max-h-96 h-96 overflow-y-scroll">
                                {selectedContact.canChat ? (
                                    messages[selectedContact.id]?.map(
                                        (chatEntry, index) => (
                                            <>
                                                {chatEntry.type === "user" ? (
                                                    <div
                                                        key={index}
                                                        className={`flex flex-row mt-4 justify-end
                                                       `}
                                                    >
                                                        <p
                                                            className={`bg-green-300 w-2/3 mb-2 mt-2 p-2 rounded`}
                                                        >
                                                            {chatEntry.content}
                                                        </p>
                                                        <div className="relative w-12 h-12 border-2 border-gray-300 rounded-full ml-2 bg-green-400 overflow-hidden"></div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={index}
                                                        className={`flex flex-row mt-4 justify-start
                                                       `}
                                                    >
                                                        <Image
                                                            src={
                                                                chatEntry.imagePath
                                                            }
                                                            width={24}
                                                            height={24}
                                                            className="w-6 h-6 rounded-full mr-2"
                                                            loading="lazy"
                                                        />
                                                        <p
                                                            className={`bg-blue-300 w-2/3 mb-2 mt-2 p-2 rounded`}
                                                        >
                                                            {chatEntry.content}
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )
                                    )
                                ) : (
                                    <div className="h-1/2 w-3/4 mx-auto">
                                        This person has not been cloned yet...
                                    </div>
                                )}

                                {isLoading && <BubblesSpinner />}
                                {audioUrl && <audio src={audioUrl} autoPlay />}
                            </div>
                            <div className="p-4 border-t flex justify-between items-center">
                                {selectedContact.canChat && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={currentMessage}
                                            onChange={(e) =>
                                                setCurrentMessage(
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded w-3/4 p-2"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-blue-500 text-white rounded p-2 ml-2"
                                        >
                                            Send
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
