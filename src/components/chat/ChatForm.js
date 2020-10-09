import React, { useContext, useRef, useEffect } from "react"
import { ChatContext } from "./ChatProvider"
import { useHistory } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, MessageContent, TextArea } from "semantic-ui-react"
import "./Chat.css"

export const ChatForm = (props) => {
    const { addMessage } = useContext(ChatContext)

    const message = useRef(null)

    useEffect(() => {
    }, [])

    const constructNewMessage = () => {
        if (MessageContent.current.value === "") {
            window.alert("Please enter a message!")
        } else {
            addMessage({
                message: MessageContent.current.value
            })
        }
    }

    return (
        <Form className="messageForm">
            <h2 className="messageForm--title">New Message</h2>

            <fieldset>
                <div className="form-group">
                    <TextArea id="messageContent" name="messageContent" autoFocus className="form-control" placeholder="Enter your message here..." style={{ minHeight: 100 }} />
                </div>
            </fieldset>

            <Button primary compact onClick={evt => {
                evt.preventDefault()
                constructNewMessage()
            }}
                className="btn btn-primary">
                Save
            </Button>
        </Form>
    )
}