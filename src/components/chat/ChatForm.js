import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import { FriendContext } from "../friend/FriendProvider"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Header, Icon, Form } from "semantic-ui-react"

export const ChatForm = (props) => {
    const { addMessage, getMessageById, editMessage, findUserById, findUserByName } = useContext(ChatContext)
    const { users, getUsers } = useContext(UserContext)
    const { friends, getFriends } = useContext(FriendContext)

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
                userId: parseInt(localStorage.getItem("nutty_customer")),
                message: message.content,
                date: "edited: " + new Date().toLocaleString("en-US")
            })
                .then(() => history.push("/messages"))
        } else {
            addMessage({
                userId: parseInt(localStorage.getItem("nutty_customer")),
                message: message.content,
                date: new Date().toLocaleString("en-US")
            })
                .then(() => history.push("/messages"))
        }
    }

    const privateHook = useRef(null)

    return (
        <>
            <Container>
                <Form className="messageForm" onSubmit={evt => {
                    evt.preventDefault()
                    constructNewMessage()
                }}>
                    <Header as='h2' className="messageForm--title">
                        {messageId ? "Edit Message" : "New Message"}
                    </Header>

                    <Form.Input
                        required
                        type="text"
                        placeholder='Send a message..'
                        id='messageContent'
                        name='content'
                        onChange={handleInputChange}
                        defaultValue={message.message}
                        ref={privateHook}
                    />

                    <Button.Group>
                        <Button animated="vertical">
                            <Button.Content visible>Cancel</Button.Content>
                            <Button.Content hidden onClick={
                                () => history.push('/messages')
                            }>
                                <Icon name="cancel" />
                            </Button.Content>
                        </Button>

                        <Button.Or />

                        <Button positive animated="vertical">
                            <Button.Content visible>
                                {messageId ? "Edit" : "Send"}
                            </Button.Content>
                            <Button.Content type="submit" hidden
                                className="btn btn-primary"
                                disabled={isLoading}>
                                {messageId ? <Icon name="edit" /> : <Icon name="send" />}
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Form >
            </Container>
        </>
    )
}