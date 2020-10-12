import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Icon } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

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
                            <Button icon compact id="deleteMessage--" className="deleteBtn" onClick={
                                () => deleteMessage(message.id)
                            }><Icon name="delete" />
                            </Button>
                        </>
                        : null}
                </div>
            </section>
        </Container>
    )
}