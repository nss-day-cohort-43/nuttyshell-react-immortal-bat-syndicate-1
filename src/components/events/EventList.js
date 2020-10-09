import React, {useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventCard } from "./EventCard"
import { EventContext } from "./EventProvider"
import "./Event.css"




export const EventList = _ => {
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    },[])
    
    const history = useHistory()

    return (
        <>
        <h2>Events</h2>
        <button onClick={() => {
            history.push("events/create")
        }}>Add Event</button>
        <div className="events">
            {events.map(event => {
                return (
                    <EventCard 
                    key={event.id}
                    event={event}
                    />
                )
            })}
        </div>
        </>
    )

}