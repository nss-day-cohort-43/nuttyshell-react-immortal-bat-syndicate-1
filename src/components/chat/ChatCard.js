import React from "react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatCard = ({ message }) => (
    <section className="message">
        <p className="message--content">{message.message}</p>
        <p className="message--date">{message.date}</p>
    </section>
)