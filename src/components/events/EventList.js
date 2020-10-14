import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EventCard, UpcomingEventCard } from "./EventCard";
import { EventContext } from "./EventProvider";
import { useInterval } from "../useInterval"
import { Button, Checkbox, Icon, Divider } from "semantic-ui-react"
import "./Event.css";

export const EventList = (_) => {
  const { events, getEvents } = useContext(EventContext);
  const [update, setUpdate] = useState(false)
  //   const [first, setFirst] = useState("true");

  useInterval(getEvents, update ? 3000 : null)

  useEffect(() => {
    getEvents()
  }, []);

  const filteredEvents = events.filter(event => {
    return event.date >= new Date().toISOString().split("T")[0]
  })

  const history = useHistory();
  return (
    <>
      <div className="eventsContainer">
        <div className="eventsHeader">
          <h2><Icon name="calendar alternate" />Events</h2>
          <Checkbox toggle
            onChange={() => setUpdate(!update)}
            label={update ? "Disable real-time updates" : "Allow real-time updates"}
          />
        </div>

        <Divider />

        <Button
          primary
          onClick={() => {
            history.push("events/create");
          }}
        >
          Add Event
      </Button>
        <div className="events">
          {filteredEvents.map((event) => {
            if (event.id === filteredEvents[0].id) {
              return <UpcomingEventCard key={event.id} event={event} />;
            } else {
              return <EventCard key={event.id} event={event} />;
            }
          })}
        </div>
      </div>
    </>
  );
};
