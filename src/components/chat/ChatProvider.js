import React, { useState, createContext } from "react"
import "./Chat.css"

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
    }

    const editMessage = messageObj => {
        return fetch(`http://localhost:8088/messages/${messageObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
            .then(getMessages)
    }

    const deleteMessage = messageId => {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "DELETE"
        })
            .then(getMessages)
    }

    const getMessageById = id => {
        return fetch(`http://localhost:8088/messages/${id}`)
            .then(res => res.json())
    }

    return (
        <ChatContext.Provider value={{
            messages, getMessages, addMessage, editMessage, deleteMessage, getMessageById
        }}>
            {props.children}
        </ChatContext.Provider>
    )
}