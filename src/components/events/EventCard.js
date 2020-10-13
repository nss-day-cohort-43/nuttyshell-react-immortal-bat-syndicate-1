import React from "react";
import { Link } from "react-router-dom";
import "./Event.css";

export const EventCard = ({ event}) => {
  return (
    <section className="event">
      <h3 className="event__name">
        <Link to={`/events/detail/${event.id}`}> {event.name}</Link>
      </h3>
      <div>Date: {new Date(`${event.date}T07:00:00Z`).toDateString("en-US")}</div>
    </section>
  );
};
export const UpcomingEventCard = ({ event}) => {
    return (
      <section className="eventfirst">
        <h2 className="event__name">
          <Link to={`/events/detail/${event.id}`}> {event.name}</Link>
        </h2>
        <div>Date: {new Date(`${event.date}T07:00:00Z`).toDateString("en-US")}</div>
      </section>
    );
  };
  