import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Header, Icon, Message, Modal } from "semantic-ui-react"

export const ChatCard = ({ message }) => {
    const { deleteMessage } = useContext(ChatContext)

    const currentUser = parseInt(localStorage.getItem("nutty_user"))

    const history = useHistory()

    if (message.userId === currentUser && !message.targetId) {
        // global chat for current user
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "#fff" }}>
                    <Header as="h3" className="message--currentUser">{message.user.username}</Header>

                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>

                    <div className="messageBtns">
                        <Button.Group>
                            <Button icon className="editBtn" onClick={
                                () => history.push(`/messages/edit/${message.id}`)
                            }><Icon name="edit" />
                            </Button>

                            <Button icon className="deleteBtn" color="red" onClick={
                                () => deleteMessage(message.id)
                                    .then(() => history.push(`/messages`))
                            }><Icon name="trash" />
                            </Button>
                        </Button.Group>
                    </div>
                </Message>
            </Container>
        )
    } else if (message.targetId) {
        if (message.targetId === currentUser || message.userId === currentUser) {
            // private chat for current user and recipient
            return (
                <Container className="message--container">
                    <Message className="message" floating style={{ backgroundColor: "lightskyblue" }}>
                        <Header as="h3" className="message--currentUser">{message.user.username}</Header>

                        <p className="message--content">{message.message}</p>
                        <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>

                        <div className="messageBtns">
                            <Button.Group>
                                <Button icon className="editBtn" onClick={
                                    () => history.push(`/messages/edit/${message.id}`)
                                }><Icon name="edit" />
                                </Button>

                                <Button icon className="deleteBtn" color="red" onClick={
                                    () => deleteMessage(message.id)
                                        .then(() => history.push(`/messages`))
                                }><Icon name="trash" />
                                </Button>
                            </Button.Group>
                        </div>
                    </Message>
                </Container>
            )
        } else if (message.targetId !== currentUser || message.userId !== currentUser) {
            return null
        }
    } else {
        // renders global chat bubbles
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "lightgreen" }}>
                    <Modal
                        trigger={<Header as="h3" className="message--notFriend">{message.user.username}</Header>}
                        header="Test"
                        content="Do you want to add Test as a friend?"
                        actions={['No', { key: 'yes', content: 'Yes', positive: true }]}
                    />

                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>
                </Message>
            </Container>
        )
    }
}