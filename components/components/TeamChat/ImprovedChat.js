import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faInfoCircle, faSearch, faSun, faMoon, faSmile, faPaperclip, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';
import { Picker } from 'emoji-mart';
import giphy from 'giphy-api';
import { useDropzone } from 'react-dropzone';
import VoiceNote from './VoiceNote';

const ImprovedChat = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceMessage, setVoiceMessage] = useState(null);
  const [color, setColor] = useState('#000000');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, .pdf',
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const newMessages = [...messages, { sender: 'me', file: reader.result }];
          setMessages(newMessages);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  useEffect(() => {
    const newMessages = [
      { sender: 'other', text: 'Hi!' },
      { sender: 'me', text: 'Hello!' },
    ];
    setMessages(newMessages);
  }, []);

  useEffect(() => {
    const typingStatus = false;
    setIsTyping(typingStatus);
  }, []);

  const startVoiceMessage = () => {
    setVoiceMessage('Recording started');
    setTimeout(() => setVoiceMessage('Recording ended'), 5000);
  };

  const stopVoiceMessage = () => {
    setVoiceMessage(null);
  };

  const sendVoiceMessage = (audioData) => {
    const newMessages = [...messages, { sender: 'me', voiceNote: audioData }];
    setMessages(newMessages);
  };

  const playVoiceMessage = (audioData) => {
    const audio = new Audio(audioData);
    audio.play();
  };

  const pauseVoiceMessage = (audioData) => {
    const audio = new Audio(audioData);
    audio.pause();
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const addEmoji = (emoji) => {
    const newMessages = [...messages, { sender: 'me', text: emoji.native }];
    setMessages(newMessages);
    setShowEmojiPicker(false);
  };

  const searchGifs = (query) => {
    giphy.search(query).then((response) => {
      setGifs(response.data);
    });
  };

  return (
    <div className={`chat-container ${darkMode ? 'dark-mode' : ''}`} style={{ backgroundColor: color }}>
      <div className='chat-header'>
        <div className='left-icons'>
          <FontAwesomeIcon icon={faChevronLeft} />
          <div className='user-avatar'>{profiles[0].avatar}</div>
          <div className='user-status'>{profiles[0].status}</div>
        </div>
        <div className='right-icons'>
          <FontAwesomeIcon icon={faInfoCircle} />
          <FontAwesomeIcon icon={faSearch} onClick={() => setSearchQuery('Searching...')} />
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} onClick={() => setDarkMode(!darkMode)} />
        </div>
      </div>
      <div className='chat-body'>
        {searchQuery && <div className='search-query'>{searchQuery}</div>}
        {messages.map((message, index) => (
          <motion.div key={index} className={`message ${message.sender}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {message.text}
            {message.voiceNote && <VoiceNote audioData={message.voiceNote} playVoiceMessage={playVoiceMessage} pauseVoiceMessage={pauseVoiceMessage} />}
            {message.file && <img src={message.file} alt='Uploaded file' />}
          </motion.div>
        ))}
        {isTyping && <div className='typing-indicator'>Typing...</div>}
      </div>
      <div className='chat-footer'>
        <motion.input type='text' placeholder='Type a message...' whileFocus={{ scale: 1.1 }} />
        <div className='emoji-picker' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <FontAwesomeIcon icon={faSmile} />
          {showEmojiPicker && <Picker onSelect={addEmoji} />}
        </div>
        <div {...getRootProps()} className='file-upload'>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faPaperclip} />
        </div>
        {voiceMessage ? (
          <div className='voice-message'>{voiceMessage}</div>
        ) : (
          <FontAwesomeIcon icon={faMicrophone} className='microphone-icon' onClick={startVoiceMessage} />
        )}
      </div>
      <div className='color-picker'>
        <SketchPicker color={color} onChangeComplete={handleColorChange} />
      </div>
    </div>
  );
};

export default ImprovedChat;