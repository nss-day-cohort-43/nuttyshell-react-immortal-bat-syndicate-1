import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Form } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatForm = (props) => {
    const { addMessage, getMessageById, updateMessage } = useContext(ChatContext)

    const [message, setMessage] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { messageId } = useParams()
    const history = useHistory()

    const handleInputChange = (evt) => {
        const newMessage = { ...message }
        newMessage[evt.target.name] = evt.target.value
        setMessage(newMessage)
    }

    useEffect(() => {
        if (messageId) {
            getMessageById(messageId)
                .then(message => {
                    setMessage(message)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructNewMessage = () => {
        setIsLoading(true)

        if (messageId) {
            updateMessage({
                userId: parseInt(localStorage.getItem("nutty_customer")),
                message: message.content,
                date: "edited: " + new Date().toLocaleString("en-US")
            })
                .then(() => history.push(`/messages`))
        } else {
            addMessage({
                userId: parseInt(localStorage.getItem("nutty_customer")),
                message: message.content,
                date: new Date().toLocaleString("en-US")
            })
                .then(() => history.push("/messages"))
        }
    }

    return (
        <>
            <Container>
                <Form className="messageForm" onSubmit={evt => {
                    evt.preventDefault()
                    constructNewMessage()
                }}>
                    <h2 className="messageForm--title">New Message</h2>

                    <Form.Input
                        required
                        placeholder='Send a message..'
                        id='messageContent'
                        name='content'
                        onChange={handleInputChange}
                        defaultValue={message.message}
                    />

                    <Button type="submit" primary compact required
                        className="btn btn-primary"
                        disabled={isLoading}>
                        {messageId ? <>Edit</> : <>Send</>}
                    </Button>
                </Form >
            </Container>
        </>
    )
}