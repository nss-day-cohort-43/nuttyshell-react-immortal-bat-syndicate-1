import React from "react"
import { Route, Router } from "react-router-dom"
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
import { WeatherProvider } from "./weather/WeatherProvider"
import { FriendProvider } from "./friend/FriendProvider"
import { FriendList } from "./friend/FriendsList"
import { UserProvider } from "./user/UserProvider"

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
            </ChatProvider>

            <ChatProvider>
                <Route exact path="/messages/new">
                    <ChatForm />
                </Route>
            </ChatProvider>

            <ChatProvider>
                <Route exact path="/messages/edit/:messageId(\d+)">
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

            <TaskProvider>
                <Route exact path="/tasks/edit/:taskId(\d+)">
                    <TaskForm />
                </Route>
            </TaskProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>

            <EventProvider>
              <WeatherProvider>
                <Route exact path="/events/detail/:eventId(\d+)">
                    <EventDetail />
                </Route>
                </WeatherProvider>
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

            <FriendProvider>
                <UserProvider>
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
                </UserProvider>
            </FriendProvider>

            <FriendProvider>
                <UserProvider>
                    <Route exact path="/friends">
                        <FriendList />
                    </Route>
                </UserProvider>
            </FriendProvider>
        </>
    )
}


