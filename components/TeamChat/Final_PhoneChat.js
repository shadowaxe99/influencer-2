
// Importing React and additional components for enhanced features
import React, { useEffect, useState } from "react";
import { profiles } from "./profiles";  // Importing the original profiles from profiles.js

// FontAwesome icons for a richer UI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faInfoCircle,
  faMicrophone,
  faMoon,
  faSun,
  faSearch,
  faSmile,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";

// The Main Enhanced Chat Component
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
    <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="chat-header">
        <div className="left-icons">
          <FontAwesomeIcon icon={faChevronLeft} />
          <div className="user-avatar">{profiles[0].avatar}</div>
          <div className="user-status">{profiles[0].status}</div>
        </div>
        <div className="right-icons">
          <FontAwesomeIcon icon={faInfoCircle} />
          <FontAwesomeIcon icon={faSearch} onClick={() => setSearchQuery("Searching...")} />
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} onClick={() => setDarkMode(!darkMode)} />
        </div>
      </div>
      <div className="chat-body">
        {searchQuery && <div className="search-query">{searchQuery}</div>}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
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
