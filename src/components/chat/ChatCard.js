import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Icon } from "semantic-ui-react"

export const ChatCard = ({ message }) => {
    const { deleteMessage } = useContext(ChatContext)
    const history = useHistory()

    return (
        <Container className="message--container">
            <section className="message">
                <p className="message--content">{message.message}</p>
                <p className="message--poster">{message.user.username}</p>
                <p className="message--date">{message.date}</p>

                <div className="messageBtns">
                    {message.userId === parseInt(localStorage.getItem("nutty_customer")) ?
                        <>
                            <Button icon className="editBtn" onClick={
                                () => history.push(`/messages/edit/${message.id}`)
                            }><Icon name="edit" />
                            </Button>

                            <Button icon className="deleteBtn" onClick={
                                () => deleteMessage(message.id)
                                    .then(() => history.push(`/messages`))
                            }><Icon name="trash" />
                            </Button>
                        </>
                        : null}
                </div>
            </section>
        </Container>
    )
}