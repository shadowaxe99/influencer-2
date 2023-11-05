import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperclip, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const PhoneChatFinal = () => {
    // States for managing chat features
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [voiceMessage, setVoiceMessage] = useState(null);

    // Simulating real-time message syncing by updating local state
    useEffect(() => {
        const newMessages = [
            { sender: "other", text: "Hi!" },
            { sender: "me", text: "Hello!" },
        ];
        setMessages(newMessages);
    }, []);

    // Simulating real-time typing status by updating local state
    useEffect(() => {
        const typingStatus = false;
        setIsTyping(typingStatus);
    }, []);

    // Simulating voice message recording by updating local state
    const startVoiceMessage = () => {
        setVoiceMessage("Recording started");
        setTimeout(() => setVoiceMessage("Recording ended"), 5000);
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>{message.text}</div>
                ))}
                {isTyping && <div className="typing-indicator">Typing...</div>}
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Type a message..." />
                <div className="emoji-picker">
                    <FontAwesomeIcon icon={faSmile} />
                </div>
                <FontAwesomeIcon icon={faPaperclip} />
                {voiceMessage ? (
                    <div className="voice-message">{voiceMessage}</div>
                ) : (
                    <FontAwesomeIcon icon={faMicrophone} className="microphone-icon" onClick={startVoiceMessage} />
                )}
            </div>
        </div>
    );
};

export default PhoneChatFinal;