import React, { useState } from 'react'
import './chat-form.css'
import { } from '@fortawesome/free-solid-svg-icons'
const ChatForm = () => {
    const [newMsg, setNewMsg] = useState({ sneder: 'me', msg: '' })
    const handelMsg = (e) => {
        setNewMsg({ ...newMsg, msg: e.target.value })
    }
    return (
        <div id='chat-form'>
            <input type='text' onChange={handelMsg}></input>
            <button id='send'>send</button>
        </div>
    )
}

export default ChatForm
