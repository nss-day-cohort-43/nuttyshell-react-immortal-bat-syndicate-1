import React, { useContext, useRef, useEffect } from "react"
import { ChatContext } from "./ChatProvider"
import { useHistory } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import "./Chat.css"

export const ChatForm = (props) => {
    const { addMessage } = useContext(ChatContext)

    const message = useRef(null)

    useEffect(() => {
    }, [])

    const constructNewMessage = () => { }

    return (
        <form className="messageForm">
            <h2 className="messageForm--title">New Message</h2>

            <fieldset>
                <div className="form-group">
                    <textarea id="messageContent" name="content" autoFocus className="form-control" placeholder="Enter your message here..." />
                </div>
            </fieldset>

            <button onClick={evt => {
                evt.preventDefault()
                constructNewMessage()
            }}
                className="btn btn-primary">
                Save
            </button>
        </form>
    )
}