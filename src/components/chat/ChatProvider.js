import React, { useState, createContext } from "react"

export const ChatContext = createContext()

export const ChatProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
            .then(res => res.json())
            .then(setMessages)
    }

    const addMessage = messageObj => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
            .then(getMessages)
    }

    return (
        <ChatContext.Provider value={{
            messages, getMessages, addMessage
        }}>
            {props.children}
        </ChatContext.Provider>
    )
}