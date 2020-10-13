import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { ChatCard } from "./ChatCard"
import { Button, Container, Icon, Checkbox } from "semantic-ui-react"
import { useInterval } from "../useInterval"

export const ChatList = () => {
    const { messages, getMessages } = useContext(ChatContext)
    const [ update, setUpdate ] = useState(false)

    useInterval(getMessages, update ? 3000 : null)

    useEffect(() => {
        getMessages()
    }, [])

    const history = useHistory()

    return (
        <>
            <Container>
                <Checkbox toggle 
                    onChange={() => setUpdate(!update)}
                    label={ update ? "Disable real-time updates" : "Allow real-time updates"}
                />
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