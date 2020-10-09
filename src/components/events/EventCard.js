import React from "react"
import { Link } from "react-router-dom"

export const EventCard = ({event}) => (
    <section className="event">
        <h3 className="event__name">
            <Link to={`/events/detail/${event.id}`}> {event.name}</Link>
            </h3>
    </section>
)