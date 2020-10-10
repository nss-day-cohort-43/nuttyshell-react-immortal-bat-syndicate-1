import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { TaskProvider } from "./task/TaskProvider"
import { TaskList } from "./task/TaskList"
import { TaskForm } from "./task/TaskForm"
import { EventList } from "./events/EventList";
import { EventProvider } from "./events/EventProvider";
import { EventDetail } from "./events/EventDetail"
import { EventForm } from "./events/EventForm";

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

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
        </>
    )
}


