import React from "react"

export const EventCard = ({event}) => (
    <section className="event">
        <h3 className="event__name">{event.name}</h3>
    </section>
)