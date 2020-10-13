import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Icon, Form } from "semantic-ui-react"

export const ChatForm = (props) => {
    const { addMessage, getMessageById, editMessage } = useContext(ChatContext)

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
            editMessage({
                id: messageId,
                userId: parseInt(localStorage.getItem("nutty_user")),
                message: message.content,
                date: "edited: " + new Date().toLocaleString("en-US")
            })
                .then(() => history.push("/messages"))
        } else {
            addMessage({
                userId: parseInt(localStorage.getItem("nutty_user")),
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
                    <h2 className="messageForm--title">
                        {messageId ? "Edit Message" : "New Message"}
                    </h2>

                    <Form.Input
                        required
                        placeholder='Send a message..'
                        id='messageContent'
                        name='content'
                        onChange={handleInputChange}
                        defaultValue={message.message}
                    />

                    <Button type="button" icon onClick={
                        () => history.push('/messages')
                    }>
                        <Icon name="cancel" />
                    </Button>

                    <Button type="submit" primary icon required
                        className="btn btn-primary"
                        disabled={isLoading}>
                        {messageId ? <Icon name="edit" /> : <Icon name="send" />}
                    </Button>
                </Form >
            </Container>
        </>
    )
}