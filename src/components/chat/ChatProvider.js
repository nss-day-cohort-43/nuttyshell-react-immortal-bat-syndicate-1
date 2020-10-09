import React, { useState, createContext } from "react"

export const ChatContext = createContext()

export const ChatProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/messages")
        .then(res => res.json())
        .then(setMessages)
    }
}