import React, { useContext, useRef, useEffect } from "react"
import { ChatContext } from "./ChatProvider"
import { useHistory } from "react-router-dom"
import { Button, Form, MessageContent, TextArea } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatForm = (props) => {
    const { addMessage } = useContext(ChatContext)

    const message = useRef(null)

    useEffect(() => {
    }, [])

    const constructNewMessage = () => {
        addMessage({
            message: MessageContent.current.value
        })
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        constructNewMessage()
    }

    return (
        <Form className="messageForm" onSubmit={handleSubmit}>
            <h2 className="messageForm--title">New Message</h2>

            <fieldset>
                <div className="form-group">
                    <TextArea id="messageContent" name="messageContent" autoFocus required className="form-control" placeholder="Enter your message here..." style={{ minHeight: 100 }} />
                </div>
            </fieldset>

            <Button type="submit" primary compact required className="btn btn-primary">
                Send
            </Button>
        </Form>
    )
}