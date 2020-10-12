import React from "react"
import { ChatContext } from "./ChatProvider"
import { Button, Icon } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatCard = ({ message }) => (
    <section className="message">
        <p className="message--content">{message.message}</p>
        <p className="message--poster">{message.user.username}</p>
        <p className="message--date">{message.date}</p>
        <Button icon compact id={message.id}>
            <Icon name="delete" />
        </Button>
    </section>
)