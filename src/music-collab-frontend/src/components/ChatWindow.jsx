import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ project, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock chat data - in real app, this would connect to a real-time chat service
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        user: 'Alice',
        principal: 'abc123...',
        message: 'Hey everyone! Ready to work on the chorus?',
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: 2,
        user: 'Bob',
        principal: 'def456...',
        message: 'Sounds good! I have some ideas for the harmony',
        timestamp: new Date(Date.now() - 240000).toISOString()
      },
      {
        id: 3,
        user: user?.principal?.slice(0, 8) || 'You',
        principal: user?.principal || 'current',
        message: 'Just joined the session!',
        timestamp: new Date().toISOString()
      }
    ];
    setMessages(mockMessages);
  }, [user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: user?.principal?.slice(0, 8) || 'You',
        principal: user?.principal || 'current',
        message: newMessage.trim(),
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>💬 Team Chat</h3>
        <span className="chat-info">Project: {project.title}</span>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.principal === user?.principal ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span className="message-user">{message.user}</span>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-content">{message.message}</div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
          📤
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
