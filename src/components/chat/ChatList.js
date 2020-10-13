import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import { FriendContext } from "../friend/FriendProvider"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { Button, Container, Header, Icon } from "semantic-ui-react"
import { useInterval } from "../useInterval"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)
    const { users, getUsers } = useContext(UserContext)
    const { friends, getFriends } = useContext(FriendContext)

    useInterval(getMessages, 3000)

    useEffect(() => {
        getMessages()
    }, [])

    const history = useHistory()

    return (
        <>
            <Container>
                <Header as='h2'><Icon name="comments" />Messages</Header>

                <div className="messages--window">
                    <section className="messages--container">
                        <div className="messages">
                            {
                                messages.map(message => {
                                    return <ChatCard key={message.id} message={message} />
                                })
                            }
                        </div>
                    </section>
                </div>

                <Button primary onClick={() => { history.push("/messages/new") }}>
                    <Icon name="plus circle" /> New Message
                </Button>
            </Container>
        </>
    )
}