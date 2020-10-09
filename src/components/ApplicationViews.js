import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { ChatProvider } from "../components/chat/ChatProvider"
import { ChatList } from "../components/chat/ChatList"
import { ChatForm } from "../components/chat/ChatForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <ChatProvider>
                <Route exact path="/messages">
                    <ChatList />
                </Route>

                <Route exact path="/messages/new">
                    <ChatForm />
                </Route>
            </ChatProvider>
        </>
    )
}