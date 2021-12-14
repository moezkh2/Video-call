import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './message.css'
export const Message = ({ msg, sender }) => {
    return (
        <div id='message-box'>
            <FontAwesomeIcon id='icon' size="2x" icon={faUserCircle}></FontAwesomeIcon>
            <h3>{sender}</h3>
            <p>{msg}</p>
        </div>
    )
}
