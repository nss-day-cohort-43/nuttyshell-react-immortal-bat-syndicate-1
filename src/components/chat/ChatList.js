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
                <div className="messageListHeader">
                    <Header as='h2'><Icon name="chat" />Messages</Header>

                    <Button primary onClick={() => { history.push("/messages/new") }}>
                        <Icon name="plus circle" /> New Message
                </Button>
                </div>

                <section className="messages--container">
                    <div className="messages">
                        {
                            messages.map(message => {
                                return <ChatCard key={message.id} message={message} />
                            })
                        }
                    </div>
                </section>
            </Container>
        </>
    )
}