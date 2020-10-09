import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { Button } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)

    useEffect(() => {
        getMessages()
    }, [])

    const history = useHistory()

    return (
        <>
            <div className="messages">
                {
                    messages.map(message => {
                        return <ChatCard key={message.id} message={message} />
                    })
                }
            </div>

            <Button primary compact onClick={() => { history.push("messages/new") }}>
                +
            </Button>
        </>
    )
}