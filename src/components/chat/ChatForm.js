import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { FriendContext } from "../friend/FriendProvider"
import { Button, Container, Header, Icon, Form } from "semantic-ui-react"

export const ChatForm = (props) => {
    const { addMessage, getMessageById, editMessage, getUserById, getUserByName } = useContext(ChatContext)
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
        getFriends().then(() => {
            if (messageId) {
                getMessageById(messageId)
                    .then(message => {
                        setMessage(message)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
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
        } else if (message.content.startsWith(`@`)) {
            let privMes = message.content.split(' ')[0]
            let userName = privMes.slice(1)

            let currentFriends = friends.filter(friend => {
                return friend.activeUserId === parseInt(localStorage.getItem("nutty_customer"))
            })

            let targetFriend = currentFriends.find(currentFriend => {
                return currentFriend.user.username.toLowerCase() === userName.toLowerCase()
            })

            console.log(targetFriend)

            if (targetFriend) {
                addMessage({
                    userId: parseInt(localStorage.getItem("nutty_customer")),
                    message: message.content,
                    date: new Date().toLocaleString("en-US"),
                    targetId: targetFriend.userId
                })
                    .then(() => history.push("/messages"))
            } else {
                window.alert("Check the username after '@'...")
            }

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