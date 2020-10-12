import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { ChatProvider } from "../components/chat/ChatProvider"
import { ChatList } from "../components/chat/ChatList"
import { ChatForm } from "../components/chat/ChatForm"
import { TaskProvider } from "./task/TaskProvider"
import { TaskList } from "./task/TaskList"
import { TaskForm } from "./task/TaskForm"
import { EventList } from "./events/EventList";
import { EventProvider } from "./events/EventProvider";
import { EventDetail } from "./events/EventDetail"
import { EventForm } from "./events/EventForm";
import { ArticleProvider } from "./articles/ArticleProvider";
import { ArticleList } from "./articles/ArticleList"
import { ArticleForm } from "./articles/ArticleForm"

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
            <TaskProvider>
                <Route exact path="/tasks">
                    <TaskList />
                </Route>
            </TaskProvider>

            <TaskProvider>
                <Route exact path="/tasks/create">
                    <TaskForm />
                </Route>
            </TaskProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>

            <EventProvider>
                <Route exact path="/events/detail/:eventId(\d+)">
                    <EventDetail />
                </Route>
            </EventProvider>

            <EventProvider>
                <Route path="/events/edit/:eventId(\d+)">
                    <EventForm />
                </Route>
            </EventProvider>

            <EventProvider>
                <Route exact path="/events/create">
                    <EventForm />
                </Route>
            </EventProvider>

            <ArticleProvider>
                <Route exact path="/articles">
                    <ArticleList />
                </Route>
            </ArticleProvider>

            <ArticleProvider>
                <Route exact path="/articles/create">
                    <ArticleForm />
                </Route>
            </ArticleProvider>

            <ArticleProvider>
                <Route exact path="/articles/edit/:articleId(\d+)">
                    <ArticleForm />
                </Route>
            </ArticleProvider>
        </>
    )
}

