import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { Button, Container, Header, Icon } from "semantic-ui-react"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)

    useEffect(() => {
        getMessages()
    }, [])

    const history = useHistory()

    return (
        <>
            <Container>
                <Header as='h2'>Messages</Header>

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