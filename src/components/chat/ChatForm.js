import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Form } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatForm = (props) => {
    const { addMessage } = useContext(ChatContext)

    const [message, setMessage] = useState({})

    useEffect(() => {
    }, [])

    const constructNewMessage = () => {
        addMessage({
            sendingUserId: parseInt(localStorage.getItem("nutty_customer")),
            message: message.content,
            date: new Date().toLocaleString("en-US")
        })
            .then(() => history.push("/messages"))
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        constructNewMessage()
    }

    const handleInputChange = (evt) => {
        const newMessage = { ...message }
        newMessage[evt.target.name] = evt.target.value
        setMessage(newMessage)
    }

    const history = useHistory()

    return (
        <>
            <Form className="messageForm" onSubmit={handleSubmit}>
                <h2 className="messageForm--title">New Message</h2>

                <Form.Input
                    required
                    placeholder='Send a message..'
                    id='messageContent'
                    name='content'
                    onChange={handleInputChange}
                />

                <Button type="submit" primary compact required className="btn btn-primary">
                    Send
            </Button>
            </Form >
        </>
    )
}