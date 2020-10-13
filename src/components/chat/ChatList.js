import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { Button, Container, Icon } from "semantic-ui-react"
import { useInterval } from "../useInterval"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)

    useInterval(getMessages, 3000)

    useEffect(() => {
        getMessages()
    }, [])

    const history = useHistory()

    return (
        <>
            <Container>
                <div className="messages">
                    {
                        messages.map(message => {
                            return <ChatCard key={message.id} message={message} />
                        })
                    }
                </div>

                <Button primary icon onClick={() => { history.push("/messages/new") }}>
                    <Icon name="plus circle" />
                </Button>
            </Container>
        </>
    )
}