
import React, { useState } from 'react';
import './FakeAIButlerChat.css'; // Make sure to create appropriate CSS for styling

const FakeAIButlerChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Simulate AI response
  const getAIResponse = (input) => {
    if (input.toLowerCase().includes('hello')) {
      return "Hello there! I'm your digital butler. How can I assist you today?";
    } else if (input.toLowerCase().includes('portfolio')) {
      return "I'm optimizing your portfolio. Would you like to see the latest stats?";
    } else {
      return "I'm sorry, I didn't catch that. Could you please rephrase?";
    }
  };

  const handleSend = () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput) {
      // Add user message to chat
      setMessages([...messages, { from: 'user', text: trimmedInput }]);
      // Generate AI response
      const aiResponse = getAIResponse(trimmedInput);
      // Add AI response to chat
      setMessages((prevMessages) => [...prevMessages, { from: 'ai', text: aiResponse }]);
      // Reset input field
      setUserInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={\`message \${message.from}\`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default FakeAIButlerChat;
