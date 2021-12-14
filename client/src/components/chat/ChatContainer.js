import React from 'react'
import './chatContainer.css'
const ChatContainer = ({ children }) => {
    return (
        <div id='chat-container'>
            {children}
        </div>
    )
}
export default ChatContainer
