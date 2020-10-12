import React, { useContext, useRef, useEffect, useState } from "react"
import { ChatContext } from "./ChatProvider"
import { useHistory } from "react-router-dom"
import { Button, Form, MessageContent, TextArea } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatForm = (props) => {
    const { addMessage } = useContext(ChatContext)

    const content = useRef(null)

    useEffect(() => {
    }, [])

    const constructNewMessage = () => {
        addMessage({
            message: content.current.value,
            date: new Date().toLocaleString("en-US")
        })
            .then(() => history.push("/messages"))
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        constructNewMessage()
    }

    const history = useHistory()

    return (
        <Form className="messageForm" onSubmit={handleSubmit}>
            <h2 className="messageForm--title">New Message</h2>

            <Form.TextArea placeholder='Send a message..' />

            <Button type="submit" primary compact required className="btn btn-primary">
                Send
            </Button>
        </Form >
    )
}