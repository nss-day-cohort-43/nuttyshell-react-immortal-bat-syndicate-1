import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "./EventProvider";
import "./Event.css";

export const EventDetail = (_) => {
  const { events, getEventById } = useContext(EventContext);
  const [event, setEvent] = useState({});
  const user = parseInt(localStorage.getItem("nutty_customer"))
  const [owned, setOwned] = useState(false);
  const history = useHistory();

  const { eventId } = useParams();

  useEffect(() => {
    getEventById(eventId).then((response) => {
      setEvent(response);
      if (user === response.user.id) {
        setOwned(true);
      }
      console.log("user ID", user, "Response ID", response.user.id);
    });
  }, []);

  return (
    <section className="events">
      <section className="event">
        <h3 className="event__name">{event.name}</h3>
        <div>Date: {event.date}</div>
        <div>
          Location: {event.address} {event.city}, {event.state} {event.zip}{" "}
        </div>
        <div>{owned ? "Edit" : ""}</div>
      </section>
    </section>
  );
};
